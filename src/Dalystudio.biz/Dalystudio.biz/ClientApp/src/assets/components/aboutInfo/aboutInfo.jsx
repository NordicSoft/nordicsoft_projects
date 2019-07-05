"use strict";
import React, { Component } from 'react'
import "./aboutInfo.css"

const socials = [
    { id: 1, linkUrl: '#', ariaLabel: 'Facebook', title: 'facebook', spanClass: 'icon-facebook' },
    { id: 2, linkUrl: '#', ariaLabel: 'Twitter', title: 'twitter', spanClass: 'icon-twitter' },
    { id: 3, linkUrl: '#', ariaLabel: 'Google Plus', title: 'google plus', spanClass: 'icon-googleplus' }
];

const progressBar = [
    { id: 11, head: 'Adobe Lightroom', value: '60' },
    { id: 12, head: 'Adobe Photoshop', value: '80' },
    { id: 13, head: 'Skylum Luminar', value: '50' },
    { id: 14, head: 'Gimp', value: '90' }
];

const progresses = [];

for (var t = 0; t < progressBar.length; t++) {
    progresses.push(
        <div key={progressBar[t].id}> <h5 className="progress-title font-inc">{progressBar[t].head}</h5>
            <div className="progress">
                <div className="progress-bar pb-dark" aria-valuenow={progressBar[t].value} role="progressbar" aria-valuemin="0" aria-valuemax="100">
                    <span className="font-inc"></span>
                </div>
            </div>
        </div>
    );
}

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

function AboutInfo() {
    return(
        <section className="module">
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <h2 className="module-title font-alt">Info</h2>
                        <div className="module-subtitle font-inc">
                            My work is who I really am and, and if it gets more appreciation with time, then I'm becoming a better person.
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <p>To me, photography is a way to show life's most precious things, to expose it at its best.</p>
                        <p>Knowing that just my camera and I can steal magic moments from time and freeze them for good is undoubtedly the greatest gift that life could offer me. My spontaneity of expression and friendly nature allow myself to catch and capture the most natural moments through the lenses. Besides photography, my other great passion is traveling, that is how I opened a new direction to try myself in - destination photography.</p>

                        <SocialList socials={socials} />

                    </div>
                    <div className="col-sm-6">

                        {progresses}

                    </div>

                </div>

            </div>

        </section>
    );
}

export default AboutInfo; 
