"use strict";
import React from 'react'
import "./getInTouch.css"

export default function GetTouch(props) {
    return (
        <React.Fragment>
            <h2 className={props.classF}>Get in touch</h2>
            <div className={props.classS}>
                I look forward to hearing from you and hope to be a part of your story. If you would like to enquire about my work or availability, please contact by filling out the blocks and I will reply you as soon as possible.
            </div>
        </ React.Fragment>
    );
}
