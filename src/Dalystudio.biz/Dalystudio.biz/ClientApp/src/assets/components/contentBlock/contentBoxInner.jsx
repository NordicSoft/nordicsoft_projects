"use strict";
import React from 'react'
import "./contentBox.css"


export default function ContentBoxInner(props) {
    return (
        <React.Fragment>
            <div className="content-box-icon">
                <span className={`${props.item.icon}`}></span>
            </div >
            <div className="content-box-title font-inc">
                {props.item.content}
            </div>
        </React.Fragment>
    );
}