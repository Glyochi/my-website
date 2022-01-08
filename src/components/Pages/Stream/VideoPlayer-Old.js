import { height } from "@mui/system";
import React, { useRef, useState, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import { io } from "socket.io-client"

function VideoPlayer() {
    const SERVER = "http://127.0.0.1:5000/";

    const videoRef = useRef(null);
    const videoContainerRef = useRef(null);
    const canvasRef = useRef(null);


    const frameRate = 24;
    const frameTime = 1000 / frameRate;

    // const videoResHeight = 720;
    // const videoResWidth = 1280;
    const videoResHeight = 1080;
    const videoResWidth = 1920;
    const facialDetectionVideoResHeight = 800;
    const facialDetectionVideoResWidth = facialDetectionVideoResHeight * 1280/720


    const [canvasWidth, setCanvasWidth] = useState(0);
    const [canvasHeight, setCanvasHeight] = useState(0);
    var recording = useRef(false);
    var updateCanvasInterval = useRef();
    var image = useRef();


    const [serverData, setServerData] = useState(null);

    var videoStream = useRef(null);
    var socketio = useRef(null);
    var videoSocket = useRef(null);

  


    useEffect(() => {

        
        socketio.current = io(SERVER)
        var temp = socketio.current.connect()
        temp.disconnect()
        
        
        return () => {
        }

    }, [])


    // Capture the image from the webcam and send that to the server
    const capture = () => {
        var base64_image = videoRef.current.getScreenshot({
            width: facialDetectionVideoResWidth,
            height: facialDetectionVideoResHeight
        });
        
        if(base64_image != null){
            //Sending the image to the server
            videoSocket.current.emit('frameToServer', base64_image);
        }


    }

    const toggle = () => {

        if (!recording.current) {
            

            var socket = socketio.current.connect();
            socket.emit('initialize', frameRate)

            socket.on('frameToClient', (base64_responseImage)=> {
                // console.log(base64_responseImage)
                let img = new Image();

                //Update the image on canvas
                img.onload = () => {
                    
                    setCanvasWidth(videoContainerRef.current.clientWidth);
                    setCanvasHeight(videoContainerRef.current.clientHeight);
                    var context = canvasRef.current.getContext('2d');
                    context.drawImage(img, 0, 0, canvasRef.current.clientWidth, canvasRef.current.clientHeight);
                }
                
                img.src = base64_responseImage;

            });

            videoSocket.current = socket;

            updateCanvasInterval.current = setInterval(() => {
                capture();
            }, frameTime);
        }else{
            clearInterval(updateCanvasInterval.current);
            videoSocket.current.disconnect();
        }

        recording.current = !recording.current;
    }

    //Clearing the interval when going to other pages
    useEffect(() => {
        
        return () => {
            clearInterval(updateCanvasInterval.current);
            videoSocket.current.disconnect();
        }
    }, [videoRef])


    return (
        <div >
            <button onClick={(e) => {
                toggle();
            }}>Toggle</button>

            {recording ?
                <div className="w-3/4">
                    <div ref={videoContainerRef} className="flex flex-col items-center">
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

                    <div className=" bg-red-400">
                        <canvas width={canvasWidth} height={canvasHeight} className="aspect-video bg-orange-500" ref={canvasRef}>
                        </canvas>
                    </div>
                </div>
                :
                {}
            }

        </div>
    )
}

export default VideoPlayer
