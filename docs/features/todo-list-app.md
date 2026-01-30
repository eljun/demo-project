# Feature: Next.js Todo List Application

> **Status:** PRODUCTION
> **Last Updated:** Jan 30, 2026

## Overview

A full-featured todo list application built with Next.js 14 and Tailwind CSS. Users authenticate with hardcoded credentials, manage todos through a clean interface, and persist all data locally in the browser.

---

## User Journey

### For End Users
1. Navigate to the application
2. Enter credentials (user@example.com / password123)
3. View dashboard with todo list
4. Add new todos by typing and clicking "Add"
5. Check off completed todos with the checkbox
6. Delete todos using the trash icon
7. Logout when finished

### For Developers
1. Clone and install dependencies
2. Run `npm run dev` to start the development server
3. Open http://localhost:3000
4. App automatically detects auth state and routes appropriately
5. localStorage persists all data between sessions

---

## Architecture

### File Structure
```
app/
├── layout.tsx              # Root layout with auth provider context
├── page.tsx                # Home redirect logic
├── login/
│   └── page.tsx            # Login form page (public)
└── todos/
    └── page.tsx            # Todo list page (protected)

components/
├── ui/
│   ├── button.tsx          # shadcn Button component
│   ├── input.tsx           # shadcn Input component
│   ├── checkbox.tsx        # shadcn Checkbox component
│   └── card.tsx            # shadcn Card component
├── auth-provider.tsx       # Auth context provider & logic
├── todo-item.tsx           # Single todo with checkbox & delete
├── todo-list.tsx           # Todo list container
└── add-todo-form.tsx       # Form to add new todos

hooks/
├── use-auth.ts             # Auth state management hook
└── use-todos.ts            # Todo CRUD & localStorage hook

lib/
└── storage.ts              # Type-safe localStorage wrapper

types/
└── index.ts                # TypeScript interfaces
```

### Data Models

**Todo**
```typescript
interface Todo {
  id: string;           // UUID
  text: string;         // Todo description
  completed: boolean;   // Completion status
  createdAt: number;    // Timestamp
}
```

**User**
```typescript
interface User {
  email: string;  // Authenticated user email
}
```

### Authentication

- **Type:** Session-based with localStorage persistence
- **Credentials:** Hardcoded (user@example.com / password123)
- **Session Key:** `auth-user` in localStorage
- **Validation:** Email and password must match exactly
- **Duration:** Until explicit logout or localStorage clear

### Storage

- **Engine:** Browser localStorage
- **Todos Key:** `todos`
- **Auth Key:** `auth-user`
- **Format:** JSON serialization
- **Capacity:** ~5-10MB per origin
- **Persistence:** Survives browser refresh and restart

---

## Implementation Details

### Key Components

| Component | Location | Purpose |
|-----------|----------|---------|
| AuthProvider | components/auth-provider.tsx | Manages auth state, login/logout logic, localStorage sync |
| useTodos Hook | hooks/use-todos.ts | CRUD operations for todos, localStorage persistence |
| TodoItem | components/todo-item.tsx | Renders single todo with checkbox and delete button |
| AddTodoForm | components/add-todo-form.tsx | Form to create new todos |
| TodoList | components/todo-list.tsx | Container for displaying todos |
| useAuth Hook | hooks/use-auth.ts | Provides auth state to components |

### Route Protection

Protected routes use a client-side redirect pattern:
```
/todos → Check auth in component → Redirect to /login if unauthenticated
/login → Check auth in component → Redirect to /todos if authenticated
```

### State Management

- **Auth:** React Context + localStorage
- **Todos:** Custom Hook with localStorage
- **Rendering:** Client-side only (no SSR for protected pages)

### Local Storage Schema

**Auth State (`auth-user`):**
```json
{
  "email": "user@example.com"
}
```

**Todos (`todos`):**
```json
[
  {
    "id": "uuid-string",
    "text": "Buy groceries",
    "completed": true,
    "createdAt": 1706611200000
  }
]
```

---

## Features

### Core Features
- ✅ User authentication with dummy credentials
- ✅ Add new todos
- ✅ Mark todos as complete/incomplete
- ✅ Delete todos
- ✅ Persistent storage across sessions
- ✅ Protected routes with automatic redirects
- ✅ Logout functionality
- ✅ Responsive UI with shadcn/ui components

### UI/UX
- Clean, minimal design using Tailwind CSS
- Visual feedback for completed todos (strikethrough)
- Empty state message when no todos exist
- Form validation for login
- Loading states handled by React

---

## Technical Notes

- **Next.js 14 App Router** - All routes use the App Router pattern with `page.tsx` files
- **Client Components** - Auth provider and all interactive components use `"use client"` directive for client-side interactivity
- **Hydration Safe** - localStorage access is guarded with `typeof window !== 'undefined'` checks
- **TypeScript** - Full type safety for all state and components
- **Tailwind CSS v4** - Modern utility-first CSS with `@tailwindcss/postcss` plugin
- **No Backend** - Everything runs in the browser; no API calls required

---

## Related Features
- Bulk Actions (planned)
- Responsive Design (planned)
