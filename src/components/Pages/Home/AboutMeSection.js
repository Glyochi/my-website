
import Pfp from "../../../Assets/profile pic.jpg"

function AboutMeSection() {
    var name = "Vũ Hoàng Dương";
    var descriptionOpening = "I am a junior computer science major and a Vietnamese international student at Iowa State University. I'm also a skilled programmer that can handle difficult assignments with ease.";
    var descriptionEnding = "I spend the most of my free time working on personal projects that need a diverse set of skills. That is why I must make it a habit to construct a learning plan whenever I begin working on something new. Consider this e-portfolio, which I put up after my first year. More of my work can be found by selecting the Projects option above."
    return (
        <div className="aboutMe">
            <div className="pfpCollisionDetection group ">
                <div className="pfpBorder 
                group-hover:shadow-[15px_30px_60px_-15px_rgba(0,0,0,1)]
                group-hover:mb-8 group-hover:mr-8
                group-hover:duration-200
                ">
                    <img src={Pfp} className="pfp
                    group-hover:scale-[3] 
                    group-hover:translate-x-[-30px]
                    group-hover:translate-y-[90px]
                    group-hover:duration-200
                    " alt='' ></img>
                </div>
            </div>
            <div className="descriptionBorder group">
                <div className="description
                group-hover:shadow-[15px_30px_60px_-15px_rgba(0,0,0,1)]
                group-hover:translate-x-[-4px]
                group-hover:translate-y-[-4px]
                group-hover:duration-100
                ">
                    <h1 className="flex text-[40px] font-bold text-white" >{name}</h1>

                    <div className=" flex text-white font-medium text-xl ml-5 mr-5">
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
