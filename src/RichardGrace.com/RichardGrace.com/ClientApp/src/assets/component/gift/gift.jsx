"use strict";
import React from 'react'
import Title from '../title/title';
import CarouselGift from '../carousel/carouselGifts';

export default function Gift() {
    return (
        <section id="gifts">
            <div className="section-inner">
                <Title title="Gift Registration" subtitle="Our ideal suggestions." style="dark-hr" />
                <CarouselGift />
            </div>
        </section>
    );
}