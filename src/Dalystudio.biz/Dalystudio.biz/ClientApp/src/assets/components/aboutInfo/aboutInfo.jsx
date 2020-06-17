"use strict";
import React from 'react'
import ProgressBarExample from '../progressBar/progressBarExample'
import SocialList from '../socialList/socialList'

function AboutInfo() {
    
    return(
        <section className="module">
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <h2 className="module-title font-alt">Info</h2>
                        <div className="module-subtitle font-inc">
                            My work is who I really am and, and if it gets more appreciation with time, then I'm becoming a better person.
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <p>To me, photography is a way to show life's most precious things, to expose it at its best.</p>
                        <p>Knowing that just my camera and I can steal magic moments from time and freeze them for good is undoubtedly the greatest gift that life could offer me. My spontaneity of expression and friendly nature allow myself to catch and capture the most natural moments through the lenses. Besides photography, my other great passion is traveling, that is how I opened a new direction to try myself in - destination photography.</p>

                        <SocialList />

                    </div>
                    <div className="col-sm-6">
                        <div>
                            <ProgressBarExample />
                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default AboutInfo; 
