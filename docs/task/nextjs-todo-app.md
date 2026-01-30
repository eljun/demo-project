# Next.js Todo List App

> **Status:** TESTING
> **Priority:** HIGH
> **Type:** feature
> **Version Impact:** minor
> **Created:** 2026-01-30
> **Completed:** 2026-01-30
> **Platform:** Web
> **Automation:** manual
>
> **Implementation Notes:** All "Must Have" requirements implemented. Project uses Tailwind CSS v4 with the new `@tailwindcss/postcss` plugin. Manually created shadcn/ui components instead of CLI installation due to v4 compatibility.

## Overview

Build a simple, functional todo list application using Next.js 14 (App Router) with Tailwind CSS and shadcn/ui components. The app includes dummy authentication and persists todos to local storage.

## Requirements

### Must Have
- [x] Next.js 14 project setup with App Router
- [x] Tailwind CSS + shadcn/ui integration
- [x] Dummy login page with hardcoded credentials
- [x] Add new todos
- [x] Delete todos
- [x] Toggle todo status (complete/incomplete)
- [x] Persist todos to local storage
- [x] Protected routes (redirect to login if not authenticated)

### Nice to Have
- [ ] Toast notifications for actions
- [ ] Empty state illustration
- [ ] Responsive design

## Dummy Login Credentials

```
Email: user@example.com
Password: password123
```

## Current State

Empty project - no existing code or configuration.

## Proposed Solution

### Architecture

```
demo-project/
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Redirect to /todos or /login
│   ├── login/
│   │   └── page.tsx        # Login page
│   └── todos/
│       └── page.tsx        # Main todo list (protected)
├── components/
│   ├── ui/                 # shadcn components
│   ├── todo-item.tsx       # Single todo component
│   ├── todo-list.tsx       # List of todos
│   ├── add-todo-form.tsx   # Form to add new todo
│   └── auth-provider.tsx   # Auth context provider
├── hooks/
│   ├── use-auth.ts         # Authentication hook
│   └── use-todos.ts        # Todos management hook
├── lib/
│   ├── utils.ts            # shadcn utility
│   └── storage.ts          # Local storage helpers
└── types/
    └── index.ts            # TypeScript types
```

### Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui (Button, Input, Checkbox, Card)
- **State:** React Context + useState
- **Storage:** Browser Local Storage

### File Changes

| Action | File | Description |
|--------|------|-------------|
| CREATE | `package.json` | Project dependencies |
| CREATE | `app/layout.tsx` | Root layout with AuthProvider |
| CREATE | `app/page.tsx` | Home redirect logic |
| CREATE | `app/login/page.tsx` | Login form page |
| CREATE | `app/todos/page.tsx` | Protected todo list page |
| CREATE | `components/auth-provider.tsx` | Auth context & provider |
| CREATE | `components/todo-item.tsx` | Single todo with actions |
| CREATE | `components/todo-list.tsx` | List container |
| CREATE | `components/add-todo-form.tsx` | New todo form |
| CREATE | `hooks/use-auth.ts` | Auth state management |
| CREATE | `hooks/use-todos.ts` | Todos CRUD + localStorage |
| CREATE | `lib/storage.ts` | LocalStorage wrapper |
| CREATE | `types/index.ts` | Todo & User types |

## Implementation Steps

### Step 1: Initialize Next.js 14 Project

Create new Next.js 14 project with TypeScript and Tailwind CSS:

```bash
npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"
```

### Step 2: Install and Configure shadcn/ui

Initialize shadcn/ui and install required components:

```bash
npx shadcn@latest init
npx shadcn@latest add button input checkbox card
```

### Step 3: Create TypeScript Types

Define types for Todo and User in `types/index.ts`:

```typescript
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

export interface User {
  email: string;
}
```

### Step 4: Create Local Storage Helper

Create `lib/storage.ts` with type-safe localStorage functions:

```typescript
export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    if (typeof window === 'undefined') return defaultValue;
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  },
  set: <T>(key: string, value: T): void => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove: (key: string): void => {
    localStorage.removeItem(key);
  }
};
```

### Step 5: Create Auth Provider & Hook

Build authentication context in `components/auth-provider.tsx`:
- Store auth state in context
- Provide login/logout functions
- Persist auth state to localStorage
- Hardcode credentials check: `user@example.com` / `password123`

### Step 6: Create useTodos Hook

Build `hooks/use-todos.ts`:
- Load todos from localStorage on mount
- Provide addTodo, deleteTodo, toggleTodo functions
- Auto-save to localStorage on changes

### Step 7: Build Login Page

Create `app/login/page.tsx`:
- Email and password inputs using shadcn
- Form validation
- Error message for invalid credentials
- Redirect to /todos on success

### Step 8: Build Todo Components

**TodoItem (`components/todo-item.tsx`):**
- Checkbox to toggle complete status
- Todo text with strikethrough when complete
- Delete button

**AddTodoForm (`components/add-todo-form.tsx`):**
- Text input for new todo
- Add button
- Clear input after adding

**TodoList (`components/todo-list.tsx`):**
- Map over todos and render TodoItem
- Empty state message

### Step 9: Build Protected Todos Page

Create `app/todos/page.tsx`:
- Check auth status, redirect to /login if not authenticated
- Display AddTodoForm
- Display TodoList
- Logout button

### Step 10: Configure Root Page

Update `app/page.tsx`:
- Check auth status
- Redirect to /todos if authenticated
- Redirect to /login if not authenticated

## Testing Checklist

- [ ] Can access login page when not authenticated
- [ ] Invalid credentials show error message
- [ ] Valid credentials (user@example.com / password123) redirect to /todos
- [ ] Can add a new todo
- [ ] Can mark todo as complete/incomplete
- [ ] Can delete a todo
- [ ] Todos persist after page refresh
- [ ] Logout redirects to login page
- [ ] Cannot access /todos when logged out
- [ ] Auth state persists after page refresh

## Dependencies

**New packages to install:**
- `next@14` - Framework
- `react@18` - UI library
- `typescript` - Type safety
- `tailwindcss` - Styling
- `@radix-ui/*` - shadcn primitives
- `class-variance-authority` - shadcn styling
- `clsx` - Class utilities
- `tailwind-merge` - Tailwind utilities
- `lucide-react` - Icons

## Notes for Implementation Agent

1. **Use App Router patterns** - All pages in `app/` directory with `page.tsx` files
2. **Client components** - Auth provider and todo components need `"use client"` directive
3. **Hydration safety** - localStorage only accessible client-side, handle SSR gracefully
4. **shadcn components** - Install via CLI, don't manually copy
5. **Keep it simple** - This is an MVP, avoid over-engineering

## Task Breakdown Summary

| # | Task | Description |
|---|------|-------------|
| 1 | Project Setup | Initialize Next.js 14 + Tailwind |
| 2 | shadcn Setup | Install shadcn/ui + components |
| 3 | Types & Utils | Create types, storage helpers |
| 4 | Auth System | Build auth provider, hook, login page |
| 5 | Todo System | Build useTodos hook, todo components |
| 6 | Integration | Wire up pages, routing, protection |
| 7 | Testing | Manual testing of all features |
