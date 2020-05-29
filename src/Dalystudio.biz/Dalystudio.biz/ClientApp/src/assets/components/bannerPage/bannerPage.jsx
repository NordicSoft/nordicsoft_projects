"use strict";
import React from 'react'
import BannerTemplate from './bannerTemplate'

const about = { bg: '../img/photographer.jpg', header: 'About', text: ' I don\'t shoot what it looks like.I shoot what it feels like.'};
const portfolio = { bg: '../img/homepage.jpg', header: 'PORTFOLIO', text: 'Photography is a way of feeling, of touching, of loving. I think my works can speak for me.' };
const contact = { bg: '../img/contact.jpg', header: 'Contact', text: 'Every big journey begins with a single step. Contact us and schedule your perfect photo shoot with Daly Studio.' };
const wedding = { bg: '../img/wedding/main.jpg', header: 'TOM & OLIVIA', text: '\'Once in awhile, right in the middle of an ordinary life, love gives us a fairy tale.\'' };
const lovestory = { bg: '../img/lovestory/main.jpg', header: 'AMY & ERICK', text: 'Love is not about how many days, weeks, or months you\'ve been together, it\'s all about how much you love each other every day' };
const fashion = { bg: '../img/fashion/main.jpg', header: 'COLOR BEAUTY', text: '\'You can have anything you want in life, if you dress for it\'' };
const family = { bg: '../img/family/main.jpg', header: 'CHRISTMAS STORIES', text: '\'The best gift around the Christmas tree is the presence of family wrapped in love\'' };

function BannerPage() {
    var page = 0;
    switch (window.location.pathname) {
        case '/about':
            page = about;
            break;
        case '/portfolio':
            page = portfolio;
            break;
        case '/contact':
            page = contact;
            break;
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
        <BannerTemplate page={page}/>
    );
}

export default BannerPage;
