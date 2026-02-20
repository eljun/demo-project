# Undo/Redo Functionality

> **ID:** 12
> **Status:** PLANNED
> **Priority:** MEDIUM
> **Type:** feature
> **Version Impact:** minor
> **Created:** Feb 20, 2026
> **Platform:** Web
> **Automation:** auto

## Overview

Add undo/redo functionality so users can reverse accidental actions. Supports a history stack of 20 actions with keyboard shortcuts (Ctrl+Z / Ctrl+Y).

## Requirements

### Must Have
- [ ] Undo last action (Ctrl/Cmd+Z)
- [ ] Redo last undone action (Ctrl/Cmd+Y or Ctrl/Cmd+Shift+Z)
- [ ] Support undo for: add, delete, toggle, edit operations
- [ ] History stack of 20 actions maximum
- [ ] Visual undo/redo buttons in toolbar
- [ ] Buttons disabled when no undo/redo available

### Nice to Have
- [ ] Show action description in undo button tooltip
- [ ] Undo notification toast ("Action undone")

## Current State

No undo/redo support exists. Deleted todos are permanently lost.

**Current Files:**
| File | Purpose |
|------|---------|
| `hooks/use-todos.ts` | Todo operations - needs history tracking |
| `app/todos/page.tsx` | Page - needs undo/redo buttons |

## Proposed Solution

Create a useUndoRedo hook that wraps the todos state with history tracking. Each mutation saves the previous state to an undo stack. Undo pops from undo stack and pushes to redo stack.

### File Changes

| Action | File | Description |
|--------|------|-------------|
| CREATE | `hooks/use-undo-redo.ts` | Generic undo/redo hook with history stack |
| MODIFY | `hooks/use-todos.ts` | Integrate undo/redo with todo operations |
| MODIFY | `app/todos/page.tsx` | Add undo/redo buttons and keyboard shortcuts |

## Implementation Steps

### Step 1: Create useUndoRedo Hook
```typescript
function useUndoRedo<T>(initialState: T, maxHistory = 20) {
  const [state, setState] = useState(initialState)
  const [undoStack, setUndoStack] = useState<T[]>([])
  const [redoStack, setRedoStack] = useState<T[]>([])

  const push = useCallback((newState: T) => {
    setUndoStack(prev => [...prev.slice(-maxHistory + 1), state])
    setRedoStack([])
    setState(newState)
  }, [state, maxHistory])

  const undo = useCallback(() => { ... }, [])
  const redo = useCallback(() => { ... }, [])

  return { state, push, undo, redo, canUndo: undoStack.length > 0, canRedo: redoStack.length > 0 }
}
```

### Step 2: Integrate with useTodos
Modify useTodos to use the undo/redo hook for state management. Each mutation (add, delete, toggle, edit) pushes to the history stack.

### Step 3: Add UI Controls
Add undo/redo buttons (using Undo2 and Redo2 icons from lucide-react) in the todos page header area. Disable buttons when no history available.

### Step 4: Add Keyboard Shortcuts
Listen for Ctrl+Z (undo) and Ctrl+Y or Ctrl+Shift+Z (redo) at the page level.

## Testing Checklist

- [ ] Can undo add todo
- [ ] Can undo delete todo (todo reappears)
- [ ] Can undo toggle todo
- [ ] Can undo edit todo (text reverts)
- [ ] Can redo undone actions
- [ ] History limited to 20 entries
- [ ] New action after undo clears redo stack
- [ ] Ctrl+Z triggers undo
- [ ] Ctrl+Y triggers redo
- [ ] Buttons disabled when no history
- [ ] State persists correctly to localStorage

## Dependencies

- Required packages: none
- Blocked by: Task 4 (performance optimizations - useCallback pattern needed)

## Notes for Implementation Agent

The useUndoRedo hook should be generic and reusable. Store full state snapshots (not diffs) for simplicity - with 20 entries max and small todo arrays, memory usage is negligible. Clear the redo stack when a new action is performed after undoing. Be careful with localStorage persistence - only persist the current state, not the history stacks.
