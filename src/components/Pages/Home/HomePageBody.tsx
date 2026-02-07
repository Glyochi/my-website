import React from 'react';
import AboutMeSection from "./AboutMeSection"
import TimelineShowcase from './TimelineShowcase';
import './HomePageBody.css';

const HomePageBody: React.FC = () => {
    return (
        <div className="homePageContentContainer ">
            <div className="homePageContent">
                <AboutMeSection />
                <TimelineShowcase />
            </div>

        </div>
    )
}

export default HomePageBody
