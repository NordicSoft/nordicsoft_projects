import React from 'react'

class Confirm extends React.Component {
    render() {
        return (
            <section className="modal">
                <div className="modal-inner">
                    <div className="modal-body">
                        <div className="modal-content">
                            {this.props.message}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button onClick={this.props.closePopup}>Ok</button>
                    </div>
                </div>
            </section>
        );
    }
}
export default Confirm;