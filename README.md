# ecomm-node-app

A backend API for an e-commerce application built with **Node.js**, **TypeScript**, **Prisma**, and **tsoa**.

---

## Features

- RESTful API endpoints for products, users, orders, authentication, etc.
- Type-safe routes/controllers using **tsoa**
- Database access and ORM using **Prisma**
- Validation, DTOs, and request/response schemas
- JWT-based authentication & authorization
- Error handling middleware & structured error responses
- TypeScript support with build & dev modes


---

## Getting Started / Installation

### Prerequisites

- Node.js (version ≥ 16 recommended)
- npm (or yarn)
- A supported database (e.g. PostgreSQL, MySQL, SQLite, etc.)

### Setup steps

1. Clone the repository
   ```bash
   git clone https://github.com/prateekjoshi44/ecomm-node-app.git
   cd ecomm-node-app
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Configure environment variables
   Create a `.env.local` file (based on `.env.example` if you have one) containing entries like:
   ```ini
   DATABASE_URL="postgresql://user:password@hostname:port/dbname?schema=public"
   JWT_SECRET="your_jwt_secret_key"
   ```

4. Generate Prisma client & run migrations
   ```bash
   npx prisma generate
   npx prisma migrate dev    # or `prisma migrate deploy` in production
   ```

5. Build & run in development mode
   ```bash
   npm run build
   npm run dev
   ```

   Or, if you’ve set up a script for watching TypeScript files, you can also use:
   ```bash
   npm run start:dev
   ```

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Run the application in development mode (with hot reload) |
| `npm run build` | Compile TypeScript into JavaScript (output in `dist/`) |
| `npm run start` | Run the compiled JavaScript in production mode |
| `npx prisma generate` | Generate Prisma client |
| `npx prisma migrate dev` | Run migrations (development) |
| `npx prisma migrate deploy` | Apply migrations (production) |

---

## API Usage & Endpoints

visit  `/docs`  for swagger docs.

---

## Environment Variables

Here’s a sample of what your `.env.local` might include:

```ini
DATABASE_URL="your_database_connection_string"
JWT_SECRET="a_super_secret_jwt_key"
PORT=3000
API_PREFIX="/api/v1"
```

---

## Error Handling & Validation

- Incoming request inputs (body, query, params) should be validated using DTOs / schemas
- Consistent error response format (e.g. `{ status: "error", message: "...", details?: ... }`)
- 404, 401, 403, 500 etc. are handled via centralized error middleware

---

## Testing

You might set up tests using Jest or Mocha. Example commands:

- `npm run test` — run all tests
- `npm run test:watch` — run in watch mode

---

## Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feat/your-feature`)
3. Make your changes & commit (`git commit -m "feat: something"`)
4. Push to your branch (`git push origin feat/your-feature`)
5. Open a Pull Request

Please ensure:

- Code is properly formatted (use Prettier / ESLint)
- TypeScript types are correct
- You add tests (if applicable)
- Update README or docs if you introduce new features or env vars

---
