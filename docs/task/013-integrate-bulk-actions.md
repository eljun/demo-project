# Integrate Bulk Actions

> **ID:** 13
> **Status:** PLANNED
> **Priority:** MEDIUM
> **Type:** enhancement
> **Version Impact:** patch
> **Created:** Feb 20, 2026
> **Platform:** Web
> **Automation:** auto

## Overview

Integrate the existing BulkActionBar component and useSelection hook into the todos page. These components were previously created but never connected to the app. This enables users to select multiple todos and perform batch operations.

## Requirements

### Must Have
- [ ] Enable selection mode toggle button
- [ ] Individual todo selection via checkboxes
- [ ] Select all / Deselect all functionality
- [ ] Bulk delete selected todos
- [ ] Bulk mark selected as complete
- [ ] Bulk mark selected as incomplete
- [ ] Exit selection mode button
- [ ] Selection count display

### Nice to Have
- [ ] Bulk assign category (if Task 11 is done)
- [ ] Swipe to select on mobile

## Current State

BulkActionBar component and useSelection hook exist but are NOT imported or used anywhere.

**Current Files:**
| File | Purpose |
|------|---------|
| `components/bulk-action-bar.tsx` | Existing - bulk action buttons UI (87 lines) |
| `hooks/use-selection.ts` | Existing - selection state management (53 lines) |
| `app/todos/page.tsx` | Needs to integrate both above |
| `components/todo-item.tsx` | Needs selection checkbox mode |
| `hooks/use-todos.ts` | Needs bulk delete and bulk toggle methods |

## Proposed Solution

Import the existing components, add bulk operation methods to useTodos, and wire everything together in the todos page. Minimal new code needed since components already exist.

### File Changes

| Action | File | Description |
|--------|------|-------------|
| MODIFY | `hooks/use-todos.ts` | Add bulkDelete and bulkToggle methods |
| MODIFY | `app/todos/page.tsx` | Import and integrate BulkActionBar + useSelection |
| MODIFY | `components/todo-item.tsx` | Add selection checkbox when in selection mode |
| MODIFY | `components/todo-list.tsx` | Pass selection props through to items |

## Implementation Steps

### Step 1: Add Bulk Methods to useTodos
```typescript
const bulkDelete = useCallback((ids: Set<string>) => {
  setTodos(prev => prev.filter(t => !ids.has(t.id)))
}, [])

const bulkToggle = useCallback((ids: Set<string>, completed: boolean) => {
  setTodos(prev => prev.map(t => ids.has(t.id) ? { ...t, completed } : t))
}, [])
```

### Step 2: Integrate in TodosPage
Import useSelection and BulkActionBar. Add selection mode toggle button in header. Show BulkActionBar when in selection mode. Connect handlers.

### Step 3: Update TodoItem for Selection Mode
When selection mode is active, show a selection checkbox alongside the existing completion checkbox. Clicking the todo row toggles selection.

### Step 4: Wire Up BulkActionBar
Connect BulkActionBar's onDelete, onMarkComplete, onMarkIncomplete props to the new bulk methods in useTodos.

## Testing Checklist

- [ ] Selection mode toggle works
- [ ] Can select individual todos
- [ ] Select all selects all visible todos
- [ ] Deselect all clears selection
- [ ] Bulk delete removes selected todos
- [ ] Bulk complete marks all selected as done
- [ ] Bulk incomplete marks all selected as not done
- [ ] Exit selection mode clears selection
- [ ] Selection count updates correctly
- [ ] Works with filtered/searched todos

## Dependencies

- Required packages: none
- Blocked by: none (existing components ready)

## Notes for Implementation Agent

The BulkActionBar and useSelection hook already exist and are fully implemented. Read them first before making changes. The main work is wiring them into the existing page and adding the missing bulk methods to useTodos. Be careful to clear selection after bulk operations complete.
