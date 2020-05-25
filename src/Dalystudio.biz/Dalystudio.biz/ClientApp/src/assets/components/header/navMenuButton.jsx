"use strict";
import React, { Component } from 'react'
import "./header.css"
import NavMenu from './navMenu'

export default class NavMenuButton extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isOpen: false
        }
    }

    handleClick = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    componentDidMount() {
        document.body.addEventListener('click', this.handleBodyClick);
    }

    componentWillUnmount() {
        document.body.removeEventListener('click', this.handleBodyClick);
    }

    handleBodyClick = () => {
        this.setState({ isOpen: false });
    }

    render() {
        return (
            <div>
                <a onClick={this.handleClick} href="#"> <span className="arrow"><i className="icon-angle-down"></i></span></a>
                <NavMenu isOpen={this.state.isOpen} />
            </div>
        );
    }

}