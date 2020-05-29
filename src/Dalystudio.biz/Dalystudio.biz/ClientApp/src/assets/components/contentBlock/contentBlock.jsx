"use strict";
import React from 'react'
import "./contentBox.css"
import ContentBoxInner from './contentBoxInner'

const contactsArray = [
    { id: 1, linkUrl: "https://goo.gl/maps/GLRTS6ouuJS2", title: "address", target: "_blank", rel: "noreferrer", icon: "icon-map-pin", content: "Newark, New Jersey, USA" },
    { id: 2, linkUrl: "tel:@Settings.SupportPhone", title: "phone", icon: "icon-phone", content: "+1973-580-4400" },
    { id: 3, linkUrl: "mailto:dalystudio@gmail.com", title: "email", icon: "icon-envelope", content: "dalystudio@gmail.com" }
];

export default function ContentBlock() {
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

    return (contentBox);
}