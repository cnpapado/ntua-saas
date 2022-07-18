import React, {Component} from 'react';
import { UserAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import map_app from '../map_app.png';
import logo from "../logo.jpg";

// Stateless functional component
const Navbar = () => { // React passes props
     const { user, logOut } = UserAuth();

	  const handleSignOut = async () => {
		try {
		  await logOut()
		} catch (error) {
		  console.log(error)
		}
	  }

	return (
        <div>
            <nav className="navbar navbar-expand navbar-light">
                <div className="container-fluid">
                    <span className="navbar-brand mb-01 fs-4">
                        EnergyLive 2022
                    </span>

                    <div className="justify-content-end align-center">
                        <ul className="navbar-nav">
                            
                            <li className="navbar-text pe-4 text-dark">
                                {user?.email}
                            </li>
                            <li className="nav-item">
                                {user?.displayName ? (
									<button className="nav-link" onClick={handleSignOut}>Sign out</button>
								  ) : (
									<Link to='/'>Sign in</Link>
								  )}
								
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