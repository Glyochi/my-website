export interface WorkTimelineItem {
    title: string;
    organization: string;
    dateRange: string;
    location?: string;
    details: string[];
    type: 'work' | 'education' | 'project';
}

export const workTimelineData: WorkTimelineItem[] = [
    {
        title: 'Full Stack Developer (Tools, Integration, Research)',
        organization: 'Musco Sports Lighting (R&D)',
        dateRange: 'Jan 2024 - Present',
        details: [
            'Productionized a real-time ABS system by building observability and internal tools across 85+ edge deployments, redesigning camera calibration (1 hour to under 10 minutes), automating cloud ingestion, and leading a refactor that increased test coverage from 14% to 57%.'
        ],
        type: 'work'
    },
    {
        title: 'Emerging Tech Intern',
        organization: 'Musco Sports Lighting (R&D)',
        dateRange: 'May 2023 - Dec 2023',
        details: [
            'Built ML annotation and live debugging UIs (React, FFmpeg, AWS, WebSockets, Three.js) that reduced labeling complexity and improved analysis of high-speed ball-tracking behavior.'
        ],
        type: 'work'
    },
    {
        title: 'Software Engineer Co-op',
        organization: 'Iowa State University',
        dateRange: 'May 2022 - May 2023',
        details: [
            'Maintained and modernized .NET Core web apps; led redesigns to improve code quality and maintainability.'
        ],
        type: 'work'
    }
];
