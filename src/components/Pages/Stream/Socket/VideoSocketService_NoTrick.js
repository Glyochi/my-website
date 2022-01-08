import { Socket } from "socket.io-client";
import { io } from "socket.io-client"


class VideoSocketService_NoTrick {

    constructor(url, drawOnCanvasFunction) {

        this.drawOnCanvas = drawOnCanvasFunction

        this.socketio = io(url)
        this.videoSocket = null
        // This is to prevent client to make a connection to the server to soon. We just want it to be there
        let temp = this.socketio.connect()
        temp.disconnect()

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


            this.drawOnCanvas(base64_responseFrame)
            
            console.log("Delay No Trick: " + actualDelay.toFixed(2) + " ms")
            
            
            for (let i = 0; i < frameID - this.latestDrawnFrameID; i++){
                this.frameSentTime.shift()
            }

            this.latestDrawnFrameID = frameID

        })

    }

    disconnect = () => {
        this.playing = false
        this.videoSocket.disconnect(this.client_id)
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





