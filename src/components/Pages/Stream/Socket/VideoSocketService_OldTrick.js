import { Socket } from "socket.io-client";
import { io } from "socket.io-client"


class VideoSocketService_OldTrick {

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

        // This is to keep track of when the video started playing
        this.startPlayingTime = null
        // This is to track at what frame the videoSocketServe is on (frameID starts from 1)
        this.videoFrameID = 0
        this.latestDrawnFrameID = 0
        // This is to keep track of how long was it since the last displayed frame
        this.latestDrawnFrameTime = null
        this.latestResponseFrameID = 0


        // This is for calculating the delay between each frames and only draw when its time to see that frame
        // => Reduce jittering, but sacrifice latency 
        // MILISECON
        this.frameTimeInterval = null

        // EXPERIMENTING WITH DRAWN FRAME OFFSET
        // THE SMALLER THIS VALUE IS, THE MORE PRECISE THE NEXT FRAME IS GOING TO BE DRAWN (MILISECOND)
        this.FRAME_TIME_OFFSET = (this.frameTimeInterval) * 1000

    }

    // This function create a wesocket connection and emit an initialize signal to the server
    connect = (frameRate) => {

        this.startPlayingTime = performance.now()
        this.playing = true

        this.frameTimeInterval = (1 / frameRate) * 1000
        this.FRAME_TIME_OFFSET = (this.frameTimeInterval/60) * 1000
        this.videoFrameID = 0
        this.latestDrawnFrameID = 0
        this.latestResponseFrameID = 0

        // This is so when receiving the first frame, it will be displayed instantly
        this.latestDrawnFrameTime = performance.now() - this.frameTimeInterval



        this.videoSocket = this.socketio.connect()
        this.videoSocket.on('connect', () => {
            console.log(this.videoSocket.id)
            this.client_id = this.videoSocket.id
            this.videoSocket.emit('initialize', this.client_id, frameRate, true)
        })

        this.videoSocket.on('frameToClient', (data) => {
            let base64_responseFrame = data.base64_responseFrame
            let frameID = data.frameID

            // If the received frame is before the most recent displayed frame then we just ignore it
            if (frameID <= this.latestDrawnFrameID) {
                return
            }

            // If the received frame is later than the latest received frame from the server
            if (frameID > this.latestResponseFrameID){
                this.latestResponseFrameID = frameID
            }

            // this.drawOnCanvas(base64_responseFrame)

            // vss = video socket service object
            const drawFrame = (vss) => {

                if(!vss.playing){
                    return
                }

                ////////////////////////////
                // Check if its time to draw the frame yet
                let frameDif = frameID - vss.latestDrawnFrameID;
                let supposedDrawnTime = vss.latestDrawnFrameTime + frameDif * vss.frameTimeInterval;

                let timeRightNow = performance.now();
                let timeOffset = supposedDrawnTime - timeRightNow;
                // If its time for the frame to be drawn (a tad early is fine)
                if (timeOffset <= vss.FRAME_TIME_OFFSET) {

                    vss.latestDrawnFrameID = frameID;
                    vss.latestDrawnFrameTime = timeRightNow;

                    // Draw on canvas
                    vss.drawOnCanvas(base64_responseFrame)
                    
                    let supposedToBeDrawnTime = (vss.latestDrawnFrameID * vss.frameTimeInterval + vss.startPlayingTime)
                    let delay = vss.latestDrawnFrameTime - supposedDrawnTime
                    console.log("------------------------------------------")
                    console.log("Supposed to be drawn time: " + supposedToBeDrawnTime)
                    console.log("Actual drawn time: " + vss.latestDrawnFrameTime)
                    console.log("Delay: " + delay + " ms")
                    console.log("Available frames: " + (vss.latestResponseFrameID - vss.latestDrawnFrameID) + " frames")
                }
                // If its too soon to draw the next frame
                else {
                    drawFrameSetTimeOutID = setTimeout(
                        drawFrame,
                        timeOffset - vss.FRAME_TIME_OFFSET, vss)

                }

            };


            // Checking when the frame is supposed to be drawn
            let timeTillDrawn = ((frameID - this.latestDrawnFrameID) * this.frameTimeInterval - this.FRAME_TIME_OFFSET) + this.latestDrawnFrameTime - performance.now()

            // If the received frame is after the most recent displayed frame then
            var drawFrameSetTimeOutID = setTimeout(drawFrame, timeTillDrawn, this);



        })

    }

    disconnect = () => {
        this.playing = false
        this.videoSocket.disconnect(this.client_id)
    }

    // This function send the next frame to the server
    sendNextBase64Frame = (base64_frame) => {

        if (base64_frame != null) {
            // FrameID starts from 1
            this.videoFrameID += 1

            this.videoSocket.emit('frameToServer', this.client_id, base64_frame, this.videoFrameID)
        }
    }







}


export default VideoSocketService_OldTrick;






