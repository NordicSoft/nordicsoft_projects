"use strict";
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import "./header.css"
import NavMenuButton from './navMenuButton'

export default class Navbar extends Component {
    constructor(props) {
        super(props)

        this.toggleClass = this.toggleClass.bind(this);
        this.state = {
            activeIndex: 0,
            prevScrollpos: window.pageYOffset,
            visible: true
        }
    }

    toggleClass(index, e) {

        this.setState({ activeIndex: index });
    };

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll = () => {
        const { prevScrollpos } = this.state;

        const currentScrollPos = window.pageYOffset;
        const visible = prevScrollpos > currentScrollPos;

        this.setState({
            prevScrollpos: currentScrollPos,
            visible
        });
    };



    render() {

        //function openMenu() {
        //    var toggleMenu = document.getElementById("mytogglemenu");
        //    if (toggleMenu.classList.contains("menu-visible")) {
        //        toggleMenu.classList.remove("mytogglemenu");
        //    }
        //    else {
        //        toggleMenu.classList.add("mytogglemenu");
        //    }
        //}

        return (

            <ul className="nav navbar-nav navbar-right" id="menu">
                {this.renderSidebarMenuItems}
                <li className={this.state.activeIndex == 0 ? 'active' : null} onClick={this.toggleClass.bind(this, 0)}><Link to='/' title='Home'>Home</Link></li>
                <li className={this.state.activeIndex == 1 ? 'active' : null} onClick={this.toggleClass.bind(this, 1)}><Link to='/about' title='About'>About</Link></li>
                <li className={this.state.activeIndex == 2 ? 'active dropdown' : 'dropdown'} onClick={this.toggleClass.bind(this, 2)} id="desktop"><Link to='/portfolio' title='Portfolio'>Portfolio</Link>
                    <NavMenuButton />
                </li>
                <li className={this.state.activeIndex == 3 ? 'active' : null} onClick={this.toggleClass.bind(this, 3)}><Link to='/contact' title='Contact'>Contact</Link></li>
            </ul>

        )
    }

}