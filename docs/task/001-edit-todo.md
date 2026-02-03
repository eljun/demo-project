# Edit Todo Feature

> **ID:** 1
> **Status:** COMPLETED
> **Priority:** MEDIUM
> **Type:** feature
> **Version Impact:** minor
> **Created:** Feb 3, 2025
> **Platform:** Web
> **Automation:** manual

## Overview

Add inline editing capability to todos. Users can double-click on a todo's text to enter edit mode, modify the text, and save changes by pressing Enter or clicking outside. This is a standard feature in todo applications (TodoMVC pattern).

## Requirements

### Must Have
- [ ] Double-click on todo text enters edit mode
- [ ] Edit mode shows an input field with current text
- [ ] Press Enter saves the changes
- [ ] Press Escape cancels editing (reverts to original)
- [ ] Clicking outside the input saves changes
- [ ] Empty text on save deletes the todo
- [ ] Edit mode should auto-focus and select all text

### Nice to Have
- [ ] Visual indicator that todo is editable (cursor change on hover)
- [ ] Smooth transition between view/edit modes

## Current State

The `TodoItem` component displays todo text as a static `<span>` element. Users can toggle completion and delete todos, but cannot edit the text after creation.

**Current Files:**
| File | Purpose |
|------|---------|
| `components/todo-item.tsx` | Individual todo UI with checkbox, text, delete |
| `hooks/use-todos.ts` | Todo CRUD operations (add, delete, toggle) |
| `components/todo-list.tsx` | Container that renders TodoItem components |
| `app/todos/page.tsx` | Main page that uses the useTodos hook |

## Proposed Solution

Add an `editTodo` function to the `useTodos` hook and implement inline editing in the `TodoItem` component using local state to track edit mode.

### Architecture

1. **Hook Extension**: Add `editTodo(id: string, newText: string)` to `useTodos`
2. **Component State**: `TodoItem` manages its own `isEditing` and `editText` state
3. **Event Handling**: Double-click, blur, keydown (Enter/Escape) handlers

### File Changes

| Action | File | Description |
|--------|------|-------------|
| MODIFY | `hooks/use-todos.ts` | Add `editTodo` function |
| MODIFY | `components/todo-item.tsx` | Add edit mode UI and handlers |
| MODIFY | `components/todo-list.tsx` | Pass `onEdit` prop to TodoItem |
| MODIFY | `app/todos/page.tsx` | Pass `editTodo` to TodoList |

## Implementation Steps

### Step 1: Add editTodo to useTodos hook

Add the edit function to `hooks/use-todos.ts`:

```typescript
const editTodo = (id: string, newText: string) => {
  const trimmedText = newText.trim()
  if (!trimmedText) {
    // Delete todo if text is empty
    deleteTodo(id)
    return
  }
  setTodos((prev) =>
    prev.map((todo) =>
      todo.id === id ? { ...todo, text: trimmedText } : todo
    )
  )
}
```

Update the return statement to include `editTodo`.

### Step 2: Update TodoItem component

Add edit mode state and handlers to `components/todo-item.tsx`:

```typescript
interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;  // NEW
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus input when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const handleDoubleClick = () => {
    if (!todo.completed) {  // Don't allow editing completed todos
      setIsEditing(true)
      setEditText(todo.text)
    }
  }

  const handleSave = () => {
    setIsEditing(false)
    if (editText.trim() !== todo.text) {
      onEdit(todo.id, editText)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      setIsEditing(false)
      setEditText(todo.text)  // Revert
    }
  }

  // Render edit input or text span based on isEditing state
}
```

### Step 3: Update TodoList component

Pass the `onEdit` prop through `components/todo-list.tsx`:

```typescript
interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;  // NEW
}
```

### Step 4: Update todos page

Wire up `editTodo` in `app/todos/page.tsx`:

```typescript
<TodoList
  todos={todos}
  onToggle={toggleTodo}
  onDelete={deleteTodo}
  onEdit={editTodo}  // NEW
/>
```

## Code Examples

### Edit mode UI in TodoItem

```tsx
{isEditing ? (
  <input
    ref={inputRef}
    type="text"
    value={editText}
    onChange={(e) => setEditText(e.target.value)}
    onBlur={handleSave}
    onKeyDown={handleKeyDown}
    className="flex-1 text-sm px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
  />
) : (
  <span
    onDoubleClick={handleDoubleClick}
    className={cn(
      "flex-1 text-sm cursor-text",
      todo.completed && "line-through text-muted-foreground cursor-default"
    )}
  >
    {todo.text}
  </span>
)}
```

## Testing Checklist

- [ ] Double-click on todo text enters edit mode
- [ ] Input is focused and text is selected
- [ ] Press Enter saves and exits edit mode
- [ ] Press Escape cancels and reverts text
- [ ] Click outside input saves changes
- [ ] Empty text deletes the todo
- [ ] Cannot edit completed todos (double-click ignored)
- [ ] Edit persists after page refresh (localStorage)
- [ ] Checkbox and delete button still work during non-edit state

## Dependencies

- Required packages: None (uses existing React/Next.js)
- Required APIs: None
- Blocked by: None

## Notes for Implementation Agent

1. Import `useState`, `useEffect`, `useRef` from React in TodoItem
2. The `cn()` utility is already imported for conditional classes
3. Keep the existing hover behavior for the delete button
4. Ensure the input styling matches the existing design system
5. Consider disabling edit on completed todos (UX decision - implemented above)

## Related

- TodoMVC spec: https://todomvc.com/
- Existing bulk-actions task: `docs/task/bulk-actions.md`
