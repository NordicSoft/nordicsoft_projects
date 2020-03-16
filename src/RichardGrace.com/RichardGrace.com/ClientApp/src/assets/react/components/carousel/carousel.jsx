import React from 'react';
import styled from 'styled-components';
import ItemsCarousel from './ItemsCarousel';

const autoPlayDelay = 8000;
const chevronWidth = 45;

const Wrapper = styled.div`
  padding: 0 ${chevronWidth}px;
  max-width: 1000px;
  margin: 0 auto;
`;

export default class Carousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItemIndex: 0
        };
    }

    componentDidMount() {
        this.interval = setInterval(this.tick, autoPlayDelay);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    tick = () => this.setState(
        prevState => ({
            activeItemIndex: (prevState.activeItemIndex + 1) % (this.props.noOfItems - this.props.noOfCards + 1)
    }));

    onChange = value => this.setState({ activeItemIndex: value });

    render() {
        return (
            <Wrapper className="wrapper-carousel">
                <ItemsCarousel
                    gutter={12}
                    numberOfCards={this.props.noOfCards}
                    activeItemIndex={this.state.activeItemIndex}
                    requestToChangeActive={this.onChange}
                    rightChevron={<button className={`button-carousel button-${this.props.style} next`} aria-label={`${this.props.style}`}></button>}
                    leftChevron={<button className={`button-carousel button-${this.props.style} previous`} aria-label={`${this.props.style}`}></button>}
                    styleChevron={this.props.style}
                    chevronWidth={chevronWidth}
                    outsideChevron
                    activePosition={'center'}
                    outsideChevron={true}
                    children={this.props.items}
                />
            </Wrapper>
        );
    }
}