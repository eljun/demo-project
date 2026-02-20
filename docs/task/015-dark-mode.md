# Dark Mode

> **ID:** 15
> **Status:** PLANNED
> **Priority:** LOW
> **Type:** feature
> **Version Impact:** minor
> **Created:** Feb 20, 2026
> **Platform:** Web
> **Automation:** auto

## Overview

Add dark mode support with a toggle button and system preference detection. Uses Tailwind's built-in dark mode support with CSS variables for theming.

## Requirements

### Must Have
- [ ] Dark mode toggle button in header
- [ ] Respect system preference by default
- [ ] Persist user's theme choice in localStorage
- [ ] All pages and components support dark mode
- [ ] Smooth transition between themes

### Nice to Have
- [ ] Three-way toggle: Light, Dark, System
- [ ] Animated toggle icon (sun/moon)

## Current State

App only has light mode. Tailwind CSS 4.1 has built-in dark mode support via `dark:` classes.

**Current Files:**
| File | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout - needs dark mode class on html |
| `app/globals.css` | Global styles - needs dark theme variables |
| `app/todos/page.tsx` | Page - needs toggle button |
| `app/login/page.tsx` | Page - needs dark mode styles |

## Proposed Solution

Use Tailwind's `class` strategy for dark mode. Create a useTheme hook that manages theme state and toggles the `dark` class on `<html>`. Add dark: variant classes to components.

### File Changes

| Action | File | Description |
|--------|------|-------------|
| CREATE | `hooks/use-theme.ts` | Theme management hook |
| CREATE | `components/theme-toggle.tsx` | Dark mode toggle button |
| MODIFY | `app/globals.css` | Add dark mode CSS variables |
| MODIFY | `app/layout.tsx` | Add theme initialization script |
| MODIFY | `app/todos/page.tsx` | Add theme toggle to header |
| MODIFY | `app/login/page.tsx` | Add dark mode compatible styles |

## Implementation Steps

### Step 1: Create useTheme Hook
Manage theme state (light/dark/system), persist to localStorage, sync with `<html>` class.

### Step 2: Create ThemeToggle Component
Button with Sun/Moon icons from lucide-react. Toggles between light and dark.

### Step 3: Update Global CSS
Add dark mode color variables and transitions.

### Step 4: Add dark: Classes to Components
Review all components and add `dark:` Tailwind variants for backgrounds, text, borders.

### Step 5: Prevent Flash of Wrong Theme
Add inline script in layout.tsx to set theme before hydration.

## Testing Checklist

- [ ] Toggle switches between light and dark
- [ ] Theme persists on page reload
- [ ] System preference detected on first visit
- [ ] All components readable in both modes
- [ ] No flash of wrong theme on load
- [ ] Login page works in dark mode
- [ ] Todos page works in dark mode

## Dependencies

- Required packages: none (Tailwind dark mode built-in)
- Blocked by: none

## Notes for Implementation Agent

Use Tailwind's `class` strategy (add/remove `dark` class on `<html>`). For preventing theme flash, add a small inline `<script>` in the `<head>` that reads localStorage and sets the class before React hydrates. Use CSS `transition-colors` for smooth theme switching.
