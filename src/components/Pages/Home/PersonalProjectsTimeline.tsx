import React from 'react';
import ReusableTimeline, { TimelineDisplayItem } from './ReusableTimeline';
import { projectTimelineData } from './data/projectTimelineData';

const PersonalProjectsTimeline: React.FC = () => {
    const mapProjectItem = (item: (typeof projectTimelineData)[number], index: number): TimelineDisplayItem => ({
        id: `${item.title}-${item.dateRange}-${index}`,
        headline: item.title,
        subheadline: item.stack,
        dateLabel: item.dateRange,
        bullets: item.details,
        dotColor: item.type === 'research' ? 'info' : item.type === 'opensource' ? 'success' : 'primary'
    });

    return (
        <ReusableTimeline
            title="Personal Projects"
            items={projectTimelineData}
            mapItem={mapProjectItem}
            headingClassName="timelineColumnHeading"
            compact
        />
    );
};

export default PersonalProjectsTimeline;
