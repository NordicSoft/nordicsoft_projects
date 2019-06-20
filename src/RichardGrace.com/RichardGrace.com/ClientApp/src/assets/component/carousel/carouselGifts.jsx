"use strict";
import React from 'react';
import range from 'lodash/range';
import Carousel from './carousel';

var noOfCards = 3;
const noOfItems = 5;

function changeCountSlide() {
    if (window.innerWidth < 768) {
        noOfCards = 1;
    } else{
        noOfCards = 3;
    }
}
function SlideItemGift(props) {
    return (
        <picture>
            <source data-srcset={`img/logo/logo${props.images}.webp`} type="image/webp" className="img-responsive lazyload" />
            <source data-srcset={`img/logo/logo${props.images}.jpg`} type="image/jpeg" className="img-responsive lazyload" />
            <img data-src={`img/logo/logo${props.images}.jpg`} alt={`Logo ${props.images}`} className="img-responsive lazyload" />
        </picture>
    );
}

const carouselGifts = range(noOfItems).map(index => (
    <SlideItemGift key={index + 1} images={index + 1} />
));

window.addEventListener('resize', changeCountSlide);
changeCountSlide();


export default function CarouselGift() {
    return (
        <Carousel items={carouselGifts} noOfItems={noOfItems} noOfCards={noOfCards} style={'button-gifts'} />
    );
}