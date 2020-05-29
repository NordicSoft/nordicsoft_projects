"use strict";
import React from 'react'
import "./portfolioSection.css"
import TaleLink from './taleLink'

export default function WorksGridItem(props) {
    return (
        <li className={props.item.classNF}>
            <TaleLink infoLink={props.item} />
        </li>
    );
}