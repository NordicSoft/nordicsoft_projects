"use strict";
import React, { Component } from 'react'
import { BrowserRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import "./header.css"
import classnames from "classnames";
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
                    <ul className="dropdown-menu" role="menu" id="mytogglemenu">
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
class NavMenu extends Component{
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false
        };
    }

    render() {
        if (this.props.isOpen === true) {
            return (
                <div className="dropdown">
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
                </div>
            );
        }
        return null;
    }
}
class NavMenuButton extends Component{

    constructor(props) {
        super(props)
        this.state = {
            isOpen: false
        }
    }

    handleClick = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    componentDidMount () {
        document.body.addEventListener('click', this.handleBodyClick);
    }

    componentWillUnmount () {
        document.body.removeEventListener('click', this.handleBodyClick);
    }

    handleBodyClick = () =>  {
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
class Navbar extends Component {
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

        function openMenu() {
            var toggleMenu = document.getElementById("mytogglemenu");
            if (toggleMenu.classList.contains("menu-visible"))
            {
                toggleMenu.classList.remove("mytogglemenu");
            }
            else {
                toggleMenu.classList.add("mytogglemenu");
            }
        }

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
                    //<div className="dropdown-toggle" data-toggle="dropdown" onClick={openMenu}>
                    //           v
                    //        </div>
                    //        <Dropdown />
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

                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#custom-collapse">
                            <span className="sr-only">Toggle navigation</span>
                            {iconMenu}
                        </button>
                        <a className="navbar-brand" href="/" title="logo">Daly Studio</a>
                    </div>

                    <div className="collapse navbar-collapse" id="custom-collapse">
                        <Navbar />

                    </div >

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
