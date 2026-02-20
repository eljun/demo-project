"use client"

import { TodoItem } from "@/components/todo-item"
import { Todo } from "@/types"

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

export function TodoList({ todos, onToggle, onDelete, onEdit }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12 text-muted-foreground">
        <p className="text-sm sm:text-base">No todos yet. Add one above!</p>
      </div>
    )
  }

  return (
    <div className="space-y-3 sm:space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  )
}
