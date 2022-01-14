import { React } from "react";
import { useState, useRef } from "react";

import { CSSTransition } from "react-transition-group";
import BoringBasics from "./BoringBasics";

// Import css file
import "./TimeStepBody.css"
import EncounteredProblems from "./EncounteredProblems";

function DemoTimeStepBody() {


    const [readBoringBasics, setReadBoringBasics] = useState(true);
    const boringBasicsRef = useRef();
    const encounteredProblemsRef = useRef();


    return (
        <div
            className="w-full bg-gray-800 rounded-3xl
            flex flex-col items-center
            "

        >
            {/* ******************************************************************************************************************************* */}
            <div className="flex flex-row justify-center p-5  ">
                <div className=" text-6xl text-cyan-400 ">TechStack</div>
            </div>

            {/* ******************************************************************************************************************************* */}
            <div className="grid grid-cols-7 bg-blue-700 rounded-[5rem] p-3">
                <div className=" col-start-2 col-span-1 flex flex-row justify-center ">
                    <div className="text-5xl">ReactJS</div>
                </div>
                <div className="col-start-4 col-span-1 flex flex-row justify-center">
                    <div className="text-5xl">SocketIO</div>
                </div>
                <div className="col-start-6 col-span-1 flex flex-row justify-center">
                    <div className="text-5xl">Flask</div>
                </div>
            </div>

            {/* ******************************************************************************************************************************* */}
            <div className="w-[100%]">
                <div className="flex flex-row justify-evenly p-2">
                    <div className="text-[2.75rem] text-cyan-400"
                        onClick={() => {
                            setReadBoringBasics(true);
                        }}
                    >Boring Basics</div>
                    <div className="text-[2.75rem] text-cyan-400"
                        onClick={() => {
                            setReadBoringBasics(false);
                        }}
                    >Encoutered Problems</div>
                </div>
            </div>

            {/* ******************************************************************************************************************************* */}

            <div className="flex flex-row   w-4/5 mt-10 ">
                    <CSSTransition
                        in={readBoringBasics}
                        timeout={{
                            enter: 1000,
                            exit: 1000,
                        }}
                        unmountOnExit
                        classNames="boringBasicsTransition"
                    >

                        <BoringBasics ref={boringBasicsRef}></BoringBasics>
                    </CSSTransition>
                    <CSSTransition
                        in={!readBoringBasics}
                        timeout={{
                            enter: 1000,
                            exit: 1000,
                        }}
                        unmountOnExit
                        classNames="encounteredProblemsTransition"
                    >

                        <EncounteredProblems ref={encounteredProblemsRef}></EncounteredProblems>
                    </CSSTransition>

                    <canvas className="resizableBackground transition-all: duration-500 ease-in-out"
                        style={
                            readBoringBasics ? 
                            {
                                height: '194vh',
                            }
                            :
                            {
                                height: '394vh',
                            }
                        }
                    
                    >
                    </canvas>
            </div>


            {/* <div>
                    <div>Setting up the frontend</div>
                    <div>For the frontend, I simply use SocketIO to send and receive messages from the server.</div>
                    <div>Solution</div>
                </div>

                <div>
                    <div>Setting up Backend</div>
                    <div>For the server, I opted to use Flask as the framework for the server. This was because, compared to NodeJS, it was easier to get my facial detection program up and running. I picked SocketIO to handle receiving and sending back data to the clients. I also implemented the backend using the MVC design pattern.

                        To integrate my facial detection program to the backend. I compiled my python scripts into a library and upload that to PyPI. From there, I can just install the library using pip .
                        “pip install --upgrade glyFacialDetection”
                        Then, from the received image, I can just pass that through my program and send back to the client the processed frame.
                    </div>
                    <div>Solution</div>
                </div>

                <div>
                    <div>NEVA SETTLE</div>
                    <div>Well that was easy huh. The frames the clients sent were processed and returned. The app is now working.
                        HOWEVER, the returning frames don’t arrive in a constant interval. They were returned only after the server is done running the facial detection on that frame, and only arrived to the client after a varying amount of time due to the nature of the internet. This led to frames sometimes arrive to the clients out of order, or the displayed video isn’t smooth because of the intervals between frames vary.
                        To fix this, I had to implement additional features in both frontend and backend.

                    </div>
                    <div>Solution</div>
                </div>

                <div>
                    <div>In the backend, I made a class called ServerVideoManager (SVM) to create an unique object SVM for each client that exists throughout the socket connection. SVM sends back appropriate frames and handles parallel processing for the skip frame feature.
                        When there’s an incoming frame with frameID, the SVM takes that frame, create a new thread to run facial detection on the frame and keep track of where that thread is. SVM also has a background thread that run on an interval to check up on all the facial detection threads.
                        When the background thread finds a thread/threads that finished running,
                        it picks the frame from the latest thread and only send that frame with the frameID back to the client. Then it remove all the finished threads and wait for the next interval.

                        This helps eliminating out of order frames. Even though the client loose information, but with the constant stream of input coming into the server, that skipped frame doesn’t mean much.

                    </div>
                </div>

                <div>
                    <div>
                    </div>
                </div> */}

                <div className="h-[500px]"></div>

        </div>

    )
}

export default DemoTimeStepBody
