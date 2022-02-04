import { React } from "react";
import { useState, useRef } from "react";

import { CSSTransition } from "react-transition-group";
import BoringBasics from "./BoringBasics";

// Import css file
import "./VideoStreamingBody.css"
import EncounteredProblems from "./EncounteredProblems";

function VideoStreamingBody() {


    const [readBoringBasics, setReadBoringBasics] = useState(true);

    // Shake animations when choosing sections
    const boringBasicsRef = useRef(null);
    const encounteredProblemsRef = useRef(null);
    const sectionSelectorShadowRef = useRef(null);

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
            <div className="grid grid-cols-7 bg-blue-700 rounded-[2vw] w-[94%] p-[0.6vw] pb-[1vw]">
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
                        ref={sectionSelectorShadowRef}

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
                    <div className="text-[3vw] leading-[5vw] text-cyan-400 z-30 duration-100 ease-linear"
                        ref = {boringBasicsRef}

                        onClick={() => {

                            if (readBoringBasics) {
                                sectionSelectorShadowRef.current.classList.add("apply-boringBasics-shake");
                                sectionSelectorShadowRef.current.addEventListener("animationend", (e) => {
                                    sectionSelectorShadowRef.current.classList.remove("apply-boringBasics-shake");
                                })
                            } else {
                                setReadBoringBasics(true);
                                boringBasicsRef.current.style.color = "rgb(34 211 238)"
                            }
    
                        }}

                        onMouseEnter={ () => {
                            if (!readBoringBasics) {
                                boringBasicsRef.current.style.color = "rgb(165 243 252)"
                            }
                        }}

                        onMouseLeave={ () => {
                            boringBasicsRef.current.style.color = "rgb(34 211 238)"
                        }}
                        
                    >Boring Basics
                    </div>
                    <div className="text-[3vw] leading-[5vw] text-cyan-400 z-30 duration-100 ease-linear"
                        ref={encounteredProblemsRef}

                        onClick={() => {
                            if (!readBoringBasics) {
                                sectionSelectorShadowRef.current.classList.add("apply-encounteredProblems-shake");
                                sectionSelectorShadowRef.current.addEventListener("animationend", (e) => {
                                    sectionSelectorShadowRef.current.classList.remove("apply-encounteredProblems-shake");
                                })
                            } else {
                                setReadBoringBasics(false);
                                encounteredProblemsRef.current.style.color = "rgb(34 211 238)"
                            }
                        }}

                        onMouseEnter={ () => {
                            if (readBoringBasics) {
                                encounteredProblemsRef.current.style.color =  "rgb(165 243 252)"
                            }
                        }}

                        onMouseLeave={ () => {
                            encounteredProblemsRef.current.style.color = "rgb(34 211 238)"
                        }}
                    >Encoutered Problems
                    </div>
                </div>
            </div>

            {/* ******************************************************************************************************************************* */}

            <div className="w-4/5 mt-[2vw] grid grid-cols-1 pb-[10vw]">
                <CSSTransition
                    in={readBoringBasics}
                    timeout={{
                        enter: 1000,
                        exit: 1000,
                    }}
                    unmountOnExit
                    classNames="boringBasicsTransition"
                    className=" col-start-1 col-span-1 row-start-1 row-span-1"
                >
                    <div>
                        <BoringBasics></BoringBasics>
                    </div>
                </CSSTransition>
                <CSSTransition
                    in={!readBoringBasics}
                    timeout={{
                        enter: 1000,
                        exit: 1000,
                    }}
                    unmountOnExit
                    classNames="encounteredProblemsTransition"
                    className=" col-start-1 col-span-1 row-start-1 row-span-1"
                >
                    <div>
                        <EncounteredProblems></EncounteredProblems>
                    </div>
                </CSSTransition>

            </div >






        </div >

    )
}

export default VideoStreamingBody
