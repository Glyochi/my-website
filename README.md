# Portfolio Website

Personal portfolio built with React, TypeScript, Vite, Tailwind CSS, and Material UI. The site highlights professional experience, personal projects, and interactive demos.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Material UI
- React Router

## Local Development

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm start
```

Vite runs by default on `http://localhost:5173` (or the next available port).

## Scripts

- `npm start` - start Vite development server
- `npm run dev` - alternate dev command
- `npm run build` - create production build in `dist/`
- `npm run preview` - preview production build locally
- `npm run deploy` - deploy `dist/` to GitHub Pages
- `npm test` - placeholder command (no formal test runner configured)
- `npx tsc --noEmit` - TypeScript type checking

## Project Structure

- `src/components/Pages/Home/` - home page sections and timeline components
- `src/components/Pages/Home/data/` - timeline data sources (work + personal projects)
- `src/components/` - reusable site components
- `public/` - static assets

## Deployment

This project is configured for GitHub Pages deployment.

```bash
npm run deploy
```

The deploy script publishes the `dist/` folder.
