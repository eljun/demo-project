"use client"

import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Todo } from "@/types"
import { cn } from "@/lib/utils"

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  isSelectionMode?: boolean;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
}

export function TodoItem({
  todo,
  onToggle,
  onDelete,
  isSelectionMode,
  isSelected,
  onSelect,
}: TodoItemProps) {
  return (
    <div className={cn(
      "flex items-center gap-3 p-3 bg-background border rounded-lg group",
      isSelected && "ring-2 ring-primary"
    )}>
      {isSelectionMode && (
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect?.(todo.id)}
          className="h-4 w-4 rounded border-blue-500 text-blue-500 focus:ring-blue-500 cursor-pointer"
        />
      )}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="h-4 w-4 rounded border-primary text-primary focus:ring-primary cursor-pointer"
      />
      <span
        className={cn(
          "flex-1 text-sm",
          todo.completed && "line-through text-muted-foreground"
        )}
      >
        {todo.text}
      </span>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(todo.id)}
        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
