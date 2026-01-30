# Bulk Actions for Todos

> **Status:** TESTING
> **Completed:** Jan 30, 2026
> **Priority:** MEDIUM
> **Type:** feature
> **Version Impact:** minor
> **Created:** Jan 30, 2026
> **Platform:** Web
> **Automation:** manual

## Overview

Add bulk action capabilities to the todo list, allowing users to select multiple todos and perform actions (delete, mark complete, mark incomplete) on all selected items at once. Users enter selection mode via a toggle button, then can select individual todos or use "Select All".

## Requirements

### Must Have
- [x] Toggle button to enter/exit selection mode
- [x] Selection checkbox on each todo item (when in selection mode)
- [x] Visual count of selected items
- [x] "Select All" / "Deselect All" toggle
- [x] Bulk delete action for selected todos
- [x] Bulk "Mark as Complete" action
- [x] Bulk "Mark as Incomplete" action
- [x] Exit selection mode after action completes
- [x] Disable actions when no items selected

### Nice to Have
- [ ] Keyboard shortcut to toggle selection mode (e.g., Ctrl+A for select all)
- [ ] Confirmation dialog before bulk delete
- [ ] Animation when items are removed/updated

## Current State

The app currently supports single-item operations only:
- Toggle individual todo completion via checkbox
- Delete individual todo via hover button
- No multi-select capability

**Current Files:**
| File | Purpose |
|------|---------|
| `hooks/use-todos.ts` | Todo CRUD operations (add, delete, toggle) |
| `components/todo-list.tsx` | Renders list of TodoItem components |
| `components/todo-item.tsx` | Single todo with checkbox and delete button |
| `app/todos/page.tsx` | Main page, connects hook to components |

## Proposed Solution

### Architecture

1. **Selection State**: Manage selected IDs in the `useTodos` hook (or a new `useSelection` hook)
2. **Selection Mode**: Boolean state to toggle selection UI on/off
3. **Bulk Operations**: New functions in `useTodos` for bulk delete/complete/incomplete
4. **UI Components**: Selection toolbar that appears when in selection mode

### File Changes

| Action | File | Description |
|--------|------|-------------|
| MODIFY | `hooks/use-todos.ts` | Add bulk operations: `deleteMany`, `completeMany`, `incompleteMany` |
| CREATE | `hooks/use-selection.ts` | Selection state management: selectedIds, toggle, selectAll, clearSelection |
| MODIFY | `components/todo-list.tsx` | Add selection mode UI, pass selection props to items |
| MODIFY | `components/todo-item.tsx` | Add selection checkbox (shown only in selection mode) |
| MODIFY | `app/todos/page.tsx` | Add selection mode toggle button, integrate bulk action toolbar |
| CREATE | `components/bulk-action-bar.tsx` | Toolbar component with bulk action buttons |

## Implementation Steps

### Step 1: Add Bulk Operations to useTodos Hook

Extend `hooks/use-todos.ts` with three new functions:

```typescript
const deleteMany = (ids: string[]) => {
  setTodos((prev) => prev.filter((todo) => !ids.includes(todo.id)))
}

const completeMany = (ids: string[]) => {
  setTodos((prev) =>
    prev.map((todo) =>
      ids.includes(todo.id) ? { ...todo, completed: true } : todo
    )
  )
}

const incompleteMany = (ids: string[]) => {
  setTodos((prev) =>
    prev.map((todo) =>
      ids.includes(todo.id) ? { ...todo, completed: false } : todo
    )
  )
}
```

Return these from the hook alongside existing functions.

### Step 2: Create useSelection Hook

Create `hooks/use-selection.ts` to manage selection state:

```typescript
"use client"

import { useState, useCallback } from "react"

export function useSelection() {
  const [isSelectionMode, setIsSelectionMode] = useState(false)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const toggleSelectionMode = useCallback(() => {
    setIsSelectionMode((prev) => {
      if (prev) {
        // Exiting selection mode - clear selections
        setSelectedIds(new Set())
      }
      return !prev
    })
  }, [])

  const toggleSelected = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }, [])

  const selectAll = useCallback((ids: string[]) => {
    setSelectedIds(new Set(ids))
  }, [])

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set())
  }, [])

  const exitSelectionMode = useCallback(() => {
    setIsSelectionMode(false)
    setSelectedIds(new Set())
  }, [])

  return {
    isSelectionMode,
    selectedIds,
    selectedCount: selectedIds.size,
    toggleSelectionMode,
    toggleSelected,
    selectAll,
    clearSelection,
    exitSelectionMode,
  }
}
```

