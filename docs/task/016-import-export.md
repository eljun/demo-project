# Import/Export Functionality

> **ID:** 16
> **Status:** PLANNED
> **Priority:** LOW
> **Type:** feature
> **Version Impact:** minor
> **Created:** Feb 20, 2026
> **Platform:** Web
> **Automation:** auto

## Overview

Add the ability to export todos as JSON or CSV files and import them back. This provides data portability and backup/restore functionality since data is stored only in localStorage.

## Requirements

### Must Have
- [ ] Export all todos as JSON file download
- [ ] Export all todos as CSV file download
- [ ] Import todos from JSON file
- [ ] Import validation (check file format)
- [ ] Merge import (add to existing, don't replace)
- [ ] Import error handling with user feedback

### Nice to Have
- [ ] Replace import option (clear existing + import)
- [ ] Export filtered/selected todos only
- [ ] Preview imported data before confirming

## Current State

No import/export exists. Data only lives in browser localStorage.

**Current Files:**
| File | Purpose |
|------|---------|
| `hooks/use-todos.ts` | Todo state - needs import/export methods |
| `app/todos/page.tsx` | Page - needs import/export buttons |
| `types/index.ts` | Todo type for validation |

## Proposed Solution

Create export functions that serialize todos to JSON/CSV and trigger file downloads. Create import functions that read uploaded files, validate the format, and merge with existing data.

### File Changes

| Action | File | Description |
|--------|------|-------------|
| CREATE | `lib/import-export.ts` | Export/import utility functions |
| CREATE | `components/import-export-menu.tsx` | UI with export/import buttons |
| MODIFY | `hooks/use-todos.ts` | Add importTodos method |
| MODIFY | `app/todos/page.tsx` | Add import/export menu |

## Implementation Steps

### Step 1: Create Import/Export Utilities
In `lib/import-export.ts`:
- `exportToJSON(todos)`: Returns JSON string
- `exportToCSV(todos)`: Returns CSV string
- `downloadFile(content, filename, mimeType)`: Triggers browser download
- `parseImportFile(file)`: Reads and validates uploaded file
- `validateTodos(data)`: Validates imported data matches Todo interface

### Step 2: Create Import/Export UI
Dropdown menu with Export JSON, Export CSV, and Import buttons. Import uses hidden file input.

### Step 3: Add Import to useTodos
Add `importTodos(newTodos)` method that merges imported todos with existing, avoiding duplicates by ID.

### Step 4: Wire Up in TodosPage
Add import/export menu to the header area of the todos page.

## Testing Checklist

- [ ] Export JSON downloads valid JSON file
- [ ] Export CSV downloads valid CSV file
- [ ] Import valid JSON adds todos
- [ ] Import invalid file shows error
- [ ] Imported todos don't duplicate existing
- [ ] Empty export produces valid empty file
- [ ] Large file import works (100+ todos)

## Dependencies

- Required packages: none (uses built-in File API)
- Blocked by: none

## Notes for Implementation Agent

Use the browser's built-in File API for reading uploads and Blob + URL.createObjectURL for downloads. No external libraries needed. For CSV export, handle commas in todo text by wrapping in quotes. Validate imported data structure before merging to prevent corrupted state.
