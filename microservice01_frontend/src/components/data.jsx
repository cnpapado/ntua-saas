import React, {Component} from 'react';
import Navbar from "./navbar";
import Main from "./main";
import Footer from "./footer";

class Data extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <Main/>
                Lorem ipsum dolor sit amet.
            </div>
        );
    }
}

export default Data;