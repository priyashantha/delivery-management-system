# Full Stack Deliver Management System

A full-stack Dockerized Delivery Management app built with Laravel, MySQL, React, and Tailwind CSS.

## Environment Setup

1. Copy `.env.example` to `.env`:

```bash
cp backend/.env.example backend/.env

RECAPTCHA_SECRET=YOUR_RECAPTCHA_SECRET
```

2. Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:8000/api
VITE_RECAPTCHA_SITE_KEY=YOUR_RECAPTCHA_SITE_KEY
```

3. Build and start all containers:

```bash
docker-compose up --build -d
```

4. Install Laravel dependencies:

```bash
docker run --rm -v $(pwd)/backend:/app -w /app composer composer install
```

5. Generate the application key:

```bash
docker-compose exec backend php artisan key:generate
```

6. Run Laravel database migrations:

```bash
docker-compose exec backend php artisan migrate
```

> Laravel will use the default values in `.env`, including:
> - DB host: `mysql`
> - DB name: `delivery_system`
> - DB username: `root`
> - DB password: `root`

---

## Open the App

- Frontend: [http://localhost:5173](http://localhost:5173)
- API: [http://localhost:8000/api/requests](http://localhost:8000/api/requests)
