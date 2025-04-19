# Asset Management Platform

A secure, real-time asset tracking system with user authentication, CRUD operations, and interactive data visualization.

---

## Project Overview

This platform provides:
- Secure user authentication (JWT-based)
- Asset management with create, read, update, and delete operations
- Real-time data visualization dashboard
- Responsive web interface optimized for mobile and desktop

---

## Business Context & Success Metrics

**Business Need:**  
Digital solution for tracking organizational assets, including:
- Real-time value reporting
- Depreciation tracking
- Multi-user access control
- Audit capabilities

**User Pain Points Addressed:**
- Manual spreadsheet-based tracking
- No centralized asset database
- Limited reporting capabilities
- Version control challenges

**Success Metrics:**
- Reduce asset tracking errors by 60%
- Cut reporting time by 75%
- Support 50+ concurrent users
- Achieve 99.9% uptime

---

## Features

- JWT-based login/registration
- Asset creation/edit forms with validation
- Sortable/filterable asset table
- Interactive pie chart dashboard
- Mobile-optimized responsive design

---

## System Architecture

```mermaid
flowchart TD
    A[Next.js 14 App Router] --> B[Authentication]
    A --> C[Asset Management]
    A --> D[Dashboard]
    
    B --> B1[Login Form]
    B --> B2[JWT Handling]
    
    C --> C1[CRUD Operations]
    C --> C2[Form Validation]
    
    D --> D1[Pie Chart]
    D --> D2[Data Table]
```

**Authentication Flow:**
```mermaid
flowchart TD
    subgraph AuthFlow[JWT Authentication]
        A[Login Form] --> B[lib/auth.ts]
        B --> C{Validate Credentials}
        C -->|Valid| D[Generate JWT]
        C -->|Invalid| E[Return Error]
        D --> F[Set Secure Cookie]
    end
    style B stroke:#ff9900,stroke-width:2px
```
- Core JWT logic implemented in `lib/auth.ts`

**Key Patterns:**
- Server Components for initial page loads
- Client-side interactivity with React hooks
- Modular component library (shadcn/ui)
- Type-safe API interactions via `lib/types.ts`

**Data Models:**
- **Asset:** id, userId, name, type, amount, avg_pricing, current_pricing, unit, purchaseDate, notes, createdAt, updatedAt
- **User:** id, name, email

**Critical Paths:**
- `app/login/page.tsx` → `lib/auth.ts`
- `app/assets/add/page.tsx` → `lib/assets.ts`
- `components/assets-pie-chart.tsx` → `lib/utils.ts`

---

## Technology Stack

- **Framework:** Next.js 14 (App Router), React 18, TypeScript 5.0
- **Styling:** Tailwind CSS, shadcn/ui
- **Data Visualization:** recharts
- **Validation:** zod, react-hook-form
- **Authentication:** @auth0/nextjs-auth0 (JWT)
- **Database:** PostgreSQL (via drizzle-orm)
- **Migrations:** drizzle-kit
- **Other:** @radix-ui/react-dropdown-menu

**Development Tools:**
- ESLint (`eslint.config.mjs`)
- PostCSS (`postcss.config.mjs`)
- TypeScript (`tsconfig.json`)
- npm (v9+)

**Runtime Requirements:**
- Node.js 18+
- Vercel deployment environment
- JWT-compatible auth provider
- `JWT_SECRET` environment variable required

**Database Setup:**
- Config: `drizzle.config.ts`
- Schema: `lib/schema.ts`
- Migrations: `drizzle/`
- Connection: Set `DATABASE_URL` in `.env.local` (default: `postgres://postgres:postgres@localhost:5432/pam`)

---

## Development Progress

**Current Focus:**
- JWT authentication implementation (`lib/auth.ts`)
- Token validation logic
- Asset CRUD API endpoints
- Dashboard data visualization
- Responsive layout refinements

**Recent Changes:**
- Initial project scaffolding
- Core UI components created
- Memory bank initialized
- Type definitions established
- JWT handler logic started in `lib/auth.ts`

**Next Steps:**
- Complete JWT authentication handlers
- Design and implement refresh token strategy
- Connect asset forms to backend
- Add chart data fetching
- Write integration tests

**Implemented Features:**
- Authentication UI (login/register forms)
- Asset CRUD form components
- Dashboard layout and chart shell
- Responsive navigation

**Pending Features:**
- Backend API integration
- JWT authentication flow (50% complete)
- Token refresh mechanism
- Data persistence layer
- Error handling system

**Known Issues:**
- Form validation not connected
- Chart uses static data
- No loading states
- Missing test coverage
- Session persistence needs testing

---

## Memory Bank Structure

The Memory Bank is the project's living documentation system. It is maintained in `memory_bank/` and consists of:

```mermaid
flowchart TD
    PB[projectbrief.md] --> PC[productContext.md]
    PB --> SP[systemPatterns.md]
    PB --> TC[techContext.md]
    PC --> AC[activeContext.md]
    SP --> AC
    TC --> AC
    AC --> P[progress.md]
```

- **projectbrief.md:** Core requirements and goals (source of truth for scope)
- **productContext.md:** Business need, user pain points, success metrics
- **systemPatterns.md:** Architecture, design patterns, data models, critical paths
- **techContext.md:** Technology stack, setup, dependencies, constraints
- **activeContext.md:** Current work focus, recent changes, next steps
- **progress.md:** What works, what's left, current status, known issues

**Update Process:**
1. Review all files
2. Document current state
3. Clarify next steps
4. Capture insights & patterns

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

---

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

---

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
