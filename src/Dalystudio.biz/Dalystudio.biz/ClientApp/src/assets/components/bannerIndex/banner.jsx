"use strict";
import React, { Component } from 'react'
import "./banner.css"
import { Parallax, Background } from 'react-parallax';
const bg = "../img/homepage.jpg"


export default class Banner extends Component {



    render() {

        return (
            <div id="home" className="module-hero module-parallax module-fade module-full-height bg-dark-30 lazyload" data-bg={bg}>

                <div className="hs-caption container">
                    <div className="caption-content">
                        <div className="hs-title-size-4 font-alt m-b-30">
                            Daly Studio
                    </div>
                        <div className="hs-title-size-1 font-inc">
                            Life has unique moments that deserve to be remembered. I love capturing those moments and transform them into heart touching memories.
                    </div>
                    </div>
                </div>

            </div>

        );
    }
}


