import React, {Component} from 'react';
import logo from '../logo.jpg';
import Footer from "./footer";
import {Link} from "react-router-dom";

class Login extends Component {
    render() {
        return (
            <div>
                <div className="text-center">
                    <img className="my-3" src={logo} width="500" alt="Logo"/>
                </div>

                <h1 className="text-center">EnergyLive 2022</h1>
                <div className="text-center">
                    <Link to="/data">
                        <button className="mt-3 btn btn-primary" type="button">
                            Login with google
                        </button>
                    </Link>
                </div>


                <Footer />
            </div>
        );
    }
}

export default Login;