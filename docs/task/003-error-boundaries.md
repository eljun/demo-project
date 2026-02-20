# Error Boundaries & Crash Recovery

> **ID:** 3
> **Status:** PLANNED
> **Priority:** HIGH
> **Type:** bugfix
> **Version Impact:** patch
> **Created:** Feb 20, 2026
> **Platform:** Web
> **Automation:** auto

## Overview

Add React error boundaries to prevent the entire app from crashing when a component throws an error. Currently, any runtime error causes a white screen with no recovery option. Also fix silent localStorage failures by adding error logging.

## Requirements

### Must Have
- [ ] Create ErrorBoundary component with fallback UI
- [ ] Wrap root layout with ErrorBoundary
- [ ] Show user-friendly error message with retry button
- [ ] Log errors to console in development mode
- [ ] Fix silent storage failures in lib/storage.ts
- [ ] Add navigation race condition fix with useRef

### Nice to Have
- [ ] Component-level error boundaries for todo list
- [ ] Error reporting hook for future integration

## Current State

No error boundaries exist. Storage errors are silently caught. Navigation useEffects can trigger multiple redirects.

**Current Files:**
| File | Purpose |
|------|---------|
| `lib/storage.ts` | Storage wrapper - silent error catch (line 7-8) |
| `app/page.tsx` | Home redirect - race condition risk (line 11-19) |
| `app/login/page.tsx` | Login redirect - race condition (line 18-22) |
| `app/todos/page.tsx` | Todos redirect - race condition (line 18-22) |

## Proposed Solution

Create a class-based ErrorBoundary component (required by React for error boundaries). Add error logging to storage. Fix navigation with hasNavigated ref.

### File Changes

| Action | File | Description |
|--------|------|-------------|
| CREATE | `components/error-boundary.tsx` | New ErrorBoundary component with fallback UI |
| MODIFY | `app/layout.tsx` | Wrap children with ErrorBoundary |
| MODIFY | `lib/storage.ts` | Add console.error in development mode |
| MODIFY | `app/page.tsx` | Add hasNavigated ref to prevent race condition |
| MODIFY | `app/login/page.tsx` | Add hasNavigated ref |
| MODIFY | `app/todos/page.tsx` | Add hasNavigated ref |

## Implementation Steps

### Step 1: Create ErrorBoundary Component
Create `components/error-boundary.tsx` as a class component with:
- `getDerivedStateFromError` to catch errors
- `componentDidCatch` to log errors
- Fallback UI with "Something went wrong" message and "Try again" button
- Style using existing Card component and Tailwind classes

### Step 2: Wrap Root Layout
In `app/layout.tsx`, wrap `{children}` inside `<ErrorBoundary>` component within the AuthProvider.

### Step 3: Fix Storage Error Logging
In `lib/storage.ts`, add `console.error()` inside catch blocks when `process.env.NODE_ENV === 'development'`.

### Step 4: Fix Navigation Race Conditions
In all 3 page files, add:
```typescript
const hasNavigated = useRef(false)
useEffect(() => {
  if (!isLoading && !hasNavigated.current) {
    hasNavigated.current = true
    router.replace(destination)
  }
}, [isLoading, user, router])
```

## Testing Checklist

- [ ] Error boundary catches rendering errors
- [ ] Fallback UI shows with retry button
- [ ] Retry button resets error state
- [ ] Storage errors logged in dev console
- [ ] Navigation only happens once per page load
- [ ] Normal app flow unaffected

## Dependencies

- Required packages: none
- Blocked by: none

## Notes for Implementation Agent

ErrorBoundary must be a class component - React does not support error boundaries as function components. Use the existing Card component for the fallback UI styling to maintain consistency.
