# Search & Filtering

> **ID:** 9
> **Status:** PLANNED
> **Priority:** HIGH
> **Type:** feature
> **Version Impact:** minor
> **Created:** Feb 20, 2026
> **Platform:** Web
> **Automation:** auto

## Overview

Add search and filtering capabilities to help users quickly find and organize their todos. This is the highest-impact feature identified in the team analysis - essential for productivity when users have many tasks.

## Requirements

### Must Have
- [ ] Text search input that filters todos in real-time
- [ ] Filter buttons: All, Active, Completed
- [ ] Search is case-insensitive
- [ ] Show "No results found" when search has no matches
- [ ] Clear search button (X icon)
- [ ] Maintain filter state during session
- [ ] Show filtered count (e.g., "3 of 10 tasks")

### Nice to Have
- [ ] Debounce search input (300ms)
- [ ] Highlight matching text in results
- [ ] Keyboard shortcut to focus search (Ctrl+F or /)

## Current State

No search or filtering exists. All todos are shown in a single unfiltered list.

**Current Files:**
| File | Purpose |
|------|---------|
| `app/todos/page.tsx` | Main page - renders all todos unfiltered |
| `components/todo-list.tsx` | List component - renders whatever it receives |
| `hooks/use-todos.ts` | Todo state - returns all todos |

## Proposed Solution

Create a search/filter bar component above the todo list. Use local state for search query and filter mode. Filter the todos array before passing to TodoList. No changes needed to the data model.

### Architecture

```
TodosPage
├── SearchFilterBar (NEW)
│   ├── Search input with clear button
│   └── Filter buttons (All / Active / Completed)
├── TodoList (receives filtered todos)
│   └── TodoItem (unchanged)
```

### File Changes

| Action | File | Description |
|--------|------|-------------|
| CREATE | `components/search-filter-bar.tsx` | Search input + filter buttons component |
| MODIFY | `app/todos/page.tsx` | Add search/filter state, filter todos before rendering |

## Implementation Steps

### Step 1: Create SearchFilterBar Component
Create `components/search-filter-bar.tsx`:
- Search input with magnifying glass icon (from lucide-react) and clear button
- Three filter buttons: All, Active, Completed
- Props: searchQuery, onSearchChange, filter, onFilterChange
- Style with existing Card, Input, and Button components

### Step 2: Add Search/Filter State to TodosPage
In `app/todos/page.tsx`:
```typescript
const [searchQuery, setSearchQuery] = useState("")
const [filter, setFilter] = useState<"all" | "active" | "completed">("all")

const filteredTodos = useMemo(() => {
  return todos.filter(todo => {
    const matchesSearch = todo.text.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filter === "all" ||
      (filter === "active" && !todo.completed) ||
      (filter === "completed" && todo.completed)
    return matchesSearch && matchesFilter
  })
}, [todos, searchQuery, filter])
```

### Step 3: Update TodoList with Filtered Results
Pass `filteredTodos` to `<TodoList>` instead of `todos`. Update the task count to show filtered count.

### Step 4: Add Empty Search State
When search returns no results, show a helpful "No matching todos found" message with option to clear search.

## Testing Checklist

- [ ] Search filters todos by text in real-time
- [ ] Search is case-insensitive
- [ ] Clear button resets search
- [ ] "All" filter shows all todos
- [ ] "Active" filter shows only incomplete todos
- [ ] "Completed" filter shows only completed todos
- [ ] Combined search + filter works correctly
- [ ] Empty state shows when no matches found
- [ ] Task count reflects filtered results
- [ ] Creating a new todo appears even when filtering

## Dependencies

- Required packages: none
- Blocked by: none

## Notes for Implementation Agent

Use lucide-react icons (Search, X) already available in the project. Use the existing Button component with variant="outline" for filter buttons and variant="default" for the active filter. Wrap the filter computation in useMemo for performance. Keep the SearchFilterBar as a controlled component.
