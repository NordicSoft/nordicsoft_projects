"use strict";
import React, { Component } from 'react'
import "./portfolioSection.css"
import { Link } from 'react-router-dom'

const filterArray = [
    { id: 1, dataFilter: '*', classN: 'current fadeInUp', dataWow: '', title: 'filter all', innerText: 'All' },
    { id: 2, dataFilter: '.wedding', classN: 'fadeInUp', dataWow: '0.2s', title: 'filter wedding', innerText: 'Wedding' },
    { id: 3, dataFilter: '.lovestory', classN: 'fadeInUp', dataWow: '0.4s', title: 'filter love story', innerText: 'Love Story' },
    { id: 4, dataFilter: '.fashion', classN: 'fadeInUp', dataWow: '0.6s', title: 'filter fashion', innerText: 'Fashion' },
    { id: 5, dataFilter: '.family', classN: 'fadeInUp', dataWow: '0.8s', title: 'filter family', innerText: 'Family' }
];

const portfolioMainArray = [
    { id: 11, classNF: 'work-item wedding', linkUrl: '/project1', title: 'Tom & Olivia', head: 'TOM & OLIVIA', text: 'Once in awhile, right in the middle of an ordinary life, love gives us a fairy tale.', dataSrcset: '../img/wedding/cover.webp', dataSrc: '../img/wedding/cover.jpg', alt: 'wedding-1' },
    { id: 12, classNF: 'work-item family', linkUrl: '/project4', title: 'Christmas stories', head: 'CHRISTMAS STORIES', text: 'The best gift around the Christmas tree is the presence of family wrapped in love', dataSrcset: '../img/family/family.webp', dataSrc: '../img/family/family.jpg', alt: 'family' },
    { id: 13, classNF: 'work-item lovestory', linkUrl: '/project2', title: 'Amy & Erick', head: 'AMY & ERICK', text: 'Love is not about how many days, weeks, or months you\'ve been together, it\'s all about how much you love each other every day', dataSrcset: '../img/lovestory/lovestory.webp', dataSrc: '../img/lovestory/lovestory.jpg', alt: 'lovestory-1' },
    { id: 14, classNF: 'work-item fashion', linkUrl: '/project3', title: 'Color Beauty', head: 'COLOR BEAUTY', text: 'You can have anything you want in life, if you dress for it', dataSrcset: '../img/fashion/fashion.webp', dataSrc: '../img/fashion/fashion.jpg', alt: 'fashion' },
    { id: 15, classNF: 'work-item lovestory', linkUrl: '/project2', title: 'Amy & Erick', head: 'AMY & ERICK', text: 'Love is not about how many days, weeks, or months you\'ve been together, it\'s all about how much you love each other every day', dataSrcset: '../img/lovestory/3.webp', dataSrc: '../img/lovestory/3.jpg', alt: 'lovestory-2' },
    { id: 16, classNF: 'work-item wedding', linkUrl: '/project1', title: 'Tom & Olivia', head: 'TOM & OLIVIA', text: 'Once in awhile, right in the middle of an ordinary life, love gives us a fairy tale.', dataSrcset: '../img/wedding/2.webp', dataSrc: '../img/wedding/2.jpg', alt: 'wedding-2' }
];

function WorkPicture(props) {
    return (
        <picture>
            <source type="image/webp" data-srcset={props.pict.dataSrcset} />
            <img data-src={props.pict.dataSrc} alt={props.pict.alt} className="lazyload" />
        </picture>
            );
        }

function TaleLink(props) {
    const picinfo = props.infoLink;
                    return (
                        <Link to={props.infoLink.linkUrl} title={props.infoLink.title} >
                <div className="work-image">
                    <WorkPicture pict={picinfo} />
                </div>
                <div className="work-caption">
                                <h3 className="work-title font-alt">{props.infoLink.head}</h3>
                    <div className="work-descr font-inc">
                                    {props.infoLink.text}
                    </div>
                </div>
            </Link>

            );
    }


function WorksGridItem(props) {
    return (
        <li className={props.item.classNF}>
                <TaleLink infoLink={props.item} />
            </li>
            );
    }



function PortfolioList(props) {
    const portfolioItems = props.portfolioItems;
    const items = portfolioItems.map((item) => {
        return <WorksGridItem key={item.id} item={item} />;
            });
    return (<ul id="works-grid" className="works-grid works-grid-masonry works-grid-3 works-hover-w">{items}</ul>);
                }
               
function FilterItem(props) {
    return (
        <li><a href="#" data-filter={props.item.dataFilter} className={props.item.classN} data-wow-delay={props.item.dataWow} title={props.item.title}>{props.item.innerText}</a></li>
            );
    }

function Filter(props) {
    const filterItems = props.filterItems;
    const items = filterItems.map((item) => {
        return <FilterItem key={item.id} item={item} />;
            });
    return (<ul id="filters" className="filter font-inc">{items}</ul>);
                }
               
               
               
               
function PortfolioSection() {
    return (
        <React.Fragment>

                <section className="module-small p-t-20 p-b-0 p-t-sm-0">

                    <div className="container">

                        <div className="row">
                            <div className="col-sm-12">

                                <Filter filterItems={filterArray} />

                            </div>
                        </div>

                    </div>

                    <PortfolioList portfolioItems={portfolioMainArray} />

                </section>

            </React.Fragment>

            );
        }
        
export default PortfolioSection