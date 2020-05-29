"use strict";
import React from 'react'
import "./portfolioSection.css"
import WorksGridItem from './worksGridItem'

export default function PortfolioList(props) {

    const portfolioItems = props.portfolioItems;
    const items = portfolioItems.map((item) => {
        return <WorksGridItem key={item.id} item={item} />;
    });
    return (<ul id="works-grid" className="works-grid works-grid-masonry works-grid-3 works-hover-w">{items}</ul>);
}