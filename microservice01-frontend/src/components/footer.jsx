import React from 'react';

const Footer = props => {
    console.log(window.localStorage.getItem('daysLeft'));
	if (props.welcome !== undefined)
        return (
            <div>
                <footer className="mt-5 modal-footer">
                    <div className="container-fluid">
                        <div className="row text-center">
                            <div className="col">
                                <a href="#" className="link-secondary text-decoration-none">About</a>
                            </div>
                            <div className="col">
                                <a href="#" className="link-secondary text-decoration-none">Plans</a>
                            </div>
                            <div className="col">
                                <a href="#" className="link-secondary text-decoration-none">Legal</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );

    return (
        <div>
            <footer className="mt-5 modal-footer">
                <div className="container-fluid">
                    <div className="row text-center">
                        <div className="col">
                            <div href="#" className="text-decoration-none">
                                Service status: LIVE
                            </div>
                        </div>
                        <div className="col">
                            <div href="#" className="text-decoration-none">
                                Days left: {isNaN(window.localStorage.getItem('daysLeft'))?0:window.localStorage.getItem('daysLeft')}
                            </div>
                        </div>
                        <div className="col">
                            <a href="/plan" className="link-secondary text-decoration-none">
                                Extend plan
                            </a>
                        </div>
                        <div className="col">
                            <a href="#" className="link-secondary text-decoration-none">
                                About
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};


export default Footer;