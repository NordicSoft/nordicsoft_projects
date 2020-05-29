"use strict";
import React from 'react'
import "./getInTouch.css"
import GetTouch from './getTouch'
import Contact from '../contact/contact';

export default function GetInTouchIndex(props) {
    return (
        <section className="module-small">
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <GetTouch classF={"module-title text-left font-alt"} classS={"module-subtitle text-left font-inc"} />
                    </div>
                    <div className="col-sm-6">
                        <Contact siteKey={props.siteKey} />
                        <div id="contact-response" className="ajax-response font-alt"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}