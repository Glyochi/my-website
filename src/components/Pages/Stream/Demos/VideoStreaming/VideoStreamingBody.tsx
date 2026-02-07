import { useState, useRef } from "react";

import { CSSTransition } from "react-transition-group";
import BoringBasics from "./BoringBasics";

// Import css file
import "./VideoStreamingBody.css"
import EncounteredProblems from "./EncounteredProblems";

function VideoStreamingBody() {


    const [readBoringBasics, setReadBoringBasics] = useState(true);

    // Shake animations when choosing sections
    const boringBasicsRef = useRef<any>(null);
    const encounteredProblemsRef = useRef<any>(null);
    const sectionSelectorShadowRef = useRef<any>(null);
    const boringBasicsTransitionRef = useRef<HTMLDivElement>(null);
    const encounteredProblemsTransitionRef = useRef<HTMLDivElement>(null);

    return (
        <div className="stream-panel">
            <div className="stream-part-label">Part 1</div>

            {/* ******************************************************************************************************************************* */}
            <div className="flex flex-row justify-center">
                <div className="stream-main-title">Live Streaming Application</div>
            </div>

            {/* ******************************************************************************************************************************* */}
            <div className="stream-tech-strip mt-3">
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
                    <div className="stream-selector-shadow"
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
                    <div className="stream-selector-tab"
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
                    <div className="stream-selector-tab"
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
                    nodeRef={boringBasicsTransitionRef}
                    timeout={{
                        enter: 1000,
                        exit: 1000,
                    }}
                    unmountOnExit
                    classNames="boringBasicsTransition"
                    className=" col-start-1 col-span-1 row-start-1 row-span-1"
                >
                    <div ref={boringBasicsTransitionRef}>
                        <BoringBasics></BoringBasics>
                    </div>
                </CSSTransition>
                <CSSTransition
                    in={!readBoringBasics}
                    nodeRef={encounteredProblemsTransitionRef}
                    timeout={{
                        enter: 1000,
                        exit: 1000,
                    }}
                    unmountOnExit
                    classNames="encounteredProblemsTransition"
                    className=" col-start-1 col-span-1 row-start-1 row-span-1"
                >
                    <div ref={encounteredProblemsTransitionRef}>
                        <EncounteredProblems></EncounteredProblems>
                    </div>
                </CSSTransition>

            </div >






        </div >

    )
}

export default VideoStreamingBody
