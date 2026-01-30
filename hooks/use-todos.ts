"use client"

import { useState, useEffect } from "react"
import { storage } from "@/lib/storage"
import { Todo } from "@/types"

const TODOS_STORAGE_KEY = "todo-app-todos"

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const storedTodos = storage.get<Todo[]>(TODOS_STORAGE_KEY, [])
    setTodos(storedTodos)
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      storage.set(TODOS_STORAGE_KEY, todos)
    }
  }, [todos, isLoaded])

  const addTodo = (text: string) => {
    if (!text.trim()) return
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      createdAt: Date.now(),
    }
    setTodos((prev) => [newTodo, ...prev])
  }

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteMany = (ids: string[]) => {
    setTodos((prev) => prev.filter((todo) => !ids.includes(todo.id)))
  }

  const completeMany = (ids: string[]) => {
    setTodos((prev) =>
      prev.map((todo) =>
        ids.includes(todo.id) ? { ...todo, completed: true } : todo
      )
    )
  }

  const incompleteMany = (ids: string[]) => {
    setTodos((prev) =>
      prev.map((todo) =>
        ids.includes(todo.id) ? { ...todo, completed: false } : todo
      )
    )
  }

  return {
    todos,
    isLoaded,
    addTodo,
    deleteTodo,
    toggleTodo,
    deleteMany,
    completeMany,
    incompleteMany,
  }
}
