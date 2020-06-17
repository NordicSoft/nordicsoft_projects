"use strict";
import React from 'react';
import "../vendor.css";
import "../index.css";
import "../fonts.css";

import GetInTouch from "../getInTouch/getInTouch";
import BannerPage from "../bannerPage/bannerPage";
import Footer from "../footer/footer";

const devide = (<hr className="divider-w" />);

export default function Contact() {
    return (
        <React.Fragment>
            <BannerPage />
            <div className="wrapper">
                <GetInTouch />
                {devide}
                <Footer />
            </div>
        </React.Fragment>
    );
}