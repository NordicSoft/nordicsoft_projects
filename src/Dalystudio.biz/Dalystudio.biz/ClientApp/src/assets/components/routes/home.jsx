"use strict";
import React from 'react';
import "../vendor.css";
import "../index.css";
import "../fonts.css";

import AboutSection from "../aboutSection/aboutSection";
import GetInTouch from "../getInTouch/getInTouch";
import BannerIndex from "../bannerIndex/bannerIndex";
import PortfolioSection from "../portfolioSection/portfolioSection";
import Footer from "../footer/footer";

export default function Index(props) {
    return (
        <React.Fragment>
            <BannerIndex />
            <div className="wrapper">
                <PortfolioSection />
                <GetInTouch />
                <AboutSection />
                {props.devide}
                <Footer />
            </div>
        </React.Fragment>
    );
}