"use strict";
import React, { Component } from 'react';
import "../vendor.css";
import "../index.css";
import "../fonts.css";

import BannerPage from "../bannerPage/bannerPage";
import AboutInfo from "../aboutInfo/aboutInfo";
import ServicesSection from "../services/services";
import Counter from "../counters/counters";
import Footer from "../footer/footer";

const devide = (<hr className="divider-w" />);

export default function About() {
    return (
        <React.Fragment>
            <BannerPage />
            <div className="wrapper">
                <AboutInfo />
                {devide}
                <ServicesSection />
                <Counter />
                {devide}
                <Footer />
            </div>

        </React.Fragment>
    );
}