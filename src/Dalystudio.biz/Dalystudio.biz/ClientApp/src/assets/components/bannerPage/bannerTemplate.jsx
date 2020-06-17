"use strict";
import React from 'react'

export default function BannerTemplate(props) {
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
