import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

export interface TimelineDisplayItem {
    id: string;
    headline: string;
    subheadline: string;
    dateLabel: string;
    location?: string;
    bullets: string[];
    dotColor?: 'inherit' | 'grey' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}

interface ReusableTimelineProps<T> {
    title: string;
    items: T[];
    mapItem: (item: T, index: number) => TimelineDisplayItem;
    sectionClassName?: string;
    headingClassName?: string;
    cardClassName?: string;
    compact?: boolean;
}

const ReusableTimeline = <T,>({
    title,
    items,
    mapItem,
    sectionClassName = 'experienceTimelineSection',
    headingClassName = 'experienceTimelineHeading',
    cardClassName = 'experienceTimelineCard',
    compact = false,
}: ReusableTimelineProps<T>) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const useRightPosition = compact || isMobile;

    return (
        <section aria-label={`${title} timeline`} className={sectionClassName}>
            <h2 className={headingClassName}>{title}</h2>

            <Timeline position={useRightPosition ? 'right' : 'alternate'} className="!p-0">
                {items.map((rawItem, index) => {
                    const item = mapItem(rawItem, index);
                    const isLast = index === items.length - 1;

                    return (
                        <TimelineItem key={item.id}>
                            <TimelineOppositeContent className={`${compact ? 'hidden' : 'hidden sm:block'} my-auto text-gray-200`}>
                                <p className="text-sm font-medium">{item.dateLabel}</p>
                                {item.location ? <p className="text-xs opacity-90">{item.location}</p> : null}
                            </TimelineOppositeContent>

                            <TimelineSeparator>
                                <TimelineDot color={item.dotColor ?? 'primary'} />
                                {!isLast ? <TimelineConnector /> : null}
                            </TimelineSeparator>

                            <TimelineContent className="py-1.5 sm:py-3">
                                <div className={cardClassName}>
                                    <h3 className="text-[1.02rem] sm:text-lg font-bold text-white leading-snug">{item.headline}</h3>
                                    <p className="text-[0.95rem] sm:text-base font-semibold mt-1 text-gray-100 leading-snug">{item.subheadline}</p>

                                    <p className={`text-[0.82rem] text-gray-200 mt-1 ${compact ? 'block' : 'sm:hidden'}`}>
                                        {item.dateLabel}
                                        {item.location ? ` | ${item.location}` : ''}
                                    </p>

                                    <ul className="mt-2 pl-4 sm:pl-5 mb-0 list-disc text-gray-100 space-y-1.5">
                                        {item.bullets.map((detail) => (
                                            <li className="text-[0.9rem] sm:text-sm leading-relaxed max-w-prose" key={detail}>{detail}</li>
                                        ))}
                                    </ul>
                                </div>
                            </TimelineContent>
                        </TimelineItem>
                    );
                })}
            </Timeline>
        </section>
    );
};

export default ReusableTimeline;
