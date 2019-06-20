"use strict";
import React from 'react'
import './_error.scss';
import '../header/_header.scss';


export default function Test() {
    return (
        <section className="firstScreen">
            <div className="intro-text text-center">
                <div className="intro-heading">
                    <span className="secondary-font">OOPS!</span>Page not found
                    </div>
                <a href="/" className="button-error" title="Home">GO HOME</a>
            </div>
        </section>
    );
}