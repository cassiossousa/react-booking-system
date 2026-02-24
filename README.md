# React Booking System

A fully responsive booking management system built with React, TypeScript and Redux Toolkit.

## Features

- Create booking
- Read booking
- Update booking
- Delete booking
- Each booking linked to a property
- Overlap prevention
- Full form validation
- Responsive UI
- Unit, component and E2E tests

## Tech Stack

- React + Vite
- TypeScript
- Redux Toolkit
- Styled Components
- React Hook Form
- Zod
- date-fns
- Vitest
- Cypress

## Running Locally

```bash
git clone <repo>
cd booking-app
npm install
npm run dev
```

Runs at: [http://localhost:5175](http://localhost:5175)

## Running Tests

### Unit & component:

```bash
npm run test
```

### Cypress:

```bash
npx cypress open
```

## Architecture Decisions

Read more at [DESCRIPTION.md](DESCRIPTION.md)

## Deployment

Connected to GitHub and deployed via Vercel.

## Build:

```bash
npm run build
```

### Output directory:

```bash
dist
```
