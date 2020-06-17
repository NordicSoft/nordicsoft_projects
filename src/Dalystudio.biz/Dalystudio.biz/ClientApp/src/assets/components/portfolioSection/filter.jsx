"use strict";
import React from 'react'
import "./portfolioSection.css"
import FilterItem from './filterItem'

export default function Filter(props) {
    const filterItems = props.filterItems;
    const items = filterItems.map((item) => {
        return <FilterItem key={item.id} item={item} changeFilter={props.changeFilter} activeFilter={props.activeFilter} changeActiveFilter={props.changeActiveFilter} />;
    });
    return (<ul id="filters" className="filter font-inc">{items}</ul>);
}