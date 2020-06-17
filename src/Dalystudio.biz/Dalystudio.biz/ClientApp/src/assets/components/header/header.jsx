"use strict";
import React, { Component } from 'react'
import "./header.css"
import classnames from "classnames";
import Navbar from './navbar'

class MainPartHeader extends Component {
    constructor(props) {
        super(props)

        this.state = {
            visible: true
        }
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll = () => {
        const menuPoint = 50;
        const currentScrollPos = window.pageYOffset;
        const visible = menuPoint > currentScrollPos;

        this.setState({
            prevScrollpos: currentScrollPos,
            visible
        });
    };

    render() {
        const iconMenu = [];

        for (var j = 0; j < 3; j++) {
            iconMenu.push(<span key={j} className="icon-bar"></span>);
        }

        return (
            <nav className={classnames("navbar navbar-custom  navbar-fixed-top", { "navbar-transparent": this.state.visible })} role="navigation">
                <div className="container">

                    <Navbar />

                </div >
            </nav >
        )
    }

}

function Header() {
    return (
        <MainPartHeader />
    );
}

export default Header;
