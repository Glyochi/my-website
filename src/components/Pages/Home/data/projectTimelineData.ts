export interface ProjectTimelineItem {
    title: string;
    stack: string;
    dateRange: string;
    details: string[];
    type: 'project' | 'research' | 'opensource';
}

export const projectTimelineData: ProjectTimelineItem[] = [
    {
        title: 'LLM Serving',
        stack: 'AWS, Kubernetes, Helm, Triton, Spring WebFlux, React, Prometheus, Grafana',
        dateRange: 'Jul 2025 - Jan 2026',
        details: [
            'Designed and deployed an AWS Kubernetes LLM serving stack with Triton gRPC to Spring WebFlux to React token streaming, then added full observability and tuned inference to achieve about 4x throughput and about 50% lower p99 latency.'
        ],
        type: 'project'
    },
    {
        title: 'Dice Simulation',
        stack: 'Python, Data Visualization',
        dateRange: 'Jun 2025 - Present',
        details: [
            'Built multiple implementations of a Monte Carlo simulator that rolls a 20-faced die 11 times, repeats 1,000,000 runs, and plots the sum distribution.'
        ],
        type: 'project'
    },
    {
        title: 'Ollama and vLLM Exploration',
        stack: 'Ollama, vLLM, LLM Inference',
        dateRange: 'Feb 2025 - Apr 2025',
        details: [
            'Explored Ollama and vLLM workflows to compare setup, inference behavior, and local-versus-server serving tradeoffs.'
        ],
        type: 'research'
    },
    {
        title: 'Live Tilted Face Detection',
        stack: 'Socket.IO, Flask, OpenCV',
        dateRange: 'Jun 2021 - Jan 2022',
        details: [
            'Built a full-stack web application for real-time tilted face detection with Socket.IO, Flask, and OpenCV.'
        ],
        type: 'project'
    }
];
