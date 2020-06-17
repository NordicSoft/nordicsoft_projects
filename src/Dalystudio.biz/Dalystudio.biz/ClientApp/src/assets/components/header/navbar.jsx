"use strict";
import React from 'react'
import { Link } from 'react-router-dom'
import "./header.css"
import classnames from "classnames";
import NavMenuButton from './navMenuButton'

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: -1,
            isOpen: false
        };
        this.handleScroll = this.handleScroll.bind(this);
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    //button toogle
    toggleNavbar() {
        var navbar = document.querySelector('.navbar-nav');
        navbar.classList.toggle("show");
    }

    toggleClass(index, e) {

        this.setState({ activeIndex: index });
    };

    handleScroll() {
        const element = document.querySelector('nav');
        var scroll = window.scrollY || window.pageYOffset;
        this.setState({
            scroll: scroll,
            top: element.offsetTop
        });
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        if (window.location.href.includes('/')) { this.setState({ activeIndex: 0 }); }
        if (window.location.href.includes('/about')) { this.setState({ activeIndex: 1 }); }
        if (window.location.href.includes('/portfolio')) { this.setState({ activeIndex: 2 }); }
        if (window.location.href.includes('/contact')) { this.setState({ activeIndex: 3 }); }
        this.setState({ isOpen: false });
    }

    scrollTo() {
        scroller.scrollTo("scroll-to-element", {
            duration: 1000,
            delay: 0,
            smooth: "easeInOutQuart"
        });
    }

    handleClick(e) {
        e.preventDefault();
        this.setState({ isOpen: !this.state.isOpen });
    }

    //
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="column column-1">
                        <button type="button" className="navbar-toggle" title="navbar-toggle" onClick={this.toggleNavbar} data-toggle="collapse" data-target="#custom-collapse">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="/" title="logo">Daly Studio</a>

                        <div >
                            <ul className="nav navbar-nav navbar-right" id="menu">
                                <li className={this.state.activeIndex == 0 ? 'active' : null} onClick={this.toggleClass.bind(this, 0)}><Link to='/' title='Home'>Home</Link></li>
                                <li className={this.state.activeIndex == 1 ? 'active' : null} onClick={this.toggleClass.bind(this, 1)}><Link to='/about' title='About'>About</Link></li>
                                <li className={classnames("navbar-li dropdown", { 'open': this.state.isOpen == true, 'active': this.state.activeIndex == 2 })} onClick={this.toggleClass.bind(this, 2)} id="droppoint"><Link to='/portfolio' title='Portfolio'>Portfolio</Link>
                                    <a onClick={this.handleClick} href="#"> <span className="arrow"><i className="icon-angle-down"></i></span></a>

                                    <NavMenuButton activeIndex={this.state.activeIndex} toggleClass={this.toggleClass} />
                                </li>
                                <li className={this.state.activeIndex == 3 ? 'active' : null} onClick={this.toggleClass.bind(this, 3)}><Link to='/contact' title='Contact'>Contact</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}