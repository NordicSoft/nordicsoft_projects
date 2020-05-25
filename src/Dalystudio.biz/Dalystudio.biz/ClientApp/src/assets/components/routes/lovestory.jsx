"use strict";
import React from 'react';
import "../vendor.css";
import "../index.css";
import "../fonts.css";

import BannerPage from "../bannerPage/bannerPage";
import Description from "../description/description";
import PortfolioTale from "../portfolio/portfolio";
import Footer from "../footer/footer";

export default function Lovestory(props) {
    return (
        <React.Fragment>
            <BannerPage />
            <div className="wrapper">
                <Description />
                <PortfolioTale />
                {props.devide}
                <Footer />
            </div>
        </React.Fragment>
    );
}