# Expense Tracker API

A backend API for managing personal expenses, built with TypeScript, Express, MongoDB, Redis, and Docker.

I built this project to go beyond basic CRUD and practice how a real backend application is structured — authentication, validation, database access, caching, error handling, and containerized development.

## What it can do

- Create an account and log in
- Create, update, view, and delete expenses
- Keep expenses separated between users
- Validate incoming API requests
- Store data permanently in MongoDB
- Cache frequently requested data with Redis
- Handle errors in one place
- Run the API, MongoDB, and Redis together with Docker Compose

## Tech Stack

- TypeScript
- Node.js
- Express
- MongoDB + Mongoose
- Redis
- Zod
- JWT
- bcryptjs
- Docker + Docker Compose
- Vitest

## Project Structure

```text
src/
├── config/          # Database, Redis and environment configuration
├── constants/       # Shared constants
├── controllers/     # Handle HTTP requests and responses
├── dtos/            # Data transfer objects
├── errors/          # Application errors
├── middleware/      # Authentication, validation and error middleware
├── models/          # Mongoose models
├── repositories/    # Database and cache access
├── routes/          # API routes
├── services/        # Business logic
├── types/           # TypeScript types
├── utils/           # Shared utilities
├── validators/      # Zod schemas
├── docs/            # API docs and examples
├── app.ts           # Express application
└── server.ts        # Server startup
```

The main request flow is:

```text
Request
   ↓
Route
   ↓
Middleware
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
MongoDB
```

Redis is used as a cache alongside the data layer.

## Getting Started

### Requirements

You'll need:

- Node.js
- npm
- Docker Desktop

### 1. Clone the repository

```bash
git clone https://github.com/Adityagaur7078/expense_tracker_api.git
cd expense_tracker_api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create the environment file

Create a `.env` file in the project root:

```env
NODE_ENV=development
PORT=3000

MONGODB_URI=mongodb://mongo:27017/expense_tracker
REDIS_URL=redis://redis:6379

JWT_SECRET=your-long-random-secret
JWT_EXPIRES_IN=1d

CORS_ORIGIN=http://localhost:3000
```

For the JWT secret, use a long random value. For example:

```bash
openssl rand -base64 48
```

Do not commit your `.env` file.

### 4. Start the project

The easiest way to run everything is Docker Compose:

```bash
docker compose up --build
```

This starts:

- API
- MongoDB
- Redis

To run it in the background:

```bash
docker compose up -d --build
```

Check the containers with:

```bash
docker compose ps
```

## API

The API runs on:

```text
http://localhost:3000
```

### API overview

| Method | Endpoint | Authentication | Description |
|---|---|---|---|
| GET | `/health` | No | Check API health |
| POST | `/api/auth/register` | No | Create an account |
| POST | `/api/auth/login` | No | Log in |
| GET | `/api/expenses` | Yes | Get user's expenses |
| GET | `/api/expenses/:id` | Yes | Get one expense |
| POST | `/api/expenses` | Yes | Create an expense |
| PATCH | `/api/expenses/:id` | Yes | Update an expense |
| DELETE | `/api/expenses/:id` | Yes | Delete an expense |

### Health check

```http
GET /health
```

Example response:

```json
{
  "success": true,
  "data": {
    "status": "ok"
  }
}
```

### Authentication

Register:

```http
POST /api/auth/register
```

```json
{
  "email": "aditya@example.com",
  "password": "password123"
}
```

Login:

```http
POST /api/auth/login
```

```json
{
  "email": "aditya@example.com",
  "password": "password123"
}
```

The login response contains a JWT. Protected endpoints currently require the token in the `Authorization` header:

```http
Authorization: Bearer <token>
```

### Expenses

All expense endpoints require authentication.

Create an expense:

```http
POST /api/expenses
```

```json
{
  "title": "Lunch",
  "amount": 200,
  "category": "Food",
  "description": "Healthy lunch"
}
```

Get all expenses:

```http
GET /api/expenses
```

Pagination is supported:

```http
GET /api/expenses?page=1&limit=20
```

Get one expense:

```http
GET /api/expenses/:id
```

Update an expense:

```http
PATCH /api/expenses/:id
```

```json
{
  "amount": 250
}
```

Delete an expense:

```http
DELETE /api/expenses/:id
```

## How the caching works

MongoDB is the source of truth. Redis is only used to make frequently requested data faster.

```text
Request
   ↓
Redis
   │
   ├── Cache hit → return cached data
   │
   └── Cache miss
          ↓
       MongoDB
          ↓
       Store in Redis
          ↓
        Response
```

When an expense is created, updated, or deleted, the affected cache entries are invalidated or refreshed so stale data is not returned.

## Error Handling

The API uses a centralized error handler so controllers and services do not need to manually format every error response.

Example:

```json
{
  "success": false,
  "data": null,
  "error": "Expense not found"
}
```

Validation errors are handled with Zod before the request reaches the business logic.

## Useful Commands

Run the development server:

```bash
npm run dev
```

Check TypeScript:

```bash
npm run typecheck
```

Build the application:

```bash
npm run build
```

Run the compiled application:

```bash
npm start
```

Run tests:

```bash
npm test
```

View API logs:

```bash
docker compose logs api
```

Stop the containers:

```bash
docker compose down
```

## Why I built this

The main goal of this project was to practice building a backend the way I would expect to see it in a real application rather than putting everything into one Express file.

It gave me hands-on experience with:

- TypeScript
- REST API design
- Authentication
- MongoDB
- Redis caching
- Layered architecture
- Runtime validation
- Error handling
- Docker
- Environment configuration

The expense domain is intentionally simple so I could focus on the engineering side of the application.

## License

This project is for learning and portfolio purposes.
