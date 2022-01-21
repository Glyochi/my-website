import { React } from "react";
import { useState, useRef } from "react";

import { CSSTransition } from "react-transition-group";
import BoringBasics from "./BoringBasics";
import BoringBasicsInvisibleFiller from './BoringBasicsInvisibleFiller'
// Import css file
import "./TimeStepBody.css"
import EncounteredProblems from "./EncounteredProblems";
import EncounteredProblemsInvisibleFiller from "./EncounteredProblemsInvisibleFiller";

function DemoTimeStepBody() {


    const [readBoringBasics, setReadBoringBasics] = useState(true);


    return (
        <div
            className="w-full bg-gray-800 rounded-[1vw]
            flex flex-col items-center
            "

        >
            {/* ******************************************************************************************************************************* */}
            <div className="flex flex-row justify-center p-5  ">
                <div className=" text-[4vw] leading-[5vw] text-cyan-400 ">TechStack</div>
            </div>

            {/* ******************************************************************************************************************************* */}
            <div className="grid grid-cols-7 bg-blue-700 rounded-[2vw] p-[0.6vw]">
                <div className=" col-start-2 col-span-1 flex flex-row justify-center items-center ">
                    <div className="text-[3vw] leading-[2.5vw]">ReactJS</div>
                </div>
                <div className="col-start-4 col-span-1 flex flex-row justify-center">
                    <div className="text-[3vw] leading-[2.5vw]">SocketIO</div>
                </div>
                <div className="col-start-6 col-span-1 flex flex-row justify-center">
                    <div className="text-[3vw] leading-[2.5vw]">Flask</div>
                </div>
            </div>

            {/* ******************************************************************************************************************************* */}
            <div className="w-[100%] mt-[3vw]">
                <div className="flex flex-row justify-evenly p-[0.6vw]">
                    <div className=" absolute w-[100px] h-10 bg-gray-700 z-20 rounded-full duration-[360ms]"
                        style={
                            readBoringBasics ?
                                {
                                    transform: 'translate(-18.85vw, 0.7vw)',
                                    width: '21vw',
                                    height: '4vw',
                                    transitionTimingFunction: 'cubic-bezier(1, 0.19, 0.53, 1.3)',
                                }
                                :
                                {
                                    transform: 'translate(13.25vw, 0.7vw)',
                                    width: '32vw',
                                    height: '4vw',
                                    transitionTimingFunction: 'cubic-bezier(1, 0.19, 0.53, 1.3)',
                                }
                        }

                    >

                    </div>
                    <div className="text-[3vw] leading-[5vw] text-cyan-400 z-30"
                        onClick={() => {
                            setReadBoringBasics(true);
                        }}
                    >Boring Basics
                    </div>
                    <div className="text-[3vw] leading-[5vw] text-cyan-400 z-30"
                        onClick={() => {
                            setReadBoringBasics(false);
                        }}
                    >Encoutered Problems
                    </div>
                </div>
            </div>

            {/* ******************************************************************************************************************************* */}

            <div className="flex flex-row   w-4/5 mt-[2vw] ">
                <CSSTransition
                    in={readBoringBasics}
                    timeout={{
                        enter: 1000,
                        exit: 1000,
                    }}
                    unmountOnExit
                    classNames="boringBasicsTransition"
                >

                    <BoringBasics></BoringBasics>
                </CSSTransition>
                <CSSTransition
                    in={!readBoringBasics}
                    timeout={{
                        enter: 1000,
                        exit: 1000,
                    }}
                    unmountOnExit
                    classNames="encounteredProblemsTransition"
                >

                    <EncounteredProblems></EncounteredProblems>
                </CSSTransition>



                <div className=" pb-[8vw]">
                {
                    readBoringBasics ?
                        <BoringBasicsInvisibleFiller></BoringBasicsInvisibleFiller>
                        :
                        <EncounteredProblemsInvisibleFiller></EncounteredProblemsInvisibleFiller>
                }
                </div>
            </div>






        </div>

    )
}

export default DemoTimeStepBody
