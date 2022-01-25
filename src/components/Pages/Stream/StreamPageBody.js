import TimeStepHead from "./Demos/TimeStep/TimeStepHead"
import TimeStepBody from "./Demos/TimeStep/TimeStepBody"

import React, { useRef, useState, useEffect, useCallback } from "react";
import { CSSTransition } from "react-transition-group";


function StreamPageBody() {

    const [partOne, setPartOne] = useState(true);
    const partOneButton = useRef(null);
    const partTwoButton = useRef(null);


    return (
        <div className="flex justify-center " >
            <div className=" flex flex-col justify-center items-center w-3/4 ">
                <div className="w-full flex flex-col items-center">
                    {/* <div className="w-full flex flex-row justify-evenly items-center p-2 h-[4rem]"> */}
                    <div className="w-full grid grid-cols-12 my-[1.5rem]">
                        <button
                            className=" h-fit col-start-2 col-span-4 pt-1.5 pb-2 px-6 transition-all duration-[300ms] rounded-xl"

                            ref={partOneButton}

                            style={
                                partOne ?
                                    {
                                        backgroundColor: 'transparent',
                                        borderColor: 'rgb(6 182 212)',
                                        borderWidth: '0.1rem',
                                        paddingTop: '0.375rem',
                                        paddingBottom: '0.475rem',
                                        paddingLeft: '1.5rem',
                                        paddingRight: '1.5rem',
                                        transitionTimingFunction: 'cubic-bezier(0.8, 0.15, 0.5, 1)',


                                        color: 'rgb(255 255 255)',

                                    }
                                    :
                                    {
                                        backgroundColor: 'rgb(6 182 212)',
                                        borderColor: 'transparent',
                                        borderWidth: '0.1rem',
                                        paddingTop: '0.375rem',
                                        paddingBottom: '0.475rem',
                                        paddingLeft: '1.5rem',
                                        paddingRight: '1.5rem',
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
                        <button
                            className="h-fit col-start-8 col-span-4 pt-1.5 pb-2 px-6 transition-all duration-[300ms] rounded-xl"

                            ref={partTwoButton}

                            style={
                                !partOne ?
                                    {
                                        backgroundColor: 'transparent',
                                        borderColor: 'rgb(6 182 212)',
                                        borderWidth: '0.1rem',
                                        paddingTop: '0.375rem',
                                        paddingBottom: '0.475rem',
                                        paddingLeft: '1.5rem',
                                        paddingRight: '1.5rem',
                                        transitionTimingFunction: 'cubic-bezier(0.8, 0.15, 0.5, 1)',


                                        color: 'rgb(255 255 255)',

                                    }
                                    :
                                    {
                                        backgroundColor: 'rgb(6 182 212)',
                                        borderColor: 'transparent',
                                        borderWidth: '0.1rem',
                                        paddingTop: '0.375rem',
                                        paddingBottom: '0.475rem',
                                        paddingLeft: '1.5rem',
                                        paddingRight: '1.5rem',
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

                    </div>
                    <div className="grid grid-cols-1">
                        <CSSTransition
                            in={partOne}
                            timeout={{
                                enter: 500,
                                exit: 500,
                            }}
                            classNames='partOneTransition'
                            className="col-start-1 col-span-1 row-start-2 row-span-1 -"
                            unmountOnExit
                        >
                            <div className="w-full h-full mt-[3vw]">
                                <TimeStepHead ></TimeStepHead>
                                <TimeStepBody></TimeStepBody>
                            </div>
                        </CSSTransition>
                        <CSSTransition
                            in={!partOne}
                            timeout={{
                                enter: 500,
                                exit: 500,
                            }}
                            classNames='partTwoTransition'
                            className="col-start-1 col-span-1 row-start-2 row-span-1"
                            unmountOnExit
                        >
                            <div className="w-full h-full mt-[3vw]">
                                <TimeStepHead ></TimeStepHead>
                                <TimeStepBody></TimeStepBody>
                            </div>
                        </CSSTransition>
                    </div>
                </div>



            </div>

        </div>
    )
}

export default StreamPageBody
