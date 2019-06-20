"use strict";
import React from 'react'
import './_confirm.scss';

class Confirm extends React.Component {
    render() {
        return (
            <section className="modal-test">
                <div className="modal-inner">
                    <div className="modal-body-test">
                        <div className="modal-content-test">
                            {this.props.message}
                        </div>
                    </div>
                    <div className="modal-footer-test">
                        <button onClick={this.props.closePopup}>Ok</button>
                    </div>
                </div>
            </section>
        );
    }
}
export default Confirm;