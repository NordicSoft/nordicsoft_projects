"use strict";
import React from 'react'
import "./portfolio.css"


export default function TaleImg(props) {
    return (
        <picture>
            <source type="image/webp" data-srcset={props.pic.srcset} />
            <img data-src={props.pic.linkUrl} alt={props.pic.title} className="lazyload" />
        </picture>
    );
}