﻿"use strict";
import React, { useState } from 'react'
import "./portfolioSection.css"
import Filter from './filter'
import PortfolioList from './portfolioList'

const filterArray = [
    { id: 1, dataFilter: '*', title: 'filter all', innerText: 'All' },
    { id: 2, dataFilter: 'wedding', title: 'filter wedding', innerText: 'Wedding' },
    { id: 3, dataFilter: 'lovestory', title: 'filter love story', innerText: 'Love Story' },
    { id: 4, dataFilter: 'fashion', title: 'filter fashion', innerText: 'Fashion' },
    { id: 5, dataFilter: 'family', title: 'filter family', innerText: 'Family' }
];

const portfolioMainArray = [
    { id: 11, filtertext: '* wedding', classNF: 'work-item wedding', linkUrl: '/project1', title: 'Tom & Olivia', head: 'TOM & OLIVIA', text: 'Once in awhile, right in the middle of an ordinary life, love gives us a fairy tale.', dataSrcset: '../img/wedding/cover.webp', dataSrc: '../img/wedding/cover.jpg', alt: 'wedding-1' },
    { id: 12, filtertext: '* family', classNF: 'work-item family', linkUrl: '/project4', title: 'Christmas stories', head: 'CHRISTMAS STORIES', text: 'The best gift around the Christmas tree is the presence of family wrapped in love', dataSrcset: '../img/family/family.webp', dataSrc: '../img/family/family.jpg', alt: 'family' },
    { id: 13, filtertext: '* lovestory', classNF: 'work-item lovestory', linkUrl: '/project2', title: 'Amy & Erick', head: 'AMY & ERICK', text: 'Love is not about how many days, weeks, or months you\'ve been together, it\'s all about how much you love each other every day', dataSrcset: '../img/lovestory/lovestory.webp', dataSrc: '../img/lovestory/lovestory.jpg', alt: 'lovestory-1' },
    { id: 14, filtertext: '* fashion', classNF: 'work-item fashion', linkUrl: '/project3', title: 'Color Beauty', head: 'COLOR BEAUTY', text: 'You can have anything you want in life, if you dress for it', dataSrcset: '../img/fashion/fashion.webp', dataSrc: '../img/fashion/fashion.jpg', alt: 'fashion' },
    { id: 15, filtertext: '* lovestory', classNF: 'work-item lovestory', linkUrl: '/project2', title: 'Amy & Erick', head: 'AMY & ERICK', text: 'Love is not about how many days, weeks, or months you\'ve been together, it\'s all about how much you love each other every day', dataSrcset: '../img/lovestory/3.webp', dataSrc: '../img/lovestory/3.jpg', alt: 'lovestory-2' },
    { id: 16, filtertext: '* wedding', classNF: 'work-item wedding', linkUrl: '/project1', title: 'Tom & Olivia', head: 'TOM & OLIVIA', text: 'Once in awhile, right in the middle of an ordinary life, love gives us a fairy tale.', dataSrcset: '../img/wedding/2.webp', dataSrc: '../img/wedding/2.jpg', alt: 'wedding-2' }
];

function PortfolioSection() {

    const [filterText, setFilter] = useState("*")
    const [activeFilter, setActiveFilter] = useState(1)

    const changeFilter = (newFilter) => {
        setFilter(newFilter);
    }

    const changeActiveFilter = (newId) => {
        setActiveFilter(newId);

    }

    return (
        <React.Fragment>

            <section className="module-small p-t-20 p-b-0 p-t-sm-0">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <Filter filterItems={filterArray} changeFilter={changeFilter} activeFilter={activeFilter} changeActiveFilter={changeActiveFilter} />
                        </div>
                    </div>
                </div>

                <PortfolioList portfolioItems={portfolioMainArray.filter(item => { return item.filtertext.includes(filterText) })} />

            </section>

        </React.Fragment>

    );
}

export default PortfolioSection