"use strict";
import React from 'react'
import "./getInTouch.css"
import GetTouch from './getTouch'
import Contact from '../contact/contact';

export default function GetInTouchContact(props) {
    return (
        <section className="module">
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-sm-offset-3">
                        <GetTouch classF={"module-title align-center font-alt"} classS={"module-subtitle align-center font-inc"} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6 col-sm-offset-3">
                        <Contact siteKey={props.siteKey} />
                        <div id="contact-response" className="ajax-response font-alt"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}