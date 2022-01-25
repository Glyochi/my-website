import { height } from "@mui/system";

// This class is to draw the received frames/images from the server to the canvas it was assigned to.
class CanvasArtist {
    constructor(canvasRef, canvasContainerRef, helperFunctions, originalRes, coordinatesRes) {
        this.canvasRef = canvasRef;
        this.canvasContainerRef = canvasContainerRef;
        this.helperFunctions = helperFunctions;
        this.originalRes = originalRes;
        this.coordinatesRes = coordinatesRes;
        this.lastFaceAngles = null
        this.lastFaceCoordinates = null;
        this.lastFaceInfoID = 0;
        this.lastFacePersistenceTime = 10;
    }

    draw(base64_image) {
        let img = new Image();

        //Update the image on canvas
        img.onload = () => {

            this.helperFunctions.setCanvasHeight(this.canvasContainerRef.current.clientHeight);
            this.helperFunctions.setCanvasWidth(this.canvasContainerRef.current.clientWidth)
            var context = this.canvasRef.current.getContext('2d');
            context.drawImage(img, 0, 0, this.canvasContainerRef.current.clientWidth, this.canvasContainerRef.current.clientHeight);
        }

        img.src = base64_image;
    }

    draw_coordinates(base64_frame, frameID, faceCoordinates) {
        let img = new Image();

        //Update the image on canvas
        img.onload = () => {

            let currentCanvasWidth = this.canvasContainerRef.current.clientWidth;
            let currentCanvasHeight = this.canvasContainerRef.current.clientHeight;

            this.helperFunctions.setCanvasHeight(currentCanvasHeight);
            this.helperFunctions.setCanvasWidth(currentCanvasWidth);
            var context = this.canvasRef.current.getContext('2d');
            context.drawImage(img, 0, 0, currentCanvasWidth, currentCanvasHeight);

            if (faceCoordinates == null) {
                if (this.lastFaceCoordinates == null) {
                    return;
                }
                // Only draw last face coordinates up to 2 frames after the last updated coordinates
                if (frameID - this.lastFaceInfoID > this.lastFacePersistenceTime) {
                    this.lastFaceCoordinates = null;
                    return;
                }
                // Drawing the face bounding boxes
                let x, y, w, h;
                context.beginPath();
                context.lineWidth = 2;
                context.strokeStyle = 'orange';
                for (let i = 0; i < this.lastFaceCoordinates.length; i++) {
                    let face = this.lastFaceCoordinates[i]
                    x = face[0] * currentCanvasWidth / this.coordinatesRes.width;
                    y = face[1] * currentCanvasHeight / this.coordinatesRes.height;
                    w = face[2] * currentCanvasWidth / this.coordinatesRes.width;
                    h = face[3] * currentCanvasHeight / this.coordinatesRes.height;
                    context.rect(x, y, w, h);
                }
                context.stroke();
                return;
            }

            // Drawing the face bounding boxes
            let x, y, w, h;
            context.beginPath();
            context.lineWidth = 2;
            context.strokeStyle = 'orange';
            for (let i = 0; i < faceCoordinates.length; i++) {
                let face = faceCoordinates[i]
                x = face[0] * currentCanvasWidth / this.coordinatesRes.width;
                y = face[1] * currentCanvasHeight / this.coordinatesRes.height;
                w = face[2] * currentCanvasWidth / this.coordinatesRes.width;
                h = face[3] * currentCanvasHeight / this.coordinatesRes.height;
                context.rect(x, y, w, h);
            }
            context.stroke();
            this.lastFaceCoordinates = faceCoordinates;
            this.lastFaceInfoID = frameID;

        }

        img.src = base64_frame;
    }


