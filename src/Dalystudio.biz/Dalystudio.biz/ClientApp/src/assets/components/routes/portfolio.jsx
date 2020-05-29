"use strict";
import React from 'react';
import "../vendor.css";
import "../index.css";
import "../fonts.css";

import BannerPage from "../bannerPage/bannerPage";
import PortfolioSection from "../portfolioSection/portfolioSection";
import Footer from "../footer/footer";

export default function Portfolio(props) {
    return (
        <React.Fragment>
            <BannerPage />
            <div className="wrapper">
                <PortfolioSection />
                {props.devide}
                <Footer />
            </div>
        </React.Fragment>
    );
}