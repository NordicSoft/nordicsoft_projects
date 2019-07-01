"use strict";
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import "./header.css"

const mainListMenu = [
    { id: 11, linkUrl: '/', name: 'Home' },
    { id: 12, linkUrl: '/about', name: 'About' },
    { id: 13, linkUrl: '/portfolio', name: 'Portfolio', down: true},
    { id: 14, linkUrl: '/contact', name: 'Contact' }
];

const dropItems = [
    { id: 21, linkUrl: '/project1', name: 'Wedding' },
    { id: 22, linkUrl: '/project2', name: 'Love Story' },
    { id: 23, linkUrl: '/project3', name: 'Fashion' },
    { id: 24, linkUrl: '/project4', name: 'Family' }
];

const iconMenu = [];

for (var j = 0; j < 3; j++) {
    iconMenu.push(<span key={j} className="icon-bar"></span>);
}


var ourItem;

function InnerListMenu(props) {

    return (<li >
                <Link to={props.item.linkUrl} title={props.item.name}>{props.item.name}</Link>
            </li >);
}


function DropMenu(props) {
    const dropItems = props.dropItems;
    const itemsForMenu = dropItems.map((item) => {
        return <InnerListMenu key={item.id} item={item} />;
    });

    return (<ul className="dropdown-menu" role="menu">{itemsForMenu}</ul>);
}

function MainMenuItem(props) {
    const itemMain = props;
    if (itemMain.item.down) {
        ourItem = (
            <li className="dropdown" id="desktop"> <Link to={itemMain.item.linkUrl} title={itemMain.item.name}>{itemMain.item.name}</Link>
                <div className="dropdown-toggle" data-toggle="dropdown">
                    <span className="arrow"><i className="icon-angle-down"></i></span>
                </div>

                <DropMenu dropItems={dropItems} />
                
            </li>
        );
    } else {
        ourItem = (<li> <Link to={itemMain.item.linkUrl} title={itemMain.item.name}>{itemMain.item.name}</Link> </li>);
    }
    return ourItem;
}

function ListOfMenu(props) {
    const menuMainItems = props.listitems;
    const items = menuMainItems.map((item) => {
        return <MainMenuItem key={item.id} item={item} />;
    });
    return (<ul className="nav navbar-nav navbar-right" id="menu">{items}</ul>);
}


function Header() {
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
                    <ListOfMenu listitems={mainListMenu} />
                 
        </div >

    </div >

</nav >

    );
}

export default Header;
