# System Architecture

## App Structure
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

## Key Patterns
1. Server Components for initial page loads
2. Client-side interactivity with React hooks
3. Modular component library (shadcn/ui)
4. Type-safe API interactions via lib/types.ts

## Critical Paths
- app/login/page.tsx → lib/auth.ts
- app/assets/add/page.tsx → lib/assets.ts
- components/assets-pie-chart.tsx → lib/utils.ts
