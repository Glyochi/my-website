import React, { useRef, useState, useEffect } from "react";
import { io } from "socket.io-client"

function VideoPlayer() {
    const SERVER = "http://127.0.0.1:5000/";

    const videoRef = useRef(null);
    const frameRate = 24;
    const frameTime = 1000 / frameRate;

    const [videoStream, setVideoStream] = useState(null);


    const [serverData, setServerData] = useState(null);

    /**This is a workaround for some reasons setState doesnt work very well when you 
     * dont initialize the videoSOcket to be a socket object
    */
    var temp = io(SERVER);
    const [socketio, setSocketIO] = useState(temp);
    const [videoSocket, setVideoSocket] = useState(temp.connect());

    const getVideo = () => {
        navigator.mediaDevices.getUserMedia({
            video: {
                width: 1920,
                height: 1090,
                frameRate: frameRate,
            }
        })
            .then(stream => {
                let video = videoRef.current;
                video.srcObject = stream;
                video.play();

                

                //Recoder object allows us to access raw binary data stream from the camera

                const recorder = new MediaRecorder(stream);
                recorder.ondataavailable = (event) => {
                    // console.log(event.data);

                    videoSocket.emit('message', { message: "reeee" });
                }

                //Recoder object starts after every new frame is received
                recorder.start(frameTime);
                
                // setVideoStream(stream);
            })
            .catch(err => {
                console.error(err);
            })
    }


    useEffect(() => {

        //io(SERVER).connect to return a socket object
        var tempSocketIO = io(SERVER);
        setSocketIO(tempSocketIO);
        var tempSocket = tempSocketIO.connect();
        setVideoSocket(tempSocket);
        // videoSocket.emit('message', { message: "reeee" });

        return () => {
            // socketio.disconnect();
            // videoStream.getTracks.forEach((track) => track.stop());
        }

    }, [])


    //For streaming video data to the html page
    useEffect(() => {

        getVideo();


        return {
        }
    }, [videoRef])

    // useEffect(() => {

    //     return () => {
    //         socketio.disconnect();
    //     }
    // }, [])

    // //For websocket initialization
    // useEffect(() => {

    //     var socket = new socketClient(SERVER);

    //     console.log("reeeee");

    //     websocket.onopen = () => {
    //         console.log("connected");
    //     }

    //     websocket.onmessage = evt => {

    //         const message = JSON.parse(evt.data);
    //         setServerData(message);
    //         console.log("REEEEEEEEEEEE" );
    //         console.log(message);

    //     }

    //     websocket.onclose = () => {
    //         console.log('disconnected');
    //     }


    //     setWS(websocket);


    // }, [])


    return (
        <div>
            <video ref={videoRef}>
            </video>
        </div>
    )
}

export default VideoPlayer
