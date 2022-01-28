import { useState } from "react";

import forehead_feature from './screenshots/forehead_feature.png'
import eyes_feature from './screenshots/eyes_feature.png'
import Haar_Cascade_Visualization from './screenshots/Haar_Cascade_Visualization.gif'
import limitation from './screenshots/limitation.png'

import rotation from './screenshots/rotation_demo.png'
import bruteforce from './screenshots/bruteforce_demo.png'

function BoringBasics() {

    const basicEnhancementIntro = 'In this section, I will explain what I’ve done to improve the tilted face detection hit rate. But before that, I will briefly go through how basic OpenCV’s facial detection with haar cascade works.';
    const haarCascadeIntro = "First thing first, what is Haar cascade?"
    const haarCascadeExplaination = "It is an object detection algorithm that makes use of the edge/line detection features proposed by Viola and Jones in their research paper “Rapid Object Detection using a Boosted Cascade of Simple Features” published in 2001. Or to my understanding, it’s an algorithm that, to detect an object, uses a model that consists of features possessed by that object (often those features are selected using a supervised machine learning-based approach) as a classifier."
    const haarCascadeExample1 = "For example, if we want to detect a face, some of the features that might be selected are eye browns, eyes, nose, etc... But how do we represent those features? Or how can a computer “see” those features?"
    const haarCascadeExample2 = "Say we have a forehead feature. The forehead is above the eyes and is brighter than the eyes. So, we can convert this characteristic into an edge feature (reference the image below)."
    const haarCascadeExample3 = "When scanning for faces in an image, for every potential face, the program will go to the position of the edge/line features and check if the area covered by that edge/line satisfies the feature’ conditions. For this case, we have an edge feature that represents the forehead. If the added-up color value of the white box is brighter than the added-up color value of the black box, that means the program “see” a forehead."
    const haarCascadeExample4 = "Similarly, given a pair of eyes feature, because in between the eyes, the color is usually lighter than the eyes, the pair can be represented as a line feature."
    const haarCascadeExample5 = "All these haar features are then grouped into an object model to represent the characteristics of that object. The program can just use that object when scanning. If all the haar features are present, then the object is “visible” to the program. If not, then the program “see” nothing."

    const haarCascadeSummerization = "To summarize, OpenCV obtains a set of Haar features that best describe a face (provided by the user) and use that as a reference when checking for faces. OpenCV go through the image and crop out rectangles (potential faces) in all possible sizes and all possible locations, comparing those cropped out areas with the reference face to check if those satisfy all the facial feature requirements. If any of them do, then that will be considered a detected face."

    const limitationIntro = "Because all the haar features are placed relative to the potential face bounding box. If the box is not aligned with the angle of the face in the image, all the haar features will become misaligned. Therefore, OpenCV would not be able to detect tilted faces."
    const limitationExample1 = "An example of the forehead features but now it is being used on a horizontal face"

    const solution1 = "To combat this, my solution is to just simply do the scan in multiple orientations, not just on the vertical image. Once those scans finish, I can just convert the rotated coordinates of the faces found back to the original image’s coordinates axis, check if there is any overlapping face, and remove the duplicates."
    const solution2 = "One small optimization that I made was to instead of scanning for faces directly, the program scanned for eyes (which takes half the time compared to scanning for faces). Then it checks if the eyes have a similar size and the distance between the two is appropriate (not too close/too far). For every pair of eyes it finds, it will crop out the potential face area around that pair of eyes, then do facial detection on that small area only. If a face is found, I can use the relative locations of the eyes to further investigate which one is the left eye, which one is the right eye."


    return (
        <div className="boringBasics flex flex-col w-[60vw] ml-[-5px]  text-cyan-200
        text-[1.3vw] leading-[1.8vw] 
        ">

            <div className=" w-full">


                <br></br>
                <div>{basicEnhancementIntro}</div>

            
                <br></br>
            <br></br>
            <br></br>


                <div className="flex flex-col items-center ">
                    <div className="text-[2vw] leading-[1.8vw] text-cyan-300">{haarCascadeIntro}</div>
                </div>




                <br></br>

                <div>
                    {haarCascadeExplaination}
                </div>

                <br></br>

                <div>
                    {haarCascadeExample1}
                </div>
            </div>

            {/* ************************************************************************************* */}

            <br></br>
            <br></br>
            <div className="w-full">

                <div className=" flex flex-col justify-center items-center">
                    <div>
                        {haarCascadeExample2}
                    </div>
                    <div>
                        <img src={forehead_feature} className="  w-[12vw] mt-[1vw]"></img>
                    </div>
                    <div className="mt-[1vw]">
                        {haarCascadeExample3}
                    </div>
                </div>


            </div>


            <br></br>
            <br></br>

            <div className="w-full">

                <div className=" flex flex-col justify-center items-center">
                    <div>
                        {haarCascadeExample4}
                    </div>
                    <div>
                        <img src={eyes_feature} className="  w-[12vw] mt-[1vw]"></img>
                    </div>
                    <div className="mt-[1vw]">
                        {haarCascadeExample5}
                    </div>
                    <div className="flex flex-col items-center mt-[3vw]">
                        <div>Haar Cascade in action</div>
                        <div>
                            <img src={Haar_Cascade_Visualization} className="  w-[30vw] mt-[1vw]"></img>
                        </div>
                    </div>
                </div>
            </div>


            <br></br>
            <div>
                {haarCascadeSummerization}
            </div>


            <br></br>
            <br></br>
            <br></br>

            <div className="flex flex-col items-center">
                <div className="text-[2vw] leading-[1.8vw] text-cyan-300">Limitation</div>
            </div>

            <br></br>
            <div>
                {limitationIntro}
            </div>

            <br></br>

            <div className="flex flex-col justify-center items-center">
                <div>{limitationExample1}</div>

                <div>
                    <img src={limitation} className="  w-[16vw] mt-[1vw]"></img>
                </div>
            </div>


            
            <br></br>
            <br></br>
            <br></br>

            <div>{solution1}</div>
            <br></br>
            <div className="flex flex-col justify-center items-center">
                <div>Bonus: My rotation function in action</div>
                <div>
                    <img src={rotation} className=" mt-[1vw]"></img>
                </div>
            </div>


            <br></br>
            <br></br>
            <div className="flex flex-col items-center mt-[4vw]">
                <div className="text-[2vw] leading-[1.8vw] text-cyan-300">Small Optimization</div>
            </div>

            <br></br>

            <div>{solution2}</div>
            <br></br>
            <div className="flex flex-col justify-center items-center">
                <div>A glimpse into what my program sees for each step</div>

                <div>
                    <img src={bruteforce} className="   mt-[1vw]"></img>
                </div>
            </div>

        </div>
    )
}

export default BoringBasics
