import React from 'react';
import ReusableTimeline, { TimelineDisplayItem } from './ReusableTimeline';
import { workTimelineData } from './data/workTimelineData';

const ExperienceTimeline: React.FC = () => {
    const mapExperienceItem = (item: (typeof workTimelineData)[number], index: number): TimelineDisplayItem => ({
        id: `${item.organization}-${item.title}-${item.dateRange}-${index}`,
        headline: item.title,
        subheadline: item.organization,
        dateLabel: item.dateRange,
        location: item.location,
        bullets: item.details,
        dotColor: item.type === 'work' ? 'primary' : item.type === 'education' ? 'secondary' : 'grey'
    });

    return (
        <ReusableTimeline
            title="Experience"
            items={workTimelineData}
            mapItem={mapExperienceItem}
            headingClassName="timelineColumnHeading"
            compact
        />
    );
};

export default ExperienceTimeline;