### Step 3: Create BulkActionBar Component

Create `components/bulk-action-bar.tsx`:

```typescript
"use client"

import { Trash2, CheckSquare, Square } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BulkActionBarProps {
  selectedCount: number
  totalCount: number
  onSelectAll: () => void
  onClearSelection: () => void
  onDeleteSelected: () => void
  onCompleteSelected: () => void
  onIncompleteSelected: () => void
  onCancel: () => void
}

export function BulkActionBar({
  selectedCount,
  totalCount,
  onSelectAll,
  onClearSelection,
  onDeleteSelected,
  onCompleteSelected,
  onIncompleteSelected,
  onCancel,
}: BulkActionBarProps) {
  const allSelected = selectedCount === totalCount && totalCount > 0
  const hasSelection = selectedCount > 0

  return (
    <div className="flex items-center justify-between gap-2 p-3 bg-muted rounded-lg">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={allSelected ? onClearSelection : onSelectAll}
        >
          {allSelected ? (
            <>
              <Square className="h-4 w-4 mr-2" />
              Deselect All
            </>
          ) : (
            <>
              <CheckSquare className="h-4 w-4 mr-2" />
              Select All
            </>
          )}
        </Button>
        <span className="text-sm text-muted-foreground">
          {selectedCount} selected
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onCompleteSelected}
          disabled={!hasSelection}
        >
          Mark Complete
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onIncompleteSelected}
          disabled={!hasSelection}
        >
          Mark Incomplete
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={onDeleteSelected}
          disabled={!hasSelection}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
        <Button variant="ghost" size="sm" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  )
}
```

### Step 4: Update TodoItem Component

Modify `components/todo-item.tsx` to accept selection props:

```typescript
interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  // New props for selection mode
  isSelectionMode?: boolean
  isSelected?: boolean
  onSelect?: (id: string) => void
}
```

Add a selection checkbox that appears when `isSelectionMode` is true, positioned before the completion checkbox.

### Step 5: Update TodoList Component

Modify `components/todo-list.tsx` to pass selection state to items:

```typescript
interface TodoListProps {
  todos: Todo[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  // New props
  isSelectionMode?: boolean
  selectedIds?: Set<string>
  onSelect?: (id: string) => void
}
```

Map over todos and pass `isSelected={selectedIds?.has(todo.id)}` to each TodoItem.

### Step 6: Update TodosPage

Modify `app/todos/page.tsx`:

1. Import and use the new hooks
2. Add "Select" toggle button in the card header
3. Conditionally render `BulkActionBar` when in selection mode
4. Wire up all the handlers

## Code Examples

### Selection Checkbox in TodoItem

```typescript
{isSelectionMode && (
  <input
    type="checkbox"
    checked={isSelected}
    onChange={() => onSelect?.(todo.id)}
    className="h-4 w-4 rounded border-primary text-primary focus:ring-primary cursor-pointer"
  />
)}
```

### Toggle Button in Page Header

```typescript
<Button
  variant={isSelectionMode ? "secondary" : "outline"}
  size="sm"
  onClick={toggleSelectionMode}
>
  {isSelectionMode ? "Cancel" : "Select"}
</Button>
```

## Testing Checklist

- [ ] Can enter selection mode via toggle button
- [ ] Selection checkboxes appear on all todos
- [ ] Can select/deselect individual todos
- [ ] "Select All" selects all visible todos
- [ ] "Deselect All" clears all selections
- [ ] Selected count updates correctly
- [ ] Bulk delete removes all selected todos
- [ ] Bulk complete marks all selected as done
- [ ] Bulk incomplete marks all selected as not done
- [ ] Actions are disabled when nothing selected
- [ ] Exiting selection mode clears selections
- [ ] Selection mode exits after bulk action completes

## Dependencies

- Required packages: None (uses existing Lucide icons)
- Required APIs: None
- Blocked by: None

## Notes for Implementation Agent

- Keep the existing single-item operations working unchanged
- Selection checkbox should be visually distinct from completion checkbox (different position)
- Consider using a different color/style for selection checkbox vs completion
- The bulk action bar should be prominent but not obstruct the todo list
- Make sure the "Cancel" button behavior is consistent (always exits selection mode and clears selection)

## Related

- Current todo operations: `hooks/use-todos.ts`
- UI components: `components/ui/button.tsx`, `components/ui/checkbox.tsx`
