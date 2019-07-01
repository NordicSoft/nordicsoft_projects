"use strict";
import React, { Component } from 'react'
import "./footer.css"
const contactsArray = [
    { id: 1, linkUrl: "https://goo.gl/maps/GLRTS6ouuJS2", title: "address", target: "_blank", rel: "noreferrer", icon: "icon-map-pin", content: "Newark, New Jersey, USA" },
    { id: 2, linkUrl: "tel:@Settings.SupportPhone", title: "phone", icon: "icon-phone", content: "+1973-580-4400" },
    { id: 3, linkUrl: "mailto:dalystudio@gmail.com", title: "email", icon: "icon-envelope", content: "dalystudio@gmail.com" }
];

const contentBox = [];

for (var i = 0; i < contactsArray.length; i++) {
    if (contactsArray[i].rel) {
        contentBox.push(
            <div key={`${contactsArray[i].id}`} className="col-sm-4">
                <div className="content-box">
                    <a href={`${contactsArray[i].linkUrl}`} title={`${contactsArray[i].title}`} rel={`${contactsArray[i].rel}`} target={`${contactsArray[i].target}`} >
                        <ContentBoxInner item={contactsArray[i]} />
                    </a>
                </div>
            </div >
        );
    } else {
        contentBox.push(
            <div key={`${contactsArray[i].id}`} className="col-sm-4">
                <div className="content-box">
                    <a href={`${contactsArray[i].link}`} title={`${contactsArray[i].title}`}  >
                        <ContentBoxInner item={contactsArray[i]} />
                    </a>
                </div>
            </div >
        );
    }
}

function ContentBoxInner(props) {
    return (
        <React.Fragment>
            <div className="content-box-icon">
                <span className={`${props.item.icon}`}></span>
            </div >
            <div className="content-box-title font-inc">
                {props.item.content}
            </div>
        </React.Fragment>
    );
}

function MainFooter() {
    return (
        <section className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 text-center">
                        <p className="copyright font-inc m-b-0">2019 <a href="https://nordicsoft.net" rel="noopener noreferrer nofollow" target="_blank">NordicSoft</a>. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}


function Footer() {
    return (
        <React.Fragment>
            <section className="module-small">
                <div className="container">
                    <div className="row">
                        {contentBox}
                    </div>
                </div>
            </section>
            <MainFooter />
        </React.Fragment>

    );
}

export default Footer;
