import React from 'react';
import Resume from "../../../Assets/Resume.jpg"
import './ResumePageBody.css';


const ResumePageBody: React.FC = () => {
    return (
        <div className="">
            <img src={Resume} className="resume" alt='' ></img>
        </div>
    )
}

export default ResumePageBody
