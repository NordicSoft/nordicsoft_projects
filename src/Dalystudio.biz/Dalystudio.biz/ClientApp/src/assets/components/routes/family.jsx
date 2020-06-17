"use strict";
import React from 'react';
import "../vendor.css";
import "../index.css";
import "../fonts.css";

import BannerPage from "../bannerPage/bannerPage";
import Description from "../description/description";
import PortfolioTale from "../portfolio/portfolio";
import Footer from "../footer/footer";

const devide = (<hr className="divider-w" />);

export default function Family() {
    return (
        <React.Fragment>
            <BannerPage />
            <div className="wrapper">
                <Description />
                <PortfolioTale />
                {devide}
                <Footer />
            </div>
        </React.Fragment>
    );
}
