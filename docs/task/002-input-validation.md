# Input Validation & Error Handling

> **ID:** 2
> **Status:** PLANNED
> **Priority:** HIGH
> **Type:** bugfix
> **Version Impact:** patch
> **Created:** Feb 20, 2026
> **Platform:** Web
> **Automation:** auto

## Overview

Add proper input validation to the login form and todo input to prevent invalid data. Currently, the login form accepts any string as email without format validation, and the todo input has no max length limit. This is a security and UX issue.

## Requirements

### Must Have
- [ ] Email format validation on login (regex check)
- [ ] Display error message for invalid email format
- [ ] Password minimum length validation (6+ chars)
- [ ] Display error for short passwords
- [ ] Max length on todo input (200 chars)
- [ ] Show character count when approaching limit
- [ ] Trim whitespace from inputs before validation

### Nice to Have
- [ ] Real-time email validation as user types
- [ ] Password strength indicator

## Current State

Login form accepts any input without validation. Todo input has no length limit.

**Current Files:**
| File | Purpose |
|------|---------|
| `app/login/page.tsx` | Login form - no email validation (line 24-35) |
| `components/add-todo-form.tsx` | Todo input - no max length (line 17-40) |
| `components/auth-provider.tsx` | Auth logic - no validation in login() (line 30-45) |

## Proposed Solution

Add client-side validation before form submission. Show inline error messages using existing Tailwind styling patterns.

### File Changes

| Action | File | Description |
|--------|------|-------------|
| MODIFY | `app/login/page.tsx` | Add email regex check, password length validation, error states |
| MODIFY | `components/add-todo-form.tsx` | Add maxLength, character counter |
| MODIFY | `components/auth-provider.tsx` | Add validation in login function |

## Implementation Steps

### Step 1: Add Email Validation to Login Page
In `app/login/page.tsx`, add validation before calling `login()`:
```typescript
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const validateEmail = (email: string) => EMAIL_REGEX.test(email.trim())
```
Add error state and display inline error messages below inputs.

### Step 2: Add Password Validation
Check minimum length of 6 characters. Display error message below password input.

### Step 3: Add Todo Input Max Length
In `components/add-todo-form.tsx`, add `maxLength={200}` to input and show character count when text exceeds 150 chars.

### Step 4: Add Whitespace Trimming
Trim all inputs before validation and submission.

## Testing Checklist

- [ ] Login with invalid email shows error
- [ ] Login with valid email proceeds normally
- [ ] Login with short password shows error
- [ ] Todo input stops at 200 characters
- [ ] Character count appears at 150+ chars
- [ ] Whitespace-only inputs are rejected
- [ ] Demo credentials still work

## Dependencies

- Required packages: none
- Blocked by: none

## Notes for Implementation Agent

The demo credentials are: user@example.com / password123. Make sure these still work after adding validation. Keep error messages styled consistently with the existing UI using Tailwind classes.
