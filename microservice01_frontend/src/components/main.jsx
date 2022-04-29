import React, {Component} from 'react';
import Dropdowns from "./dropdowns";
import graph from '../graph.jpg'; ///
import Footer from "./footer";
import logo from "../logo.jpg";
import {Link} from "react-router-dom";

const Main = props => {
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col bg-danger">
                        From
                        <input type="date"/>
                        <Dropdowns/>

                        <button className="btn btn-primary" type="button" onClick={() => console.log("refesh clicked")}>
                            Refresh
                        </button>

                    </div>

                    <div className="col bg-success">
                        <img className="my-3" src={graph} width="400" alt="Logo"/>
                        <Footer/>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Main;