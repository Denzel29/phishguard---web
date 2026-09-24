# PhishGuard — Web

Next.js + TypeScript frontend for the PhishGuard platform. Configured for
static export (GitHub Pages compatible). All data comes from the Express API;
no server-rendering or API routes live in this app.

## Setup

```bash
cp .env.local.example .env.local
npm install
npm run dev              # http://localhost:3000

```

The backend must be running at `http://localhost:4000` (or set
`NEXT_PUBLIC_API_URL` in `.env.local`).

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Static export to `out/` |
| `npm start` | Serve production build |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run `tsc --noEmit` |

## Project Structure

```
src/
├── app/
│   ├── dashboard/           # Role-based dashboard pages
│   │   ├── page.tsx         #   Individual user dashboard
│   │   ├── company/         #   Company admin (Org Owner) dashboard
│   │   └── platform/        #   Platform admin (Super Admin) dashboard
│   ├── login/               # Login page (alternate simple form)
│   ├── register-organization/ # Org registration page
│   ├── sandbox/             # Sandbox placeholder
│   ├── schemas/             # Zod validation schemas
│   ├── layout.tsx           # Root layout (Toaster, Providers)
│   ├── page.tsx             # Landing page
│   └── globals.css          # Global styles
├── components/
│   ├── auth/                # Auth forms (login, register, forgot password)
│   ├── landing/             # Landing page components
│   ├── nav-bar/             # Navigation bar
│   └── ui/                  # Shared UI primitives (shadcn/ui + custom)
├── lib/
│   ├── api.ts               # API client (fetch wrapper)
│   └── utils.ts             # Utility helpers
├── providers/
│   ├── auth-provider.tsx    # Auth context (login/logout, localStorage)
│   └── providers.tsx        # App-level providers (QueryClient, Auth)
└── types/
    └── shared.ts            # Shared types mirroring server enums/interfaces
```

## Authentication Flow

1. User submits credentials on the login form (`DashLogin` component).
2. Frontend calls `POST /api/v1/auth/login` via `apiRequest()`.
3. On success, the `AuthProvider` stores the JWT token and user object in
   `localStorage` and React state.
4. `getDashboardRoute(user)` inspects `roleName` and `organizationId` to
   determine the correct dashboard:

   | Role | Redirect |
   |------|----------|
   | `Super Admin` | `/dashboard/platform` |
   | `Org Owner` (with org) | `/dashboard/company` |
   | `Individual` / other | `/dashboard` |

5. Protected pages check `isAuthenticated` on mount and redirect to `/login`
   if the user is not logged in.

## Key Components

| Component | Path | Purpose |
|-----------|------|---------|
| `LoginForm` | `components/auth/login-form.tsx` | Tab container (Login / Sign Up / Forgot Password) |
| `DashLogin` | `components/auth/dash-login.tsx` | Login form with API call + redirect |
| `ForgotPassword` | `components/auth/forgot-password.tsx` | Password reset form (UI only) |
| `AuthProvider` | `providers/auth-provider.tsx` | Auth context + `useAuth()` hook |

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:4000/api/v1` | Backend API base URL |
