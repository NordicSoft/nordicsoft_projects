"use strict";
import React, { Component } from 'react'
import "./progressBar.css"
import ProgressBar from './progressBar.jsx'

export default class ProgressBarExample extends Component {
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