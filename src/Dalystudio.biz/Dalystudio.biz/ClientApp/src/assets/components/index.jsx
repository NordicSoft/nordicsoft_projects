"use strict";
import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import Routes from "./routes/routes";


import "./index.css";
import "./fonts.css";
import "./vendor.css";


function App() {

    return (

        <Routes />

    )
}

ReactDOM.render(<App />, document.getElementById('root'));

