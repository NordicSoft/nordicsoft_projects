"use strict";
import React from 'react'
import "./portfolio.css"
import TaleItem from './taleItem'

export default function ListPortfolioTale(props) {
    const taleItems = props.tales;
    const itemsForTale = taleItems.map((item) => {
        return <TaleItem key={item.id} item={item} />;
    });

    return (<ul id="works-grid" className="works-grid works-grid-masonry works-grid-3 works-hover-w">{itemsForTale}</ul>);
}