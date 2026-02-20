# Task Priorities & Due Dates

> **ID:** 10
> **Status:** PLANNED
> **Priority:** HIGH
> **Type:** feature
> **Version Impact:** minor
> **Created:** Feb 20, 2026
> **Platform:** Web
> **Automation:** auto

## Overview

Add priority levels and due dates to todos for better task management. Users can assign High/Medium/Low priority and optional due dates. Todos can be sorted by priority or due date. Visual indicators show priority and overdue status.

## Requirements

### Must Have
- [ ] Priority levels: High (red), Medium (yellow), Low (green), None (default)
- [ ] Priority selector in add todo form
- [ ] Priority badge displayed on each todo
- [ ] Optional due date picker on todos
- [ ] Visual indicator for overdue todos (red highlight)
- [ ] Visual indicator for due today (orange highlight)
- [ ] Sort options: Default, Priority, Due Date
- [ ] Update Todo type with priority and dueDate fields

### Nice to Have
- [ ] Edit priority and due date on existing todos
- [ ] Due date relative display ("Tomorrow", "In 3 days", "Overdue")
- [ ] Priority filter integration with search

## Current State

Todos have no priority or due date fields. The Todo interface only has: id, text, completed, createdAt.

**Current Files:**
| File | Purpose |
|------|---------|
| `types/index.ts` | Todo interface - needs priority and dueDate fields |
| `hooks/use-todos.ts` | useTodos - needs to handle new fields |
| `components/add-todo-form.tsx` | Add form - needs priority selector and date picker |
| `components/todo-item.tsx` | Display - needs priority badge and due date display |
| `app/todos/page.tsx` | Page - needs sort controls |

## Proposed Solution

Extend the Todo interface with optional priority and dueDate fields. Add a priority selector dropdown and native date input to the add form. Display priority badges and due date indicators on each todo. Add sort controls above the list.

### Architecture

Update Todo type:
```typescript
interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: number
  priority?: "high" | "medium" | "low"
  dueDate?: string  // ISO date string YYYY-MM-DD
}
```

### File Changes

| Action | File | Description |
|--------|------|-------------|
| MODIFY | `types/index.ts` | Add priority and dueDate to Todo interface |
| MODIFY | `hooks/use-todos.ts` | Handle priority/dueDate in addTodo and editTodo |
| MODIFY | `components/add-todo-form.tsx` | Add priority selector and date input |
| MODIFY | `components/todo-item.tsx` | Display priority badge and due date |
| CREATE | `components/priority-badge.tsx` | Reusable priority badge component |
| MODIFY | `app/todos/page.tsx` | Add sort controls |

## Implementation Steps

### Step 1: Update Todo Type
In `types/index.ts`, add optional fields:
```typescript
export interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: number
  priority?: "high" | "medium" | "low"
  dueDate?: string
}
```

### Step 2: Create PriorityBadge Component
Small colored badge showing priority level:
- High: red badge
- Medium: yellow/amber badge
- Low: green badge
- None: no badge shown

### Step 3: Update AddTodoForm
Add a priority dropdown and date input below the text input:
- Priority: select with High/Medium/Low/None options
- Due Date: native `<input type="date">` with min date = today
- Both are optional - default to no priority, no date

### Step 4: Update TodoItem Display
Show priority badge and due date alongside todo text:
- Priority badge to the left of text
- Due date below text in small muted text
- Overdue items get red text/border
- Due today gets orange/amber highlight

### Step 5: Update useTodos Hook
Modify `addTodo` to accept priority and dueDate parameters:
```typescript
const addTodo = useCallback((text: string, priority?: Priority, dueDate?: string) => {
  setTodos(prev => [{
    id: crypto.randomUUID(),
    text: text.trim(),
    completed: false,
    createdAt: Date.now(),
    priority,
    dueDate,
  }, ...prev])
}, [])
```

### Step 6: Add Sort Controls
In `app/todos/page.tsx`, add sort dropdown: Default, Priority (High first), Due Date (Earliest first).

## Testing Checklist

- [ ] Can add todo with priority
- [ ] Can add todo with due date
- [ ] Can add todo without priority/date (backwards compatible)
- [ ] Priority badges display correctly with right colors
- [ ] Due dates display correctly
- [ ] Overdue todos show red indicator
- [ ] Due today shows orange indicator
- [ ] Sort by priority works (High → Medium → Low → None)
- [ ] Sort by due date works (earliest first, no date last)
- [ ] Existing todos without priority/date still work
- [ ] Data persists in localStorage

## Dependencies

- Required packages: none (use native date input)
- Blocked by: none (but pair well with Task 9 search/filtering)

## Notes for Implementation Agent

Use optional fields so existing todos in localStorage aren't broken. The priority field is optional - undefined means no priority. Use native `<input type="date">` rather than a date picker library to keep dependencies minimal. Sort should be a useMemo computation. Use Tailwind color classes for priority badges: red-500, amber-500, green-500.
