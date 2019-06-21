'use strict';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from './components/header/header';
import Couple from './components/couple/couple';
import Section from './components/section/section';
import Gift from './components/gift/gift';
import Contact from './components/contact/contact';
import Footer from "./components/footer/footer";
import Test from "./components/error/error";

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