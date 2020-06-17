"use strict";
import React from 'react'
import DescriptList from './descriptList'
import "./description.css"

export default function DescriptionTemplate(props) {
    return (
        <section className="module-small">
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <div className="work-details">
                            <h3 className="work-details-title font-alt">DESCRIPTION</h3>
                            <DescriptList description={props.page.items} />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <p>{props.page.p1}</p>
                        <p>{props.page.p2}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}