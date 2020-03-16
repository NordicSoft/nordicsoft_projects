"use strict";
import React from 'react';
import Carousel from './carousel';

const noOfItems = 3;
const noOfCards = 1;

const carouselWishes = [
    <SlideItem key={0} text="“May the years ahead be filled with the lasting joy, happiness, and lots of love! I am so happy for you two, can’t wait to see you saying your vows to each other”" author="Julie, friend" />,
    <SlideItem key={1} text="“I am so happy to see that you have grown into the man I had always wished you would become. It’s a wonderful feeling to see how happy you are and how loved by your lovely wife to be! God bless you both as you start your new and wonderful journey as a family.”" author="Kathrine, groom’s mother" />,
    <SlideItem key={2} text="“Seeing you as a little girl and a grown woman is a heartbreaking sight. You have become a loving, careful, responsible, and generous young woman, and now you are getting married…Congratulations to you both on this happiest occasion, may your life together be bright and happy!”" author="Christian, bride’s father" />
];

function SlideItem(props) {
    return (
        <div className="slide-item">
            <p className="lead">{props.text}</p>
            <p className="lead secondary-font">{props.author}</p>
        </div>
    );
}

export default function CarouselWishes() {
    return (
        <Carousel items={carouselWishes} noOfItems={noOfItems} noOfCards={noOfCards} style={'wishes'} />
    );
}