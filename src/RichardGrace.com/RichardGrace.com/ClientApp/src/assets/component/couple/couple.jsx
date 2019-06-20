"use strict";
import React from 'react'
import Title from '../title/title';
function Couple() {
    return (
        <section id="welcome">
            <div className="section-inner">
                <Title title="Richard and Grace" subtitle="Welcome to our beginning." style="dark-hr" />
                <div className="container-small">
                    <div className="row">
                        <div className="column column-1 column-md-2">
                            <picture>
                                <source data-srcset="img/groom.webp" type="image/webp" className="img-responsive lazyload" />
                                <source data-srcset="img/groom.jpg" type="image/jpeg" className="img-responsive lazyload" />
                                <img data-src="img/groom.jpg" alt="Groom" className="img-responsive max-sm-width mb30 lazyload" />
                            </picture>
                            <p className="text-center">My one and only. The most generous, thoughtful, honest, trustworthy, and caring man in the whole world. There aren’t enough words in the dictionary to describe what a wonderful person my future husband is. - Grace</p>
                        </div>
                        <div className="column column-1 column-md-2">
                            <picture>
                                <source data-srcset="img/bride.webp" type="image/webp" className="img-responsive lazyload" />
                                <source data-srcset="img/bride.jpg" type="image/jpeg" className="img-responsive lazyload" />
                                <img data-src="img/bride.jpg" alt="Bride" className="img-responsive max-sm-width mb30 lazyload" />
                            </picture>
                            <p className="text-center">The woman of my dreams. She is my sunshine, my soulmate, and my world. The kindest, prettiest, and sweetest person I ever met. Beautiful, ravishing, stunning! I am the luckiest man in the world to have such a gorgeous bride. – Richard</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default Couple;