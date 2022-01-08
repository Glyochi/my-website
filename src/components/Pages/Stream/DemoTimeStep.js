import { bgcolor, height } from "@mui/system";
import React, { useRef, useState, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import VideoSocketService from "./Socket/VideoSocketService_OldTrick";

import { io } from "socket.io-client"
import VideoSocketService2 from "./Socket/VideoSocketService_NoTrick";
import VideoSocketService_OldTrick from "./Socket/VideoSocketService_OldTrick";
import VideoSocketService_NewTrick from "./Socket/VideoSocketService_NewTrick";
import VideoSocketService_NoTrick from "./Socket/VideoSocketService_NoTrick";

function VideoPlayer() {
    const SERVER = "http://127.0.0.1:5000/";

    const videoRef = useRef(null);
    const videoContainerRef = useRef(null);


    const leftCanvasRef = useRef(null);
    const rightCanvasRef = useRef(null);
    const leftCanvasContainerRef = useRef(null);
    const rightCanvasContainerRef = useRef(null);
    const [leftCanvasContainerWidth, setLeftCanvasContainerWidth] = useState('45%');
    const [rightCanvasContainerWidth, setRightCanvasContainerWidth] = useState('45%');
    const leftCanvasDelayDisplayer = useRef(null);
    const rightCanvasDelayDisplayer  = useRef(null);









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




    var videoSocketService_NoTrick = useRef(null);
    var videoSocketService_NewTrick = useRef(null);





    const drawOnLeftCanvasFunction = (base64_responseImage) => {
        let img = new Image();

        //Update the image on canvas
        img.onload = () => {


            setLeftCanvasWidth(leftCanvasContainerRef.current.clientWidth);
            setLeftCanvasHeight(leftCanvasContainerRef.current.clientHeight);
            var context = leftCanvasRef.current.getContext('2d');
            context.drawImage(img, 0, 0, leftCanvasContainerRef.current.clientWidth, leftCanvasContainerRef.current.clientHeight);

            // // setCanvasWidth(videoContainerRef.current.clientWidth);
            // // setCanvasHeight(videoContainerRef.current.clientHeight);
            // var context = leftCanvasRef.current.getContext('2d');
            // context.drawImage(img, 0, 0, leftCanvasRef.current.clientWidth, leftCanvasRef.current.clientHeight);
        }

        img.src = base64_responseImage;
    }
    const drawOnRightCanvasFunction = (base64_responseImage) => {
        let img = new Image();

        //Update the image on canvas
        img.onload = () => {
            ;
            setRightCanvasHeight(rightCanvasContainerRef.current.clientHeight);
            setRightCanvasWidth(rightCanvasContainerRef.current.clientWidth)
            var context = rightCanvasRef.current.getContext('2d');
            context.drawImage(img, 0, 0, rightCanvasContainerRef.current.clientWidth, rightCanvasContainerRef.current.clientHeight);
            // // setCanvasWidth2(videoContainerRef.current.clientWidth);
            // // setCanvasHeight2(videoContainerRef.current.clientHeight);
            // var context = rightCanvasRef.current.getContext('2d');
            // context.drawImage(img, 0, 0, rightCanvasRef.current.clientWidth, rightCanvasRef.current.clientHeight);
        }

        img.src = base64_responseImage;
    }








    useEffect(() => {

        videoSocketService_NoTrick.current = new VideoSocketService_NoTrick(SERVER, drawOnLeftCanvasFunction, leftCanvasDelayDisplayer);
        videoSocketService_NewTrick.current = new VideoSocketService_NewTrick(SERVER, drawOnRightCanvasFunction, rightCanvasDelayDisplayer)


        return () => {
        }

    }, [])


    //Clearing the interval when going to other pages
    useEffect(() => {

        return () => {
            clearInterval(updateCanvasInterval.current);
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            // videoSocketService.current.disconnect();
            // videoSocketService2.current.disconnect();

            ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
            videoSocketService_NoTrick.current.sendNextBase64Frame(base64_image);
            videoSocketService_NewTrick.current.sendNextBase64Frame(base64_image);
        }


    }

    const toggle = () => {

        if (!recording.current) {

            videoSocketService_NoTrick.current.connect(frameRate);
            videoSocketService_NewTrick.current.connect(frameRate);

            updateCanvasInterval.current = setInterval(() => {
                capture();
            }, frameTime);

        } else {
            clearInterval(updateCanvasInterval.current);
            videoSocketService_NoTrick.current.disconnect();
            videoSocketService_NewTrick.current.disconnect();
        }

        recording.current = !recording.current;
    }



    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const focusLeftCanvasState = -1;
    const focusNeutralState = 0;
    const focusRightCanvasState = 1;

    function handleClickOutside(event) {
        if ((focusState == 1 || focusState == -1)
            && (leftCanvasRef.current && rightCanvasRef.current)
            && (!leftCanvasRef.current.contains(event.target) && !rightCanvasRef.current.contains(event.target))) {
            console.log("reee")
            setFocusState(focusNeutralState);

            setLeftCanvasContainerWidth('45%')
            setRightCanvasContainerWidth('45%')


        }
    }

    // -1 for focusing leftCanvas, 1 for focusing rightCanvas, 0 for none
    const [focusState, setFocusState] = useState(focusNeutralState);
    useEffect(() => {

        if (focusState != focusNeutralState)
            document.addEventListener("mousedown", handleClickOutside);

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




    return (
        <div className="w-[100%] h-[90vh] flex flex-col justify-center bg-orange-600" >
            <button onClick={(e) => {
                toggle();
            }}>Toggle</button>

            {/* Invisible react-webcam component to get feed from the webcam */}
            {recording ?
                <div ref={videoContainerRef} className="absolute invisible flex flex-col items-center ">
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
                    >

                    </Webcam>
                </div>
                :
                {}
            }

            <div className="canvasContainer flex flex-row justify-between items-center bg-green-900 h-4/5">
                <div className="leftCanvasContainer transition-all: duration-500 ease-in-out
                bg-green-500 h-full
                flex flex-col
                 justify-center
                "
                    ref={leftCanvasContainerRef}

                    // style={{
                    //     width: leftCanvasContainerWidth,
                    //     transitionProperty: 'all',
                    //     transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                    //     transitionDuration: '500ms'
                    // }}

                    style={(focusState == focusNeutralState) ?
                        {
                            width: leftCanvasContainerWidth,
                            // transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                            marginRight: '-2vw',
                            marginLeft: '2.5vw'
                        }
                        :
                        {
                            width: leftCanvasContainerWidth,
                            // transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                            marginRight: '-3vw',
                            marginLeft: '2.5vw'
                        }
                    }



                >
                    <div className="leftCanvasWrapper w-[100%] aspect-video transition-transform: duration-500 ease-in-out"

                        style={(focusState == focusRightCanvasState) ?
                            {
                                transitionDuration: '500ms',
                                transform: 'translate(0, 17.75vh)',
                                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                            }
                            :
                            {}

                        }

                        onMouseDown={
                            () => {
                                setFocusState(focusLeftCanvasState)
                                focusOnLeftCanvas()
                            }
                        }

                    >
                        {
                            (focusState == focusRightCanvasState) ?
                                <div  ref={rightCanvasDelayDisplayer} className="absolute translate-y-[-6vh] bg-yellow-600">RIGHT STAT CHART</div>
                                :
                                <></>
                        }

                        {
                            (focusState != focusLeftCanvasState) ?
                                <div  ref={leftCanvasDelayDisplayer} className="absolute translate-y-[-3vh] bg-yellow-600">LEFT STAT CHART</div>
                                :
                                <></>
                        }

                        <canvas width={leftCanvasWidth} height={leftCanvasHeight} className="w-[100%] aspect-video transition-all: duration-500 " ref={leftCanvasRef}

                            style={focusState == focusNeutralState ?
                                {
                                    borderRadius: '3rem',
                                }
                                :
                                ((focusState == focusLeftCanvasState) ?
                                    {
                                        borderRadius: '2rem',
                                    }
                                    :
                                    {
                                        borderRadius: '4rem',

                                    }
                                )
                            }

                        >
                        </canvas>
                    </div>
                </div>

                <div className="rightCanvasContainer transition-all: duration-500 ease-in-out
                 bg-purple-600 h-full
                 flex flex-col
                  justify-center
                 
                
                    
                "
                    ref={rightCanvasContainerRef}


                    style={(focusState == focusNeutralState) ?
                        {
                            width: rightCanvasContainerWidth,
                            // transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                            // marginLeft: '-2vw',
                            marginRight: '2.5vw'
                        }
                        :
                        {
                            width: rightCanvasContainerWidth,
                            // transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                            // marginLeft: '-100vw',
                            marginRight: '2.5w'

                        }
                    }


                >
                    <div className="rightCanvasWrapper w-[100%] aspect-video transition-transform: duration-500 ease-in-out"

                        style={(focusState == focusLeftCanvasState) ?
                            {
                                transitionDuration: '500ms',
                                transform: 'translate(0, 17.75vh)',
                                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                            }
                            :
                            {}

                        }


                        onMouseDown={
                            () => {
                                setFocusState(focusRightCanvasState)
                                focusOnRightCanvas()
                            }
                        }

                    >

                        {
                            (focusState == focusLeftCanvasState) ?
                                <div ref={leftCanvasDelayDisplayer} className="absolute translate-y-[-6vh] bg-yellow-600">LEFT STAT CHART</div>
                                :
                                <></>
                        }

                        {
                            (focusState != focusRightCanvasState) ?
                                <div ref={rightCanvasDelayDisplayer} className="absolute translate-y-[-3vh] bg-yellow-600">RIGHT STAT CHART</div>
                                :
                                <></>
                        }

                        <canvas width={rightCanvasWidth} height={rightCanvasHeight} className="w-[100%] aspect-video  transition-all: duration-500"
                            style={focusState == focusNeutralState ?
                                {
                                    borderRadius: '3rem',
                                }
                                :
                                ((focusState == focusLeftCanvasState) ?
                                    {
                                        borderRadius: '4rem',
                                    }
                                    :
                                    {
                                        borderRadius: '2rem',

                                    }
                                )
                            }

                            ref={rightCanvasRef}>
                        </canvas>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoPlayer
