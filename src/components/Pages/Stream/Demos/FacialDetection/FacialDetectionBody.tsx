import { useState, useRef } from "react";

import { CSSTransition } from "react-transition-group";
import BasicEnhancementExplain from "./BasicEnhancementExplain";
// Import css file
import "./FacialDetectionBody.css"
import OptimizedVersionExplain from "./OptimizedVersionExplain";

function VideoStreamingBody() {


    const [readBasicEnhancement, setReadBasicEnhancement] = useState(true);
   
    const basicEnhancementRef = useRef<any>(null);
    const improvedVersionRef = useRef<any>(null);
    const basicEnhancementTransitionRef = useRef<HTMLDivElement>(null);
    const improvedVersionTransitionRef = useRef<HTMLDivElement>(null);

    
    // Shake animations when choosing sections
    const sectionSelectorShadowRef = useRef<any>(null);

    

    return (
        <div className="stream-panel">   
            <div className="stream-part-label">Part 2</div>

            <div></div>
            {/* ******************************************************************************************************************************* */}
            <div className="flex flex-row justify-center  ">
                <div className="stream-main-title">Facial Detection</div>
            </div>

            {/* ******************************************************************************************************************************* */}
            <div className="stream-tech-strip">
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
                    <div className="stream-selector-shadow"
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
                    <div className="stream-selector-tab"
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
                    <div className="stream-selector-tab"
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
                    nodeRef={basicEnhancementTransitionRef}
                    timeout={{
                        enter: 1000,
                        exit: 1000,
                    }}
                    unmountOnExit
                    classNames="basicEnhancementTransition"
                    className=" col-start-1 col-span-1 row-start-1 row-span-1"
                >
                    <div ref={basicEnhancementTransitionRef}>
                        <BasicEnhancementExplain></BasicEnhancementExplain>
                    </div>
                </CSSTransition>
                <CSSTransition
                    in={!readBasicEnhancement}
                    nodeRef={improvedVersionTransitionRef}
                    timeout={{
                        enter: 1000,
                        exit: 1000,
                    }}
                    unmountOnExit
                    classNames="improvedVersionTransition"
                    className=" col-start-1 col-span-1 row-start-1 row-span-1"
                >
                    <div ref={improvedVersionTransitionRef}>
                        <OptimizedVersionExplain></OptimizedVersionExplain>
                    </div>
                </CSSTransition>

            </div >






        </div >

    )
}

export default VideoStreamingBody
