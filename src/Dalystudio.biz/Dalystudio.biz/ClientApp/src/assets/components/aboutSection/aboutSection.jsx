"use strict";
import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import "./aboutSection.css"
import { Link } from 'react-router-dom'

const bg = '../img/about.jpg';

const socials = [{ id: 1, linkUrl: '#', ariaLabel: 'Facebook', title: 'facebook', spanClass:'icon-facebook' },
    { id: 2, linkUrl: '#', ariaLabel: 'Twitter', title: 'twitter', spanClass:'icon-twitter' },
    { id: 3, linkUrl: '#', ariaLabel: 'Google Plus', title: 'google plus', spanClass: 'icon-googleplus' }];

function SocialItem(props) {
    const social = props;
    return (<li><a href={`${social.item.linkUrl}`} aria-label={`${social.item.ariaLabel}`} title={`${social.item.title}`}><span className={`${social.item.spanClass}`}></span></a></li>);
}

function SocialList(props) {
    const socials = props.socials;
    const items = socials.map((social) => {
        return <SocialItem key={social.id} item={social} />;
    });
    return (<ul className="social-list">{items}</ul>);
}

function AboutSection(){
    return (
        <React.Fragment>
            <div className="module p-t-0 p-b-0 lazyload" data-bg={bg}>
                <div className="container-fluid">
                    <div className="row relative">
                        <div className="col-sm-12 col-md-6 col-md-offset-6 col-bg">
                            <h2 className="module-title font-alt">About</h2>
                            <div className="module-subtitle font-inc">
                                I am Ana Daly, a freelance photographer and a creative photo studio owner. Although I live in New Jersey, I travel all over the US, Canada, and anywhere my customers ask and my Passport allows me to go.
                            </div>
                            <p>I create memories by capturing the most special moments of your events. I am completely mad about everything photography related and truly believe that I am a lucky person, because I have the best job in the world.</p>
                            <p>I always have fun while working and try to make the process enjoyable for my customers as well. This can easily be reflected in my works - spontaneous, relaxed, and real. I love watching happy emotions people express, my job is to freeze those precious moments and make them as warm and beautiful as people remember it in their hearts.</p>
                            <SocialList socials={socials}/>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>

    );
}

export default AboutSection
