"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { useTodos } from "@/hooks/use-todos"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AddTodoForm } from "@/components/add-todo-form"
import { TodoList } from "@/components/todo-list"

export default function TodosPage() {
  const router = useRouter()
  const { user, isLoading: authLoading, logout } = useAuth()
  const { todos, isLoaded, addTodo, deleteTodo, toggleTodo, editTodo } = useTodos()

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login")
    }
  }, [user, authLoading, router])

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/50">
      <div className="max-w-2xl mx-auto px-4 py-6 sm:px-6 lg:px-8 space-y-4">
        <header className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl font-bold truncate">My Todos</h1>
            <p className="text-xs sm:text-sm text-muted-foreground truncate">{user.email}</p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="h-10 sm:h-9 px-3 sm:px-4 ml-4 shrink-0"
          >
            <LogOut className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </header>

        <Card>
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-base sm:text-lg">Add New Todo</CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <AddTodoForm onAdd={addTodo} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-base sm:text-lg">
              Tasks ({todos.filter(t => !t.completed).length} remaining)
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            {!isLoaded ? (
              <div className="text-center py-4 text-muted-foreground">
                Loading todos...
              </div>
            ) : (
              <TodoList
                todos={todos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
