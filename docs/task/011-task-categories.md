# Task Categories & Projects

> **ID:** 11
> **Status:** PLANNED
> **Priority:** MEDIUM
> **Type:** feature
> **Version Impact:** minor
> **Created:** Feb 20, 2026
> **Platform:** Web
> **Automation:** auto

## Overview

Add a category/project system to organize todos into groups. Users can create categories with custom colors, assign todos to categories, and filter by category. This adds structure to task management.

## Requirements

### Must Have
- [ ] Create, edit, delete categories
- [ ] Each category has a name and color
- [ ] Assign a category to a todo (optional)
- [ ] Filter todos by category
- [ ] Category badge on each todo
- [ ] Default categories: Personal, Work, Shopping, Health
- [ ] Category selector in add todo form
- [ ] Persist categories in localStorage

### Nice to Have
- [ ] Category management sidebar/modal
- [ ] Category count badges
- [ ] Drag to reorder categories

## Current State

No category system exists. Todos are a flat list.

**Current Files:**
| File | Purpose |
|------|---------|
| `types/index.ts` | Todo interface - needs categoryId field |
| `hooks/use-todos.ts` | Todo management - unchanged |
| `components/add-todo-form.tsx` | Form - needs category selector |
| `components/todo-item.tsx` | Display - needs category badge |
| `app/todos/page.tsx` | Page - needs category filter |
| `lib/storage.ts` | Storage - used for persisting categories |

## Proposed Solution

Create a Category type and useCategories hook. Add category selector to add form and category badges to todo items. Add a category filter bar above the todo list.

### Architecture

```typescript
interface Category {
  id: string
  name: string
  color: string  // Tailwind color class (e.g., "blue", "red", "green")
}

// Update Todo interface
interface Todo {
  // ...existing fields
  categoryId?: string
}
```

### File Changes

| Action | File | Description |
|--------|------|-------------|
| MODIFY | `types/index.ts` | Add Category interface and categoryId to Todo |
| CREATE | `hooks/use-categories.ts` | New hook for category CRUD operations |
| CREATE | `components/category-badge.tsx` | Small colored category badge |
| CREATE | `components/category-filter.tsx` | Category filter chips above todo list |
| MODIFY | `components/add-todo-form.tsx` | Add category dropdown |
| MODIFY | `components/todo-item.tsx` | Show category badge |
| MODIFY | `app/todos/page.tsx` | Add category filter state and integration |

## Implementation Steps

### Step 1: Define Types and Hook
Create Category interface in types/index.ts. Create useCategories hook with add, edit, delete, and localStorage persistence. Initialize with 4 default categories.

### Step 2: Create Category Components
- `category-badge.tsx`: Small pill-shaped badge with category color and name
- `category-filter.tsx`: Horizontal row of category chips, click to filter

### Step 3: Integrate with Add Form
Add a category dropdown/select to add-todo-form.tsx below the text input.

### Step 4: Display on Todo Items
Show category badge next to todo text in todo-item.tsx.

### Step 5: Add Category Filtering
In todos page, add category filter state and filter todos by selected category.

## Testing Checklist

- [ ] Can create a todo with a category
- [ ] Can create a todo without a category
- [ ] Category badge shows on todo items
- [ ] Can filter by category
- [ ] "All" filter shows all categories
- [ ] Categories persist across page refresh
- [ ] Default categories are available on first load
- [ ] Existing todos without categories still display correctly

## Dependencies

- Required packages: none
- Blocked by: none (but works well with Task 9 search/filtering)

## Notes for Implementation Agent

Use optional categoryId so existing todos aren't broken. Use a fixed set of Tailwind color values (blue, red, green, purple, amber, pink) for category colors. Keep the category management simple - a small add/edit interface is sufficient for now.
