import React from 'react'

import vanilla from './screenshots/video_standard.gif'
import unoptimized from './screenshots/video_unoptimized.gif'
import optimized from './screenshots/video_optimized.gif'
import even_more_optimized from './screenshots/video_EVEN_MORE_optimized.gif'

function EncounteredProblems() {

    const opening = "My solution works well enough for detecting faces in images. But it doesn’t return the result fast enough for real-time detection (3 times slower than the traditional method). In this section, I will go through what I did to improve my algorithm performance, while still maintaining the same high level of tilted face detection accuracy.";


    const reduceFrameTimeIntro = "So how can I reduce the detection time for each frame in my algorithm? Well, I noticed something. I don’t have to run my facial recognition implementation on every frame, do I? If I only run it on every third frame on a 30fps video, then the face has 3 * 1000ms / 30 = 100ms to move out of the previously detected face area."
    const reduceFrameTime1 = "The human average head width is around 7 inches in width or 18 cm. To move one’s head out of one’s head’s previous position by 18 cm in 100ms, one must move at 18cm/100ms or 1.8m/s or 71 inches/s, which is incredibly fast. So, I can safely assume that after 3 frames, there is a very high chance that the face that was detected previously would stay around the area that it was before."
    const reduceFrameTime2 = "Alright, with that assumption in mind, I created a ‘macroThread’ that runs my implementation of facial detection. And whenever that thread is done (around 2-4 frames), it updates the faces’ coordinates onto a ‘foundFaces’ array."
    const reduceFrameTime3 = "For each new incoming frame, the program will simply render the frame and use the faces’ information in foundFaces to render the bounding boxes. My program will also check if the macroThread is running. If it is not, then the program will start up the macroThread again and have that execute on the current frame."
    const reduceFrameTimeConclusion = "The video is now playing at the correct speed. Great! However, the face’s bounding box kinda lags by a little bit."


    const accuracyIntro = "The bounding boxes are only relatively close to the actual faces’ positions. To increase accuracy, what I can do is, instead of rendering the boxes based on the foundFaces array, use the array as guidelines to narrow down where the faces could be to perform OpenCV’s facial detection (which is very fast)."
    const accuracyMicroThread = "For every new incoming frame, the program launches a ‘microThread’ that does the following:"
    const accuracyForLoop = "For every faceArea in foundFaces:"
    const accuracyStep1 = "Rotate the frame by the angle of the face so that the face is now vertical-ish (This helps with Haar Cascade object recognition)"
    const accuracyStep2 = "Crop out the area of the face in faceArea, but also increase the width and height of that search area by 50% (to account for the face moving out of its previous position)"
    const accuracyStep3 = "Perform Haar Cascade facial detection on that cropped-out area. Update the face coordinates in faceArea"
    const accuracyStep4 = "Perform Haar Cascade  eye detection on that cropped-out area. Check which one is the left eye/right eye based on the distance of them to the face's upper left corner. Update the eyes in faceArea"
    const accuracyStep5 = "Calculate the angles between the eyes. Use that angle to update the face’s angle in faceArea (face’s new angle = face’s previous angle + eyes’ angle). This helps keep track of the face’s orientation."
    const accuracyStep6 = "Render faceArea’s bounding box onto the frame"
    const accuracyEndOfFoorLoop = "Display the frame"

    const conclusion = "By combining Haar Cascade fast facial detection with my slow but thorough implementation, the final result is an accurate tilted facial detection with good enough performance to run in real-time."
    return (

        <div className="optimizedVersion w-[60vw] ml-[-5px]  text-cyan-200 text-[1.3vw] leading-[1.8vw]">

            <br></br>

            <div>{opening}</div>

            <br></br>

            <div className='w-full flex flex-row justify-around items-center'>
                <div className='flex flex-col justify-center items-center'>
                    <div>OpenCV's implementation</div>
                    <img src={vanilla} className="w-[20vw] rounded-3xl mt-[0.6vw]"></img>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <div>My implementation (Enhanced)</div>
                    <img src={unoptimized} className="w-[20vw] rounded-3xl mt-[0.6vw]"></img>
                </div>
            </div>


            <br></br>
            <br></br>
            <br></br>

            <div className="flex flex-col items-center ">
                <div className="text-[2vw] leading-[1.8vw] text-cyan-300">Optimization 1: Reduce frame-time !</div>
            </div>

            <br></br>

            <div>{reduceFrameTimeIntro}</div>
            <div>{reduceFrameTime1}</div>



            <br></br>
            <br></br>

            <div>{reduceFrameTime2}</div>
            <div>{reduceFrameTime3}</div>

            <br></br>
            <div className='flex flex-col items-center'>
                <img src={optimized} className="w-[20vw] rounded-3xl"></img>
            </div>

            <br></br>
            <div>{reduceFrameTimeConclusion}</div>



            <br></br>
            <br></br>
            <br></br>

            <div className="flex flex-col items-center ">
                <div className="text-[2vw] leading-[1.8vw] text-cyan-300">Optimization 2: Accuracy !</div>
            </div>

            <br></br>
            <div>{accuracyIntro}</div>

            <br></br>
            <div>{accuracyMicroThread}</div>
            <div className='text-sky-100 bg-sky-600 py-[1.2vw] px-[2vw] rounded-3xl mt-[0.6vw]'>
                <div>{accuracyForLoop}</div>
                <ul className='pl-[5vw] list-disc mt-[0.4vw]'>
                    <li>{accuracyStep1}</li>
                    <li>{accuracyStep2}</li>
                    <li>{accuracyStep3}</li>
                    <li>{accuracyStep4}</li>
                    <li>{accuracyStep5}</li>
                    <li>{accuracyStep6}</li>
                </ul>
                <div className='mt-[0.6vw]'>{accuracyEndOfFoorLoop}</div>
            </div>


            <br></br>
            <div className='flex flex-col items-center'>
                <div>Optimized Enhanced Version</div>
                <img src={even_more_optimized} className="w-[20vw] rounded-3xl mt-[0.6vw]"></img>
            </div>

            <br></br>
            <div>{conclusion}</div>

            <br></br>
            <br></br>
            
            <div className='flex flex-col items-center'>
                <div className="text-[2vw] leading-[1.8vw] text-cyan-300">Comparison</div>
                <br></br>
                <div className='flex flex-row justify-evenly w-full'>
                    <div className='flex flex-col items-center'>
                        <div>Traditional Method</div>
                        <img src={vanilla} className=" rounded-3xl w-[18vw] mt-[0.6vw]"></img>
                    </div>
                    <div className='flex flex-col items-center'>
                        <div>Enhanced</div>
                        <img src={unoptimized} className="rounded-3xl w-[18vw] mt-[0.6vw]"></img>
                    </div>
                    <div className='flex flex-col items-center'>
                        <div>Optimized Enhanced</div>
                        <img src={even_more_optimized} className=" rounded-3xl w-[18vw] mt-[0.6vw]"></img>
                    </div>


                </div>
            </div>
        </div>


    )
}
export default EncounteredProblems
