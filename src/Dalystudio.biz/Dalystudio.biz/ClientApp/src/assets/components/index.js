"use strict";
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import ScrollUpButton from "react-scroll-up-button";
import "./vendor.css";
import "./index.css";
import "./fonts.css";

import Header from "./header/header";
import Index from './routes/home'
import About from './routes/about'
import Portfolio from './routes/portfolio'
import Contact from './routes/contact'
import Wedding from './routes/wedding'
import Lovestory from './routes/lovestory'
import Fashion from './routes/fashion'
import Family from './routes/family'

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
//var siteKey = root.getAttribute("data-key");
ReactDOM.render((
    <App />
), root);