import React from 'react';

import Header from '../header/header';
import Couple from '../couple/couple';
import Section from '../section/section';
import Gift from '../gift/gift';
import Contact from '../contact/contact';
import Footer from "../footer/footer";
export default function App(){
    return (
        <React.Fragment>
            <Header />
            <Couple />
            <Section />
            <Gift />
            <Contact siteKey={siteKey} />
            <Footer />
        </React.Fragment>
    )
}