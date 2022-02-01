import VideoStreamingHead from "./Demos/VideoStreaming/VideoStreamingHead"
import VideoStreamingBody from "./Demos/VideoStreaming/VideoStreamingBody"
import FacialDetectionEnhancedHead from "./Demos/FacialDetection/FacialDetectionEnhancedHead"
import FacialDetectionImprovedEnhancedHead from "./Demos/FacialDetection/FacialDetectionImprovedEnhancedHead"
import FacialDetectionBody from "./Demos/FacialDetection/FacialDetectionBody"

import React, { useRef, useState, useEffect, useCallback } from "react";
import { CSSTransition } from "react-transition-group";


function StreamPageBody() {

    const [partOne, setPartOne] = useState(true);
    const partOneButton = useRef(null);
    const partTwoButton = useRef(null);
    const [partTwoEnhanced, setPartTwoEnhanced] = useState(true);
    const partTwoEnhancedButton = useRef(null);
    const partTwoImprovedEnhancedButton = useRef(null);


    const notes = "Please keep in mind that I oversimplified a lot of what I actually did to keep these sections short. There were multiple edges cases that I had to account for, many more weren’t mentioned things that I had to make to help speed up the development process, and a lot of experimenting with different technologies/frameworks I had to do to be able to finish this project (or these two projects)."
    const [readingNotes, setReadingNotes] = useState(false);

    const notesRef = useRef(null);
    const handleMouseClickOutsideNotes = (event) => {
        if (!notesRef.current.contains(event.target)) {
            setReadingNotes(false);
            document.removeEventListener('mousedown', handleMouseClickOutsideNotes);
        }
    }

    return (
        <div className=" flex flex-col justify-center items-center w-3/4 text-[1.7vw]">
            <div className="w-full grid grid-cols-12 my-[1.5vw] h-[5vw]">
                <div className="h-fit col-start-2 col-span-4">
                    <button
                        className="w-full transition-all duration-[300ms] rounded-3xl"

                        ref={partOneButton}

                        style={
                            partOne ?
                                {
                                    backgroundColor: 'transparent',
                                    borderColor: 'rgb(6 182 212)',
                                    borderWidth: '0.1vw',
                                    paddingTop: '0.35vw',
                                    paddingBottom: '0.475vw',
                                    transitionTimingFunction: 'cubic-bezier(0.8, 0.15, 0.5, 1)',


                                    color: 'rgb(255 255 255)',

                                }
                                :
                                {
                                    backgroundColor: 'rgb(6 182 212)',
                                    borderColor: 'transparent',
                                    borderWidth: '0.1vw',
                                    paddingTop: '0.35vw',
                                    paddingBottom: '0.475vw',
                                    transitionTimingFunction: 'cubic-bezier(0.8, 0.15, 0.5, 1)',
                                }
                        }

                        onClick={() => {
                            if (partOne) {
                                partOneButton.current.classList.add("apply-shake");
                                partOneButton.current.addEventListener("animationend", (e) => {
                                    partOneButton.current.classList.remove("apply-shake");
                                })
                            } else {
                                setPartOne(true);
                            }

                        }}

                    >
                        Part 1: Video Streaming
                    </button>
                </div>
                <div className="col-start-8 col-span-4 grid grid-cols-1">
                    <button
                        className="w-full h-fit transition-all duration-[300ms] rounded-3xl col-start-1 col-span-1  row-start-1 row-span-1 z-20"

                        ref={partTwoButton}

                        style={
                            !partOne ?
                                {
                                    backgroundColor: 'transparent',
                                    borderColor: 'rgb(6 182 212)',
                                    borderWidth: '0.1vw',
                                    paddingTop: '0.35vw',
                                    paddingBottom: '0.475vw',
                                    transitionTimingFunction: 'cubic-bezier(0.8, 0.15, 0.5, 1)',


                                    color: 'rgb(255 255 255)',

                                }
                                :
                                {
                                    backgroundColor: 'rgb(6 182 212)',
                                    borderColor: 'transparent',
                                    borderWidth: '0.1vw',
                                    paddingTop: '0.35vw',
                                    paddingBottom: '0.475vw',
                                    transitionTimingFunction: 'cubic-bezier(0.8, 0.15, 0.5, 1)',
                                }
                        }

                        onClick={() => {
                            if (!partOne) {
                                partTwoButton.current.classList.add("apply-shake");
                                partTwoButton.current.addEventListener("animationend", (e) => {
                                    partTwoButton.current.classList.remove("apply-shake");
                                })
                            } else {
                                setPartOne(false);
                            }
                        }}
                    >
                        Part 2: Facial Detection
                    </button>
                    <CSSTransition
                        in={!partOne}
                        timeout={{
                            enter: 500,
                            exit: 500,
                        }}
                        classNames='partTwoSubSectionTransition'
                        className="w-full flex flex-row justify-around col-start-1 col-span-1 row-start-1 row-span-1 z-[19] "
                        unmountOnExit
                    >
                        <div className="">
                            <button className="duration-[300ms] rounded-3xl h-fit text-[1.1vw] px-[1vw]"

                                ref={partTwoEnhancedButton}

                                style={
                                    partTwoEnhanced ?
                                        {
                                            backgroundColor: 'transparent',
                                            borderColor: 'rgb(6 182 212)',
                                            borderWidth: '0.1vw',
                                            paddingTop: '0.35vw',
                                            paddingBottom: '0.45vw',
                                            transitionTimingFunction: 'cubic-bezier(0.8, 0.15, 0.5, 1)',


                                            color: 'rgb(255 255 255)',

                                        }
                                        :
                                        {
                                            backgroundColor: 'rgb(6 182 212)',
                                            borderColor: 'transparent',
                                            borderWidth: '0.1vw',
                                            paddingTop: '0.35vw',
                                            paddingBottom: '0.45vw',
                                            transitionTimingFunction: 'cubic-bezier(0.8, 0.15, 0.5, 1)',
                                        }
                                }

                                onClick={() => {
                                    if (partTwoEnhanced) {
                                        partTwoEnhancedButton.current.classList.add("apply-shake");
                                        partTwoEnhancedButton.current.addEventListener("animationend", (e) => {
                                            partTwoEnhancedButton.current.classList.remove("apply-shake");
                                        })
                                    } else {
                                        setPartTwoEnhanced(true);
                                    }
                                }}

                            >
                                Enhanced
                            </button>
                            <button className="duration-[300ms] rounded-3xl h-fit text-[1.1vw] px-4"

                                ref={partTwoImprovedEnhancedButton}

                                style={
                                    !partTwoEnhanced ?
                                        {
                                            backgroundColor: 'transparent',
                                            borderColor: 'rgb(6 182 212)',
                                            borderWidth: '0.1vw',
                                            paddingTop: '0.35vw',
                                            paddingBottom: '0.45vw',
                                            transitionTimingFunction: 'cubic-bezier(0.8, 0.15, 0.5, 1)',


                                            color: 'rgb(255 255 255)',

                                        }
                                        :
                                        {
                                            backgroundColor: 'rgb(6 182 212)',
                                            borderColor: 'transparent',
                                            borderWidth: '0.1vw',
                                            paddingTop: '0.35vw',
                                            paddingBottom: '0.45vw',
                                            transitionTimingFunction: 'cubic-bezier(0.8, 0.15, 0.5, 1)',
                                        }
                                }

                                onClick={() => {
                                    if (!partTwoEnhanced) {
                                        partTwoImprovedEnhancedButton.current.classList.add("apply-shake");
                                        partTwoImprovedEnhancedButton.current.addEventListener("animationend", (e) => {
                                            partTwoImprovedEnhancedButton.current.classList.remove("apply-shake");
                                        })
                                    } else {
                                        setPartTwoEnhanced(false);
                                    }
                                }}
                            >
                                Optimized Enhanced
                            </button>
                        </div>
                    </CSSTransition>
                </div>

            </div>
            <div className="grid grid-cols-1">
                <CSSTransition
                    in={partOne}
                    timeout={{
                        enter: 500,
                        exit: 500,
                    }}
                    classNames='partOneTransition'
                    className="col-start-1 col-span-1 row-start-1 row-span-1 z-40"
                    unmountOnExit
                >
                    <div className=" h-full mt-[3vw]">
                        <VideoStreamingHead ></VideoStreamingHead>
                        <div className="w-full mb-[1.2vw] grid grid-cols-12 "
                            style={
                                !readingNotes ?
                                    {
                                        height: '3vw',
                                        transitionDuration: '300ms',
                                        transitionTimingFunction: 'cubic-bezier(0.8, 0.15, 0.5, 1)',
                                    }
                                    :
                                    {
                                        height: '7vw',
                                        transitionDuration: '300ms',
                                        transitionTimingFunction: 'cubic-bezier(0.8, 0.15, 0.5, 1)',
                                    }
                            }


                        >
                            <CSSTransition
                                in={!readingNotes}
                                timeout={{
                                    enter: 300,
                                    exit: 300,
                                }}
                                classNames="notesButtonTransition"
                                unmountOnExit

                            >
                                <button className="bg-rose-600 rounded-3xl px-[1.6vw] w-[8vw] h-[2.7vw] 
                                col-start-1 col-span-1 row-start-1 row-span-1"
                                    onClick={() => {
                                        setReadingNotes(true);
                                        document.addEventListener('mousedown', handleMouseClickOutsideNotes)
                                    }}

                                >
                                    Notes
                                </button>
                            </CSSTransition>
                            <CSSTransition
                                in={readingNotes}
                                timeout={{
                                    enter: 300,
                                    exit: 300,
                                }}
                                classNames="notesTransition"
                                unmountOnExit
                            >
                                <div ref={notesRef} className="text-[1vw] leading-[1.1vw] font-semibold bg-orange-300 
                                w-[50vw] h-[6.4vw] rounded-3xl px-[1.6vw] py-[1vw]
                                flex flex-col justify-center
                                col-start-1 col-span-1 row-start-1 row-span-1">
                                    <div>
                                        {notes}
                                    </div>
                                </div>
                            </CSSTransition>
                        </div>
                        <VideoStreamingBody></VideoStreamingBody>
                    </div>
                </CSSTransition>
                <CSSTransition
                    in={!partOne}
                    timeout={{
                        enter: 500,
                        exit: 500,
                    }}
                    classNames='partTwoTransition'
                    className="col-start-1 col-span-1 row-start-1 row-span-1 z-40"
                    unmountOnExit
                >
                    <div className="w-full h-full mt-[3vw]"
                    >
                        {
                            partTwoEnhanced ?
                                <FacialDetectionEnhancedHead ></FacialDetectionEnhancedHead>
                                :
                                <FacialDetectionImprovedEnhancedHead ></FacialDetectionImprovedEnhancedHead>
                        }
                        <div className="w-full mb-[1.2vw] grid grid-cols-12 "
                            style={
                                !readingNotes ?
                                    {
                                        height: '3vw',
                                        transitionDuration: '300ms',
                                        transitionTimingFunction: 'cubic-bezier(0.8, 0.15, 0.5, 1)',
                                    }
                                    :
                                    {
                                        height: '7vw',
                                        transitionDuration: '300ms',
                                        transitionTimingFunction: 'cubic-bezier(0.8, 0.15, 0.5, 1)',
                                    }
                            }


                        >
                            <CSSTransition
                                in={!readingNotes}
                                timeout={{
                                    enter: 300,
                                    exit: 300,
                                }}
                                classNames="notesButtonTransition"
                                unmountOnExit

                            >
                                <button className="bg-rose-600 rounded-3xl px-[1.6vw] w-[8vw] h-[2.7vw] 
                                col-start-1 col-span-1 row-start-1 row-span-1"
                                    onClick={() => {
                                        setReadingNotes(true);
                                        document.addEventListener('mousedown', handleMouseClickOutsideNotes)
                                    }}

                                >
                                    Notes
                                </button>
                            </CSSTransition>
                            <CSSTransition
                                in={readingNotes}
                                timeout={{
                                    enter: 300,
                                    exit: 300,
                                }}
                                classNames="notesTransition"
                                unmountOnExit
                            >
                                <div ref={notesRef} className="text-[1vw] leading-[1.1vw] font-semibold bg-orange-300 
                                w-[50vw] h-[6.4vw] rounded-3xl px-[1.6vw] py-[1vw]
                                flex flex-col justify-center
                                col-start-1 col-span-1 row-start-1 row-span-1">
                                    <div>
                                        {notes}
                                    </div>
                                </div>
                            </CSSTransition>
                        </div>
                        <FacialDetectionBody></FacialDetectionBody>
                    </div>
                </CSSTransition>
            </div>
        </div>

    )
}

export default StreamPageBody
