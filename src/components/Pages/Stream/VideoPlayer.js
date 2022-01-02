import React, { useRef, useState, useEffect } from "react";
import { io } from "socket.io-client"

function VideoPlayer() {
    const SERVER = "http://127.0.0.1:5000/";

    const videoRef = useRef(null);
    const frameRate = 24;
    const frameTime = 1000 / frameRate;

   

    const [serverData, setServerData] = useState(null);

    var videoStream = useRef(null);
    var socketio = useRef(null);
    var videoSocket = useRef(null);

    const getVideo = () => {
        navigator.mediaDevices.getUserMedia({
            video: {
                width: 1920,
                height: 1090,
                frameRate: frameRate,
            
            },
            audio: false,
            
        })
            .then(stream => {
                
                videoStream.current = stream;


                let video = videoRef.current;
                video.srcObject = stream;
                video.play();

                const recorder = new MediaRecorder(stream);
                recorder.ondataavailable = (event) => {
                    console.log(event.data);
                    console.log("reee");
                    videoSocket.current.emit('message', { message: "reeee" });
                }

                //Recoder object starts after every new frame is received
                recorder.start(frameTime);
                
            })
            .catch(err => {
                console.error(err);
            })
    }


    useEffect(() => {
        
        socketio.current = io(SERVER);
        videoSocket.current = socketio.current.connect();

        return () => {
            videoStream.current.getTracks().forEach((track) => track.stop());
        }

    }, [])


    //For streaming video data to the html page
    useEffect(() => {

        getVideo();

        return () => {
        }
    }, [videoRef])

   


    return (
        <div>
            <video ref={videoRef}>
            </video>
        </div>
    )
}

export default VideoPlayer
