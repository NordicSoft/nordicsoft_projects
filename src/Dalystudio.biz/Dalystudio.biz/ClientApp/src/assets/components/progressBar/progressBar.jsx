"use strict";
import React from 'react'
import "./progressBar.css"

export default function ProgressBar (props){
    return (
        <div className="progress-bar">
            <Filler percentage={props.percentage} />

        </div>
    )
}

const Filler = (props) => {
    return <div className="filler" style={{ width: `${props.percentage}%` }}> <span className="font-inc" >{props.percentage}</span></div>
}