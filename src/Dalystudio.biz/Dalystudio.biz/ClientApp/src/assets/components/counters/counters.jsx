"use strict";
import React, { Component } from 'react'
import "./counters.css"

import CountTo from 'react-count-to';
import CountUp from 'react-countup';

class CounterBar extends Comment {
    constructor(props) {
        super(props)
    }


}


//class CounterBar extends React.Component {
//    constructor(props) {
//        super(props);
//    }

//    componentDidMount() {
        
//    }

//    render(){
//        const fn = value => <span>{value}</span>;

//    const counterArray = [
//        { id: 1, number: "49", name: "countries visited" },
//        { id: 2, number: "1356", name: "total customers" },
//        { id: 3, number: "71", name: "photos made" },
//        { id: 4, number: "788", name: "albums created" }
//    ];

//    const counters = [];

//        for (var i = 0; i < 4; i++) {
//            if (i == 2) {
//                counters.push(<div className="col-sm-3 m-b-md-20">
//                    <div className="counter-item">

//                        <div key={counterArray[i].id} className="counter-number font-alt">
//                            <CountTo to={counterArray[i].number} speed={1500}>{fn}</CountTo>
//                            <span>K</span>
//                            <div className="counter-title font-inc">{counterArray[i].name}</div>
//                        </div>
//                    </div>
//                </div>);
//            }
//            else {

//                counters.push(<div className="col-sm-3 m-b-md-20">
//                    <div className="counter-item">

//                        <div key={counterArray[i].id} className="counter-number font-alt">
//                            <CountTo to={counterArray[i].number} speed={1000}>{fn}</CountTo>
//                            <div className="counter-title font-inc">{counterArray[i].name}</div>
//                        </div>
//                    </div>
//                </div>);
//            }
//        }
//    return(counters);
// }

//}
//const CompleteHook = () => {
//    const { countUp, start, pauseResume, reset, update } = useCountUp({
//        start: 0,
//        end: 1234567,
//        delay: 1000,
//        duration: 5,
//        onReset: () => console.log('Resetted!'),
//        onUpdate: () => console.log('Updated!'),
//        onPauseResume: () => console.log('Paused or resumed!'),
//        onStart: ({ pauseResume }) => console.log(pauseResume),
//        onEnd: ({ pauseResume }) => console.log(pauseResume),
//    });
//    return (
//        <div>
//            <div>{countUp}</div>
//            <button onClick={start}>Start</button>
//            <button onClick={reset}>Reset</button>
//            <button onClick={pauseResume}>Pause/Resume</button>
//            <button onClick={() => update(2000)}>Update to 2000</button>
//        </div>
//    );
//};
function Counter() {
    const bgAbout = "../img/about.jpg";
    return (
        <div className="module-small about-section bg-dark bg-dark-50 lazyload"/* data-bg={bgAbout}*/>

            <div className="container">

                <div className="row">

                    <CountUp
                        start={0}
                        end={160527.012}
                        duration={2.75}
                        separator=" "
                        decimals={4}
                        decimal="," >
                        {({ countUpRef, start }) => (
                            <div>
                                <span ref={countUpRef} />
                                <button onClick={start}>Start</button>
                            </div>
                        )}
                    </CountUp>
               
                </div>

            </div>

        </div>
    );
}

export default Counter;
