"use strict";
import React, { Component } from 'react'
import "./counters.css"

const bgAbout = "../img/about.jpg";

const counterArray = [
    { id: 1, number: "49", name:"countries visited"},
    { id: 2, number: "1356", name:"total customers"},
    { id: 3, number: "71", name:"photos made"},
    { id: 4, number: "788", name:"albums created"}
];

const counters = [];

for (var i = 0; i < counterArray.length; i++) {
    counters.push(<div key={counterArray[i].id} className="col-sm-3 m-b-md-20">
        <div className="counter-item">
            <div className="counter-number font-alt" data-number={counterArray[i].number}>
                                  <span>0</span>
                              </div>
            <div className="counter-title font-inc">
                {counterArray[i].name}
                              </div>
                          </div>
                      </div>);
}

function Counter() {
    return (
        <div className="module-small about-section bg-dark bg-dark-50 lazyload" data-bg={bgAbout}>

            <div className="container">

                <div className="row">

                    {counters}
               
                </div>

            </div>

        </div>
    );
}

export default Counter;
