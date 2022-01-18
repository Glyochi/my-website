import { Socket } from "socket.io-client";
import { io } from "socket.io-client"


class VideoSocketService_drawFacesOnClient {

    constructor(url, canvasArtist, displayRef) {

        this.artist = canvasArtist
        this.displayRef = displayRef

        this.socketio = io(url,  {transport: ['websocket']})
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

        this.latestResponseFrameID = 0
        this.delay = 0
        this.frameSentTime = []
        this.frameQueue = []


        // This is for calculating the delay between each frames and only draw when its time to see that frame
        // => Reduce jittering, but sacrifice latency 
        // MILISECON
        this.frameTimeInterval = null

        // The amount of time the client will try to reduce the delay by for each frame
        this.DELAY_REDUCING_OFFSET = 18

    }

    // This function create a wesocket connection and emit an initialize signal to the server
    connect = (frameRate) => {

        this.playing = true

        this.frameTimeInterval = (1 / frameRate) * 1000
        this.delay = 0
        this.frameSentTime = []
        this.frameQueue = []
        this.videoFrameID = 0
        this.latestDrawnFrameID = 0
        this.latestResponseFrameID = 0

    

        this.videoSocket = this.socketio.connect()
        this.videoSocket.on('connect', () => {
            console.log(this.videoSocket.id)
            this.client_id = this.videoSocket.id
            this.videoSocket.emit('initialize', this.client_id, frameRate, true)
        })

        
        console.log("clientSent")
        this.videoSocket.emit('testingFromClient');


        this.videoSocket.on('frameToClient_coordinates', (data) => {
            let faceCoordinates = data.faceCoordinates
            let frameID = data.frameID

            // If the received frame is before the most recent displayed frame then we just ignore it
            if (frameID <= this.latestDrawnFrameID) {
                return
            }

            // If the received frame is later than the latest received frame from the server
            if (frameID > this.latestResponseFrameID) {
                this.latestResponseFrameID = frameID
            }




            let supposedDrawnTime = this.frameSentTime[frameID - this.latestDrawnFrameID - 1]
            let drawingFrame = this.frameQueue[frameID - this.latestDrawnFrameID - 1]
            let actualDrawnTime = performance.now()
            var actualDelay = actualDrawnTime - supposedDrawnTime
            var desiredDelay = this.delay - this.DELAY_REDUCING_OFFSET

            if (desiredDelay > actualDelay) {

                // If the delay can be decrease (actualDelay < desiredDelay) 
                var drawFrame = (vss, delayThen) => {
                    // Edge case where a later frame than the (current frame that is about to be drawn in this function) has already been drawn
                    if (frameID <= vss.latestDrawnFrameID)
                        return

                    // Draw the frame on canvas with the face bounding boxes
                    vss.artist.draw(drawingFrame, frameID, faceCoordinates);


                    // Update the stats on the statDisplayer
                    this.displayRef.addDelay(delayThen);
                    this.displayRef.drawOnDisplayer();

                    // Removing the start time of already drawn frames
                    for (let i = 0; i < frameID - vss.latestDrawnFrameID; i++) {
                        vss.frameSentTime.shift()
                        vss.frameQueue.shift()
                    }

                    vss.latestDrawnFrameID = frameID
                }

                setTimeout(drawFrame, desiredDelay - actualDelay, this, desiredDelay)
                this.delay = desiredDelay

            } else {
                // If the delay increases (actualDelay > lastDelay) or the amount of delay decrease (lastDelay - actualDelay) is not as large as DELAY_REDUCING_OFFSET then
                
                // Draw the frame on canvas with the face bounding boxes
                this.artist.draw(drawingFrame, frameID, faceCoordinates);

                // Update the stats on the statDisplayer
                this.displayRef.addDelay(actualDelay);
                this.displayRef.drawOnDisplayer();

                // Removing the start time of already drawn frames
                for (let i = 0; i < frameID - this.latestDrawnFrameID; i++) {
                    this.frameSentTime.shift()
                    this.frameQueue.shift()
                }

                this.latestDrawnFrameID = frameID
                this.delay = actualDelay
            }

        })

    }

    disconnect = () => {
        this.playing = false
        if (this.videoSocket != null) {
            this.videoSocket.emit('cleanup', this.client_id)
            this.videoSocket.disconnect()
        }
    }

    // This function send the next frame to the server
    sendNextBase64Frame = (base64_frame) => {

        if (base64_frame != null) {
            // Store the time when the frame was first sent to the server
            this.frameSentTime.push(performance.now())
            this.frameQueue.push(base64_frame)

            // Sending image to the server
            this.videoSocket.emit('frameToServer_coordinates', this.client_id, base64_frame, this.videoFrameID)

            // FrameID starts from 0
            this.videoFrameID += 1
        }
    }







}


export default VideoSocketService_drawFacesOnClient;






