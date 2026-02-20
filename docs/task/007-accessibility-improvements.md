# Accessibility Improvements

> **ID:** 7
> **Status:** PLANNED
> **Priority:** MEDIUM
> **Type:** enhancement
> **Version Impact:** patch
> **Created:** Feb 20, 2026
> **Platform:** Web
> **Automation:** auto

## Overview

Improve WCAG 2.1 compliance by adding missing ARIA labels, roles, and live regions. The app has good semantic HTML but is missing specific accessibility attributes that screen readers need.

## Requirements

### Must Have
- [ ] Add aria-label to todo checkboxes ("Mark [todo text] as complete/incomplete")
- [ ] Add aria-label to delete buttons ("Delete [todo text]")
- [ ] Add aria-label to edit input when in edit mode
- [ ] Add aria-live="polite" region for task count updates
- [ ] Add aria-live region for toast notifications
- [ ] Add proper htmlFor attributes on login form labels
- [ ] Add role="status" to loading indicators

### Nice to Have
- [ ] Add skip-to-content link
- [ ] Announce todo additions/removals to screen readers

## Current State

Semantic HTML is good (headings, buttons, inputs). Missing specific ARIA attributes for dynamic content.

**Current Files:**
| File | Purpose |
|------|---------|
| `components/todo-item.tsx` | Checkbox and delete button missing aria-labels |
| `components/todo-list.tsx` | No live region for list updates |
| `app/todos/page.tsx` | Task count not announced to screen readers |
| `app/login/page.tsx` | Form labels could have better associations |

## Proposed Solution

Add ARIA attributes to existing elements. Create aria-live regions for dynamic content updates.

### File Changes

| Action | File | Description |
|--------|------|-------------|
| MODIFY | `components/todo-item.tsx` | Add aria-labels to checkbox and delete button |
| MODIFY | `components/todo-list.tsx` | Add aria-live region |
| MODIFY | `app/todos/page.tsx` | Add aria-live for task count |
| MODIFY | `app/login/page.tsx` | Improve form label associations |

## Implementation Steps

### Step 1: Add ARIA Labels to TodoItem
```typescript
<input
  type="checkbox"
  checked={todo.completed}
  aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
/>
<button
  aria-label={`Delete "${todo.text}"`}
>
```

### Step 2: Add Live Regions
Wrap task count in aria-live="polite" so screen readers announce changes:
```typescript
<span aria-live="polite" aria-atomic="true">
  Tasks ({remainingCount} remaining)
</span>
```

### Step 3: Improve Login Form
Add proper `id` and `htmlFor` associations on all form fields.

## Testing Checklist

- [ ] Screen reader announces checkbox state changes
- [ ] Screen reader reads delete button labels
- [ ] Task count changes are announced
- [ ] Login form fields properly labeled
- [ ] Loading states announced
- [ ] Tab order is logical

## Dependencies

- Required packages: none
- Blocked by: none

## Notes for Implementation Agent

Don't over-engineer - add ARIA attributes only where they provide real value. The existing semantic HTML already provides a good baseline. Focus on dynamic content announcements and interactive element labels.
