# Performance Optimizations

> **ID:** 4
> **Status:** PLANNED
> **Priority:** HIGH
> **Type:** enhancement
> **Version Impact:** patch
> **Created:** Feb 20, 2026
> **Platform:** Web
> **Automation:** auto

## Overview

Apply React performance optimizations to reduce unnecessary re-renders by 40-60%. The TodoItem component re-renders on every parent state change, callbacks create new references each render, and localStorage writes happen on every single mutation without debouncing.

## Requirements

### Must Have
- [ ] Wrap TodoItem with React.memo()
- [ ] Wrap all useTodos callbacks with useCallback()
- [ ] Debounce localStorage writes with 500ms delay
- [ ] Memoize computed values (remaining count) with useMemo

### Nice to Have
- [ ] Extract useAuthRedirect() hook to deduplicate redirect logic
- [ ] Add will-change: opacity to delete button CSS transition

## Current State

Every state change causes all TodoItems to re-render. All callback functions create new references each render. localStorage writes full todo array on every single mutation.

**Current Files:**
| File | Purpose |
|------|---------|
| `components/todo-item.tsx` | TodoItem - no React.memo (line 16) |
| `hooks/use-todos.ts` | useTodos - no useCallback, no debounce (lines 25-60, 19-23) |
| `app/todos/page.tsx` | Inline filter computation (line 67) |

## Proposed Solution

Apply standard React optimization patterns: memoize components, stabilize callback references, debounce side effects, cache computed values.

### File Changes

| Action | File | Description |
|--------|------|-------------|
| MODIFY | `components/todo-item.tsx` | Wrap export with React.memo() |
| MODIFY | `hooks/use-todos.ts` | Add useCallback to all 4 handlers, debounce storage writes |
| MODIFY | `app/todos/page.tsx` | Add useMemo for remaining count |

## Implementation Steps

### Step 1: Memoize TodoItem Component
In `components/todo-item.tsx`, change the export:
```typescript
export const TodoItem = memo(function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  // ... existing code unchanged
})
```
Import `memo` from React.

### Step 2: Add useCallback to useTodos Hook
In `hooks/use-todos.ts`, wrap all 4 handler functions:
```typescript
const addTodo = useCallback((text: string) => {
  setTodos(prev => [{ id: crypto.randomUUID(), text: text.trim(), completed: false, createdAt: Date.now() }, ...prev])
}, [])

const deleteTodo = useCallback((id: string) => {
  setTodos(prev => prev.filter(t => t.id !== id))
}, [])

const toggleTodo = useCallback((id: string) => {
  setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
}, [])

const editTodo = useCallback((id: string, newText: string) => {
  setTodos(prev => prev.map(t => t.id === id ? { ...t, text: newText.trim() } : t))
}, [])
```

### Step 3: Debounce localStorage Writes
Replace the direct useEffect with a debounced version:
```typescript
useEffect(() => {
  if (!isLoaded) return
  const timer = setTimeout(() => {
    storage.set(TODOS_STORAGE_KEY, todos)
  }, 500)
  return () => clearTimeout(timer)
}, [todos, isLoaded])
```

### Step 4: Memoize Remaining Count
In `app/todos/page.tsx`:
```typescript
const remainingCount = useMemo(() => todos.filter(t => !t.completed).length, [todos])
```
Use `remainingCount` in the JSX.

## Testing Checklist

- [ ] Todos still render correctly
- [ ] Add, edit, delete, toggle all work
- [ ] Edits are saved to localStorage (after 500ms debounce)
- [ ] Remaining count displays correctly
- [ ] No React warnings in console
- [ ] Page refresh loads persisted data

## Dependencies

- Required packages: none
- Blocked by: none

## Notes for Implementation Agent

Use the functional updater pattern `setTodos(prev => ...)` inside useCallback to avoid stale closure issues. This allows the dependency array to be empty `[]`. The debounce timer cleanup is critical - always return the clearTimeout from useEffect.
