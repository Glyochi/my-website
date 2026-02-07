import React from 'react';
import ExperienceTimeline from './ExperienceTimeline';
import PersonalProjectsTimeline from './PersonalProjectsTimeline';

const TimelineShowcase: React.FC = () => {
    return (
        <section className="timelineShowcaseSection" aria-label="Work and personal project timelines">
            <div className="timelineShowcaseGrid">
                <div className="timelineShowcaseColumn">
                    <ExperienceTimeline />
                </div>
                <div className="timelineShowcaseColumn">
                    <PersonalProjectsTimeline />
                </div>
            </div>
        </section>
    );
};

export default TimelineShowcase;
