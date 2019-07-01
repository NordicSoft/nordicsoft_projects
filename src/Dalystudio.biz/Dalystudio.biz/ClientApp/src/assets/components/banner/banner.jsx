"use strict";
import React, { Component } from 'react'
import "./banner.css"

const about = {
    bg: '../img/photographer.jpg', header: 'About', text: ' I don\'t shoot what it looks like.I shoot what it feels like.'};
const portfolio = { bg: '', header: '', text: '' };
const contact = { bg: '', header: '', text: '' };
const wedding = { bg: '', header: '', text: '' };
const lovestory = { bg: '', header: '', text: '' };
const fashion = { bg: '', header: '', text: '' };
const family = { bg: '', header: '', text: '' };

var page;

switch (window.location.pathname) {
    case '/about':
        page = about;
        break;
    case '/portfolio':
        page = portfolio;
        break;
    case '/contact':
        page = contact;
        break;
    case '/project1':
        page = wedding;
        break;
    case '/project2':
        page = lovestory;
        break;
    case '/project3':
        page = fashion;
        break;
    case '/project4':
        page = family;
        break;
    default:
        break;
}

function BannerTemplate(props) {
    return (
        <div className="module module-header bg-dark bg-dark-50 lazyload" data-bg={props.page.bg}>
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-sm-offset-3">
                        <h1 className="module-title font-alt align-center">{props.page.header}</h1>
                        <div className="module-subtitle font-inc align-center">
                            {props.page.text}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function BannerPage() {
    return (
        <BannerTemplate page={page}/>
    );
}

export default BannerPage;
