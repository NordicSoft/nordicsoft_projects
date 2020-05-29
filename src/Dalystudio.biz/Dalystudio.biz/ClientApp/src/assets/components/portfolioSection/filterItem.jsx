"use strict";
import React from 'react'
import "./portfolioSection.css"

export default function FilterItem(props) {

    const onItemClick = (e) => {
        e.preventDefault();
        props.changeFilter(props.item.dataFilter);
        props.changeActiveFilter(props.item.id)
    }

    return (
        <li><a href="#" onClick={onItemClick} data-filter={props.item.dataFilter} className={props.item.id === props.activeFilter ? 'current' : ''} data-wow-delay={props.item.dataWow} title={props.item.title}>{props.item.innerText}</a></li>
    );
}