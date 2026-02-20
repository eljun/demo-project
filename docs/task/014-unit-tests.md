# Unit & Integration Tests

> **ID:** 14
> **Status:** PLANNED
> **Priority:** MEDIUM
> **Type:** chore
> **Version Impact:** patch
> **Created:** Feb 20, 2026
> **Platform:** Web
> **Automation:** auto

## Overview

Add comprehensive unit and integration tests for hooks, components, and utilities. The project currently has 0% test coverage. Target 80%+ coverage on critical paths.

## Requirements

### Must Have
- [ ] Set up Jest + React Testing Library
- [ ] Unit tests for useTodos hook (add, delete, toggle, edit)
- [ ] Unit tests for useAuth context (login, logout, persistence)
- [ ] Unit tests for storage utility (get, set, remove)
- [ ] Component tests for TodoItem (render, edit, toggle, delete)
- [ ] Component tests for AddTodoForm (submit, validation)
- [ ] Component tests for TodoList (render list, empty state)

### Nice to Have
- [ ] Test coverage report configuration
- [ ] CI integration with coverage threshold
- [ ] Tests for error boundary

## Current State

No test infrastructure exists except Playwright for E2E. No unit tests.

**Current Files:**
| File | Purpose |
|------|---------|
| `hooks/use-todos.ts` | Needs tests for all 4 operations |
| `hooks/use-auth.ts` | Needs tests for auth flow |
| `lib/storage.ts` | Needs tests for get/set/remove |
| `components/todo-item.tsx` | Needs component tests |
| `components/add-todo-form.tsx` | Needs form submission tests |
| `components/todo-list.tsx` | Needs rendering tests |

## Proposed Solution

Install Jest + @testing-library/react. Create test files co-located with source files using __tests__ directories. Focus on hooks and critical components first.

### File Changes

| Action | File | Description |
|--------|------|-------------|
| CREATE | `jest.config.js` | Jest configuration for Next.js |
| CREATE | `jest.setup.ts` | Test setup with Testing Library |
| CREATE | `hooks/__tests__/use-todos.test.ts` | useTodos hook tests |
| CREATE | `hooks/__tests__/use-auth.test.ts` | useAuth hook tests |
| CREATE | `lib/__tests__/storage.test.ts` | Storage utility tests |
| CREATE | `components/__tests__/todo-item.test.tsx` | TodoItem component tests |
| CREATE | `components/__tests__/add-todo-form.test.tsx` | AddTodoForm tests |
| CREATE | `components/__tests__/todo-list.test.tsx` | TodoList tests |
| MODIFY | `package.json` | Add test scripts and dependencies |

## Implementation Steps

### Step 1: Set Up Test Infrastructure
Install dependencies:
```bash
npm install -D jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom @types/jest ts-jest
```

Create jest.config.js with Next.js preset and jest.setup.ts with Testing Library matchers.

### Step 2: Test Storage Utility
Test get(), set(), remove() with localStorage mocking.

### Step 3: Test useTodos Hook
Use renderHook from Testing Library:
- Test addTodo creates new todo
- Test deleteTodo removes todo
- Test toggleTodo flips completed
- Test editTodo updates text
- Test localStorage persistence

### Step 4: Test Components
Use render() and userEvent for interaction tests:
- TodoItem: render, checkbox toggle, delete button, double-click edit
- AddTodoForm: submit with text, disabled when empty
- TodoList: render list, empty state message

### Step 5: Add Test Script
Add to package.json: `"test": "jest"`, `"test:coverage": "jest --coverage"`

## Testing Checklist

- [ ] All tests pass with `npm test`
- [ ] 80%+ coverage on hooks
- [ ] 70%+ coverage on components
- [ ] Storage utility fully tested
- [ ] Tests run in under 10 seconds

## Dependencies

- Required packages: jest, @testing-library/react, @testing-library/jest-dom, @testing-library/user-event, jest-environment-jsdom, ts-jest
- Blocked by: none

## Notes for Implementation Agent

Use renderHook from @testing-library/react for testing custom hooks. Mock localStorage in test setup. For component tests, wrap components in necessary providers (AuthProvider). Keep tests focused - test behavior, not implementation details.
