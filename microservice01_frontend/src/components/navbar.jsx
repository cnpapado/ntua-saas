import React, {Component} from 'react';

// Stateless functional component
const Navbar = ({email}) => { // React passes props
    return (
        <div>
            <nav className="navbar navbar-expand navbar-light bg-light">
                <div className="container-fluid">
                    <span className="navbar-brand mb-01 fs-4">
                        EnergyLive 2022
                    </span>

                    <div className="justify-content-end align-center">
                        <ul className="navbar-nav">
                            <li className="navbar-text pe-4 text-dark">
                                    johndoe@gmail.com
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Sign out
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

            </nav>

        </div>
    );
}

// class Navbar extends Component {
//     render() {
//         // ...
//     }
// }

export default Navbar;