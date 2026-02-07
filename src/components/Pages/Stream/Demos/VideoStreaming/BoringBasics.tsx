import clientEmit from './screenshots/clientEmit.png'
import clientReceive from './screenshots/clientReceive.png'
import serverReceive from './screenshots/serverReceive.png'

function BoringBasics() {

    const frontendSetup = 'For the frontend, I picked ReactJS as the framework for the making this webapp. I used both TailwindCSS and CSS for styling and CSSTransition for mounting/unmounting animations. For video streaming, I utilized SocketIO to send and receive messages from the server.';
    const frontendDescription1 = 'Sending frames in base64 format to the server.';
    const frontendDescription2 = 'Upon receiving a frame from the server, create an image object and draw that image onto the displaying canvas.';
    const backendSetup = 'For the server, I opted to use Flask. This was due to the fact that, as compared to NodeJS, it was simpler to get my facial detection program up and running. I also used the Model-View-Controller-Service design pattern because most of the models were already implemented in my previous project and I only needed to add the controller and the service layer.';
    const backendDescription1 = 'To integrate my facial detection program to the backend. I compiled my python scripts into a library and upload that to PyPI. From there, I can just install the library using pip.'
    const backendDescription2 = 'pip install --upgrade glyFacialDetection'
    const backendDescription3 = 'Then, when a frame arrived at the server, I can just pass that through my program and send back to the client the processed frame.'

    const additionalSetup = 'To reduce video latency, I also provided the option to only send the coordinates of the faces in the image to the clients rather than the entire processed images. This also meant that I had to have the frontend draw the faces’ bounding boxes on the original frames before displaying them.';

    return (
        <div className="boringBasics stream-article">

            <div className=" w-full">
                <div>
                    <div className="flex flex-col items-center text-brand-heading">
                        <div className="stream-section-heading">Frontend</div>
                    </div>

                    <br></br>
                    <div>{frontendSetup}</div>
                </div>

                <br></br>

                <div className="flex flex-col items-center">
                    <div>
                        {frontendDescription1}
                    </div>
                    <div className=" w-3/5 mt-4">
                        <img alt="Client emitting frame code" src={clientEmit} className="  w-[100%] h-auto rounded-3xl"></img>
                    </div>
                </div>

                <br></br>

                <div>
                    <div>
                        {frontendDescription2}
                    </div>
                    <img alt="Client receiving frame code" src={clientReceive} className="  w-[100%] h-auto rounded-3xl mt-4"></img>
                </div>
            </div>

            {/* ************************************************************************************* */}

            <div className="w-full mt-[4vw]">
                <div>
                    <div className="flex flex-row justify-center">
                        <div className="stream-section-heading">Backend</div>
                    </div>

                    <br></br>
                    <div>{backendSetup}</div>
                </div>

                <br></br>

                <div>
                    <div>
                        {backendDescription1}
                    </div>
                    <div className="flex flex-row justify-center">
                        <div className="stream-code-pill pt-[0.1vw] pb-[0.42vw] px-[1vw] mt-[0.6vw]">
                            {backendDescription2}
                        </div>
                    </div>
                </div>

                <br></br>

                <div>
                    <div>
                        {backendDescription3}
                    </div>
                    <div>
                        <img alt="Server receiving frame code" src={serverReceive} className="  w-[100%] h-auto rounded-3xl mt-[0.6vw]"></img>
                    </div>
                </div>


            </div>


            <div className=" w-full mt-[4vw]">
                <div>
                    <div className="flex flex-row justify-center">
                        <div className="stream-section-heading">Additional stuff</div>
                    </div>

                    <br></br>
                    <div>{additionalSetup}</div>
                </div>

            </div>

        </div>
    )
}

export default BoringBasics
