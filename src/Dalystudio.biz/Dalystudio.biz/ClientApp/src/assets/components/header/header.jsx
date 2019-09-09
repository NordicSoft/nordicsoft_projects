"use strict";
import React, { Component } from 'react'
import { BrowserRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import "./header.css"

//import { connect } from 'react-redux'

class Dropdown extends Component {
    constructor(props) {
        super(props)

        this.toggleClass = this.toggleClass.bind(this);
        this.state = {
            activeIndex: 0
        }
    }

    toggleClass(index, e) {

        this.setState({ activeIndex: index });
    };

    render() {
        return (
                    <ul className="dropdown-menu" role="menu">
                        <li className={this.state.activeIndex == 4 ? 'active' : null} onClick={this.toggleClass.bind(this, 4)}>
                            <Link to='/project1' title='Wedding'>Wedding</Link>
                        </li >
                        <li className={this.state.activeIndex == 5 ? 'active' : null} onClick={this.toggleClass.bind(this, 5)}>
                            <Link to='/project2' title='Love Story'>Love Story</Link>
                        </li >
                        <li className={this.state.activeIndex == 6 ? 'active' : null} onClick={this.toggleClass.bind(this, 6)}>
                            <Link to='/project3' title='Fashion'>Fashion</Link>
                        </li >
                        <li className={this.state.activeIndex == 7 ? 'active' : null} onClick={this.toggleClass.bind(this, 7)}>
                            <Link to='/project4' title='Family'>Family</Link>
                        </li >
                    </ul>
        )
    }

}


class Navbar extends Component {
    constructor(props) {
        super(props)

        this.toggleClass = this.toggleClass.bind(this);
        this.state = {
            activeIndex: 0
        }
    }

    toggleClass(index, e) {

        this.setState({ activeIndex: index });
    };

    render() {
        return (
          
                    <ul className="nav navbar-nav navbar-right" id="menu">
                        {this.renderSidebarMenuItems}
                        <li className={this.state.activeIndex == 0 ? 'active' : null} onClick={this.toggleClass.bind(this, 0)}><Link to='/' title='Home'>Home</Link></li>
                        <li className={this.state.activeIndex == 1 ? 'active' : null} onClick={this.toggleClass.bind(this, 1)}><Link to='/about' title='About'>About</Link></li>
                        <li className={this.state.activeIndex == 2 ? 'active dropdown' : 'dropdown'} onClick={this.toggleClass.bind(this, 2)} id="desktop"><Link to='/portfolio' title='Portfolio'>Portfolio</Link>
                            <div className="dropdown-toggle" data-toggle="dropdown">
                   <span className="arrow"><i className="icon-angle-down"></i></span>
               </div>
                    <Dropdown />
                            </li>
                        <li className={this.state.activeIndex == 3 ? 'active' : null} onClick={this.toggleClass.bind(this, 3)}><Link to='/contact' title='Contact'>Contact</Link></li>
                    </ul>
               
        )
    }

}

function Header() {

    const iconMenu = [];

    for (var j = 0; j < 3; j++) {
        iconMenu.push(<span key={j} className="icon-bar"></span>);
    }

    return (
        <nav className="navbar navbar-custom navbar-transparent navbar-fixed-top" role="navigation">

            <div className="container">

                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#custom-collapse">
                        <span className="sr-only">Toggle navigation</span>
                        {iconMenu}  
                    </button>
                    <a className="navbar-brand" href="/" title="logo">Daly Studio</a>
                </div>

                <div className="collapse navbar-collapse" id="custom-collapse">
                    <Navbar  />
                 
        </div >

    </div >

</nav >

    );
}

export default Header;
