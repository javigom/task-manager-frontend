# Task Manager Frontend

Modern task management web application built with React, TypeScript, and Vite. Features authentication, internationalization (i18n), and a clean UI with Tailwind CSS.

## 🚀 Features

- ✅ **Authentication System** - JWT-based auth with login and registration
- ✅ **Task Management** - Create, view, and manage tasks
- ✅ **Internationalization** - Support for English (EN) and Spanish (ES)
- ✅ **Protected Routes** - Automatic redirection based on authentication state
- ✅ **Modern Stack** - React 18, TypeScript, Vite, TailwindCSS
- ✅ **State Management** - TanStack Query (React Query) for server state
- ✅ **Responsive Design** - Mobile-friendly with centered layouts and glitter effects

## 📋 Prerequisites

- Node.js 18+ (LTS recommended)
- npm or yarn
- Backend API running (task-manager-backend)

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **TanStack Query** - Server state management
- **Axios** - HTTP client
- **i18next** - Internationalization
- **Tailwind CSS** - Utility-first CSS

## 📦 Installation

1. Clone the repository and navigate to the frontend directory:

```bash
cd task-manager-frontend
```

1. Install dependencies:

```bash
npm install
```

1. Create environment configuration:

```bash
cp .env.example .env
```

1. Configure your `.env` file:

```env
# Backend API URL (default matches docker-compose setup)
VITE_API_BASE=http://localhost:8001

# Application environment
VITE_APP_ENV=development
```

## 🚀 Usage

### Development Server

Start the development server with hot reload:

```bash
npm run dev
```

The app will be available at `http://localhost:3000` (or the port shown in terminal).

### Build for Production

Create an optimized production build:

```bash
npm run build
```

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── context/          # React contexts (Auth)
│   └── AuthContext.tsx
├── pages/            # Page components
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Dashboard.tsx
│   └── Profile.tsx
├── routes/           # Route configuration
│   ├── AuthStack.tsx
│   ├── AppStack.tsx
│   └── ProtectedRoute.tsx
├── services/         # API services
│   └── api.ts
├── i18n.ts           # Internationalization config
├── main.tsx          # App entry point
├── App.tsx           # Root component
└── index.css         # Global styles
```

## 🔐 Authentication

The app uses JWT tokens stored in `localStorage`:

- **Access Token** - Short-lived token for API requests
- Stored under key: `access_token`
- Automatically attached to API requests via Axios interceptor

### Protected Routes

Routes are protected using the `ProtectedRoute` component:

- Unauthenticated users are redirected to `/login`
- Authenticated users can access `/` (Dashboard) and `/profile`

## 🌍 Internationalization

The app supports multiple languages via i18next:

- **Default language:** Spanish (ES)
- **Available languages:** English (EN), Spanish (ES)
- **Language selector:** Available in the header
- **Persistence:** Selected language is saved to `localStorage`

To add a new language:

1. Edit `src/i18n.ts`
2. Add translations under a new language key
3. Update language selector in `App.tsx`

## 🎨 Styling

Custom CSS classes for consistent styling:

- `.auth-center` - Centers content vertically and horizontally
- `.glitter-box` - Adds subtle shimmer animation background
- `.native-input` - Styled input with native browser appearance
- `.native-button` - Styled button with native browser appearance

## 🔧 Configuration

### API Base URL

Configure the backend URL in `.env`:

```env
VITE_API_BASE=http://localhost:8001
```

### TypeScript

TypeScript configuration is in `tsconfig.json`. Vite environment types are defined in `src/vite-env.d.ts`.

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## 🔗 Backend Integration

This frontend connects to `task-manager-backend`. Ensure the backend is running:

```bash
# In the backend directory
docker compose up --build
```

The backend should be accessible at the URL configured in `VITE_API_BASE`.

## 🐛 Troubleshooting

### CORS Errors

Ensure the backend has CORS configured to allow requests from `http://localhost:3000`.

### API Connection Issues

- Check that `VITE_API_BASE` matches your backend URL
- Verify the backend is running and accessible
- Check browser console for detailed error messages

### Authentication Issues

- Clear `localStorage` and try logging in again
- Check that the backend JWT configuration is correct

## 🚧 Future Enhancements

- [ ] Add react-hook-form and zod for form validation
- [ ] Implement refresh token flow
- [ ] Add task editing and deletion
- [ ] Add task filtering and sorting
- [ ] Add user profile editing
- [ ] Implement real-time updates with WebSockets
- [ ] Add dark mode support

## 📄 License

This project is part of the task-manager system.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request
