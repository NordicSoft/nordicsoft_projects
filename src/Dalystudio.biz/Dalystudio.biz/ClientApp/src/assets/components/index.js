"use strict";
import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Footer from "./footer/footer";
import AboutSection from "./aboutSection/aboutSection";
import GetInTouch from "./getInTouch/getInTouch";
import Header from "./header/header";
import Banner from "./bannerIndex/banner";
import BannerPage from "./banner/banner";
import PortfolioSection from "./portfolioSection/portfolioSection";
import AboutInfo from "./aboutInfo/aboutInfo";

function Index() {
    return (
        <React.Fragment>
        <Header />
            <Banner />
            <div className="wrapper">
                <PortfolioSection />
            <GetInTouch />
            <AboutSection />
                <Footer />
        </div>
        </React.Fragment>
    );
}

function About() {
    return (
        <React.Fragment>
            <Header />
            <BannerPage />
            <AboutInfo />
        </React.Fragment>
    );
}

function Portfolio() {
    return (
        <React.Fragment>
            <Footer />
        </React.Fragment>
    );
}

function Contact() {
    return (
        <React.Fragment>
            <Footer />
        </React.Fragment>
    );
}

function Wedding() {
    return (
        <React.Fragment>
            <Footer />
        </React.Fragment>
    );
}

function Lovestory() {
    return (
        <React.Fragment>
            <Footer />
        </React.Fragment>
    );
}

function Fashion() {
    return (
        <React.Fragment>
            <Footer />
        </React.Fragment>
    );
}

function Family() {
    return (
        <React.Fragment>
            <Footer />
        </React.Fragment>
    );
}

function App() {

    return (
        //switch (state) {
        //case 'info':
        //    return <Info text={text} />;
        //case 'warning':
        //    return <Warning text={text} />;
        //case 'error':
        //    return <Error text={text} />;
        //default:
        //    return null;
        //}
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Index} />
                <Route path="/about" component={About} />
                <Route path="/portfolio" component={Portfolio} />
                <Route path="/contact" component={Contact} />
                <Route path="/project1" component={Wedding} />
                <Route path="/project2" component={Lovestory} />
                <Route path="/project3" component={Fashion} />
                <Route path="/project4" component={Family} />
            </Switch>
        </BrowserRouter>

    )
}
//<Route path="/" exact component={Index} />
//<Route path="/about/" component={About} />
//<Route path="/users/" component={Users} />

ReactDOM.render(<App />, document.getElementById('root'));

