# Task Planner – Backend API (Laravel)

Laravel-based REST API for the Task Planner app.

## Features

- Create new to-do tasks
- List the latest 5 incomplete tasks
- Mark tasks as completed
- CORS enabled for frontend integration

## Setup

### 1. Install dependencies

```bash
docker run --rm -v $(pwd)/backend:/app -w /app composer composer install
```

### 2. Run migrations

```bash
docker-compose exec backend php artisan migrate
```

---

## Running Tests

```bash
docker-compose exec backend php artisan test
```

With code coverage:

```bash
docker-compose exec backend bash
XDEBUG_MODE=coverage php artisan test --coverage-html=coverage
```

Open `backend/coverage/index.html` to view.

---

## API Endpoints

| Method | Endpoint                     | Description              |
|--------|------------------------------|--------------------------|
| POST   | `/api/tasks`                 | Create a new task        |
| GET    | `/api/tasks`                 | Get latest 5 incomplete  |
| PATCH  | `/api/tasks/{id}/complete`   | Mark task as completed   |

