"use strict";
import React from 'react';
import './_title.scss';

function Title(props) {
    let subtitle;
    if (props.subtitle) {
        subtitle = <h3 className="secondary-font">{props.subtitle}</h3>;
    } else {
        subtitle = '';
    }
    return (
        <div className="container">
            <div className="row">
                <div className="column column-1 text-center mb-45">
                    <h2 className="section-heading">{props.title}</h2>
                    <hr className={`thin-hr ${props.style}`} />
                    {subtitle}
                </div>
            </div>
        </div>
    );
}

export default Title;