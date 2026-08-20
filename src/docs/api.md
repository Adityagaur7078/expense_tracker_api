# Expense Tracker API

## Auth

### Register
POST `/api/auth/register`

```json
{
  "email": "aditya@example.com",
  "password": "password123"
}
```

### Login
POST `/api/auth/login`

Use the returned token:

`Authorization: Bearer <token>`

## Expenses

All expense endpoints require authentication.

- GET `/api/expenses`
- GET `/api/expenses/:id`
- POST `/api/expenses`
- PATCH `/api/expenses/:id`
- DELETE `/api/expenses/:id`

Create body:

```json
{
  "title": "Lunch",
  "amount": 200,
  "category": "Food",
  "description": "Healthy lunch"
}
```

List supports:

`?page=1&limit=20`
