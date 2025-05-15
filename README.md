# Elysia with Bun runtime

## Development
To start the development server run:
```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.

# 🧰 Project Code Standard

> Clean, consistent, and scalable structure for Bun + Elysia + Drizzle + TypeScript

---

## 🧱 Project Structure

```
/src
├── app.ts                  # Entry point for Elysia app
├── config/
│   ├── env.ts              # Zod-validated environment variables
│   └── constants.ts        # Global constants
├── db/
│   ├── client.ts           # Drizzle DB client setup
│   └── schema.ts           # Drizzle schema definitions
├── modules/                # Feature-based modules
│   └── user/
│       ├── controller/     # HTTP handlers
│       ├── usecase/        # Business logic
│       ├── infra/          # Repository implementations
│       ├── model/          # DTOs and types
│       └── user.route.ts   # Route definition
├── routes/                 # Centralized route loader
│   └── index.ts
/drizzle/
│   └── migrations/         # Generated SQL migration files
/drizzle.config.ts          # Drizzle config file
```

---

## 🧼 File Naming Conventions

| File Type        | Format               | Example                        |
|------------------|----------------------|--------------------------------|
| General files     | kebab-case           | `app.ts`, `user.route.ts`      |
| Folders           | kebab-case           | `usecase`, `controller`        |
| Interfaces/Types  | PascalCase           | `UserDTO`, `UserInput`         |
| Functions         | camelCase            | `getUserById`, `createUser`    |

---

## 🛡 TypeScript & Linting

### ESLint

- Use `eslint.config.js` (ESLint v9+)
- Extend with `eslint:recommended`, `typescript-eslint`, and `prettier`

### Prettier

- Enforce 2-space indent, single quotes, trailing commas

### Example `.prettierrc`

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "tabWidth": 2,
  "printWidth": 100
}
```

---

## 🧩 Clean Architecture Layers

| Layer       | Responsibility                                      | Folder            |
|-------------|------------------------------------------------------|-------------------|
| Controller  | Input/output handling, validation                    | `/controller/`    |
| Usecase     | Business logic, orchestrates flow                    | `/usecase/`       |
| Infra       | Talks to DB or other services                        | `/infra/`         |
| Model       | DTOs, Zod schemas, and interfaces                    | `/model/`         |
| Routes      | HTTP endpoint definitions                            | `/routes/`        |

---

## 🔄 Environment Variables

- Use `.env` file at root
- Create `/src/config/env.ts`:

```ts
import { z } from 'zod';

import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.string().default('3000'),
  DB_HOST: z.string(),
  DB_PORT: z.string().default('3306'),
  DB_USER: z.string(),
  DB_PASS: z.string(),
  DB_NAME: z.string(),
  SERVER_PORT: z.string(),
});

// Validate and parse
const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error(
    '❌ Invalid environment variables:',
    _env.error.flatten().fieldErrors
  );
  process.exit(1);
}

export const ENV = _env.data;

```

---

## 🛠 Drizzle Setup

- Schema lives in `/src/db/schema.ts`
- Client in `/src/db/index.ts`

### Example `index.ts`

```ts
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';
import { ENV } from '@/config/env';

const pool = mysql.createPool({
  host: ENV.DB_HOST,
  port: Number(ENV.DB_PORT || 3306),
  user: ENV.DB_USER,
  password: ENV.DB_PASS,
  database: ENV.DB_NAME,
});

export const db = drizzle(pool, { schema, mode: 'default' });

```

---

## 🧪 Sample Workflow: Add New Feature (`Post`)

1. Create `/modules/job/` with:
   - `controller/job.controller.ts`
   - `usecase/create-job.ts`
   - `infra/job.repository.ts`
   - `model/job.model.ts`
   - `job.route.ts`
2. Register in `/routes/job.ts`
3. Add schema to `/db/schema.ts`
4. Run `bunx drizzle-kit push` to migrate // for the first time only

---

## Git flow

1. Create new branch for `dev` with:
    - name branch `nameDev-nameFeature`
2. Merge dev to new branch every time before work:
    - avoid conflict
    - make code up to date

---
