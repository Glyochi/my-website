
import Pfp from "../../../Assets/profile pic.jpg"

function AboutMeSection() {
    var name = "Vũ Hoàng Dương";
    var descriptionOpening = "I am a junior computer science major at Iowa State University. I'm also a skilled programmer that can handle difficult assignments with ease.";
    var descriptionEnding = "I spend the most of my free time working on personal projects that need a diverse set of skills. I've worked with computer graphics (openGL, ray-tracing), computer vision (openCV), and, most recently, full stack application development (webapp and android app). You can see demos of some of my work under the Project tab above."
    return (
        <div className="aboutMe">
            <div className="pfpCollisionDetection group ">
                <div className="pfpBorder 
                group-hover:shadow-[15px_30px_60px_-15px_rgba(0,0,0,1)]
                group-hover:translate-x-[-0.6vw]
                group-hover:translate-y-[-1vw]
                group-hover:duration-200
                ">
                    <img src={Pfp} className="pfp
                    group-hover:scale-[3] 
                    group-hover:translate-x-[-1.8vw]
                    group-hover:translate-y-[4.2vw]
                    group-hover:duration-200
                    " alt='' ></img>
                </div>
            </div>
            <div className="descriptionBorder group">
                <div className="description
                group-hover:shadow-[15px_30px_60px_-15px_rgba(0,0,0,1)]
                group-hover:translate-x-[-0.6vw]
                group-hover:translate-y-[-1vw]
                group-hover:duration-100
                ">
                    <h1 className="flex text-[2vw] font-bold text-white" >{name}</h1>

                    <div className=" flex text-white font-medium text-[1vw] ml-[1vw] mr-[1vw]">
                        {descriptionOpening}
                        <br />
                        <br />
                        {descriptionEnding}
                    </div>
                </div>
            </div>


        </div>
    )
}

export default AboutMeSection
