"use client"

import { useState, FormEvent } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface AddTodoFormProps {
  onAdd: (text: string) => void;
}

export function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [text, setText] = useState("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (text.trim()) {
      onAdd(text)
      setText("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
      <Input
        type="text"
        placeholder="What needs to be done?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 h-12 sm:h-10 text-base sm:text-sm"
      />
      <Button
        type="submit"
        disabled={!text.trim()}
        className="h-12 sm:h-10 w-full sm:w-auto"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add
      </Button>
    </form>
  )
}
