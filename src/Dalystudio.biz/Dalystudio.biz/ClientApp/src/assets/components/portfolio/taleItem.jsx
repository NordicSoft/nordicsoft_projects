"use strict";
import React from 'react'
import "./portfolio.css"
import TaleImg from './taleImg'

export default function TaleItem(props) {

    return (
        <li className="work-item">
            <a href={props.item.linkUrl} className="popup" title={props.item.title}>
                <div className="work-image">
                    <TaleImg pic={props.item} />
                </div>
                <div className="work-caption">
                    <h3 className="work-title font-alt">
                        <span className="icon-magnifying-glass"></span>
                    </h3>
                </div>
            </a>
        </li>
    );
}