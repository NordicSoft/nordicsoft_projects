"use strict";
import "./counters.css"
import React, { Component } from 'react';
import CountUp, { startAnimation } from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';


class Counter extends Component {
    state = {
        didViewCountUp: false
    };


    onVisibilityChange = isVisible => {
        if (isVisible) {
            this.setState({ didViewCountUp: true });
        }
    }

    render() {
        const bgAbout = "../img/about.jpg";
        return (<div className="module-small about-section bg-dark bg-dark-50 lazyload" data-bg={bgAbout} id="counters" >
            <div className="container"><div className="row">
                <div className="col-sm-3">
                    <div className="counter-item">
                        <div className="counter-number font-alt">
                            <VisibilitySensor onChange={this.onVisibilityChange} offset={{
                                top:
                                    10
                            }} delayedCall>
                                <CountUp start={0} end={this.state.didViewCountUp ? 49 : 0} />
                            </VisibilitySensor>
                            <div className="counter-title font-inc">
                                countries visited
                        </div>
                        </div> </div>
                </div>
                <div className="col-sm-3">
                    <div className="counter-item">
                        <div className="counter-number font-alt">
                            <VisibilitySensor onChange={this.onVisibilityChange} offset={{
                                top:
                                    10
                            }} delayedCall>
                                <CountUp start={0} end={this.state.didViewCountUp ? 1356 : 0} />
                            </VisibilitySensor>
                            <div className="counter-title font-inc">
                                total customers
                        </div>
                        </div> </div>
                </div>
                <div className="col-sm-3">
                    <div className="counter-item">
                        <div className="counter-number font-alt">
                            <VisibilitySensor onChange={this.onVisibilityChange} offset={{
                                top:
                                    10
                            }} delayedCall>
                                <CountUp start={0} end={this.state.didViewCountUp ? 71 : 0} />
                            </VisibilitySensor><span>K</span>
                            <div className="counter-title font-inc">
                                photos made
                        </div>
                        </div> </div>
                </div>
                <div className="col-sm-3">
                    <div className="counter-item">
                        <div className="counter-number font-alt">
                            <VisibilitySensor onChange={this.onVisibilityChange} offset={{
                                top:
                                    10
                            }} delayedCall>
                                <CountUp start={0} end={this.state.didViewCountUp ? 788 : 0} />
                            </VisibilitySensor>
                            <div className="counter-title font-inc">
                                albums created
                        </div>
                        </div> </div>
                </div>
            </div> </div></div>
        );
    }
}

export default Counter;
