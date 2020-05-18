//import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
//import { MagnificPopup, LightBoxGallery, GalleryItem } from 'react-magnific-popup';



//class PortfolioTale extends Component{
//    config = {
//        delegate: 'a',
//        type: 'image',
//        tLoading: 'Loading image #%curr%...',
//        mainClass: 'mfp-img-mobile',
//        gallery: {
//            enabled: true,
//            navigateByImgClick: true,
//            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
//        },
//        image: {
//            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
//            titleSrc: function (item) {
//                return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
//            }
//        }
//    }

//    render(){
//        return (
//            <LightBoxGallery
//                className="popup-gallery"
//                config={config}
//            >
//                <GalleryItem
//                    href="http://farm9.staticflickr.com/8242/8558295633_f34a55c1c6_b.jpg"
//                    title="The Cleaner"
//                >
//                    <img src="http://farm9.staticflickr.com/8242/8558295633_f34a55c1c6_s.jpg" width="75" height="75" />
//                </GalleryItem>
//                <GalleryItem
//                    href="http://farm9.staticflickr.com/8382/8558295631_0f56c1284f_b.jpg"
//                    title="The Cleaner"
//                >
//                    <img src="http://farm9.staticflickr.com/8382/8558295631_0f56c1284f_s.jpg" width="75" height="75" />
//                </GalleryItem>
//                <GalleryItem
//                    href="http://farm9.staticflickr.com/8225/8558295635_b1c5ce2794_b.jpg"
//                    title="The Uninvited Guest"
//                >
//                    <img src="http://farm9.staticflickr.com/8225/8558295635_b1c5ce2794_s.jpg" width="75" height="75" />
//                </GalleryItem>
//                <GalleryItem
//                    href="http://farm9.staticflickr.com/8383/8563475581_df05e9906d_b.jpg"
//                    title="Oh no, not again!"
//                >
//                    <img src="http://farm9.staticflickr.com/8383/8563475581_df05e9906d_s.jpg" width="75" height="75" />
//                </GalleryItem>
//                <GalleryItem
//                    href="http://farm9.staticflickr.com/8235/8559402846_8b7f82e05d_b.jpg"
//                    title="Swan Lake"
//                >
//                    <img src="http://farm9.staticflickr.com/8235/8559402846_8b7f82e05d_s.jpg" width="75" height="75" />
//                </GalleryItem>
//                <GalleryItem
//                    href="http://farm9.staticflickr.com/8235/8558295467_e89e95e05a_b.jpg"
//                    title="The Shake"
//                >
//                    <img src="http://farm9.staticflickr.com/8235/8558295467_e89e95e05a_s.jpg" width="75" height="75" />
//                </GalleryItem>
//                <GalleryItem
//                    href="http://farm9.staticflickr.com/8378/8559402848_9fcd90d20b_b.jpg"
//                    title="Who's that, mommy?"
//                >
//                    <img src="http://farm9.staticflickr.com/8235/8558295467_e89e95e05a_s.jpg" width="75" height="75" />
//                </GalleryItem>
//            </LightBoxGallery>
//        );
//    }
//}

//export default PortfolioTale;


"use strict";
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import "./portfolio.css"

const wedding = [
    { id: 1, linkUrl: "../img/wedding/cover.jpg", title: "Wedding 1", srcset: "../img/wedding/cover.webp" },
    { id: 2, linkUrl: "../img/wedding/1.jpg", title: "Wedding 2", srcset: "../img/wedding/1.webp" },
    { id: 3, linkUrl: "../img/wedding/5.jpg", title: "Wedding 3", srcset: "../img/wedding/5.webp" },
    { id: 4, linkUrl: "../img/wedding/3.jpg", title: "Wedding 4", srcset: "../img/wedding/3.webp" },
    { id: 5, linkUrl: "../img/wedding/4.jpg", title: "Wedding 5", srcset: "../img/wedding/4.webp" },
    { id: 6, linkUrl: "../img/wedding/2.jpg", title: "Wedding 6", srcset: "../img/wedding/2.webp" }
];
const lovestory = [
    { id: 1, linkUrl: "../img/lovestory/1.jpg", title: "Lovestory 1", srcset: "../img/lovestory/1.webp" },
    { id: 2, linkUrl: "../img/lovestory/3.jpg", title: "Lovestory 2", srcset: "../img/lovestory/3.webp" },
    { id: 3, linkUrl: "../img/lovestory/4.jpg", title: "Lovestory 3", srcset: "../img/lovestory/4.webp" },
    { id: 4, linkUrl: "../img/lovestory/2.jpg", title: "Lovestory 4", srcset: "../img/lovestory/2.webp" },
    { id: 5, linkUrl: "../img/lovestory/5.jpg", title: "Lovestory 5", srcset: "../img/lovestory/5.webp" },
    { id: 6, linkUrl: "../img/lovestory/lovestory.jpg", title: "Lovestory 6", srcset: "../img/lovestory/lovestory.webp" }
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


function TaleImg(props) {
    return (
        <picture>
            <source type="image/webp" data-srcset={props.pic.srcset} />
            <img data-src={props.pic.linkUrl} alt={props.pic.title} className="lazyload" />
        </picture>
    );
}

function TaleItem(props) {
    //document.getElementsByClassName('.popup').magnificPopup({
    //    type: 'image',
    //    gallery: {
    //        enabled: true,
    //        navigateByImgClick: true,
    //        preload: [0, 1]
    //    },
    //    image: {
    //        titleSrc: 'title',
    //        tError: 'The image could not be loaded.',
    //    }
    //});

    return (
        <li className="work-item">
            <a href={props.item.linkUrl} className="popup" title={props.item.title}>
                <div className="work-image">
                    <TaleImg pic={props.item} />
                </div>
                <div className="work-caption">
                    <h3 className="work-title font-alt">
                        <span className="icon-magnifying-glass"></span>
                    </h3>
                </div>
            </a>
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