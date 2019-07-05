"use strict";
import React, { Component } from 'react'
import "./services.css"

const servicesArray = [
    { id: 1, icon: "icon-focus", head: "Photo Editing", text:"If you wish to make up for effects couldn't be created during the shoot or enhance special features that were captured."},
    { id: 2, icon: "icon-map", head: "Worldwide Locations", text: "Wedding in a small Italian town, or maybe a love story in Paris? Being a true traveller, I can be available worldwide." },
    { id: 3, icon: "icon-camera", head: "Indoor & Outdoor Shootings", text: "I offer open air and/or studio shootings. Decor elements and accesories can also be selected among the plenty available." },
    { id: 4, icon: "icon-pictures", head: "Various Print Options", text: "You can have your photos printed at our studio: small photos, big canvases, framed prints, photo cubes, invitations, postal cards, etc." },
    { id: 5, icon: "icon-book-open", head: "Photo Books and Albums", text: "We create beautiful wedding albums and cute kids or family photo books of various designs, sizes, and preferences." },
    { id: 6, icon: "icon-briefcase", head: "Promt Delivery", text: "Since my customers are my top priority, I always meet the expectations of the clients by delivering the work before the deadlines." }
];

const servicesList = [];

for (var i=0; i < servicesArray.length; i++) {
    servicesList.push(<div key={servicesArray[i].id } className="col-sm-6 col-md-4 col-lg-4">
         <div className="content-box">
             <div className="content-box-icon">
                 <span className={servicesArray[i].icon}></span>
             </div>
             <div className="content-box-title font-inc font-uppercase">
                 {servicesArray[i].head}
             </div>
             <div className="content-box-text">
                 {servicesArray[i].text}
             </div>
         </div>
     </div>);
}

function ServicesSection() {
    return (
        <section className="module">

            <div className="container">

                <div className="row">

                    <div className="col-sm-6 col-sm-offset-3">

                        <h2 className="module-title align-center font-alt">Services</h2>

                        <div className="module-subtitle align-center font-inc">
                            I believe a few simple things can make your special event even more memorable. The full catalog can be provided via the email.
                    </div>

                    </div>

                </div>
    
                <div className="row multi-columns-row">

                    {servicesList}
    
            </div>

            </div>

        </section>
    );
}

export default ServicesSection;
