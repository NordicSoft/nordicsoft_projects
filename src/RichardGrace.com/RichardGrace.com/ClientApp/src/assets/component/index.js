'use strict';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from './header/header';
import Couple from './couple/couple';
import Section from './section/section';
import Gift from './gift/gift';
import Contact from './contact/contact';
import Footer from "./footer/footer";
import Test from "./error/error";


import './style.scss';

class App extends Component {
    render() {
        return (
            <React.Fragment>
            <Header />
            <Couple />
            <Section />
            <Gift />
            <Contact siteKey={siteKey} />
            <Footer />
            </React.Fragment>
        )
    }
}

var root = document.querySelector("#root");
var siteKey = root.getAttribute("data-key");
ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App} />
            <Route component={Test} />
        </Switch>
    </BrowserRouter>,
    root
);


//var error = document.querySelector("#error");
//ReactDOM.render(<Error404 />, error);