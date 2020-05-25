"use strict";
import React from 'react'
import "./socialList.css"

const socials = [
    { id: 1, linkUrl: '#', ariaLabel: 'Facebook', title: 'facebook', spanClass: 'icon-facebook' },
    { id: 2, linkUrl: '#', ariaLabel: 'Twitter', title: 'twitter', spanClass: 'icon-twitter' },
    { id: 3, linkUrl: '#', ariaLabel: 'Google Plus', title: 'google plus', spanClass: 'icon-googleplus' }
];

function SocialItem(props) {
    const social = props;
    return (<li><a href={`${social.item.linkUrl}`} aria-label={`${social.item.ariaLabel}`} title={`${social.item.title}`}><span className={`${social.item.spanClass}`}></span></a></li>);
}

export default function SocialList() {
    const items = socials.map((social) => {
        return <SocialItem key={social.id} item={social} />;
    });
    return (<ul className="social-list">{items}</ul>);
}