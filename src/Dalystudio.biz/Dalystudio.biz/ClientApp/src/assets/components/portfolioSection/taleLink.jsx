"use strict";
import React from 'react'
import "./portfolioSection.css"
import { Link } from 'react-router-dom'
import WorkPicture from './workPicture'

export default function TaleLink(props) {
    const picinfo = props.infoLink;
    return (
        <Link to={props.infoLink.linkUrl} title={props.infoLink.title} >
            <div className="work-image">
                <WorkPicture pict={picinfo} />
            </div>
            <div className="work-caption">
                <h3 className="work-title font-alt">{props.infoLink.head}</h3>
                <div className="work-descr font-inc">
                    {props.infoLink.text}
                </div>
            </div>
        </Link>

    );
}