    enhanced_draw_coordinates(base64_frame, frameID, faceInfo) {
        let img = new Image();

        //Update the image on canvas
        img.onload = () => {

            let currentCanvasWidth = this.canvasContainerRef.current.clientWidth;
            let currentCanvasHeight = this.canvasContainerRef.current.clientHeight;

            this.helperFunctions.setCanvasHeight(currentCanvasHeight);
            this.helperFunctions.setCanvasWidth(currentCanvasWidth);
            var context = this.canvasRef.current.getContext('2d');
            context.drawImage(img, 0, 0, currentCanvasWidth, currentCanvasHeight);

            if (faceInfo == null) {
                // if (this.faceInfo == null) {
                //     return;
                // }
                // // Only draw last face coordinates up to 2 frames after the last updated coordinates
                // if (frameID - this.lastFaceInfoID > this.lastFacePersistenceTime) {
                //     this.lastFaceCoordinates = null;
                //     this.lastFaceAngles = null;
                //     return;
                // }
                // // Drawing the face bounding boxes
                // let x, y, w, h;
                // context.beginPath();
                // context.lineWidth = 2;
                // context.strokeStyle = 'orange';
                // for (let i = 0; i < this.lastFaceCoordinates.length; i++) {
                //     let face = this.lastFaceCoordinates[i]
                //     let upperLeft = face[0]
                //     let upperRight = face[1]
                //     let lowerRight = face[2]
                //     let lowerLeft = face[3]
                //     let widthScale = currentCanvasWidth / this.coordinatesRes.width
                //     let heightScale = currentCanvasHeight / this.coordinatesRes.height
                //     context.beginPath()
                //     context.moveTo(upperLeft[0] * widthScale, upperLeft[1] * heightScale)
                //     context.lineTo(upperRight[0] * widthScale, upperRight[1] * heightScale)
                //     context.stroke()


                //     context.beginPath()
                //     context.moveTo(upperRight[0] * widthScale, upperRight[1] * heightScale)
                //     context.lineTo(lowerRight[0] * widthScale, lowerRight[1] * heightScale)
                //     context.stroke()


                //     context.beginPath()
                //     context.moveTo(lowerRight[0] * widthScale, lowerRight[1] * heightScale)
                //     context.lineTo(lowerLeft[0] * widthScale, lowerLeft[1] * heightScale)
                //     context.stroke()


                //     context.beginPath()
                //     context.moveTo(lowerLeft[0] * widthScale, lowerLeft[1] * heightScale)
                //     context.lineTo(upperLeft[0] * widthScale, upperLeft[1] * heightScale)
                //     context.stroke()
                // }
                // context.stroke();
                return;
            }

            // Drawing the face bounding boxes
            context.beginPath();
            context.lineWidth = 2;
            context.strokeStyle = 'orange';
            for (let i = 0; i < faceInfo.length; i++) {
                let face = faceInfo[i][0]
                let leftEye = faceInfo[i][1]
                let rightEye = faceInfo[i][2]
                let angle = faceInfo[i][3]
                // let angle = faceInfo[i][1]
                // console.log("ANGLE ", angle)

                // Drawing face
                let upperLeft = face[0]
                let upperRight = face[1]
                let lowerRight = face[2]
                let lowerLeft = face[3]
                let widthScale = currentCanvasWidth / this.coordinatesRes.width
                let heightScale = currentCanvasHeight / this.coordinatesRes.height
                context.beginPath()
                context.moveTo(upperLeft[0] * widthScale, upperLeft[1] * heightScale)
                context.lineTo(upperRight[0] * widthScale, upperRight[1] * heightScale)
                context.stroke()


                context.beginPath()
                context.moveTo(upperRight[0] * widthScale, upperRight[1] * heightScale)
                context.lineTo(lowerRight[0] * widthScale, lowerRight[1] * heightScale)
                context.stroke()


                context.beginPath()
                context.moveTo(lowerRight[0] * widthScale, lowerRight[1] * heightScale)
                context.lineTo(lowerLeft[0] * widthScale, lowerLeft[1] * heightScale)
                context.stroke()


                context.beginPath()
                context.moveTo(lowerLeft[0] * widthScale, lowerLeft[1] * heightScale)
                context.lineTo(upperLeft[0] * widthScale, upperLeft[1] * heightScale)
                context.stroke()

                // Drawing Left Eye
                if (leftEye != null) {
                    upperLeft = leftEye[0]
                    upperRight = leftEye[1]
                    lowerRight = leftEye[2]
                    lowerLeft = leftEye[3]
                    context.beginPath()
                    context.moveTo(upperLeft[0] * widthScale, upperLeft[1] * heightScale)
                    context.lineTo(upperRight[0] * widthScale, upperRight[1] * heightScale)
                    context.stroke()


                    context.beginPath()
                    context.moveTo(upperRight[0] * widthScale, upperRight[1] * heightScale)
                    context.lineTo(lowerRight[0] * widthScale, lowerRight[1] * heightScale)
                    context.stroke()


                    context.beginPath()
                    context.moveTo(lowerRight[0] * widthScale, lowerRight[1] * heightScale)
                    context.lineTo(lowerLeft[0] * widthScale, lowerLeft[1] * heightScale)
                    context.stroke()


                    context.beginPath()
                    context.moveTo(lowerLeft[0] * widthScale, lowerLeft[1] * heightScale)
                    context.lineTo(upperLeft[0] * widthScale, upperLeft[1] * heightScale)
                    context.stroke()
                }
                // Drawing Right Eye
                if (rightEye != null) {
                    upperLeft = rightEye[0]
                    upperRight = rightEye[1]
                    lowerRight = rightEye[2]
                    lowerLeft = rightEye[3]
                    context.beginPath()
                    context.moveTo(upperLeft[0] * widthScale, upperLeft[1] * heightScale)
                    context.lineTo(upperRight[0] * widthScale, upperRight[1] * heightScale)
                    context.stroke()


                    context.beginPath()
                    context.moveTo(upperRight[0] * widthScale, upperRight[1] * heightScale)
                    context.lineTo(lowerRight[0] * widthScale, lowerRight[1] * heightScale)
                    context.stroke()


                    context.beginPath()
                    context.moveTo(lowerRight[0] * widthScale, lowerRight[1] * heightScale)
                    context.lineTo(lowerLeft[0] * widthScale, lowerLeft[1] * heightScale)
                    context.stroke()


                    context.beginPath()
                    context.moveTo(lowerLeft[0] * widthScale, lowerLeft[1] * heightScale)
                    context.lineTo(upperLeft[0] * widthScale, upperLeft[1] * heightScale)
                    context.stroke()
                }
            }
            context.stroke();
            this.lastFaceCoordinates = faceInfo;
            this.lastFaceInfoID = frameID;

        }

        img.src = base64_frame;
    }

}

export default CanvasArtist;