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
    <div className="flex items-center gap-3 p-3 bg-background border rounded-lg group">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="h-4 w-4 rounded border-primary text-primary focus:ring-primary cursor-pointer"
      />
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
