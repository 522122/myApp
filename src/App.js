import React from 'react';
import './App.css';
import data from './data.json';

import Dashboard from './Components/Dashboard';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    }

    this.appFunctions = {};
    this.appFunctions.hashString = (str) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash += Math.pow(str.charCodeAt(i) * 31, str.length - i);
        hash = hash & hash; // Convert to 32bit integer
      }
      return hash;
    }
    this.appFunctions.logIn = (hash) => {
      
      if ( hash === data.secret ) {
        this.setState({loggedIn: true});
        return true;
      }

      return false;

    }
  }

  componentDidMount() {
    if ( localStorage.getItem("pass") ) {
      this.appFunctions.logIn(parseFloat(localStorage.getItem("pass")));
    }
  }

  render() {
    return (
      
      <div className="App">
        <Dashboard appState={this.state} appFunctions={this.appFunctions}/>
      </div>

    ); 
  }
}

export default App;
