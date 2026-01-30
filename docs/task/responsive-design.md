# Responsive Design

> **Status:** PLANNED
> **Priority:** MEDIUM
> **Type:** enhancement
> **Version Impact:** patch
> **Created:** 2026-01-30
> **Platform:** Web
> **Automation:** manual

## Overview

Add responsive design to the Todo List app so it works well on mobile, tablet, and desktop devices. This includes mobile-friendly navigation, touch-optimized interactions, and adaptive layouts.

## Requirements

### Must Have
- [ ] Mobile-first responsive layout (320px - 1280px+)
- [ ] Touch-friendly tap targets (minimum 44px)
- [ ] Readable typography at all screen sizes
- [ ] Todo list adapts to screen width
- [ ] Login form centered and readable on mobile
- [ ] No horizontal scrolling on any device

### Nice to Have
- [ ] Swipe to delete on mobile
- [ ] Pull to refresh gesture
- [ ] Bottom navigation on mobile

## Current State

The base Todo List app uses Tailwind CSS but lacks responsive breakpoints and mobile-optimized layouts.

**Files to Modify:**
| File | Purpose |
|------|---------|
| `app/login/page.tsx` | Login form layout |
| `app/todos/page.tsx` | Main todo list page |
| `components/todo-item.tsx` | Individual todo styling |
| `components/todo-list.tsx` | List container |
| `components/add-todo-form.tsx` | New todo input form |

## Proposed Solution

### Breakpoints (Tailwind defaults)

| Breakpoint | Min Width | Target Devices |
|------------|-----------|----------------|
| `sm` | 640px | Large phones, small tablets |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |

### Layout Strategy

**Mobile (< 640px):**
- Full-width container with padding
- Stacked layout for all components
- Larger touch targets
- Simplified header with logout icon

**Tablet (640px - 1024px):**
- Centered container with max-width
- Increased spacing
- Side-by-side elements where appropriate

**Desktop (> 1024px):**
- Fixed-width centered container (max-w-2xl)
- Comfortable reading width
- Hover states for interactive elements

### File Changes

| Action | File | Description |
|--------|------|-------------|
| MODIFY | `app/login/page.tsx` | Add responsive padding, center form |
| MODIFY | `app/todos/page.tsx` | Responsive container, header layout |
| MODIFY | `components/todo-item.tsx` | Touch targets, text sizing |
| MODIFY | `components/todo-list.tsx` | Responsive spacing |
| MODIFY | `components/add-todo-form.tsx` | Stack on mobile, inline on desktop |

## Implementation Steps

### Step 1: Update Login Page Layout

Make the login form responsive:

```tsx
// app/login/page.tsx
<div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
  <Card className="w-full max-w-sm sm:max-w-md">
    {/* Form content */}
  </Card>
</div>
```

### Step 2: Update Todos Page Container

Add responsive container with proper spacing:

```tsx
// app/todos/page.tsx
<div className="min-h-screen bg-gray-50">
  <div className="max-w-2xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
    {/* Header */}
    <header className="flex items-center justify-between mb-6">
      <h1 className="text-xl sm:text-2xl font-bold">My Todos</h1>
      <Button variant="ghost" size="sm" className="sm:size-default">
        Logout
      </Button>
    </header>

    {/* Content */}
    <AddTodoForm />
    <TodoList todos={todos} />
  </div>
</div>
```

### Step 3: Make AddTodoForm Responsive

Stack on mobile, inline on larger screens:

```tsx
// components/add-todo-form.tsx
<form className="flex flex-col sm:flex-row gap-2 mb-6">
  <Input
    className="flex-1 h-12 sm:h-10 text-base sm:text-sm"
    placeholder="Add a new todo..."
  />
  <Button
    type="submit"
    className="h-12 sm:h-10 w-full sm:w-auto"
  >
    Add
  </Button>
</form>
```

### Step 4: Update TodoItem for Touch

Ensure touch-friendly sizing:

```tsx
// components/todo-item.tsx
<div className="flex items-center gap-3 p-3 sm:p-2 rounded-lg hover:bg-gray-50">
  <Checkbox
    className="h-6 w-6 sm:h-5 sm:w-5"
    checked={todo.completed}
  />
  <span className="flex-1 text-base sm:text-sm truncate">
    {todo.text}
  </span>
  <Button
    variant="ghost"
    size="icon"
    className="h-10 w-10 sm:h-8 sm:w-8 shrink-0"
  >
    <Trash2 className="h-5 w-5 sm:h-4 sm:w-4" />
  </Button>
</div>
```

### Step 5: Add Viewport Meta (if missing)

Ensure proper viewport in `app/layout.tsx`:

```tsx
export const metadata: Metadata = {
  title: 'Todo App',
  description: 'A simple todo list app',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}
```

## Testing Checklist

- [ ] Login page displays correctly on iPhone SE (375px)
- [ ] Login page displays correctly on iPad (768px)
- [ ] Login page displays correctly on desktop (1280px+)
- [ ] Todo list is scrollable on small screens
- [ ] Add todo form is usable with thumb on mobile
- [ ] Delete button is easy to tap (44px+ target)
- [ ] Checkbox is easy to tap (44px+ target)
- [ ] No horizontal scroll on any viewport
- [ ] Text is readable without zooming
- [ ] Form inputs don't zoom on iOS when focused

## Dependencies

- No new packages required
- Uses existing Tailwind CSS responsive utilities

## Notes for Implementation Agent

1. **Mobile-first approach** - Start with mobile styles, add `sm:`, `md:`, `lg:` for larger screens
2. **Touch targets** - Minimum 44x44px for tappable elements on mobile
3. **Test on real devices** - Chrome DevTools is good but test on actual phones if possible
4. **iOS input zoom** - Use `text-base` (16px) on inputs to prevent auto-zoom on iOS
5. **Truncate long todos** - Use `truncate` class to prevent layout breaking

## Related

- Base task: [nextjs-todo-app.md](./nextjs-todo-app.md)
