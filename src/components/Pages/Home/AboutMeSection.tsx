import React from 'react';
import Pfp from "../../../Assets/profile pic.jpg"

const AboutMeSection: React.FC = () => {
  var name = "Gly Vu";
  var descriptionOpening = "I'm a Software Engineer with 2+ years experience productionizing ML-adjacent systems and owning tooling and workflow improvements.";
  var descriptionEnding = `I care deeply about the quality of my work and the success of my team long term. In my current role, I led the redesign of the camera calibration process, significantly accelerating field commissioning, and drove a core application refactor to improve testability, reliability, and long-term collaboration across teams. When I identify potential issues, I proactively raise them and take initiative to address them, ensuring the team operates effectively and sustainably.`;
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
                    group-hover:scale-[1.3] 
                    group-hover:translate-x-[0.3vw]
                    group-hover:translate-y-[2vw]
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
          <h1 className='text-lg font-bold'>{name}</h1>
          <p>{descriptionOpening}</p>
          <p>{descriptionEnding}</p>
        </div>
      </div>
    </div>
  )
}

export default AboutMeSection
