# Workouts App Backend

Backend service for the Workouts application built with Node.js, Express, TypeScript, and Prisma.

## Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- yarn package manager

## Setup

1. Install dependencies:

```bash
yarn install
```

2. Start the PostgreSQL database:

```bash
docker compose up -d
```

3. Generate Prisma client:

```bash
yarn prisma generate
```

## Available Scripts

### DB Development

- `yarn dev` - Start the development server with hot-reload
- `yarn prisma generate` - Generate Prisma client
- `yarn prisma migrate dev` - Create and apply a migration
- `yarn prisma studio` - Open Prisma Studio to manage data
- `yarn prisma db push` - Synchronizes your Prisma schema with your database schema without creating migrations.

#### How to add changes to current DB models

- `yarn prisma migrate dev --name "migration name"`
- `yarn prisma generate` - it is crucial to generate prisma based on new migration

### Docker Commands

- `docker compose up -d` - Start PostgreSQL in background
- `docker compose down` - Stop PostgreSQL container
- `docker compose logs -f` - View container logs
- `docker compose ps` - List running containers

## Database Connection

PostgreSQL database is accessible with these credentials:

- Host: `localhost`
- Port: `5432`
- Database: `workout_db`
- Username: `myuser`
- Password: `mypassword`

## Project Structure

```
backend/
├── src/
│   ├── app.ts          # Express application setup
│   ├── server.ts       # Server configuration and startup
│   ├── routes/         # API routes definitions
│   │   └── workouts.ts # Workouts routes
│   ├── data/          # Mock/seed data
│   │   └── workouts.ts # Sample workout data
│   ├── lib/           # Shared utilities and libraries
│   │   └── prisma.ts  # Prisma client instance
│   └── types/         # TypeScript type definitions
│       └── workouts.ts # Workout-related types
├── prisma/
│   ├── schema.prisma   # Database schema
│   └── migrations/     # Database migrations
├── docker-compose.yaml # Docker configuration
└── package.json       # Project dependencies
```

## Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/workout_db"
PORT=3000
```

## API Endpoints

### Workouts API

`GET /api/workouts`

- Get all workouts

`GET /api/workouts/:id`

- Get specific workout

`POST /api/workouts`

- Create new workout

`PUT /api/workouts/:id`

- Update workout

`DELETE /api/workouts/:id`

- Delete workout

## License

MIT
