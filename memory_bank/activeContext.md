# Current Focus

## Active Development Areas
1. Asset CRUD API endpoints
2. Dashboard data visualization
3. Responsive layout refinements
4. Integration and smoke testing

## Recent Changes
- JWT authentication logic completed in `lib/auth.ts`
  - Session cookies now use `SameSite: "strict"` for CSRF protection
  - Token validation checks user existence in the database
  - Redirects added after successful login/register
- Type definitions established
- Core UI components created
- Initial project scaffolding
- Memory bank initialized

## Next Steps
1. Connect asset forms to backend API
2. Add chart data fetching from live asset data
3. Write integration and smoke tests
4. Refine dashboard and layout responsiveness
