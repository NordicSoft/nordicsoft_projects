"use strict";
import React, { Component } from 'react'
import "./header.css"
import { Link } from 'react-router-dom'

export default class NavMenuButton extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isOpen: false
        }
    }

    handleClick = (e) => {
        e.preventDefault();
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
            <ul className="dropdown-menu" role="menu" >
                <li className={this.state.activeIndex == 4 ? 'active' : null}>
                    <Link to='/project1' title='Wedding'>Wedding</Link>
                </li >
                <li className={this.state.activeIndex == 5 ? 'active' : null}>
                    <Link to='/project2' title='Love Story'>Love Story</Link>
                </li >
                <li className={this.state.activeIndex == 6 ? 'active' : null}>
                    <Link to='/project3' title='Fashion'>Fashion</Link>
                </li >
                <li className={this.state.activeIndex == 7 ? 'active' : null}>
                    <Link to='/project4' title='Family'>Family</Link>
                </li >
            </ul>
        );
    }

}

