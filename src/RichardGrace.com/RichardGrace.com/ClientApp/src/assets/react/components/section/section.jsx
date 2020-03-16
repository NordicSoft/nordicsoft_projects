import React from 'react'

import Phrase from "../phrase/phrase";
import Toggle from "../toggle/toggle";
import Wishes from "../wishes/wishes";

function Section() {
    return (
        <section className="parallax-custom section-info lazyload" data-bg="/img/bg/bg1.jpg">
            <Phrase />
            <Toggle />
            <Wishes />
        </section>

    );
}
export default Section;