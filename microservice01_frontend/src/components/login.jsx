import React, {Component} from 'react';
import logo from '../logo.jpg';
import Footer from "./footer";
import {Link} from "react-router-dom";
import { signInWithGoogle } from "../firebase/firebase.utils";
import GoogleButton from 'react-google-button'

class Login extends Component {
    render() {
        return (
            <div>
                <div className="text-center">
                    <img className="my-3" src={logo} width="500" alt="Logo"/>
                </div>

                <h1 className="text-center">EnergyLive 2022</h1>
                <div className="App" style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}>
				  
				  <GoogleButton
				  onClick={signInWithGoogle}/>
				  {/* Optionally display user information<h1>{localStorage.getItem("name")}</h1>
				  <h1>{localStorage.getItem("email")}</h1>
					  <img src={localStorage.getItem("profilePic")} />*/}
				</div>


                <Footer welcome={true}/>
            </div>
        );
    }
}

export default Login;