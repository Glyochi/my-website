


class CanvasArtist {
    constructor(canvasRef, canvasContainerRef, helperFunctions) {
        this.canvasRef = canvasRef;
        this.canvasContainerRef = canvasContainerRef;
        this.helperFunctions = helperFunctions;
    }

    draw(base64_image) {
        let img = new Image();

        //Update the image on canvas
        img.onload = () => {
            
            this.helperFunctions.setCanvasHeight( this.canvasContainerRef.current.clientHeight);
            this.helperFunctions.setCanvasWidth( this.canvasContainerRef.current.clientWidth)
            var context = this.canvasRef.current.getContext('2d');
            context.drawImage(img, 0, 0,  this.canvasContainerRef.current.clientWidth,  this.canvasContainerRef.current.clientHeight);
        }

        img.src = base64_image;
    }
}

export default CanvasArtist;