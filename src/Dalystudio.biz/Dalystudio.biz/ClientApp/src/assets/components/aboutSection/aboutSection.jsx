"use strict";
import React from 'react'
import SocialList from '../socialList/socialList'

const bg = '../img/about.jpg';

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
                            <SocialList />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>

    );
}

export default AboutSection
