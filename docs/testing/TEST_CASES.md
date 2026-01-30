# Test Cases Documentation

## Complete List of E2E Tests

### Category 1: Login Page Accessibility and Functionality

| # | Test Name | Description | Input | Expected Output | Status |
|---|-----------|-------------|-------|-----------------|--------|
| 1.1 | Navigate to login page | Load `/login` endpoint and verify form elements | Navigate to `/login` | Login form displays with title, email input, password input, submit button | ✓ PASS |
| 1.2 | Invalid credentials error | Submit form with wrong email/password | Email: `wrong@example.com`<br>Password: `wrongpassword` | Error message: "Invalid email or password" | ✓ PASS |
| 1.3 | Valid credentials redirect | Submit form with correct credentials | Email: `user@example.com`<br>Password: `password123` | Redirect to `/todos` page | ✓ PASS |
| 1.4 | Demo credentials hint | Verify demo credentials are displayed | Load login page | Text shows "user@example.com / password123" | ✓ PASS |
| 1.5 | Email field validation | Verify email field is required | HTML attribute check | Input has `required` attribute | ✓ PASS |
| 1.6 | Password field validation | Verify password field is required | HTML attribute check | Input has `required` attribute | ✓ PASS |

---

### Category 2: Todo Management

| # | Test Name | Description | Steps | Expected Output | Status |
|---|-----------|-------------|-------|-----------------|--------|
| 2.1 | Add new todo | Create a new todo item | 1. Login 2. Enter text 3. Click Add | Todo appears in list with same text | ✓ PASS |
| 2.2 | Mark as complete | Check checkbox to mark todo complete | 1. Login 2. Add todo 3. Click checkbox | Checkbox is checked | ✓ PASS |
| 2.3 | Mark as incomplete | Uncheck checkbox to mark todo incomplete | 1. Login 2. Add todo 3. Check 4. Uncheck checkbox | Checkbox is unchecked | ✓ PASS |
| 2.4 | Delete todo | Remove a todo from list | 1. Login 2. Add todo 3. Hover 4. Click delete | Todo is removed from list | ✓ PASS |
| 2.5 | Persist after refresh | Todo survives page reload | 1. Login 2. Add todo 3. Refresh page | Todo still visible after refresh | ✓ PASS |
| 2.6 | Display task count | Show remaining incomplete tasks | 1. Login 2. Add multiple todos | Text shows "X remaining" | ✓ PASS |

---

### Category 3: Authentication & Routing

| # | Test Name | Description | Steps | Expected Output | Status |
|---|-----------|-------------|-------|-----------------|--------|
| 3.1 | Logout redirect | User logs out and is redirected | 1. Login 2. Click Logout button | Redirect to `/login` | ✓ PASS |
| 3.2 | Protected route redirect | Unauthenticated access to `/todos` | Navigate to `/todos` without login | Redirect to `/login` | ✓ PASS |
| 3.3 | Auth state persistence | User remains logged in after refresh | 1. Login 2. Reload page | Still logged in, still on `/todos` | ✓ PASS |
| 3.4 | Auto redirect logged-in users | Already-logged-in user tries to access `/login` | 1. Login 2. Navigate to `/login` | Redirect back to `/todos` | ✓ PASS |

---

### Category 4: UI/UX Checks

| # | Test Name | Description | Test Method | Expected Output | Status |
|---|-----------|-------------|-------------|-----------------|--------|
| 4.1 | Console errors (login) | Check for errors on login page | Monitor console messages | Zero error messages | ✓ PASS |
| 4.2 | Console errors (todos) | Check for errors on todos page | Monitor console messages | Zero error messages | ✓ PASS |
| 4.3 | Mobile responsiveness | Test on mobile viewport | Viewport: 375x667px | All elements visible and usable | ✓ PASS |
| 4.4 | Tablet responsiveness | Test on tablet viewport | Viewport: 768x1024px | All elements properly formatted | ✓ PASS |
| 4.5 | Loading state display | Check loading feedback during form submission | Submit form and observe | Button shows loading state | ✓ PASS |
| 4.6 | Form accessibility | Verify form has proper labels | Check HTML label elements | Email and password labels present | ✓ PASS |
| 4.7 | Submit button state | Button shows feedback during submission | Click submit and observe | Button disabled or shows "Signing in..." | ✓ PASS |

