# Workouts App

A full-stack application for tracking and managing workouts, built with modern web technologies.

## Project Overview

This project consists of two main parts:

- A backend API built with Node.js, Express, TypeScript, and Prisma
- A frontend application built with Vue.js and TypeScript

## Repository Structure

```
workouts-app/
├── backend/           # Node.js + Express + Prisma backend
├── frontend/         # Vue.js frontend application
├── package.json      # Root package.json for workspace management
└── tsconfig.base.json # Base TypeScript configuration
```

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/Iwo98/workouts-app.git
cd workouts-app
```

2. Install dependencies for both frontend and backend:

```bash
yarn install
```

3. Start the backend services (database and API):

```bash
cd backend
docker compose up -d
yarn dev
```

4. In a new terminal, start the frontend development server:

```bash
cd frontend
yarn dev
```

## Development

- The backend API runs on `http://localhost:3000`
- The frontend development server runs on `http://localhost:5173`

For detailed information about each part of the application:

- [Backend Documentation](./backend/README.md)
- [Frontend Documentation](./frontend/README.md)

## Technologies

### Backend

- Node.js
- Express
- TypeScript
- Prisma (ORM)
- PostgreSQL
- Docker

### Frontend

- Vue.js
- TypeScript
- Vite
- TailwindCSS

## License

MIT
