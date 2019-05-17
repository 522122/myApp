import React from 'react';
import './_styles.scss';
import img from './img.png';
import data from '../../data.json';
import {SHA256} from 'crypto-js';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pwd: '',
            remember: false,
            passwordError: false,
        }

        this.submitForm = this.submitForm.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.checkboxChange = this.checkboxChange.bind(this);
    }

    inputChange(e) {
        this.setState({pwd: e.target.value});
    }
    checkboxChange(e) {
        this.setState({remember: e.target.checked});
    }

    submitForm(e) {
        e.preventDefault();
        if (this.state.pwd === '') {
            this.setState({passwordError: true});
            return;
        }

        this.props.appFunctions.logIn( SHA256(this.state.pwd) ).then((res) => {
            if (res.status === 'ok') {
                if ( this.state.remember ) {
                    localStorage.setItem("pass", res.pass);
                }
            } else {
                this.setState({passwordError: true});   
            }
        });
    
    }
        

    render() {
        return (
            <div className="login">
                <div className="card">
                    <img className="card-img-top" src={img} alt="Login" />
                    <div className="card-body">
                        <form onSubmit={this.submitForm}>
                            <div className="form-group">
                                <label htmlFor="pwd">Password</label>
                                <input 
                                    name="pwd" 
                                    id="pwd" 
                                    type="password"  
                                    className={this.state.passwordError ? "is-invalid form-control" : "form-control"}
                                    value={this.state.pwd}
                                    onChange={this.inputChange}
                                />
                                <div className="invalid-feedback">
                                    Error!
                                </div>
                            </div>
                            <div className="form-check mb-2">
                                <input 
                                    type="checkbox"
                                    id="remember"
                                    name="remember"
                                    className="form-check-input"
                                    onChange={this.checkboxChange}
                                    checked={this.state.cheched}
                                />
                                <label className="form-check-label" htmlFor="remember">Remember</label>
                            </div>
                            <button type="submit" className="btn btn-block btn-primary">Log In</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;