---

## Test Execution Flow

### Before Each Test
```
1. Create new browser context
2. Create new page/tab
3. Set appropriate viewport size
4. Clear cookies/storage (clean state)
```

### Login Flow Tests (for Todo Management tests)
```
1. Navigate to /login
2. Fill email: user@example.com
3. Fill password: password123
4. Click submit button
5. Wait for redirect to /todos
6. Proceed with todo test
```

### After Each Test
```
1. Cleanup: Browser context closed
2. Results: Pass/Fail recorded
3. Artifacts: Screenshots and console logs saved if needed
```

---

## Test Data

### Credentials
- **Valid Email:** `user@example.com`
- **Valid Password:** `password123`
- **Invalid Email:** `wrong@example.com`
- **Invalid Password:** `wrongpassword`

### Todo Text Samples
- Test todos generated with timestamps to ensure uniqueness
- Format: `{TestName} {timestamp}`
- Examples:
  - `Complete Test 1769746888708`
  - `Delete Test 1769746888709`
  - `Persist Test 1769746888710`

### Viewport Sizes
- **Desktop:** Default (1280x720)
- **Mobile:** 375x667 (iPhone 14 Pro)
- **Tablet:** 768x1024 (iPad)

---

## Coverage Matrix

| Component | Login | Todos | Auth | UI | Coverage |
|-----------|-------|-------|------|----|---------:|
| Form Fields | ✓ | ✓ | - | ✓ | 100% |
| Validation | ✓ | ✓ | - | ✓ | 100% |
| Error Handling | ✓ | - | - | ✓ | 100% |
| Navigation | ✓ | - | ✓ | - | 100% |
| User Feedback | ✓ | ✓ | - | ✓ | 100% |
| Responsiveness | ✓ | ✓ | - | ✓ | 100% |
| Accessibility | ✓ | - | - | ✓ | 100% |
| Data Persistence | - | ✓ | ✓ | - | 100% |

---

## Success Criteria

Each test is considered PASSED when:

1. **Login Tests**
   - Form elements are visible and properly rendered
   - Invalid credentials show error message
   - Valid credentials trigger redirect
   - Form validation attributes are present

2. **Todo Tests**
   - Todo operations complete without errors
   - UI updates immediately after action
   - Data persists across page refresh
   - Task counter displays accurate count

3. **Auth Tests**
   - Logout clears session and redirects
   - Protected routes enforce authentication
   - Session survives page refresh
   - Logged-in users can't access login page

4. **UI/UX Tests**
   - Zero console errors detected
   - Page content visible on all viewports
   - Form labels accessible
   - Loading states properly displayed

---

## Failure Criteria

A test is marked as FAILED when:
- Expected element is not found
- Navigation to expected URL doesn't occur
- Console shows error messages
- Data is not persisted correctly
- Form validation fails to work
- Protected routes are accessible without auth

---

## Test Timing

| Test Category | Average Duration | Notes |
|---------------|-----------------|-------|
| Login Tests | 300-850ms | Some include wait for navigation |
| Todo Tests | 650-1900ms | Includes wait for page reload in one test |
| Auth Tests | 240-535ms | Most complete quickly |
| UI/UX Tests | 240-850ms | Responsive tests slightly faster |
| **Overall** | **16.1 seconds** | All 23 tests combined |

---

## Related Files

- **Test Implementation:** `/tests/todo-app.spec.ts`
- **Full Test Report:** `/docs/testing/todo-app-e2e.md`
- **Test Summary:** `TEST_SUMMARY.txt`
- **Status:** `TESTING_COMPLETE.md`

---

## Notes

- All tests use relative time waits and element polling for reliability
- Tests are independent and can run in any order
- Each test cleans up after itself
- No manual intervention required
- All tests are automated and repeatable

---

Last Updated: January 30, 2026
Total Tests: 23
Success Rate: 100%
