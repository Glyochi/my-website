import { useState, useEffect, Component , Children} from "react"
import VideoPlayer from "./VideoPlayer";


/** 
 * This class basically create a websocket that goes with the video player
 */
class VideoStreamingComponent extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            ws: null
        };
    }

    // //Single websocket instance for the videoplayer

    // componentDidMount() {
    //     this.connect();
    // }


    // timeout = 250; //Initial timeout duration as a class variable

    // /**
    //  * @function connect
    //  * This function establishes the connection with the websocket and also constantly
    //  * trying to reconnect if connection closes
    //  */
    // connect = () => {
    //     var websocket = new WebSocket("ws://localhost:5000/ws");
    //     let that = this; //cache the this (save the state of this in that lol)
    //     var connectInterval;

    //     // websocket onopen event listener
    //     websocket.onopen = () => {
    //         console.log("Connected reeeeeeeeeee");

    //         this.setState({ws: websocket})
    //         that.timeout = 250; //reset timer to 250 on open of websocket connection
    //         clearTimeout(connectInterval); //clear Interval on onopen of websocket connection

    //     }

    //     websocket.onclose = e => {
    //         let str = 'Closed. Reconnect will be attempted in ' + Math.min(10000/1000, (that.timeout + that.timeout) / 1000) + ' seconds'
    //         console.log(str, e.reason);

    //         that.timeout = that.timeout + that.timeout; //increment retry interval
    //         connectInterval = setTimeout(this.check, Math.min(10000, that.timeout));
    //     }

    //     websocket.onerror = err => {
    //         console.error('Error', err.message, 'Closing socket');
            
    //         websocket.close();
    //     };
        
    // }

    // check = () => {
    //     const { ws } = this.state;

    //     if(!ws || ws.readyState == WebSocket.CLOSED) this.connect();
    // };

    
    render () {
        // return <VideoPlayer websocket={this.state.ws}/>;
        return <></>
    }

}

export default VideoStreamingComponent
