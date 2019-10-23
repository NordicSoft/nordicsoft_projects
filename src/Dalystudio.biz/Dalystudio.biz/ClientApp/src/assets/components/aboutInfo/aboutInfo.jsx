"use strict";
import React, { Component } from 'react'
import "./aboutInfo.css"
import { Line, Circle } from 'rc-progress';

//class OtherComponent extends React.Component {
//    render() {
//        return (
//            <div>
//                <Progress completed={75} />
//            </div>
//        )
//    }
//}

class ProgressBarExample extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            percentage: 0
        }
       

        this.val = props.value;

        this.nextStep = this.nextStep.bind(this)
    }

    nextStep() {
        return
        this.setState(prevState => ({ percentage: this.val }))
    }

    componentDidMount() {
        window.addEventListener('scroll', this.nextStep);
    }
    componentWillUnmount() {

    }

    render() {
        return (
            <div>
                   <div className="progress-bar-block"> <h5 className="progress-title font-inc">Adobe Lightroom</h5>
                    <ProgressBar percentage={60} /></div>
                <div className="progress-bar-block"> <h5 className="progress-title font-inc">Adobe Photoshop</h5>
                    <ProgressBar percentage={80} /></div>
                <div className="progress-bar-block"> <h5 className="progress-title font-inc">Skylum Luminar</h5>
                    <ProgressBar percentage={50} /></div>
                <div className="progress-bar-block"><h5 className="progress-title font-inc">Gimp</h5>
                    <ProgressBar percentage={90} /></div>                            
            </div>
        )
    }
}

const ProgressBar = (props) => {
    return (
        <div className="progress-bar">
            <Filler percentage={props.percentage} />
            
        </div>
    )
}

const Filler = (props) => {
    return <div className="filler" style={{ width: `${props.percentage}%` }}> <span className="font-inc" >{props.percentage}</span></div>
}


const socials = [
    { id: 1, linkUrl: '#', ariaLabel: 'Facebook', title: 'facebook', spanClass: 'icon-facebook' },
    { id: 2, linkUrl: '#', ariaLabel: 'Twitter', title: 'twitter', spanClass: 'icon-twitter' },
    { id: 3, linkUrl: '#', ariaLabel: 'Google Plus', title: 'google plus', spanClass: 'icon-googleplus' }
];

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
                        <div>
                            <ProgressBarExample />
                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default AboutInfo; 
