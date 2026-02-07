# AGENTS.md - Development Guidelines for this React Portfolio

## Project Overview
This is a React 19 portfolio website using Vite, TypeScript, Tailwind CSS, and Material-UI. The project demonstrates various web development features including facial detection, video streaming, and interactive demos.

## Build & Development Commands

### Core Commands
```bash
# Start development server
npm start

# Alternate dev command
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Deploy to GitHub Pages
npm run deploy

# Test command placeholder
npm test

# Type checking (TypeScript)
npx tsc --noEmit
```

## Code Style Guidelines

### File Structure & Organization
- **Components**: Place in `src/components/` with feature-based subdirectories
- **Pages**: Main page components in `src/components/Pages/`
- **Services**: Socket.io and other services in feature-specific folders
- **Types**: TypeScript interfaces defined inline or alongside components
- **File Extensions**: Use `.tsx` for React components with TypeScript, `.ts` for plain TypeScript files

### Import Conventions
```typescript
// Order: React, third-party, internal components, relative imports
import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import NavBar from "./components/NavBar/NavBar";
import HomePageBody from './components/Pages/Home/HomePageBody';
import './NavBar.css';
```

### TypeScript Usage
- Define interfaces for props and data structures
- Use `const` for component declarations with proper typing
- Type event handlers and refs explicitly
- Utilize generics where appropriate
- Interface naming: PascalCase (e.g., `ButtonConfig`, `NavBarLeftBtnProps`)

### Component Patterns
```typescript
// Functional components with TypeScript
interface ComponentProps {
    prop1: string;
    prop2?: number; // optional
}

const Component: React.FC<ComponentProps> = ({ prop1, prop2 = 0 }) => {
    const [state, setState] = useState<Type>(initialValue);
    const ref = useRef<HTMLDivElement>(null);
    
    return <div>{content}</div>;
};

export default Component;
```

### Styling Approach
- **Primary**: Tailwind CSS classes for styling
- **Secondary**: Inline styles for dynamic values (responsive vw units, conditional styling)
- **CSS Modules**: Component-specific CSS files for animations or complex styles
- **Material-UI**: Use for pre-built components when already imported

### Naming Conventions
- **Components**: PascalCase (e.g., `NavBarLeftBtn`)
- **Variables/Functions**: camelCase (e.g., `numberOfOptions`, `handleClickOutside`)
- **Constants**: UPPER_SNAKE_CASE for global constants
- **CSS Classes**: PascalCase for component-specific classes (e.g., `NavBarLeftBtn`)

### Error Handling
- Check for null/undefined values in useEffect hooks
- Use proper type guards for TypeScript safety
- Handle async operations with try-catch blocks
- Validate props with TypeScript interfaces

### State Management
- Use React hooks (useState, useEffect, useRef) for local state
- Component composition over complex state management
- Props drilling is acceptable for this project size

### Code Organization
- Keep component logic separate from presentation
- Use descriptive variable names
- Add console.log statements for debugging (can be removed in production)
- Comment complex logic only when necessary

### Testing (When Added)
- Use React Testing Library
- Test user interactions and component rendering
- Mock external dependencies (socket.io, APIs)
- Name test files: `ComponentName.test.js` or `.tsx`

### Verification Workflow (Required)
- After each meaningful change, run verification commands to confirm behavior and prevent regressions.
- Default verification sequence for this repo:
  1. `npx tsc --noEmit` (TypeScript/type safety)
  2. `npm start` (Vite dev server; if port 5173 is busy, Vite will automatically select the next open port)
- For UI/styling refactors, verify after each phase (not just at the end) and report results clearly.
- If warnings/errors appear, fix them before moving to the next phase when possible.
- In updates to the user, include what was run and whether it passed.

### Git & Deployment
- This is a private repo with GitHub Pages deployment
- Build outputs to `/dist` directory
- Static assets can be served from `/public` when needed
- Deployment command publishes `/dist` via `gh-pages -d dist`

## Key Technologies
- **React 19** with functional components and hooks
- **Vite 7** for development server and production builds
- **TypeScript** for type safety (strict mode disabled)
- **Tailwind CSS 3.x** for utility-first styling
- **Material-UI 5.x** for component library
- **React Router 6.x** for navigation
- **Socket.io Client** for real-time features
- **React Plotly.js** for data visualization
- **Particles.js** for visual effects

## Development Notes
- The project uses Vite configuration (`vite.config.ts`)
- Custom Tailwind config extends base theme
- No formal linting workflow is currently configured
- No current test suite - tests should be added for new features
- Mixed JavaScript/TypeScript files exist (gradually migrating to TypeScript)

## Performance Considerations
- Use React.memo for expensive components when needed
- Implement proper cleanup in useEffect hooks
- Optimize images and assets in build process
- Consider code splitting for larger features

## Browser Support
Follows the modern browser target used by current Vite builds:
- Development: Latest Chrome, Firefox, Safari
- Production: >0.2% usage, not dead browsers
