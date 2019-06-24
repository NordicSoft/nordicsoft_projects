import React from 'react'
import CarouselWishes from "../carousel/carouselWishes";
import Title from '../title/title';

export default function Wishes() {
    return (
        <section className="section-inner before-opacity color-white section-wishes">
            <Title title="Our Guests’ Wishes" style="light-hr" />
            <div className="container-small">
                <div className="row">
                    <div className="column-1">
                        <CarouselWishes />
                    </div>
                </div>
            </div>
        </section>
    );
}