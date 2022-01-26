import React, { useRef, useState, useEffect, useCallback } from "react";
import { CSSTransition } from "react-transition-group";
import Webcam from "react-webcam";


// Importing CSS file
import "./FacialDetectionImprovedEnhancedHead.css"


import VideoSocketService_NewTrick from "../../Socket/VideoSocketService_NewTrick";
import VideoSocketService_NoTrick from "../../Socket/VideoSocketService_NoTrick";
import VideoSocketService_drawFacesOnClient from "../../Socket/VideoSocketService_drawFacesOnClient";
import EnhancedVideoSocketService from "../../Socket/EnhancedVideoSocketService"
import ImprovedEnhancedVideoSocketService from "../../Socket/ImprovedEnhancedVideoSocketService"

import StatDisplayer from "../StatDisplayer/StatDisplayer";
import StatManager from "../StatDisplayer/StatManager";
import CanvasArtist from "../CanvasArtists/CanvasArtist";

function VideoStreamingHead() {
    // const SERVER = "http://127.0.0.1:5000/";
    const SERVER = "https://glyserver-auhlv5aena-uc.a.run.app";

    const videoRef = useRef(null);


    const leftCanvasRef = useRef(null);
    const rightCanvasRef = useRef(null);
    const leftCanvasContainerRef = useRef(null);
    const rightCanvasContainerRef = useRef(null);

    const [leftCanvasContainerWidth, setLeftCanvasContainerWidth] = useState('45%');
    const [rightCanvasContainerWidth, setRightCanvasContainerWidth] = useState('45%');



    const leftSide_leftDisplayer = useRef(null);
    const leftSide_rightDisplayer = useRef(null);
    const rightSide_leftDisplayer = useRef(null);
    const rightSide_rightDisplayer = useRef(null);






    const frameRate = 24;
    const frameTime = 1000 / frameRate;

    const videoResHeight = 720;
    const videoResWidth = 1280;
    // const videoResHeight = 1080;
    // const videoResWidth = 1920;
    const facialDetectionVideoResHeight = 400;
    const facialDetectionVideoResWidth = facialDetectionVideoResHeight * 1280 / 720


    const [leftCanvasWidth, setLeftCanvasWidth] = useState(0);
    const [leftCanvasHeight, setLeftCanvasHeight] = useState(0);
    const [rightCanvasWidth, setRightCanvasWidth] = useState(0);
    const [rightCanvasHeight, setRightCanvasHeight] = useState(0);



    var recording = useRef(false);
    var updateCanvasInterval = useRef();




    var videoSocketService_LeftCanvas = useRef(null);
    var videoSocketService_RightCanvas = useRef(null);








    useEffect(() => {

        let originalRes = {
            width: videoResWidth,
            height: videoResHeight,
        }

        let coordinatesRes = {
            width: facialDetectionVideoResWidth,
            height: facialDetectionVideoResHeight,
        }

        let leftCanvasHelperFunctions = { setCanvasHeight: setLeftCanvasHeight, setCanvasWidth: setLeftCanvasWidth };
        let rightCanvasHelperFunctions = { setCanvasHeight: setRightCanvasHeight, setCanvasWidth: setRightCanvasWidth };

        statManager1.current = new StatManager(leftSide_leftDisplayer, rightSide_leftDisplayer);

        videoSocketService_LeftCanvas.current = new VideoSocketService_drawFacesOnClient(SERVER,
            new CanvasArtist(leftCanvasRef, leftCanvasContainerRef, leftCanvasHelperFunctions, originalRes, coordinatesRes),
            statManager1.current);

            
            
        statManager2.current =  new StatManager(leftSide_rightDisplayer, rightSide_rightDisplayer)

        videoSocketService_RightCanvas.current = new ImprovedEnhancedVideoSocketService(SERVER,
            new CanvasArtist(rightCanvasRef, rightCanvasContainerRef, rightCanvasHelperFunctions, originalRes, coordinatesRes),
            statManager2.current)


        return () => {
        }

    }, [])


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Reference for stat managers so that we can redraw the stat information on the stat displayers when they remount //
    // This is for the rare usecase when user stop playing video and play around with the animations of the displayers //
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const statManager1 = useRef(null);
    const statManager2 = useRef(null);



    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // SCRIPTS FOR TOGGLING HELP DESCRIPTION MODE //
    ////////////////////////////////////////////////

    const help = useRef(null);
    const [helpPressed, setHelpPressed] = useState(false);
    const helpDescriptionRef = useRef(null);

    const handleClickOutsideHelpButton = (event) => {
        if ((leftCanvasRef.current && rightCanvasRef.current)
            && !leftCanvasRef.current.contains(event.target) && !rightCanvasRef.current.contains(event.target)
            && !toggleButton.current.contains(event.target)
            && !help.current.contains(event.target)
            && !helpDescriptionRef.current.contains(event.target)
            && !(leftSide_leftDisplayerWrapper.current != null && leftSide_leftDisplayerWrapper.current.contains(event.target))
            && !(leftSide_rightDisplayerWrapper.current != null && leftSide_rightDisplayerWrapper.current.contains(event.target))
            && !(rightSide_leftDisplayerWrapper.current != null && rightSide_leftDisplayerWrapper.current.contains(event.target))
            && !(rightSide_rightDisplayerWrapper.current != null && rightSide_rightDisplayerWrapper.current.contains(event.target))) {
            setHelpPressed(false);
            document.removeEventListener('mousedown', handleClickOutsideHelpButton);
        }

    }

    const helpDescription1 = "Left video is the one using the basic facial detection that comes with OpenCV.";
    const helpDescription2 = "Right video is the optimized version of my implementation of tilted facial detection.";
    const helpDescription3 = "The right video provide a higher hit-rate for tilted faces while yet retaining a low frametime (high fps)."

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // SCRIPTS FOR TOGGLING RECORD AND NOT RECORDING MODE //
    ////////////////////////////////////////////////////////


    const toggleButton = useRef(null);
    const [toggleButtonPressed, setToggleButtonPressed] = useState(false);




    //Clearing the interval when going to other pages
    useEffect(() => {

        return () => {
            clearInterval(updateCanvasInterval.current);

            if (videoSocketService_LeftCanvas.current != null)
                videoSocketService_LeftCanvas.current.disconnect();
            if (videoSocketService_RightCanvas.current != null)
                videoSocketService_RightCanvas.current.disconnect();


        }
    }, [videoRef])







    // Capture the image from the webcam and send that to the server
    const capture = () => {
        var base64_image = videoRef.current.getScreenshot({
            width: facialDetectionVideoResWidth,
            height: facialDetectionVideoResHeight
        });

        if (base64_image != null) {
            //Sending the image to the server
            videoSocketService_LeftCanvas.current.sendNextBase64Frame(base64_image);
            videoSocketService_RightCanvas.current.sendNextBase64Frame(base64_image);
        }


    }

    const toggle = () => {

        if (!recording.current) {

            videoSocketService_LeftCanvas.current.connect(frameRate);
            videoSocketService_RightCanvas.current.connect(frameRate);

            updateCanvasInterval.current = setInterval(() => {
                capture();
            }, frameTime);


            toggleButton.current.innerText = "Stop";

        } else {
            clearInterval(updateCanvasInterval.current);
            videoSocketService_LeftCanvas.current.disconnect();
            videoSocketService_RightCanvas.current.disconnect();


            toggleButton.current.innerText = "Start";
        }

        recording.current = !recording.current;
    }



    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // SCRIPTS FOR RESIZING CANVAS WHEN USER CLICK ON THEM //
    /////////////////////////////////////////////////////////
    const focusLeftCanvasState = -1;
    const focusNeutralState = 0;
    const focusRightCanvasState = 1;
    const leftSide_leftDisplayerWrapper = useRef(null);
    const leftSide_rightDisplayerWrapper = useRef(null);
    const rightSide_leftDisplayerWrapper = useRef(null);
    const rightSide_rightDisplayerWrapper = useRef(null);

    function handleClickOutside(event) {
        if ((focusState === 1 || focusState === -1)
            && (leftCanvasRef.current && rightCanvasRef.current)
            && !leftCanvasRef.current.contains(event.target) && !rightCanvasRef.current.contains(event.target)
            && !toggleButton.current.contains(event.target)
            && !help.current.contains(event.target)
            && !(helpDescriptionRef.current != null && helpDescriptionRef.current.contains(event.target))
            && !(leftSide_leftDisplayerWrapper.current != null && leftSide_leftDisplayerWrapper.current.contains(event.target))
            && !(leftSide_rightDisplayerWrapper.current != null && leftSide_rightDisplayerWrapper.current.contains(event.target))
            && !(rightSide_leftDisplayerWrapper.current != null && rightSide_leftDisplayerWrapper.current.contains(event.target))
            && !(rightSide_rightDisplayerWrapper.current != null && rightSide_rightDisplayerWrapper.current.contains(event.target))
        ) {
            setFocusState(focusNeutralState);

            setLeftCanvasContainerWidth('45%')
            setRightCanvasContainerWidth('45%')


        }
    }

    // -1 for focusing leftCanvas, 1 for focusing rightCanvas, 0 for none
    const [focusState, setFocusState] = useState(focusNeutralState);
    useEffect(() => {
        if (focusState !== focusNeutralState)
            document.addEventListener("mousedown", handleClickOutside);

        // Redraw the statDisplayer if they dismount and remount
        statManager1.current.drawOnDisplayer();
        statManager2.current.drawOnDisplayer();

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }


    }, [focusState])


    const focusOnLeftCanvas = () => {
        setLeftCanvasContainerWidth('65%')
        setRightCanvasContainerWidth('25%')
    }

    const focusOnRightCanvas = () => {
        setLeftCanvasContainerWidth('25%')
        setRightCanvasContainerWidth('65%')
    }



    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // SCRIPTS FOR CHANGE CANVAS STYLES WHEN MOUSE HOVERING OVER IT //
    //////////////////////////////////////////////////////////////////
    const [leftCanvasHovered, setLeftCanvasHovered] = useState(false);
    const [rightCanvasHovered, setRightCanvasHovered] = useState(false);



    return (
        <div className="demoTimeStepHead" >

            <div className="toggleButtonWrapper">

                <button className="helpButton invisible">?</button>

                <button
                    ref={toggleButton}
                    className=" toggleButton "
                    style={
                        !toggleButtonPressed ?
                            {
                                transform: 'translate(-0.3vw, -0.3vw)',
                                boxShadow: '4px 6px 10px rgba(1, 0, 0,0.5)',
                                transitionDuration: '30ms',
                                transitionTimingFunction: 'linear',
                            }
                            :
                            {
                                transitionDuration: '30ms',
                                transitionTimingFunction: 'linear',
                            }

                    }


                    onClick={(e) => {
                        toggle();
                    }}

                    onMouseDown={() => {
                        setToggleButtonPressed(true);
                    }}

                    onMouseUp={() => {
                        setToggleButtonPressed(false);
                    }}

                    onMouseLeave={() => {
                        setToggleButtonPressed(false);
                    }}
                >
                    Start
                </button>

                <div className="helpButtonWrapper">
                    <button className="helpButton"
                        ref={help}
                        style={
                            !helpPressed ?
                                {
                                    transform: 'translate(-4px, -4px)',
                                    boxShadow: '4px 6px 10px rgba(1, 0, 0,0.5)',
                                    transitionDuration: '30ms',
                                    transitionTimingFunction: 'linear',
                                }
                                :
                                {
                                    transitionDuration: '30ms',
                                    transitionTimingFunction: 'linear',
                                }

                        }

                        onMouseDown={() => {
                            setHelpPressed(true);
                            document.addEventListener('mousedown', handleClickOutsideHelpButton)
                        }}



                    >
                        ?
                    </button>

                    <CSSTransition
                        in={helpPressed}
                        unmountOnExit
                    >
                        <div className="absolute bg-cyan-900  text-gray-200 rounded-[1vw] p-2 translate-x-[-25vw] translate-y-[-10.4vw] w-[25vw] text-[1vw] leading-[1vw] font-semibold"
                            ref={helpDescriptionRef}
                            style={
                                {
                                    ransform: 'translate(-4px, -4px)',
                                    boxShadow: '4px 6px 10px rgba(1, 0, 0,0.5)',
                                    transitionDuration: '30ms',
                                    transitionTimingFunction: 'linear',
                                }
                            }
                        >
                            <div>{helpDescription1}</div>
                            <div className="mt-[0.6vw]">{helpDescription2}</div>
                            <div className="mt-[0.6vw]">{helpDescription3}</div>
                        </div>
                    </CSSTransition>
                </div>
            </div>



            {/* Invisible react-webcam component to get feed from the webcam */}
            <Webcam
                audio={false}
                height={videoResHeight}
                width={videoResWidth}
                screenshotFormat="image/jpeg"
                ref={videoRef}
                forceScreenshotSourceSize
                videoConstraints={{
                    height: videoResHeight,
                    width: videoResWidth,
                    facingMode: "user",
                    frameRate: frameRate

                }}
                className="absolute invisible w-0"
            >

            </Webcam>




            <div className="canvasContainer items-center">

                <div className="leftCanvasContainer transition-all: duration-500 ease-in-out
                "
                    ref={leftCanvasContainerRef}


                    style={(focusState === focusNeutralState) ?
                        {
                            width: leftCanvasContainerWidth,
                            marginLeft: '2.5vw'
                        }
                        :
                        {
                            width: leftCanvasContainerWidth,
                            marginLeft: '3vw'
                        }
                    }



                >
                    {/* statDisplayerPositioner contains statDisplayers, and they have absolute position to statDisplayerPositioner. 
                    By doing this, the animations of the statDisplayers stay untouched while the statDisplayerPositioner can move the statDisplayers around freely 
                    And because everything in statDisplayerPositioner use absolute positioning, statDisplayerPositioner has no width nor height => invisible
                    */}
                    <div className="statDisplayerPositioner  w-fit mb-2 "

                        style={(focusState === focusRightCanvasState) ?
                            {
                                transitionDuration: '500ms',
                                transform: 'translate(0, 7vw)',
                                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                            }
                            :
                            (focusState === focusNeutralState) ?
                                {
                                    marginTop: '6vw',
                                    transitionDuration: '500ms',
                                    transform: 'translate(7.5vw, 0)',
                                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                                }
                                :
                                {
                                    transitionDuration: '500ms',
                                    transform: 'translate(7.5vw, 0)',
                                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                                }

                        }>
                        <CSSTransition
                            in={focusState === focusRightCanvasState}
                            timeout={{
                                enter: 500,
                                exit: 500,
                            }}
                            classNames="leftDisplayerTransition"
                            unmountOnExit
                        >
                            <div ref={leftSide_rightDisplayerWrapper} className="rightDisplayer-leftSide"
                            >
                                <StatDisplayer ref={leftSide_rightDisplayer} isLeftDisplayer={false} ></StatDisplayer>
                            </div>
                        </CSSTransition>


                        <CSSTransition
                            in={focusState !== focusLeftCanvasState}
                            timeout={{
                                enter: 500,
                                exit: 500,
                            }}
                            classNames="leftDisplayerTransition"
                            unmountOnExit
                        >
                            <div ref={leftSide_leftDisplayerWrapper} className="leftDisplayer-leftSide">
                                <StatDisplayer ref={leftSide_leftDisplayer} isLeftDisplayer={true} ></StatDisplayer>
                            </div>

                        </CSSTransition>
                        {/* </div> */}
                    </div>
                    <div className="leftCanvasWrapper "


                        style={(focusState === focusRightCanvasState) ?
                            {
                                transitionDuration: '500ms',
                                transform: 'translate(0, 7.6vw)',
                                // transform: 'translate(0, 17.75vh)',
                                // transform: 'translate(0, 80%)',
                                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                            }
                            :
                            {}

                        }

                        onMouseEnter={
                            () => {
                                setLeftCanvasHovered(true);
                            }
                        }

                        onMouseLeave={
                            () => {
                                setLeftCanvasHovered(false);
                            }
                        }

                    >


                        <canvas width={leftCanvasWidth} height={leftCanvasHeight} className="leftCanvas" ref={leftCanvasRef}


                            onMouseDown={
                                () => {
                                    setFocusState(focusLeftCanvasState)
                                    focusOnLeftCanvas()
                                }
                            }


                            style={leftCanvasHovered ?
                                (
                                    (focusState === focusNeutralState) ?
                                        {
                                            // Neutral
                                            borderRadius: '1.2vw',
                                            transform: 'translate(-10px, -12px)',
                                            boxShadow: '10px 14px 30px rgba(1, 0, 0, 0.8)',
                                            transitionDuration: '60ms',
                                            transitionTimingFunction: 'linear',
                                        }
                                        :
                                        (
                                            (focusState === focusLeftCanvasState) ?
                                                {
                                                    // Biggest
                                                    borderRadius: '0.8vw',
                                                    transform: 'translate(-10px, -12px)',
                                                    boxShadow: '10px 14px 30px rgba(1, 0, 0, 0.8)',
                                                    transitionDuration: '60ms',
                                                    transitionTimingFunction: 'linear',
                                                }
                                                :
                                                {
                                                    // Smallest
                                                    borderRadius: '1.6vw',
                                                    transform: 'translate(-10px, -12px)',
                                                    boxShadow: '10px 14px 30px rgba(1, 0, 0, 0.8)',
                                                    transitionDuration: '60ms',
                                                    transitionTimingFunction: 'linear',
                                                }
                                        )


                                )
                                :
                                (
                                    (focusState === focusNeutralState) ?
                                        {
                                            // Neutral
                                            borderRadius: '1.2vw',
                                            transitionDuration: '60ms',
                                            transitionTimingFunction: 'linear',
                                        }
                                        :
                                        (
                                            (focusState === focusLeftCanvasState) ?
                                                {
                                                    // Biggest
                                                    borderRadius: '0.8vw',
                                                    transform: 'translate(-10px, -12px)',
                                                    boxShadow: '10px 14px 30px rgba(1, 0, 0,0.8)',
                                                    transitionDuration: '60ms',
                                                    transitionTimingFunction: 'linear',
                                                }
                                                :
                                                {
                                                    // Smallest
                                                    borderRadius: '1.6vw',
                                                    transitionDuration: '60ms',
                                                    transitionTimingFunction: 'linear',
                                                }
                                        )

                                )
                            }

                        >
                        </canvas>
                    </div>
                </div>

                <div className="rightCanvasContainer justify-center"
                    ref={rightCanvasContainerRef}


                    style={(focusState === focusNeutralState) ?
                        {
                            width: rightCanvasContainerWidth,
                            marginRight: '2.5vw'
                        }
                        :
                        {
                            width: rightCanvasContainerWidth,
                            marginRight: '3vw'

                        }
                    }


                >




                    <div className="  w-fit mb-2"
                        style={(focusState === focusLeftCanvasState) ?
                            {
                                transitionDuration: '500ms',
                                transform: 'translate(0, 7vw)',
                                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                            }
                            :
                            (focusState === focusNeutralState) ?
                                {
                                    marginTop: '6vw',
                                    transitionDuration: '500ms',
                                    transform: 'translate(7.5vw, 0)',
                                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                                }
                                :

                                {
                                    transitionDuration: '500ms',
                                    transform: 'translate(7.5vw, 0)',
                                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                                }

                        }


                    >
                        <CSSTransition
                            in={focusState == focusLeftCanvasState}
                            timeout={{
                                enter: 500,
                                exit: 500,
                            }}
                            classNames="rightDisplayerTransition"
                            unmountOnExit
                        >
                            <div ref={rightSide_leftDisplayerWrapper} className="leftDisplayer-rightSide">
                                <StatDisplayer ref={rightSide_leftDisplayer} isLeftDisplayer={true} ></StatDisplayer>
                            </div>
                        </CSSTransition>


                        <CSSTransition
                            in={focusState !== focusRightCanvasState}
                            timeout={{
                                enter: 500,
                                exit: 500,
                            }}
                            classNames="rightDisplayerTransition"
                            unmountOnExit
                        >
                            <div ref={rightSide_rightDisplayerWrapper} className="rightDisplayer-rightSide"

                            >
                                <StatDisplayer ref={rightSide_rightDisplayer} isLeftDisplayer={false} ></StatDisplayer>
                            </div>

                        </CSSTransition>

                    </div>

                    <div className="rightCanvasWrapper"

                        style={(focusState === focusLeftCanvasState) ?
                            {
                                transitionDuration: '500ms',
                                transform: 'translate(0, 7.6vw)',
                                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                            }
                            :
                            {}

                        }


                        onMouseEnter={
                            () => {
                                setRightCanvasHovered(true);
                            }
                        }

                        onMouseLeave={
                            () => {
                                setRightCanvasHovered(false);
                            }
                        }


                    >




                        <canvas width={rightCanvasWidth} height={rightCanvasHeight} className="rightCanvas"


                            onMouseDown={
                                () => {
                                    setFocusState(focusRightCanvasState)
                                    focusOnRightCanvas()
                                }
                            }


                            style={rightCanvasHovered ?
                                (
                                    (focusState === focusNeutralState) ?
                                        {
                                            // Neutral
                                            borderRadius: '1.2vw',
                                            transform: 'translate(-10px, -12px)',
                                            boxShadow: '10px 14px 30px rgba(1, 0, 0, 0.8)',
                                            transitionDuration: '60ms',
                                            transitionTimingFunction: 'linear',
                                        }
                                        :
                                        (
                                            (focusState === focusRightCanvasState) ?
                                                {
                                                    // Biggest
                                                    borderRadius: '0.8vw',
                                                    transform: 'translate(-10px, -12px)',
                                                    boxShadow: '10px 14px 30px rgba(1, 0, 0, 0.8)',
                                                    transitionDuration: '60ms',
                                                    transitionTimingFunction: 'linear',
                                                }
                                                :
                                                {
                                                    // Smallest
                                                    borderRadius: '1.6vw',
                                                    transform: 'translate(-10px, -12px)',
                                                    boxShadow: '10px 14px 30px rgba(1, 0, 0, 0.8)',
                                                    transitionDuration: '60ms',
                                                    transitionTimingFunction: 'linear',
                                                }
                                        )


                                )
                                :
                                (
                                    (focusState === focusNeutralState) ?
                                        {
                                            // Neutral
                                            borderRadius: '1.2vw',
                                            transitionDuration: '60ms',
                                            transitionTimingFunction: 'linear',
                                        }
                                        :
                                        (
                                            (focusState === focusRightCanvasState) ?
                                                {
                                                    // Biggest
                                                    borderRadius: '0.8vw',
                                                    transform: 'translate(-10px, -12px)',
                                                    boxShadow: '10px 14px 30px rgba(1, 0, 0,0.8)',
                                                    transitionDuration: '60ms',
                                                    transitionTimingFunction: 'linear',
                                                }
                                                :
                                                {
                                                    // Smallest
                                                    borderRadius: '1.6vw',
                                                    transitionDuration: '60ms',
                                                    transitionTimingFunction: 'linear',
                                                }
                                        )

                                )
                            }

                            ref={rightCanvasRef}>
                        </canvas>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default VideoStreamingHead
