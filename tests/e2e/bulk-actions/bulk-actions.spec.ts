import { test, expect } from "@playwright/test"

test.describe("Bulk Actions Feature", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/todos")
    await page.waitForLoadState("networkidle")
  })

  test("should display Select button to enter selection mode", async ({
    page,
  }) => {
    const selectButton = page.getByRole("button", { name: /select/i })
    await expect(selectButton).toBeVisible()
  })

  test("should enter selection mode and show checkboxes", async ({ page }) => {
    // Click Select button
    const selectButton = page.getByRole("button", { name: /select/i })
    await selectButton.click()

    // Verify selection mode is active by checking if bulk action bar appears
    const bulkActionBar = page.locator(
      '[class*="bg-muted"][class*="rounded-lg"]'
    )
    await expect(bulkActionBar).toBeVisible()

    // Verify the "Select All" button is visible
    const selectAllButton = page.getByRole("button", { name: /select all/i })
    await expect(selectAllButton).toBeVisible()
  })

  test("should select individual todos", async ({ page }) => {
    // First add some todos
    const todoInput = page.getByPlaceholder(/add a new todo/i)
    await todoInput.fill("Test Todo 1")
    await page.getByRole("button", { name: /add/i }).click()
    await todoInput.fill("Test Todo 2")
    await page.getByRole("button", { name: /add/i }).click()

    // Enter selection mode
    const selectButton = page.getByRole("button", { name: /select/i })
    await selectButton.click()

    // Find and click the first selection checkbox
    const checkboxes = page.locator('input[type="checkbox"]').first()
    await checkboxes.click()

    // Verify selection count is updated
    const selectionCount = page.locator("text=/\\d+\\s+selected/")
    await expect(selectionCount).toContainText("1 selected")
  })

  test("should select all todos with Select All button", async ({ page }) => {
    // Add some todos
    const todoInput = page.getByPlaceholder(/add a new todo/i)
    await todoInput.fill("Todo 1")
    await page.getByRole("button", { name: /add/i }).click()
    await todoInput.fill("Todo 2")
    await page.getByRole("button", { name: /add/i }).click()
    await todoInput.fill("Todo 3")
    await page.getByRole("button", { name: /add/i }).click()

    // Enter selection mode
    const selectButton = page.getByRole("button", { name: /select/i })
    await selectButton.click()

    // Click Select All
    const selectAllButton = page.getByRole("button", { name: /select all/i })
    await selectAllButton.click()

    // Verify all 3 todos are selected
    const selectionCount = page.locator("text=/3\\s+selected/")
    await expect(selectionCount).toBeVisible()
  })

  test("should deselect all todos with Deselect All button", async ({
    page,
  }) => {
    // Add todos
    const todoInput = page.getByPlaceholder(/add a new todo/i)
    await todoInput.fill("Todo 1")
    await page.getByRole("button", { name: /add/i }).click()
    await todoInput.fill("Todo 2")
    await page.getByRole("button", { name: /add/i }).click()

    // Enter selection mode
    const selectButton = page.getByRole("button", { name: /select/i })
    await selectButton.click()

    // Select all
    const selectAllButton = page.getByRole("button", { name: /select all/i })
    await selectAllButton.click()

    // Deselect all
    const deselectAllButton = page.getByRole("button", {
      name: /deselect all/i,
    })
    await deselectAllButton.click()

    // Verify selection count is 0
    const selectionCount = page.locator("text=/0\\s+selected/")
    await expect(selectionCount).toBeVisible()
  })

  test("should disable bulk action buttons when no items selected", async ({
    page,
  }) => {
    // Add a todo
    const todoInput = page.getByPlaceholder(/add a new todo/i)
    await todoInput.fill("Test Todo")
    await page.getByRole("button", { name: /add/i }).click()

    // Enter selection mode
    const selectButton = page.getByRole("button", { name: /select/i })
    await selectButton.click()

    // Check that action buttons are disabled
    const markCompleteButton = page.getByRole("button", {
      name: /mark complete/i,
    })
    const markIncompleteButton = page.getByRole("button", {
      name: /mark incomplete/i,
    })
    const deleteButton = page.getByRole("button", { name: /delete/i })

    await expect(markCompleteButton).toBeDisabled()
    await expect(markIncompleteButton).toBeDisabled()
    await expect(deleteButton).toBeDisabled()
  })

  test("should enable bulk action buttons when items are selected", async ({
    page,
  }) => {
    // Add a todo
    const todoInput = page.getByPlaceholder(/add a new todo/i)
    await todoInput.fill("Test Todo")
    await page.getByRole("button", { name: /add/i }).click()

    // Enter selection mode
    const selectButton = page.getByRole("button", { name: /select/i })
    await selectButton.click()

    // Select the todo
    const checkboxes = page.locator('input[type="checkbox"]').first()
    await checkboxes.click()

    // Check that action buttons are enabled
    const markCompleteButton = page.getByRole("button", {
      name: /mark complete/i,
    })
    const markIncompleteButton = page.getByRole("button", {
      name: /mark incomplete/i,
    })
    const deleteButton = page.getByRole("button", { name: /delete/i })

    await expect(markCompleteButton).toBeEnabled()
    await expect(markIncompleteButton).toBeEnabled()
    await expect(deleteButton).toBeEnabled()
  })

  test("should bulk delete selected todos", async ({ page }) => {
    // Add todos
    const todoInput = page.getByPlaceholder(/add a new todo/i)
    await todoInput.fill("Todo to Delete 1")
    await page.getByRole("button", { name: /add/i }).click()
    await todoInput.fill("Todo to Delete 2")
    await page.getByRole("button", { name: /add/i }).click()
    await todoInput.fill("Todo to Keep")
    await page.getByRole("button", { name: /add/i }).click()

    // Enter selection mode
    const selectButton = page.getByRole("button", { name: /select/i })
    await selectButton.click()

    // Select first two todos (the ones to delete)
    const checkboxes = page.locator('input[type="checkbox"]')
    await checkboxes.nth(0).click()
    await checkboxes.nth(1).click()

    // Click delete button
    const deleteButton = page.getByRole("button", { name: /^delete$/i })
    await deleteButton.click()

    // Verify the selected todos are deleted
    await expect(page.getByText("Todo to Delete 1")).not.toBeVisible()
    await expect(page.getByText("Todo to Delete 2")).not.toBeVisible()

    // Verify the kept todo still exists
    await expect(page.getByText("Todo to Keep")).toBeVisible()
  })

  test("should bulk mark todos as complete", async ({ page }) => {
    // Add todos
    const todoInput = page.getByPlaceholder(/add a new todo/i)
    await todoInput.fill("Incomplete Todo 1")
    await page.getByRole("button", { name: /add/i }).click()
    await todoInput.fill("Incomplete Todo 2")
    await page.getByRole("button", { name: /add/i }).click()

    // Enter selection mode
    const selectButton = page.getByRole("button", { name: /select/i })
    await selectButton.click()

    // Select all todos
    const selectAllButton = page.getByRole("button", { name: /select all/i })
    await selectAllButton.click()

    // Click Mark Complete
    const markCompleteButton = page.getByRole("button", {
      name: /mark complete/i,
    })
    await markCompleteButton.click()

    // Verify todos are marked as completed (should have strikethrough or similar)
    const completedTodos = page.locator("[class*='line-through']")
    await expect(completedTodos).toHaveCount(2)
  })

  test("should bulk mark todos as incomplete", async ({ page }) => {
    // Add todos
    const todoInput = page.getByPlaceholder(/add a new todo/i)
    await todoInput.fill("Todo 1")
    await page.getByRole("button", { name: /add/i }).click()
    await todoInput.fill("Todo 2")
    await page.getByRole("button", { name: /add/i }).click()

    // First mark them as complete individually
    const completionCheckboxes = page.locator('input[type="checkbox"]')
    // Skip the selection checkboxes (in selection mode, selection comes first)
    // For now, let's use the toggle in the UI

    // Enter selection mode
    const selectButton = page.getByRole("button", { name: /select/i })
    await selectButton.click()

    // Select all and mark complete
    const selectAllButton = page.getByRole("button", { name: /select all/i })
    await selectAllButton.click()

    const markCompleteButton = page.getByRole("button", {
      name: /mark complete/i,
    })
    await markCompleteButton.click()

    // Re-enter selection mode for the incomplete action
    // The mode should have exited after the action
    await selectButton.click()

    // Select all again
    await selectAllButton.click()

    // Click Mark Incomplete
    const markIncompleteButton = page.getByRole("button", {
      name: /mark incomplete/i,
    })
    await markIncompleteButton.click()

    // Verify todos are marked as incomplete (no strikethrough)
    const completedTodos = page.locator("[class*='line-through']")
    await expect(completedTodos).toHaveCount(0)
  })

  test("should exit selection mode after bulk action", async ({ page }) => {
    // Add a todo
    const todoInput = page.getByPlaceholder(/add a new todo/i)
    await todoInput.fill("Test Todo")
    await page.getByRole("button", { name: /add/i }).click()

    // Enter selection mode
    const selectButton = page.getByRole("button", { name: /select/i })
    await selectButton.click()

    // Verify bulk action bar is visible
    const bulkActionBar = page.locator(
      '[class*="bg-muted"][class*="rounded-lg"]'
    )
    await expect(bulkActionBar).toBeVisible()

    // Select the todo
    const checkbox = page.locator('input[type="checkbox"]').first()
    await checkbox.click()

    // Click Delete
    const deleteButton = page.getByRole("button", { name: /^delete$/i })
    await deleteButton.click()

    // Verify bulk action bar is no longer visible (selection mode exited)
    await expect(bulkActionBar).not.toBeVisible()

    // Verify Select button is back to normal state
    const selectButtonAfter = page.getByRole("button", { name: /select/i })
    await expect(selectButtonAfter).toBeVisible()
  })

  test("should cancel selection mode with Cancel button", async ({ page }) => {
    // Add a todo
    const todoInput = page.getByPlaceholder(/add a new todo/i)
    await todoInput.fill("Test Todo")
    await page.getByRole("button", { name: /add/i }).click()

    // Enter selection mode
    const selectButton = page.getByRole("button", { name: /select/i })
    await selectButton.click()

    // Verify bulk action bar is visible
    const bulkActionBar = page.locator(
      '[class*="bg-muted"][class*="rounded-lg"]'
    )
    await expect(bulkActionBar).toBeVisible()

    // Click Cancel button
    const cancelButton = page.getByRole("button", { name: /cancel/i })
    await cancelButton.click()

    // Verify selection mode is exited
    await expect(bulkActionBar).not.toBeVisible()
    const selectButtonAfter = page.getByRole("button", { name: /select/i })
    await expect(selectButtonAfter).toBeVisible()
  })
})
