import { React } from "react";
import { useState, useRef } from "react";

import { CSSTransition } from "react-transition-group";
import BasicEnhancementExplain from "./BasicEnhancementExplain";
// Import css file
import "./FacialDetectionBody.css"
import OptimizedVersionExplain from "./OptimizedVersionExplain";

function VideoStreamingBody() {


    const [readBasicEnhancement, setReadBasicEnhancement] = useState(true);
   
    const basicEnhancementRef = useRef(null);
    const improvedVersionRef = useRef(null);

    
    // Shake animations when choosing sections
    const sectionSelectorShadowRef = useRef(null);

    

    return (
        <div
            className="w-full bg-gray-800 rounded-[1vw]
            flex flex-col items-center
            "

        >   
            <div className="text-[2vw] text-cyan-400 mt-[1.2vw] ml-[6vw] w-full">Part 2</div>

            <div></div>
            {/* ******************************************************************************************************************************* */}
            <div className="flex flex-row justify-center  ">
                <div className="text-[4vw] text-cyan-400">Facial Detection</div>
            </div>

            {/* ******************************************************************************************************************************* */}
            <div className="grid grid-cols-7 bg-blue-700 rounded-[2vw] w-[94%] p-[0.6vw] pb-[1vw]">
                <div className=" col-start-2 col-span-1 flex flex-row justify-center items-center ">
                    <div className="text-[3vw] leading-[2.5vw]">OpenCV</div>
                </div>
                <div className="col-start-4 col-span-1 flex flex-row justify-center">
                    <div className="text-[3vw] leading-[2.5vw]">BRAIN!!!</div>
                </div>
                <div className="col-start-6 col-span-1 flex flex-row justify-center">
                    <div className="text-[3vw] leading-[2.5vw]">Python</div>
                </div>
            </div>

            {/* ******************************************************************************************************************************* */}
            <div className="w-[100%] mt-[3vw]">
                <div className="flex flex-row justify-evenly p-[0.6vw]">
                    <div className=" absolute w-[100px] h-10 bg-gray-700 z-20 rounded-full duration-[360ms]"
                        ref={sectionSelectorShadowRef}

                        style={
                            readBasicEnhancement ?
                                {
                                    transform: 'translate(-15.7vw, 0.7vw)',
                                    width: '30vw',
                                    height: '4vw',
                                    transitionTimingFunction: 'cubic-bezier(1, 0.19, 0.53, 1.3)',
                                }
                                :
                                {
                                    transform: 'translate(16.75vw, 0.7vw)',
                                    width: '27vw',
                                    height: '4vw',
                                    transitionTimingFunction: 'cubic-bezier(1, 0.19, 0.53, 1.3)',
                                }
                        }

                    >

                    </div>
                    <div className="text-[3vw] leading-[5vw] text-cyan-400 z-30 duration-100 ease-linear"
                        ref={basicEnhancementRef}

                        onClick={() => {
                            if (readBasicEnhancement) {
                                sectionSelectorShadowRef.current.classList.add("apply-basicEnhancement-shake");
                                sectionSelectorShadowRef.current.addEventListener("animationend", (e) => {
                                    sectionSelectorShadowRef.current.classList.remove("apply-basicEnhancement-shake");
                                })
                            } else {
                                setReadBasicEnhancement(true);
                                basicEnhancementRef.current.style.color = "rgb(34 211 238)"
                            }
                        }}

                        onMouseEnter={ () => {
                            if (!readBasicEnhancement) {
                                basicEnhancementRef.current.style.color =  "rgb(165 243 252)"
                            }
                        }}

                        onMouseLeave={ () => {
                            basicEnhancementRef.current.style.color = "rgb(34 211 238)"
                        }}
                    >Basic Enhancement
                    </div>
                    <div className="text-[3vw] leading-[5vw] text-cyan-400 z-30 duration-100 ease-linear"
                        ref={improvedVersionRef}

                        onClick={() => {
                            if (!readBasicEnhancement) {
                                sectionSelectorShadowRef.current.classList.add("apply-optimizedVersion-shake");
                                sectionSelectorShadowRef.current.addEventListener("animationend", (e) => {
                                    sectionSelectorShadowRef.current.classList.remove("apply-optimizedVersion-shake");
                                })
                            } else {
                                setReadBasicEnhancement(false);
                                improvedVersionRef.current.style.color = "rgb(34 211 238)"
                            }
                        }}

                        onMouseEnter={ () => {
                            if (readBasicEnhancement) {
                                improvedVersionRef.current.style.color =  "rgb(165 243 252)"
                            }
                        }}

                        onMouseLeave={ () => {
                            improvedVersionRef.current.style.color = "rgb(34 211 238)"
                        }}
                    >Optimized Version
                    </div>
                </div>
            </div>

            {/* ******************************************************************************************************************************* */}

            <div className="w-4/5 mt-[2vw] grid grid-cols-1 pb-[10vw]">
                <CSSTransition
                    in={readBasicEnhancement}
                    timeout={{
                        enter: 1000,
                        exit: 1000,
                    }}
                    unmountOnExit
                    classNames="basicEnhancementTransition"
                    className=" col-start-1 col-span-1 row-start-1 row-span-1"
                >
                    <div>
                        <BasicEnhancementExplain></BasicEnhancementExplain>
                    </div>
                </CSSTransition>
                <CSSTransition
                    in={!readBasicEnhancement}
                    timeout={{
                        enter: 1000,
                        exit: 1000,
                    }}
                    unmountOnExit
                    classNames="improvedVersionTransition"
                    className=" col-start-1 col-span-1 row-start-1 row-span-1"
                >
                    <div>
                        <OptimizedVersionExplain></OptimizedVersionExplain>
                    </div>
                </CSSTransition>

            </div >






        </div >

    )
}

export default VideoStreamingBody
