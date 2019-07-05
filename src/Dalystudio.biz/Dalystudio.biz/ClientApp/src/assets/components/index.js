"use strict";
import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import Routes from "./routes/routes";
//import Footer from "./footer/footer";
//import AboutSection from "./aboutSection/aboutSection";
//import GetInTouch from "./getInTouch/getInTouch";
//import Header from "./header/header";
//import Banner from "./bannerIndex/banner";
//import BannerPage from "./banner/banner";
//import PortfolioSection from "./portfolioSection/portfolioSection";
//import AboutInfo from "./aboutInfo/aboutInfo";
//import ServicesSection from "./services/services";
//import Counter from "./counters/counters";
//import Description from "./description/description";
//import PortfolioTale from "./portfolio/portfolio";

//const devide = (<hr className="divider-w" />);

//function Index() {
//    return (
//        <React.Fragment>
//            <Header />
//            <Banner />
//            <div className="wrapper">
//                <PortfolioSection />
//                <GetInTouch />
//                <AboutSection />
//                {devide}
//                <Footer />
//            </div>
//        </React.Fragment>
//    );
//}

//function About() {
//    return (
//        <React.Fragment>
//            <Header />
//            <BannerPage />
//            <div className="wrapper">
//                <AboutInfo />
//                {devide}
//                <ServicesSection />
//                <Counter />
//                {devide}
//                <Footer />
//            </div>
//        </React.Fragment>
//    );
//}

//function Portfolio() {
//    return (
//        <React.Fragment>
//            <Header />
//            <BannerPage />
//            <div className="wrapper">
//                <PortfolioSection />
//                {devide}
//                <Footer />
//            </div>
//        </React.Fragment>
//    );
//}

//function Contact() {
//    return (
//        <React.Fragment>
//            <Header />
//            <BannerPage />
//            <div className="wrapper">
//                <GetInTouch />
//                {devide}
//                <Footer />
//            </div>
//        </React.Fragment>
//    );
//}

//function Wedding() {
//    return (
//        <React.Fragment>
//            <Header />
//            <BannerPage />
//            <div className="wrapper">
//                <Description />
//                <PortfolioTale />
//                {devide}
//                <Footer />
//            </div>
//        </React.Fragment>
//    );
//}

//function Lovestory() {
//    return (
//        <React.Fragment>
//        <Header />
//        <BannerPage />
//        <div className="wrapper">
//        <Description />
//        <PortfolioTale />
//        {devide}
//        <Footer />
//        </div>
//        </React.Fragment>
//    );
//}

//function Fashion() {
//    return (
//        <React.Fragment>
//        <Header />
//        <BannerPage />
//        <div className="wrapper">
//        <Description />
//        <PortfolioTale />
//        {devide}
//        <Footer />
//        </div>
//        </React.Fragment>
//    );
//}

//function Family() {
//    return (
//        <React.Fragment>
//        <Header />
//        <BannerPage />
//        <div className="wrapper">
//        <Description />
//        <PortfolioTale />
//        {devide}
//        <Footer />
//        </div>
//        </React.Fragment>
//    );
//}



function App() {

    return (

        <Routes />

    )
}

ReactDOM.render(<App />, document.getElementById('root'));

