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
  const { todos, isLoaded, addTodo, deleteTodo, toggleTodo } = useTodos()

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
    <div className="min-h-screen bg-muted/50 p-4">
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">My Todos</h1>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Add New Todo</CardTitle>
          </CardHeader>
          <CardContent>
            <AddTodoForm onAdd={addTodo} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Tasks ({todos.filter(t => !t.completed).length} remaining)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!isLoaded ? (
              <div className="text-center py-4 text-muted-foreground">
                Loading todos...
              </div>
            ) : (
              <TodoList
                todos={todos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
