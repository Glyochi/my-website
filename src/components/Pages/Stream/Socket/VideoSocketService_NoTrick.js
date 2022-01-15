import { Socket } from "socket.io-client";
import { io } from "socket.io-client"


class VideoSocketService_NoTrick {

    constructor(url, canvasArtist , displayRef) {

        this.artist = canvasArtist
        this.displayRef = displayRef


        this.socketio = io(url, { transport : ['websocket'] })
        this.videoSocket = null
        // This is to prevent client to make a connection to the server to soon. We just want it to be there
        let temp = this.socketio.connect()
        temp.disconnect();
        // temp.on('connect', () => {
        //     console.log("connected + disconnected")
        //     temp.disconnect();
        // })

        // To signal the timeout function to draw or not
        this.playing = false

        this.client_id = this.socketio.id

        // This is to track at what frame the videoSocketServe is on (frameID starts from 1)
        this.videoFrameID = 0
        this.latestDrawnFrameID = 0

        this.frameSentTime = []


        // This is for calculating the delay between each frames and only draw when its time to see that frame
        // => Reduce jittering, but sacrifice latency 
        // MILISECON
        this.frameTimeInterval = null


    }

    // This function create a wesocket connection and emit an initialize signal to the server
    connect = (frameRate) => {

        this.playing = true

        this.frameTimeInterval = (1 / frameRate) * 1000
        this.frameSentTime = []
        this.videoFrameID = 0
        this.latestDrawnFrameID = 0

        

        this.videoSocket = this.socketio.connect()
        this.videoSocket.on('connect', () => {
            console.log(this.videoSocket.id)
            this.client_id = this.videoSocket.id
            this.videoSocket.emit('initialize', this.client_id, frameRate, false)
        })

        this.videoSocket.on('testingFromServer', (data) =>{ 
            console.log(data);
        })
        console.log("clientSent")
        this.videoSocket.emit('testingFromClient');

        this.videoSocket.on('frameToClient', (data) => {
            let base64_responseFrame = data.base64_responseFrame
            let frameID = data.frameID

            // If the received frame is before the most recent displayed frame then we just ignore it
            if (frameID <= this.latestDrawnFrameID) {
                return
            }

            let supposedDrawnTime = this.frameSentTime[frameID - this.latestDrawnFrameID - 1]
            let actualDrawnTime = performance.now()
            var actualDelay = actualDrawnTime - supposedDrawnTime

            // Draw the frame on canvas
            this.artist.draw(base64_responseFrame)
            
            // Update the stats on the statDisplayer
            this.displayRef.addDelay(actualDelay);
            this.displayRef.drawOnDisplayer();
            
            
            for (let i = 0; i < frameID - this.latestDrawnFrameID; i++){
                this.frameSentTime.shift()
            }

            this.latestDrawnFrameID = frameID

        })

    }

    disconnect = () => {
        this.playing = false
        if(this.videoSocket != null){
            this.videoSocket.emit('cleanup', this.client_id)
            this.videoSocket.disconnect()
        }
    }

    // This function send the next frame to the server
    sendNextBase64Frame = (base64_frame) => {
        
        if (base64_frame != null) {
            // Store the time when the frame was first sent to the server
            this.frameSentTime.push(performance.now())

            this.videoSocket.emit('frameToServer', this.client_id, base64_frame, this.videoFrameID)
            // FrameID starts from 0
            this.videoFrameID += 1
        }
    }







}


export default VideoSocketService_NoTrick;






