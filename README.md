# KrishiSeva

This repository is organized as a two-application workspace:

- `frontend/` contains the customer-facing TanStack Start application.
- `backend/` contains the backend application and its Supabase configuration.

Each application retains its own `package.json`, lockfile, environment configuration, and development scripts. The frontend runs at `http://127.0.0.1:5173`; the backend runs at `http://127.0.0.1:5174`. Requests from the frontend to `/api/*` are proxied to the backend.

## Development

Install both applications once from the repository root, then run them together:

```sh
cd krishiSeva
npm.cmd install
npm.cmd run dev
```

Open `http://127.0.0.1:5173` for the frontend. Confirm the backend is up at `http://127.0.0.1:5174/api/health`.

To run just one application:

```sh
npm.cmd run dev:frontend
npm.cmd run dev:backend
```

Copy each `.env.example` file to `.env` before starting if an `.env` file is not already present. The frontend needs the Supabase URL and publishable key. The backend accepts additional API keys for its optional weather, maps, mandi, and ML integrations.
