import React from 'react'

function Date() {
    return (
        <div className="toggle-inner">
            <p>The Ceremony Sunday, January 11th, 2020 4.00 - 5.00 pm.</p>
            <p>The Reception Sunday, January 11th, 2020 5.00 - 10.00 pm.</p>
        </div>
    );
};

function Place() {
    return (
        <div className="toggle-inner">
            <p>Both the ceremony and the reception will take place in Hollins House Weddings and Events, Santa Cruz County, California. <span className="toggle-spacing"></span>This venue is fantastic, we hope you will love it too. Address: Hollins House Weddings and Events 20 Clubhouse Rd, Santa Cruz, CA 95060. </p>
        </div>
    );
};

function Section(props) {
    const isToggleOn = props.isToggleOn;
    if (isToggleOn) {
        return <Date />;
    }
    return <Place />;
}

class Toggle extends React.Component {
    render() {
        return (
            <div>
                <Section />
                <ToggleButton />
            </div>
        );
    }
}

export default class ToggleButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isToggleOn: true, className: '' };
        this.handleTrueClick = this.handleTrueClick.bind(this);
        this.handleFalseClick = this.handleFalseClick.bind(this);
        this.toggleClassName = this.toggleClassName.bind(this);
    }
    toggleClassName(event) {
        var toggleButton = document.getElementsByClassName("toggle-button");
        for (var i = 0; i < toggleButton.length; i++) {
            toggleButton[i].className = toggleButton[i].className.replace(" active", "");
        }
        event.target.className += " active";
    }
    handleTrueClick(e) {
        this.setState({
            isToggleOn: true
        });
        this.toggleClassName(e);
    }
    handleFalseClick(e) {
        this.setState({
            isToggleOn: false
        });
        this.toggleClassName(e);
    }
    
    render() {
        const isToggleOn = this.state.isToggleOn;
        const isActiveClass = this.state.className;

        return (
            <div id="wedding-date" className="section-inner section-white">
                <div className="container text-center">
                    <div className="row">
                        <div className="column column-1">
                            <div className="group-button" name="group-button">
                                <button className={`toggle-button active ${isActiveClass}`} onClick={(e) => this.handleTrueClick(e)}>The Date</button>
                                <button className={`toggle-button ${isActiveClass}`} onClick={(e) => this.handleFalseClick(e)}>The Place</button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="column column-1">
                            <Section isToggleOn={isToggleOn} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}