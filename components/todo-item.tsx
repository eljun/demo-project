"use client"

import { useState, useEffect, useRef } from "react"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Todo } from "@/types"
import { cn } from "@/lib/utils"

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
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

  return (
    <div className="flex items-center gap-3 p-3 sm:p-2 bg-background border rounded-lg group hover:bg-gray-50">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="h-6 w-6 sm:h-5 sm:w-5 rounded border-primary text-primary focus:ring-primary cursor-pointer shrink-0"
      />
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="flex-1 text-base sm:text-sm px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-primary min-w-0"
        />
      ) : (
        <span
          onDoubleClick={handleDoubleClick}
          className={cn(
            "flex-1 text-base sm:text-sm cursor-text truncate min-w-0",
            todo.completed && "line-through text-muted-foreground cursor-default"
          )}
        >
          {todo.text}
        </span>
      )}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(todo.id)}
        className="h-10 w-10 sm:h-8 sm:w-8 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0"
      >
        <Trash2 className="h-5 w-5 sm:h-4 sm:w-4" />
      </Button>
    </div>
  )
}
