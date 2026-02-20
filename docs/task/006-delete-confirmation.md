# Delete Confirmation Dialog

> **ID:** 6
> **Status:** PLANNED
> **Priority:** MEDIUM
> **Type:** feature
> **Version Impact:** minor
> **Created:** Feb 20, 2026
> **Platform:** Web
> **Automation:** auto

## Overview

Add a confirmation dialog before deleting todos to prevent accidental data loss. Currently, clicking the delete button immediately removes the todo with no way to recover.

## Requirements

### Must Have
- [ ] Create a reusable ConfirmDialog component
- [ ] Show confirmation before deleting a todo
- [ ] Dialog shows the todo text being deleted
- [ ] Cancel and Confirm buttons
- [ ] Keyboard support (Escape to cancel, Enter to confirm)
- [ ] Focus trap inside dialog

### Nice to Have
- [ ] Backdrop click to dismiss
- [ ] Smooth open/close animations

## Current State

Delete button in TodoItem immediately calls `onDelete(todo.id)` with no confirmation.

**Current Files:**
| File | Purpose |
|------|---------|
| `components/todo-item.tsx` | Delete button calls onDelete directly (line 75-85) |

## Proposed Solution

Create a reusable dialog component using HTML `<dialog>` element for built-in accessibility. Add confirmation step before delete in TodoItem.

### File Changes

| Action | File | Description |
|--------|------|-------------|
| CREATE | `components/confirm-dialog.tsx` | Reusable confirmation dialog |
| MODIFY | `components/todo-item.tsx` | Add confirmation before delete |

## Implementation Steps

### Step 1: Create ConfirmDialog Component
Create `components/confirm-dialog.tsx` using the native `<dialog>` element:
- Props: isOpen, onConfirm, onCancel, title, message
- Focus trap and keyboard handling
- Styled with existing Card/Button components

### Step 2: Add Confirmation to TodoItem
In `components/todo-item.tsx`:
- Add `showDeleteConfirm` state
- Show dialog when delete button clicked
- Only call `onDelete` when confirmed

## Testing Checklist

- [ ] Delete button shows confirmation dialog
- [ ] Cancel button dismisses dialog without deleting
- [ ] Confirm button deletes the todo
- [ ] Escape key cancels the dialog
- [ ] Enter key confirms deletion
- [ ] Dialog shows correct todo text
- [ ] Focus returns to todo item after cancel

## Dependencies

- Required packages: none
- Blocked by: none

## Notes for Implementation Agent

Use the native HTML `<dialog>` element for built-in accessibility and focus trapping. Style using the existing Card and Button component patterns. Keep the component reusable - it may be used for bulk delete confirmation later.
