"use strict";
import React, { Component } from 'react'
import "./footer.css"
import ContentBlock from '../contentBlock/contentBlock'

function MainFooter() {
    return (
        <section className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 text-center">
                        <p className="copyright font-inc m-b-0">{new Date().getFullYear()} <a href="https://nordicsoft.net" rel="noopener noreferrer nofollow" target="_blank">NordicSoft</a>. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}


function Footer() {
    return (
        <React.Fragment>
            <section className="module-small">
                <div className="container">
                    <div className="row">
                        <ContentBlock />
                    </div>
                </div>
            </section>
            <MainFooter />
        </React.Fragment>

    );
}

export default Footer;
