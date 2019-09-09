"use strict";
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import "./portfolio.css"

const wedding = [
    { id: 1, linkUrl:"../img/wedding/cover.jpg", title: "Wedding 1", srcset: "../img/wedding/cover.webp" },
    { id: 2, linkUrl: "../img/wedding/1.jpg", title: "Wedding 2", srcset: "../img/wedding/1.webp"},
    { id: 3, linkUrl: "../img/wedding/5.jpg", title: "Wedding 3", srcset: "../img/wedding/5.webp"},
    { id: 4, linkUrl: "../img/wedding/3.jpg", title: "Wedding 4", srcset: "../img/wedding/3.webp"},
    { id: 5, linkUrl: "../img/wedding/4.jpg", title: "Wedding 5", srcset: "../img/wedding/4.webp"},
    { id: 6, linkUrl: "../img/wedding/2.jpg", title: "Wedding 6", srcset: "../img/wedding/2.webp"}
];
const lovestory = [
    { id: 1, linkUrl: "../img/lovestory/1.jpg", title: "Lovestory 1", srcset: "../img/lovestory/1.webp" },
    { id: 2, linkUrl: "../img/lovestory/3.jpg", title: "Lovestory 2", srcset: "../img/lovestory/3.webp" },
    { id: 3, linkUrl: "../img/lovestory/4.jpg", title: "Lovestory 3", srcset: "../img/lovestory/4.webp" },
    { id: 4, linkUrl: "../img/lovestory/2.jpg", title: "Lovestory 4", srcset: "../img/lovestory/2.webp" },
    { id: 5, linkUrl: "../img/lovestory/5.jpg", title: "Lovestory 5", srcset: "../img/lovestory/5.webp" },
    { id: 6, linkUrl: "../img/lovestory/lovestory.jpg", title: "Lovestory 6", srcset: "../img/lovestory/lovestory.webp"}
];
    
const fashion = [
    { id: 1, linkUrl: "../img/fashion/1.jpg", title: "Fashion 1", srcset: "../img/fashion/1.webp" },
    { id: 2, linkUrl: "../img/fashion/2.jpg", title: "Fashion 2", srcset: "../img/fashion/2.webp" },
    { id: 3, linkUrl: "../img/fashion/3.jpg", title: "Fashion 3", srcset: "../img/fashion/3.webp" },
    { id: 4, linkUrl: "../img/fashion/fashion.jpg", title: "Fashion 4", srcset: "../img/fashion/fashion.webp" },
    { id: 5, linkUrl: "../img/fashion/4.jpg", title: "Fashion 5", srcset: "../img/fashion/4.webp" }
];
const family = [
    { id: 1, linkUrl: "../img/family/1.jpg", title: "Family 1", srcset: "../img/family/1.webp" },
    { id: 2, linkUrl: "../img/family/2.jpg", title: "Family 2", srcset: "../img/family/2.webp" },
    { id: 3, linkUrl: "../img/family/3.jpg", title: "Family 3", srcset: "../img/family/3.webp" },
    { id: 4, linkUrl: "../img/family/family.jpg", title: "Family 4", srcset: "../img/family/family.webp" },
    { id: 5, linkUrl: "../img/family/4.jpg", title: "Family 5", srcset: "../img/family/4.webp" },
    { id: 6, linkUrl: "../img/family/5.jpg", title: "Family 6", srcset: "../img/family/5.webp" }
];



//<picture>
//    <source type="image/webp" data-srcset="../img/wedding/cover.webp">
//    <img data-src="../img/wedding/cover.jpg" alt="Wedding 1" class="lazyload">
//</picture>

function TaleImg(props) {
    return (
        <picture>
            <source type="image/webp" data-srcset={props.pic.srcset} />
            <img data-src={props.pic.linkUrl} alt={props.pic.title} className="lazyload" />
        </picture>
                );
        }

function TaleItem(props) {

    return (
        <li className="work-item">
            <Link to={props.item.linkUrl} className="popup" title={props.item.title}>
                        <div className="work-image">
                            <TaleImg pic={props.item} />
                        </div>
                        <div className="work-caption">
                            <h3 className="work-title font-alt">
                                <span className="icon-magnifying-glass"></span>
                            </h3>
                        </div>
                    </Link>
                </li>
                );
        }

function ListPortfolioTale(props) {
    const taleItems = props.tales;
    const itemsForTale = taleItems.map((item) => {
        return <TaleItem key={item.id} item={item} />;
                    });
               
    return (<ul id="works-grid" className="works-grid works-grid-masonry works-grid-3 works-hover-w">{itemsForTale}</ul>);
                        }
                       
function PortfolioTaleTemplate(props) {
    return (
        <ListPortfolioTale tales={props.page} />
                );
            }

function PortfolioTale() {
    var page;

    switch (window.location.pathname) {
        case '/project1':
            page = wedding;
            break;
        case '/project2':
            page = lovestory;
            break;
        case '/project3':
            page = fashion;
            break;
        case '/project4':
            page = family;
            break;
        default:
            break;
    }
    return (
        <section className="module-small p-t-20 p-b-0 p-t-sm-0">

                    <PortfolioTaleTemplate page={page} />
                </section>
                );
            }
            
export default PortfolioTale;
