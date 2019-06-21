import React, { Component } from 'react'
import { Link, animateScroll as scroller } from "react-scroll";

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleScroll = this.handleScroll.bind(this);
        this.toggleNavbar = this.toggleNavbar.bind(this);
    }

    toggleNavbar() {       
        var navbar = document.querySelector('.navbar-nav');
        navbar.classList.toggle("show");
    }
    handleScroll() {
        this.setState({ scroll: window.scrollY });
    }

    componentDidMount() {
        const el = document.querySelector('nav');
        this.setState({ top: el.offsetTop, height: el.offsetHeight });
        window.addEventListener('scroll', this.handleScroll);
    }

    scrollTo() {
        scroller.scrollTo("scroll-to-element", {
            duration: 1000,
            delay: 0,
            smooth: "easeInOutQuart"
        });
    }
    render() {
        return (
            <nav className={`navbar ${this.state.scroll > this.state.top ? "navbar-fixed-top" : ""}`}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="column column-1">
                            <a className="navbar-brand visible-xs" href="/">Richard & Grace</a>
                            <button type="button" className="navbar-toggle" title="navbar-toggle" onClick={this.toggleNavbar}>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>

                            <div>
                                <ul className="navbar-nav">
                                    <li className="navbar-li"><Link className="navbar-link" to="welcome" spy={true} smooth={true} title="Welcome">Welcome</Link></li>
                                    <li className="navbar-li"><Link className="navbar-link" to="wedding-date" spy={true} smooth={true} title="The day">The day</Link></li>
                                    <li className="navbar-li"><Link className="navbar-brand hidden-xs" to="/" title="Richard & Grace">Richard & Grace</Link></li>
                                    <li className="navbar-li"><Link className="navbar-link" to="gifts" spy={true} smooth={true} title="Gifts">Gifts</Link></li>
                                    <li className="navbar-li"><Link className="navbar-link" to="rsvp" spy={true} smooth={true} title="RSVP">RSVP</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}