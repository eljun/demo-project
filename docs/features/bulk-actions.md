# Feature: Bulk Actions for Todos

> **Status:** PRODUCTION
> **Last Updated:** Jan 30, 2026

## Overview

Bulk Actions enables users to select multiple todos and perform batch operations on them. Users can select individual todos, use "Select All" to select everything at once, and then execute delete, complete, or incomplete actions on all selected items simultaneously. The feature includes a dedicated UI toolbar that appears in selection mode with real-time feedback on selection count and action availability.

---

## User Journey

### For Customers

1. **Enter Selection Mode**
   - Click the "Select" button in the todo card header
   - Selection checkboxes appear on each todo item
   - Bulk action bar appears with action buttons

2. **Select Items**
   - Click individual selection checkboxes to toggle items
   - Use "Select All" button to select all todos at once
   - Selection count updates in real-time

3. **Execute Bulk Actions**
   - Click "Mark Complete" to mark selected items as done
   - Click "Mark Incomplete" to revert selected items to incomplete
   - Click "Delete" to remove selected items
   - Click "Cancel" to exit selection mode without changes

4. **Exit Selection Mode**
   - Selection mode automatically exits after any bulk action
   - Or click "Cancel" to exit without performing an action

---

## Architecture

### File Structure

```
hooks/
  ├── use-todos.ts              # Todo CRUD + bulk operations
  └── use-selection.ts          # Selection state management

components/
  ├── todo-item.tsx             # Individual todo with selection checkbox
  ├── todo-list.tsx             # List container
  └── bulk-action-bar.tsx       # Bulk action toolbar

app/
  └── todos/page.tsx            # Main page integrating all features
```

### Component Hierarchy

```
TodosPage
├── BulkActionBar (when isSelectionMode is true)
│   ├── Select All / Deselect All button
│   ├── Selection count display
│   ├── Mark Complete button
│   ├── Mark Incomplete button
│   ├── Delete button
│   └── Cancel button
└── TodoList
    └── TodoItem (multiple)
        ├── Selection checkbox (when isSelectionMode is true)
        ├── Completion checkbox
        ├── Todo text
        └── Delete button (on hover)
```

### State Management

**useTodos Hook:**
- Manages `todos` array and localStorage persistence
- Provides bulk operations: `deleteMany`, `completeMany`, `incompleteMany`
- Bulk operations filter or map over todo list and update state

**useSelection Hook:**
- Manages `isSelectionMode` boolean
- Manages `selectedIds` Set<string> for tracking selected todo IDs
- Provides selection utilities: `toggleSelected`, `selectAll`, `clearSelection`, `exitSelectionMode`
- Automatically clears selections when exiting selection mode

---

## Implementation Details

### Key Components

| Component | Location | Purpose |
|-----------|----------|---------|
| BulkActionBar | `components/bulk-action-bar.tsx` | Renders action toolbar with buttons and selection count |
| useSelection | `hooks/use-selection.ts` | Selection state management hook |
| TodoItem | `components/todo-item.tsx` | Renders individual todo with optional selection checkbox |
| useTodos | `hooks/use-todos.ts` | Todo CRUD operations including bulk variants |

### API / Hook Functions

**useSelection() Hook:**
```typescript
{
  isSelectionMode: boolean
  selectedIds: Set<string>
  selectedCount: number
  toggleSelectionMode: () => void
  toggleSelected: (id: string) => void
  selectAll: (ids: string[]) => void
  clearSelection: () => void
  exitSelectionMode: () => void
}
```

**useTodos() Bulk Operations:**
```typescript
deleteMany(ids: string[]): void
completeMany(ids: string[]): void
incompleteMany(ids: string[]): void
```

### Visual Design

**Bulk Action Bar Styling:**
- Light gray background (`bg-muted`) with rounded corners
- Flexbox layout with space-between for left/right sections
- Left section: Select All toggle + selection count display
- Right section: Action buttons (outline style) + destructive delete button + cancel
- Buttons disabled when `selectedCount === 0`

**Selection Checkbox Styling:**
- Positioned before completion checkbox
- Blue color scheme (`border-blue-500`, `text-blue-500`)
- Styled separately from completion checkbox for visual distinction
- Selected items show ring-2 border with primary color

**Selection Mode Styling:**
- Toggle button changes from "outline" variant to "secondary" when active
- Button text changes from "Select" to "Cancel" in selection mode

### Technical Notes

- Selection state uses `Set<string>` for O(1) lookup of selected IDs
- Selection mode toggle clears selections when exiting
- Bulk operations convert Set to Array before passing to action handlers
- BulkActionBar only renders when `isSelectionMode === true`
- All action buttons properly disabled when count is 0
- Individual item completion works independently in selection mode
- Delete button on individual items still works in selection mode

---

## Related Features

- [Todo List App](todo-list-app.md) - Main todo application architecture
