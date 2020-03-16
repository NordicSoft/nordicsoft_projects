import React from 'react'

import Navbar from '../navbar/navbar';

function Header() {
    return (
        <React.Fragment>
            <header className="firstScreen">
                <Navbar />
                <div className="intro-text text-center">
                    <div className="intro-heading">
                        <span className="secondary-font">Richard and Grace</span>Saturday, January 11, 2020
                    </div>
                </div>
            </header>
        </React.Fragment>
    );
}
export default Header;

