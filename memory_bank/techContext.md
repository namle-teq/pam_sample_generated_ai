# Technology Stack

## Core Technologies
- Next.js 14 (App Router)
- TypeScript 5.0
- Tailwind CSS
- shadcn/ui component library
- React 18

## Key Dependencies
- @radix-ui/react-dropdown-menu
- recharts (data visualization)
- zod (validation)
- react-hook-form
- @auth0/nextjs-auth0 (JWT authentication)
- drizzle-orm (PostgreSQL ORM)
- drizzle-kit (migrations)
- pg (PostgreSQL driver)
- swr (data fetching)
- uuid (ID generation)
- bcryptjs (password hashing)

## Database

- **PostgreSQL** used as primary database.
- **Drizzle ORM** for type-safe queries and schema management.
- **Migrations** managed with drizzle-kit.
- **Config:** `drizzle.config.ts`
- **Schema:** `lib/schema.ts`
- **Migrations:** `drizzle/` directory
- **Connection:** Set `DATABASE_URL` in `.env.local` (default: `postgres://postgres:postgres@localhost:5432/pam`)

## Development Tools
- ESLint (config: eslint.config.mjs)
- PostCSS (config: postcss.config.mjs)
- TypeScript (config: tsconfig.json)
- npm (v9+)

## Runtime Requirements
- Node.js 18+
- Vercel deployment environment
- JWT-compatible auth provider
- JWT_SECRET environment variable required
