
// This class is to draw the received frames/images from the server to the canvas it was assigned to.
class CanvasArtist {
    constructor(canvasRef, canvasContainerRef, helperFunctions, originalRes, coordinatesRes) {
        this.canvasRef = canvasRef;
        this.canvasContainerRef = canvasContainerRef;
        this.helperFunctions = helperFunctions;
        this.originalRes = originalRes;
        this.coordinatesRes = coordinatesRes;
        this.lastFaceCoordinates = null;
        this.lastFaceCoordinatesID = 0;
        this.lastFacePersistenceTime = 4;
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
                if(frameID - this.lastFaceCoordinatesID > this.lastFacePersistenceTime){
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
            this.lastFaceCoordinatesID = frameID;

        }

        img.src = base64_frame;
    }


}

export default CanvasArtist;