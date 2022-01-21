import React from 'react'

import outOfOrderFrames_foundThreads from './screenshots/outOfOrderFrames_foundThreads.png'
import outOfOrderFrames_pickingThreads from './screenshots/outOfOrderFrames_pickingThreads.png'
import jitteryVideo_insaneDelay from './screenshots/jitteryVideo_insaneDelay.png'
function EncounteredProblems() {

    const opening = "Well that was it huh. The frames the clients sent were processed and returned and displayed. The app is now working fine. GGEZ.";
    const problems = "It takes a varied length of time for each frame to complete the round trip. Frames are only returned after the server has completed the facial detection on that frame. And the time it takes for that frame to be transported back to the client varies due to the nature of the internet. As a result, frames might get delivered to clients out-of-order (problem 1), or the video displayed isn't smooth since the intervals among frames change (problem 2).";

    const outOfOrderFramesSolution = "To address this, I created a class named ServerVideoManager (SVM) in the backend to generate a unique object SVM for each client. These SVMs exist during their clients’ connections. SVM manages all the parallel threads that are doing face detection on the frames, allowing the server to skip sending late frames to the clients.";
    const outOfOrderFramesElaboration1 = "When an incoming frame with frameID arrives, the SVM accepts that frame, launches a new thread to detect faces on the frame, and keeps track of the status of that thread. SVM also has a background thread that runs after every interval to monitor all of the facial detection threads.";
    const outOfOrderFramesElaboration2 = "When the background thread finds a thread/threads that finished running, it collects all the finished threads.";
    const outOfOrderFramesElaboration3 = "Then it extracts the latest frames among all of them. If the latest frame has frameID that is less than the previous sent back frameID, it is a late frame. As a result, the SVM sends nothing to the client. If the latest frame has frameID after the last sent back frameID, SVM will send the latest frame information to the client. Finally, SVM clears off all completed threads to create room for incoming frames.";
    const outOfOrderFramesConclusion = "This helps eliminate out-of-order frames. Even though the client loses some information, with the constant stream of input coming into the server, that skipped frame is insignificant.";


    const jitteryVideoSolution = "The idea behind fixing the inconsistent time interval between frames is simple. Whenever a frame arrives from the server, I examine the frameID and determine the time that frame intended to be drawn based on the time of the previous displayed frame. To do this, I constructed a class called SocketVideoService (SVS) in the frontend to handle transmitting, receiving, and displaying the frames. Each client will have one instance of an SVS object (each connection with the server). ";
    const jitteryVideoElaboration1 = "SVS used the following formula to find the correct time to draw each frame:";
    const jitteryVideoElaboration2 = "supposedDrawnTime = Math.max(now, lastDrawnTime + (frameID – lastFrameID) * frameTimeInterval);";
    const jitteryVideoConclusion = "This ensures that if the frame was returned too soon, it will be displayed at an even interval following the previous one. And if the frame was returned late, it will be displayed immediately.";

    const insaneDelay = "However, notice how I said “SVS used …”. The formula above only cares about spacing the next frame to be exactly (frameID – lastFrameID) intervals away. This, combined with the fact that each late frame adds some amount of delay, causes the overall latency of the video to skyrocket (2 seconds of delay after 10 seconds of playing) - (problem 3)."
    const insaneDelaySolution = "To counteract this, I engineered a solution and implemented it in the VSS class.";
    const insaneDelayElaboration1 = "For every frame, I keep track of the time it was first sent from the client to the server and the time when it arrives at the client. The difference between the two timestamps is the delay time of that frame.";
    const insaneDelayElaboration2 = "When a frame arrives, VSS compares that frame actualDelay to the desiredDelay (desiredDelay = prevDelay – delayReducingOffset). The delayReducingOffset value (which I set to be 18ms) is the key factor that helps counteract the cumulative delays added by late frames. It lowers the desiredDelay by a small amount for each incoming frame, which helps smoothing out the reducing-overall-delay process that VSS is doing.";
    const insaneDelayElaboration3 = "If desiredDelay > currDelay, then draw the frame after (desiredDelay – currDelay)";
    const insaneDelayElaboration4 = "If desiredDelay <= currDelay , then draw the frame right away.";
    const insaneDelayConclusion = "As a result, the cumulative delay is no longer an issue, and the frame time variance between frames is kept to a minimum, eliminating jitter/stutter. All of this comes at the cost of slightly higher average latency/delay.";


    return (

        <div className="encounteredProblems invisible flex flex-col items-center w-[60vw] ml-[-5px]  text-cyan-200 text-[1.3vw] leading-[1.8vw]">


            <div>{opening}</div>


            <div className='flex flex-col items-center mt-[0.4vw]'>

                <div className='text-[5vw] leading-[6vw] text-cyan-400'>
                    SIKEEE !
                </div>
                <div className='mt-3'>
                    {problems}
                </div>

            </div>


            <br></br>
            <br></br>


            <div className='flex flex-col items-center'>

                <div className='text-[2vw] leading-[2vw] text-cyan-400'>
                    Problem 1: Out-Of-Order Frames !
                </div>

                <div className='mt-3'>
                    {outOfOrderFramesSolution}
                </div>

            </div>

            <br></br>

            <div>
                {outOfOrderFramesElaboration1}
            </div>

            <br></br>

            <div>
                <div>
                    {outOfOrderFramesElaboration2}
                </div>

                <img src={outOfOrderFrames_foundThreads} className="w-[100%] h-auto rounded-3xl mt-4"></img>
            </div>

            <br></br>

            <div>
                <div>
                    {outOfOrderFramesElaboration3}
                </div>

                <br></br>

                <div>
                    {outOfOrderFramesConclusion}
                </div>

                <img src={outOfOrderFrames_pickingThreads} className="w-[100%] h-auto rounded-3xl mt-4"></img>
            </div>


            {/* *************************************************************************************************************** */}

            <br></br>
            <br></br>

            <div className='flex flex-col items-center'>

                <div className='text-[2vw] leading-[2vw] text-cyan-400'>
                    Problem 2: Jittery Video !
                </div>

                <div className='mt-3'>
                    {jitteryVideoSolution}
                </div>

            </div>

            <br></br>

            <div>
                <div>
                    {jitteryVideoElaboration1}
                </div>

                <div className='flex flex-col items-center'>
                    <div className='text-sky-100 bg-sky-600 rounded-3xl w-fit pt-1 pb-2 px-5 mt-3'>
                        {jitteryVideoElaboration2}
                    </div>
                </div>
            </div>

            <br></br>

            <div>
                <div>
                    {jitteryVideoConclusion}
                </div>

                <br></br>

                <div>
                    {insaneDelay}
                </div>
            </div>

            {/* ********************************************************************************************************************************** */}

            <br></br>
            <br></br>


            <div className='flex flex-col items-center'>

                <div className='text-[2vw] leading-[2vw] text-cyan-400'>
                    Problem 3: Insane Delay !
                </div>

                <div className='mt-2'>
                    {insaneDelaySolution}
                </div>
            </div>


            <div>


                <div className='mt-6'>
                    {insaneDelayElaboration1}
                </div>
                <div className='mt-4'>
                    {insaneDelayElaboration2}
                </div>

                <div className='flex flex-col items-center'>
                    <div>
                        <div className='text-sky-100 bg-sky-600 rounded-3xl w-fit pt-1 pb-2 px-5 mt-4'>
                            {insaneDelayElaboration3}
                        </div>
                        <div className='text-sky-100 bg-sky-600 rounded-3xl w-fit pt-1 pb-2 px-5 mt-4'>
                            {insaneDelayElaboration4}
                        </div>
                    </div>
                </div>
            </div>

            <br></br>

            <div>
                {insaneDelayConclusion}
            </div>

            <img src={jitteryVideo_insaneDelay} className="w-[100%] h-auto rounded-3xl mt-4"></img>

        </div>


    )
}
export default EncounteredProblems
