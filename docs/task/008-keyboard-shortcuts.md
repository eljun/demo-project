# Keyboard Shortcuts

> **ID:** 8
> **Status:** PLANNED
> **Priority:** MEDIUM
> **Type:** feature
> **Version Impact:** minor
> **Created:** Feb 20, 2026
> **Platform:** Web
> **Automation:** auto

## Overview

Add keyboard shortcuts for power users to manage todos more efficiently. This improves productivity and accessibility for users who prefer keyboard-driven workflows.

## Requirements

### Must Have
- [ ] Ctrl/Cmd+Enter: Add todo (when input is focused)
- [ ] Escape: Cancel editing / Clear input
- [ ] Delete/Backspace: Delete focused todo (with confirmation)
- [ ] Space: Toggle completion on focused todo
- [ ] Create useKeyboardShortcuts hook

### Nice to Have
- [ ] "?" key to show shortcuts help overlay
- [ ] Ctrl/Cmd+Z for undo (prep for undo/redo feature)
- [ ] Up/Down arrows to navigate between todos

## Current State

Basic keyboard support exists (Enter to submit form, Escape to cancel edit). No global shortcuts or advanced navigation.

**Current Files:**
| File | Purpose |
|------|---------|
| `components/add-todo-form.tsx` | Form submit on Enter (built-in) |
| `components/todo-item.tsx` | Enter to save edit, Escape to cancel (lines 20-30) |
| `app/todos/page.tsx` | No keyboard handlers |

## Proposed Solution

Create a `useKeyboardShortcuts` hook that listens for global keyboard events and dispatches actions. Add visual hints for shortcuts in the UI.

### File Changes

| Action | File | Description |
|--------|------|-------------|
| CREATE | `hooks/use-keyboard-shortcuts.ts` | New hook for global keyboard event handling |
| MODIFY | `app/todos/page.tsx` | Integrate keyboard shortcuts hook |
| MODIFY | `components/add-todo-form.tsx` | Add Ctrl+Enter hint text |

## Implementation Steps

### Step 1: Create useKeyboardShortcuts Hook
```typescript
export function useKeyboardShortcuts(shortcuts: Record<string, () => void>) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = [
        e.ctrlKey || e.metaKey ? 'mod' : '',
        e.shiftKey ? 'shift' : '',
        e.key.toLowerCase()
      ].filter(Boolean).join('+')
      shortcuts[key]?.()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [shortcuts])
}
```

### Step 2: Integrate with Todos Page
Register shortcuts in TodosPage that call the existing todo handlers.

### Step 3: Add Visual Hints
Show small keyboard hint text near the Add button: "Ctrl+Enter to add"

## Testing Checklist

- [ ] Ctrl+Enter adds todo when input focused
- [ ] Escape clears input / cancels edit
- [ ] Shortcuts don't fire when typing in inputs (except designated ones)
- [ ] Shortcuts work on both Mac (Cmd) and Windows (Ctrl)
- [ ] No conflicts with browser shortcuts

## Dependencies

- Required packages: none
- Blocked by: none

## Notes for Implementation Agent

Be careful with keyboard event handling - shortcuts should NOT fire when user is typing in a text input (except for designated shortcuts like Ctrl+Enter and Escape). Use `e.target` checks to prevent conflicts.
