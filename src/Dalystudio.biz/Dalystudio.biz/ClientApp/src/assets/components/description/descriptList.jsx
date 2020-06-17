"use strict";
import React from 'react'

function DescriptItem(props) {

    return (<li className="font-inc"><strong>{props.item.head} </strong>{props.item.text}</li>);
}

export default function DescriptList(props) {
    const descriptItems = props.description;
    const itemsForDescription = descriptItems.map((item) => {
        return <DescriptItem key={item.id} item={item} />;
    });

    return (<ul>{itemsForDescription}</ul>);
}