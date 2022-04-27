import React, {Component} from 'react';
import Dropdowns from "./dropdowns";

const Main = props => {
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col bg-danger">
                        From
                        <input type="date"/>
                        <Dropdowns/>
                    </div>

                    <div className="col bg-success">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, similique.

                        <span className="align-bottom">
                            HELLO! THIS IS A TEST
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Main;