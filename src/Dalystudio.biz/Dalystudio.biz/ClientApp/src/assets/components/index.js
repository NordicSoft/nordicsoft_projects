﻿"use strict";
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import ScrollUpButton from "react-scroll-up-button";
import Routes from "./routes/routes";
//import BackToTop from 'react-back-to-top';
import "./vendor.css";
import "./index.css";
import "./fonts.css";

//functionimport Footer from "../footer/footer";

import AboutSection from "./aboutSection/aboutSection";
import GetInTouch from "./getInTouch/getInTouch";
import Header from "./header/header";
import Banner from "./bannerIndex/banner";
import BannerPage from "./banner/banner";
import PortfolioSection from "./portfolioSection/portfolioSection";
import AboutInfo from "./aboutInfo/aboutInfo";
import ServicesSection from "./services/services";
import Counter from "./counters/counters";
import Description from "./description/description";
import PortfolioTale from "./portfolio/portfolio";
import Footer from "./footer/footer";


const devide = (<hr className="divider-w" />);

function Index() {
    return (
        <React.Fragment>
            <Banner />
            <div className="wrapper">
                <PortfolioSection />
                <GetInTouch />
                <AboutSection />
                {devide}
                <Footer />
            </div>
        </React.Fragment>
    );
}

function About() {
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

function Portfolio() {
    return (
        <React.Fragment>
            <BannerPage />
            <div className="wrapper">
                <PortfolioSection />
                {devide}
                <Footer />
            </div>
        </React.Fragment>
    );
}

function Contact() {
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

function Wedding() {
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

function Lovestory() {
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

function Fashion() {
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

function Family() {
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


//Index() {
//    return <h2>Home</h2>;
//}

//function About() {
//    return <h2>About</h2>;
//}

//function Users() {
//    return <h2>Users</h2>;
//}

//function AppRouter() {
//    return (
//        <Router>
//            <div>
//                <nav>
//                    <ul>
//                        <li>
//                            <Link to="/">Home</Link>
//                        </li>
//                        <li>
//                            <Link to="/about/">About</Link>
//                        </li>
//                        <li>
//                            <Link to="/users/">Users</Link>
//                        </li>
//                    </ul>
//                </nav>

//                <Route path="/" exact component={Index} />
//                <Route path="/about/" component={About} />
//                <Route path="/users/" component={Users} />
//            </div>
//        </Router>
//    );
//}

//export default AppRouter;

class App extends Component {

    componentDidMount() {
        document.addEventListener('lazybeforeunveil', function (e) {
            var bg = e.target.getAttribute('data-bg');
            if (bg) {
                if ($('html').hasClass("webp")) {
                    bg = bg.replace(/\.[^/.]+$/, ".webp");
                }
                e.target.style.backgroundImage = 'url(' + bg + ')';
            }
        });
    }

    render() {
        return (
            <React.Fragment>

                <Router>
                    <Header />
                    <Route path="/" exact component={Index} />
                    <Route path="/about/" component={About} />
                    <Route path="/portfolio/" component={Portfolio} />
                    <Route path="/contact/" component={Contact} />
                    <Route path="/project1/" component={Wedding} />
                    <Route path="/project2/" component={Lovestory} />
                    <Route path="/project3/" component={Fashion} />
                    <Route path="/project4/" component={Family} />
                </Router>

                <ScrollUpButton
                    StopPosition={0}
                    ShowAtPosition={100}
                    EasingType='easeOutCubic'
                    AnimationDuration={500}
                    ContainerClassName='ScrollUpButton__Container'
                    TransitionClassName='ScrollUpButton__Toggled'
                    style={{ height: 28, width: 28, padding: 9 }}
                    ToggledStyle={{}}
                />



            </ React.Fragment>
        )
    }
}

var root = document.querySelector("#root");
var siteKey = root.getAttribute("data-key");
ReactDOM.render((
    <App />
), root);



//<div class="scroll-up">
        //    <a href="#totop"><i class="icon-angle-double-up"></i></a>
        //</div>


//<ScrollUpButton
//    StopPosition={0}
//    ShowAtPosition={100}
//    EasingType='easeOutCubic'
//    AnimationDuration={500}
//    ContainerClassName='ScrollUpButton__Container'
//    TransitionClassName='ScrollUpButton__Toggled'
//    style={{}}
//    ToggledStyle={{}}
///>



 //<Route path="/" exact component={Index} />
        //<Route path="/about/" component={About} />
        //<Route path="/portfolio/" component={Portfolio} />
        //<Route path="/contact/" component={Contact} />
        //<Route path="/project1/" component={Wedding} />
        //<Route path="/project2/" component={Lovestory} />
        //<Route path="/project3/" component={Fashion} />
        //<Route path="/project4/" component={Family} />
//<nav>
//    <ul>
//        <li>
//            <Link to="/">Home</Link>
//        </li>
//        <li>
//            <Link to="/about/">About</Link>
//        </li>
//        <li>
//            <Link to="/users/">Users</Link>
//        </li>
//    </ul>
//</nav>