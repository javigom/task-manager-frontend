# Task Manager Frontend

Modern task management web application built with React, TypeScript, and Vite, using Material UI for the component layer.

## 🚀 Features

- ✅ **Authentication** — JWT-based login and registration
- ✅ **Task Management** — Create, view, and manage tasks with React Query
- ✅ **Internationalization** — English (EN) and Spanish (ES) via i18next
- ✅ **Dark Mode** — Persistent light/dark theme toggle
- ✅ **Responsive Layout** — Collapsible sidebar on mobile
- ✅ **Protected Routes** — Automatic redirect based on auth state
- ✅ **Modern Stack** — React 18, TypeScript, Vite, MUI v5

## 📋 Prerequisites

- Node.js 18+ (LTS recommended)
- npm
- Backend API running (task-manager-backend)

## 🛠️ Tech Stack

| Layer | Library |
|---|---|
| UI framework | React 18 + TypeScript |
| Build tool | Vite |
| Component library | Material UI (MUI) v5 |
| Routing | React Router v6 |
| Server state | TanStack Query (React Query) v5 |
| HTTP client | Axios |
| Internationalization | i18next + react-i18next |

## 📦 Installation

```bash
cd task-manager-frontend
npm install
```

Create environment configuration:

```bash
cp .env.example .env
```

Configure `.env`:

```env
# Backend API URL (default matches docker-compose setup)
VITE_API_BASE=http://localhost:8001
```

## 🚀 Usage

```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview
```

The app will be available at `http://localhost:5173` (or the port shown in terminal).

## 📁 Project Structure

```
src/
├── config/               # App-wide configuration
│   └── theme.ts          # MUI theme factory (light/dark)
├── context/              # React contexts
│   ├── AuthContext.tsx   # JWT auth state
│   └── ThemeModeContext.tsx
├── components/
│   └── ui/               # Reusable UI primitives
│       ├── Button.tsx
│       ├── Footer.tsx
│       ├── Header.tsx    # AppBar with language/theme/avatar controls
│       ├── PageCard.tsx
│       ├── Sidebar.tsx   # Responsive navigation drawer
│       ├── TaskCard.tsx
│       └── TextInput.tsx
├── i18n/
│   ├── index.ts          # i18next initialisation
│   └── locales/
│       ├── en.ts         # English translations
│       └── es.ts         # Spanish translations
├── layouts/
│   ├── AppLayout.tsx     # Protected pages layout (sidebar + header + footer)
│   └── AuthLayout.tsx    # Auth pages layout
├── pages/
│   ├── Dashboard.tsx
│   ├── Login.tsx
│   ├── Profile.tsx
│   └── Register.tsx
├── routes/
│   ├── AppStack.tsx      # Protected route definitions
│   ├── AuthStack.tsx     # Public route definitions
│   └── ProtectedRoute.tsx
├── services/
│   └── api.ts            # Axios instance with auth interceptor
├── main.tsx              # Entry point + theme/auth providers
├── App.tsx               # Root component
└── index.css             # Global CSS resets
```

## 🔐 Authentication

JWT tokens are stored in `localStorage` under the key `access_token` and automatically attached to API requests via an Axios request interceptor.

- Unauthenticated users are redirected to `/login`
- Authenticated users can access `/` (Dashboard) and `/profile`

## 🌍 Internationalization

- **Default language:** Spanish (ES)
- **Available:** English (EN), Spanish (ES)
- **Selector:** Header pill control — shows circular flag + language name
- **Persistence:** Saved to `localStorage` under `lang`

To add a new language, create a locale file in `src/i18n/locales/` and register it in `src/i18n/index.ts`.

## 🎨 Theming

Theme is defined in `src/config/theme.ts` as a factory `getTheme(mode)`. Active mode is managed by `ThemeModeContext` and persisted to `localStorage` under `theme`. Toggle is available in the header.

## 🔧 Configuration

### API Base URL

```env
VITE_API_BASE=http://localhost:8001
```

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## 🔗 Backend Integration

This frontend connects to `task-manager-backend`. Start the backend with:

```bash
cd task-manager-backend
docker compose up
```

## 🐛 Troubleshooting

- **CORS errors** — ensure the backend allows requests from the Vite dev server origin
- **API connection** — verify `VITE_API_BASE` matches the running backend URL
- **Auth issues** — clear `localStorage` and log in again

## 📄 License

MIT
