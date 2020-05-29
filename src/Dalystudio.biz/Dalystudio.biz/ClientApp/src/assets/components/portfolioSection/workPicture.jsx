"use strict";
import React from 'react'
import "./portfolioSection.css"

export default function WorkPicture(props) {
    return (
        <picture>
            <source type="image/webp" data-srcset={props.pict.dataSrcset} />
            <img data-src={props.pict.dataSrc} alt={props.pict.alt} className="lazyload" />
        </picture>
    );
}