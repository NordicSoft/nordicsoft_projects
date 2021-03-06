﻿"use strict";
import React, { Component } from 'react'
import "./bannerIndex.css"
const bg = "../img/homepage.jpg"
import LazyHero from 'react-lazy-hero';

export default class BannerIndex extends Component {

    render() {

        return (
            <LazyHero imageSrc={bg} id="home" className=" module-hero bg-dark-30 " minHeight="75vh" color="rgb(0,0,0)" opacity={0.7} parallaxOffset={100} minHeight="75vh" >
                        <div className="hs-title-size-4 font-alt m-b-30">
                            Daly Studio
                    </div>
                        <div className="hs-title-size-1 font-inc">
                            Life has unique moments that deserve to be remembered. I love capturing those moments and transform them into heart touching memories.
                    </div>
            </ LazyHero>
        );
    }
}


