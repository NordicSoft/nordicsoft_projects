"use strict";
import React, { Component } from 'react'
import "./description.css"

const wedding = { p1: 'Tom and Olivia magic Florida wedding at the seaside. They are are so young, romantic, and bond each other, I think beach wedding was the best choice for them. There was so much love and tenderness during the whole day...it was a great pleasure to be their wedding photographer.', p2: 'The main part of the day was to be at Johnsons\' family home, and that’s where I started with some bridal prep photography.Then, ceremony photos at the church, and the rest of the day we spent at the beach where the reception took place.It was an incredible day, weather-wise, and the sun gods surely looked down on Tom and Olivia.Tom and Olivia\'s package included 6 hours photography, 70 photos photo editing, a wedding photo book.', items: [{ id: 1, head: 'Customer: ', text: 'Tom and Olivia Johnson' }, { id: 2, head: 'Date: ', text: '14.08.2017' }, { id: 3, head: 'Price: ', text: '$2880' }]};
const lovestory = { p1: 'May ended well with a trip away to photograph Amy and Erick\'s ocean story in North Carolina.There is always something special about Love Story photography, to have the ability to capture those love vibes through the lens is one of the best things I could ever experience as a photographer.', p2: 'Amy and Erick are very fun and comfortable people to be around with. I was just glad and childishly excited to hung out with them the whole day.To try and explain the emotion of that day with words would be futile...I hope my photos do a better job. The package included: 5 hour photo shoot, transfer, and editing of 50 photos.', items: [{ id: 1, head: 'Customer: ', text: 'Amy Catcher and Erick Luminovsky' }, { id: 2, head: 'Date: ', text: '31.03.2016' }, { id: 3, head: 'Price: ', text: '$1860' }] };
const fashion = { p1: 'Christine L. Smith is a young fashion designer and I was honored to take photos of her new designs for her personal portfolio. When I saw designs for the first time, I was impressed by the color combination! I couldn\'t even imagine that with only two colors one can create such a stunning stylish looks.', p2: 'The shoot took place at the customer\'s location - Christine\'s studio. Package included 4 hour photoshoot using special equipment: beauty dishes, giant umbrellas, octabanks, strip soft boxes, snoots for creating different interesting mods, and fashion retouching of 100 photos.', items: [{ id: 1, head: 'Customer: ', text: 'Christine L. Smith' }, { id: 2, head: 'Date: ', text: '24.04.2017' }, { id: 3, head: 'Price: ', text: '$940' }] };
const family = {p1: 'It was a very MERRY session! We all love the tradition of taking pictures during Christmas to send out on cards. Petersons is one of those families, who do it every year! So cute and adorable...my heart melted every time I clicked my camera. It was indeed a Christmas magic! ', p2: 'The shoot took place at the studio and included 2 hours photography, editing of 42 photos, and 30 printed photo cards. We started with some Christmas tree decorating and present opening photos, then I took some pics of kids playing under the Christmas tree. And, of course, warm and cozy photos of the whole family hugging, playing, and interacting with each other. Isn\'t it a perfect Christmas story ?', items: [{ id: 1, head: 'Customer: ', text: 'Peterson Family' }, { id: 2, head: 'Date: ', text: '11.12.2018' }, { id: 3, head: 'Price: ', text: '$640' }] };

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

function DescriptItem(props) {

    return (<li className="font-inc"><strong>{props.item.head} </strong>{props.item.text}</li>);
}

function DescriptList(props) {
    const descriptItems = props.description;
    const itemsForDescription = descriptItems.map((item) => {
        return <DescriptItem key={item.id} item={item} />;
    });

    return (<ul>{itemsForDescription}</ul>);
}

function DescriptionTemplate(props) {
    return (
        <section className="module-small">
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <div className="work-details">
                            <h3 className="work-details-title font-alt">DESCRIPTION</h3>
                            <DescriptList description={props.page.items}/>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <p>{props.page.p1}</p>
                        <p>{props.page.p2}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Description() {
    return (
        <DescriptionTemplate page={page}/>
    );
}

export default Description;
