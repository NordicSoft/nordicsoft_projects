"use strict";
import React from 'react'
import ServiceList from './serviceList'
import "./services.css"

function ServicesSection() {
    return (
        <section className="module">
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-sm-offset-3">
                        <h2 className="module-title align-center font-alt">Services</h2>
                        <div className="module-subtitle align-center font-inc">
                            I believe a few simple things can make your special event even more memorable. The full catalog can be provided via the email.
                        </div>
                    </div>
                </div>
                <div className="row multi-columns-row">
                    <ServiceList />
                </div>
            </div>
        </section>
    );
}

export default ServicesSection;
