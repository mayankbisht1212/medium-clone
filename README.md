# Medium Project

A full-stack blogging application inspired by Medium. Users can sign up or sign in, browse published posts, open an individual article, and publish new content.

## Overview

This project is structured as a monorepo with three main parts:

- Frontend: a React + Vite app for the user interface
- Backend: a Hono API running on Cloudflare Workers
- Common: a shared TypeScript package with Zod validation schemas

## Features

- User authentication with JWT-based sign in and sign up
- Browse a list of blogs
- Open a single blog post
- Publish new posts
- Shared validation logic for API inputs

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- React Router
- Axios
- Tailwind CSS

### Backend
- Hono
- Cloudflare Workers
- Prisma ORM
- PostgreSQL
- JWT authentication

### Shared Package
- TypeScript
- Zod

## Project Structure

```text
medium-project/
├── backend/
│   ├── prisma/
│   ├── src/
│   │   ├── routes/
│   │   └── index.ts
│   ├── package.json
│   └── wrangler.jsonc
├── common/
│   └── src/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── config.ts
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- A PostgreSQL database
- Cloudflare Wrangler (for backend development/deployment)

### 1. Install dependencies

```bash
cd common
npm install
npm run build

cd ../backend
npm install

cd ../frontend
npm install
```

If you want to use the local shared package while developing, you can link it into the frontend and backend after building it.

### 2. Configure the backend

The backend expects the following values:

- DATABASE_URL
- JWT_SECRET

These are currently defined in [backend/wrangler.jsonc](backend/wrangler.jsonc). Update them to match your environment before running the app.

You may also need to generate the Prisma client:

```bash
cd backend
npx prisma generate
```

If you are setting up a fresh database, run your Prisma migrations as well:

```bash
cd backend
npx prisma migrate dev
```

### 3. Run the app locally

Start the backend:

```bash
cd backend
npm run dev
```

Start the frontend in a second terminal:

```bash
cd frontend
npm run dev
```

The frontend currently points to a deployed backend URL in [frontend/src/config.ts](frontend/src/config.ts). If you want the UI to call your local backend, update that file accordingly.

## API Notes

The backend exposes endpoints under the following base path:

- /api/v1/user
- /api/v1/blog

Key routes include:

- POST /api/v1/user/signup
- POST /api/v1/user/signin
- GET /api/v1/blog/bulk
- GET /api/v1/blog/:id
- POST /api/v1/blog
- PUT /api/v1/blog

## Deployment

The backend is designed for deployment with Wrangler:

```bash
cd backend
npm run deploy
```

The frontend can be built with:

```bash
cd frontend
npm run build
```

## Notes

This project is a simple learning/demo implementation of a Medium-style blogging experience. It is suitable for experimenting with full-stack architecture, shared packages, API validation, and serverless deployment.
