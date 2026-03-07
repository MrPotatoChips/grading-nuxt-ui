## AI Agent Guide for this Codebase

This workspace has a Vue 3 + Vite frontend (`nuxt-app`) and a Laravel 12 API backend (`nuxt-api`). Follow these conventions and workflows to be productive immediately.

### Big Picture
- Frontend: Vite + Vue 3, Vue Router, Pinia, Nuxt UI, Tailwind, Vitest, Playwright, PWA.
- Backend: Laravel API with Sanctum tokens, role-based abilities, Pusher broadcasting.
- Auth/data flow:
  - `src/stores/auth.store.js` persists `user` and `token` in localStorage (key `auth`).
  - `src/plugins/axios.js` sets `axios.defaults.baseURL = import.meta.env.VITE_API_URL`, injects `Authorization: Bearer <token>`, and centralizes errors with SweetAlert. On 401/403 it clears auth and redirects to `shared.login`.
  - `src/router/guards/verify-auth.guard.js` hydrates `auth.user` on first navigation using `SSharedAuth.getCurrentUser()`.
  - Layout is chosen in `App.vue` from Pinia state: no user → `PublicLayout`, else `PrivateLayout`.

### Project Conventions
- Components:
  - Use PascalCase filenames; name format often follows “Role + ComponentName” (e.g., `SharedAuthSignIn`) as seen in `src/views/shared/public/SignIn.vue`.
  - Prefer Nuxt UI components (`UForm`, `UInput`, `UButton`, etc.) and Tailwind utilities.
- Services:
  - Centralize API calls under `src/services/<role>/` and re-export via `src/services/<role>/index.js`.
  - Return raw axios Promises with relative paths (e.g., `'auth/me'`), letting interceptors add base URL and headers. Example (`src/services/shared/auth.service.js`):
    - `getCurrentUser(): GET auth/me`
    - `signIn(params): POST auth/login`
    - `logout(): POST auth/logout`
- Routing:
  - Combine routes via `src/router/combined.routes.js`.
  - Guard patterns: `GVerifyAuth` is added globally; per-route guards added via `.map(route => Object.assign(route, { beforeEnter: [...] }))`.
  - Route names encode area and feature, e.g., `admin.dashboard`, `shared.login`, `components.buttons`.
- State:
  - Pinia stores persist via `pinia-plugin-persistedstate` with explicit keys (`auth`, `settings`).
- Realtime:
  - `src/plugins/laravel-echo.js` wires Echo + Pusher using `VITE_PUSHER_APP_KEY`, `VITE_PUSHER_APP_CLUSTER`, and `VITE_API_BASE_URL` for auth. It’s currently opt-in (commented in `main.js`).

### Environment & Integration
- Frontend env:
  - `VITE_API_URL`: Axios base (e.g., `http://localhost:8000/api`).
  - `VITE_API_BASE_URL`: Used by Echo auth endpoint (base without `/api`).
  - `VITE_PUSHER_APP_KEY`, `VITE_PUSHER_APP_CLUSTER`: Pusher settings.
- Backend:
  - Key endpoints in `nuxt-api/routes/api.php` (e.g., `POST auth/login`, `GET auth/me`).
  - AuthService returns `{ token, role }` on login; `me` returns `UserResource`.

### Developer Workflows
- Frontend (`nuxt-app`):
  - Install: `npm install`
  - Dev: `npm run dev` (Vite server.port is `8080` in `vite.config.js`)
  - Build/Preview: `npm run build` → `npm run preview`
  - Unit tests: `npm run test:unit`
  - E2E: `npm run test:e2e` (Playwright config assumes `5173` in dev; adjust `playwright.config.js` or run `preview` for CI-like port `4173`.)
  - Lint/format: `npm run lint` (`eslint` + `oxlint`), `npm run format` (Prettier)
- Backend (`nuxt-api`):
  - Composer install, generate key, migrate; run `php artisan serve` and queue as needed. See `composer.json` scripts and `routes/api.php`.

### Patterns to Follow (with Examples)
- Add a service (follow existing signature and relative URLs):
  - Location: `src/services/admin/users.service.js`
  - Methods: `get(params)`, `show(id)`, `post(params)`, `put({ id, ... })`, `delete({ id })` → see `.cursor/rules/webdeveloper.mdc` for exact shape.
- Add a guarded route:
  - Pattern: define route, then append guards via `.map(route => Object.assign(route, { beforeEnter: [GAuth, GAdmin] }))` (see `src/router/private/admin.routes.js`).
- Use auth store correctly:
  - Set token on login, let `verify-auth` guard populate `user`; redirect based on `role` (see `SignIn.vue`).

### Gotchas
- Axios base and Echo base use different env vars (`VITE_API_URL` vs `VITE_API_BASE_URL`). Keep both set.
- Global error handling lives in the axios interceptor. Do not duplicate per-component toasts; surface validation errors via form-level setters when needed.
- Playwright default dev `baseURL` (`5173`) may not match Vite `server.port = 8080`. Align ports or switch to `preview` when running E2E.

### Reference Files
- Routing: `src/router/index.js`, `src/router/combined.routes.js`, `src/router/guards/*`
- Auth/state: `src/stores/auth.store.js`, `src/plugins/axios.js`, `src/services/shared/auth.service.js`
- Layouts: `src/components/layouts/*`, `src/App.vue`
- UI patterns: `src/views/components/*` (Nuxt UI showcase)
- Editing rules: `.cursor/rules/webdeveloper.mdc`

If any section is unclear or you need more details (e.g., exact env values, preferred test port), tell me which part to expand and I’ll refine this guide.
