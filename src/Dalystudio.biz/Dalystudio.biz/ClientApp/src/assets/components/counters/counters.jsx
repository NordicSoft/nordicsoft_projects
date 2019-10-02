"use strict";

import React, { Component } from 'react';
import CountUp, { startAnimation } from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';

class CounterBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: 0 };
        //this.buttonClicked = this.buttonClicked.bind(this);
        this.eventScroll = this.eventScroll.bind(this);
    }
    componentDidMount() {
        document.getElementById("counters").addEventListener('scroll', function () {
            this.eventScroll.bind(this);
        });
    }

    eventScroll(ev)  {
        this.setState({ value: this.props.val });
    }

    render() {
        return (
            <div className="col-sm-3">
                <div>
                <div>{this.state.value}</div>
                    <button onClick={this.eventScroll.bind(this)}>Click</button>
                    </div>
                </div>
        );
    }
}
                    //<CounterBar val={30}/>
                    //<CounterBar val={90}/>
                    //<CounterBar val={73}/>
                    //<CounterBar val={24}/>
function Counter() {
    const bgAbout = "../img/about.jpg";

    //function isVisible(elem) {

    //    let coords = elem.getBoundingClientRect();
    //    let windowHeight = document.documentElement.clientHeight;
    //    let topVisible = coords.top > 0 && coords.top < windowHeight;
    //    let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

    //    return topVisible || bottomVisible;
    //}

   

    //function showVisible() {
    //    var block = document.getElementById("counters");

    //        if (isVisible(block)) {

    //            var innerBlock = " <CountUp start={0} end={100}> { ({ countUpRef, start }) => ( <div className=\"container\"> <div className=\"row\"> <div className=\"col-sm-3\"><div><span ref={countUpRef} /><button onClick={start} > click </button> </div></div></div></div>)}</CountUp >";


    //            block.innerHTML = innerBlock;
    //        }
        
    //}

    //window.addEventListener('scroll', showVisible);
    //showVisible();


    return (<div className="module-small about-section bg-dark bg-dark-50 lazyload" data-bg={bgAbout} id="counters" >
        <div className="container"><div className="row">
            <div className="col-sm-3">
                <div className="counter-item">
                    <div className="counter-number font-alt">
              <span>  <CountUp start={0} end={100}> </CountUp></span> 
                        <div class="counter-title font-inc">
                            countries visited
                        </div>
            </div> </div>
            </div> 
        </div> </div></div>
    );
}

export default Counter;
