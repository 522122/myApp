import React from 'react';
import './App.css';
import data from './data.json';
import Axios from 'axios';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class Passwords extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
      <h1>Passwords</h1>
      </div>
    )
  }
}

function Back(props) {
  return (
    <button className="btn btn-link back" onClick={props.history.goBack}><i className="fas fa-arrow-left"></i></button>
  )
}


class App extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      loggedIn: false
    }

    this.appFunctions = {};

    this.appFunctions.logIn = (hash) => {
      
      var params = new URLSearchParams();
      params.append('hash', hash);
      return Axios.post(data.api+'login.php', params).then((res) => {
        if(res.data.status === 'ok') {
          this.setState({loggedIn: true});
        }
        return res.data
      });

    }


    this.appFunctions.logOut = () => {
      this.setState({loggedIn: false});
      localStorage.removeItem('pass');
    }

  }

  componentDidMount() {
    if ( localStorage.getItem("pass") ) {
      this.appFunctions.logIn(localStorage.getItem("pass"));
    }
  }

  render() {

      if ( !this.state.loggedIn ) {
        return (
          <Router>
            <Route path='/' render={ () => <Login appFunctions={this.appFunctions} /> } /> 
          </Router> 
        )
      }

    return (
      <Router>
        <Route path="*" component={Back} />
        <button className="btn btn-link sign-out" onClick={this.appFunctions.logOut}><i className="fas fa-sign-out-alt"></i></button>
        <Link to="/" className="home btn btn-link"><i className="fas fa-home"></i></Link>
        <Route path='/' exact component={Dashboard} />
        <Route path='/passwords' component={Passwords} /> 
      </Router>)
    ;

  }
}



export default App;
