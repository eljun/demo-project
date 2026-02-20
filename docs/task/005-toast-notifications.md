# Toast Notifications

> **ID:** 5
> **Status:** PLANNED
> **Priority:** MEDIUM
> **Type:** feature
> **Version Impact:** minor
> **Created:** Feb 20, 2026
> **Platform:** Web
> **Automation:** auto

## Overview

Add a toast notification system to provide visual feedback when users perform actions (add, edit, delete, toggle todos). Currently there is no feedback after actions, making the app feel unresponsive.

## Requirements

### Must Have
- [ ] Create a Toast component with auto-dismiss (3 seconds)
- [ ] Create a useToast hook for triggering toasts
- [ ] Show toast on: todo added, todo deleted, todo edited, todo toggled
- [ ] Support success, error, and info variants
- [ ] Toast appears at bottom-right of screen
- [ ] Smooth enter/exit animations
- [ ] Stack multiple toasts

### Nice to Have
- [ ] Manual dismiss button
- [ ] Undo action in delete toast

## Current State

No visual feedback after any action. Users rely on seeing the list update to confirm operations.

**Current Files:**
| File | Purpose |
|------|---------|
| `app/todos/page.tsx` | Main page - calls todo operations without feedback |
| `hooks/use-todos.ts` | Todo operations - returns no status |

## Proposed Solution

Create a lightweight toast system using React context and portal. Use Tailwind for styling and CSS transitions for animations. No external dependency needed.

### File Changes

| Action | File | Description |
|--------|------|-------------|
| CREATE | `components/toast.tsx` | Toast component with animations |
| CREATE | `hooks/use-toast.ts` | useToast hook with add/remove functions |
| CREATE | `components/toast-provider.tsx` | Context provider and toast container |
| MODIFY | `app/layout.tsx` | Add ToastProvider to layout |
| MODIFY | `app/todos/page.tsx` | Add toast calls after todo operations |

## Implementation Steps

### Step 1: Create Toast Hook and Provider
Create a context-based toast system with:
- `useToast()` hook returning `{ toast }` function
- ToastProvider that renders toasts via portal
- Auto-dismiss after 3 seconds with cleanup

### Step 2: Create Toast Component
Visual toast with:
- Variants: success (green), error (red), info (blue)
- Slide-in from bottom-right animation
- Auto-dismiss with progress indicator
- Consistent styling with app design

### Step 3: Integrate with Layout
Add `<ToastProvider>` in `app/layout.tsx` inside AuthProvider.

### Step 4: Add Toasts to Todo Operations
In `app/todos/page.tsx`, wrap todo operations:
```typescript
const handleAdd = (text: string) => {
  addTodo(text)
  toast({ message: "Todo added!", variant: "success" })
}
```

## Testing Checklist

- [ ] Toast appears on add todo
- [ ] Toast appears on delete todo
- [ ] Toast appears on edit todo
- [ ] Toast appears on toggle todo
- [ ] Toast auto-dismisses after 3 seconds
- [ ] Multiple toasts stack properly
- [ ] Toast animations are smooth
- [ ] Toast works on mobile

## Dependencies

- Required packages: none
- Blocked by: none

## Notes for Implementation Agent

Keep the implementation lightweight - no external toast libraries needed. Use Tailwind's transition utilities for animations. Use React.createPortal to render toasts outside the component tree. The toast container should be fixed-positioned at the bottom-right.
