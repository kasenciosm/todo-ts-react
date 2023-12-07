import { useState } from 'react'
import './App.css'
import { TodoForm } from './components/TodoForm'
import { TodoId, type Todo, FilterValue } from './components/type'
import TodoList from './components/TodoList'
import { Footer } from './components/Footer'
import { TODO_FILTERS } from './components/consts/const'


const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([])

  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)

  const [editing, setEditing] = useState<Todo | null>(null)

  const handleTodoSubmit = (newTodo: Todo) => {
    newTodo.id = crypto.randomUUID()
    setTodos([...todos, newTodo])
  }


  const handleCompleted = ({ id }: TodoId) => {
    const newTodos = todos.map(todo => {
      return todo.id === id ? { ...todo, completed: !todo.completed } : todo
    })
    setTodos(newTodos)
  }

  function handleDelete({ id }: TodoId) {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  function handleFilterChange(filter: FilterValue) {
    setFilterSelected(filter)
  }

  function handleRemoveAllCompleted() {
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }

  const activeCount = todos.filter(todo => !todo.completed).length

  const completedCount = todos.length - activeCount

  const filteredTodos = todos.filter(todo => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return todo
  })

  const handleEdit = (todo: Todo) => {
    setEditing(todo)
  }

  const handleUpdate = (updatedTodo: Todo) => {
    const updatedTodos = todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo)
    setTodos(updatedTodos)
  }

  return (
    <>
      <header className='title'>
        <h1 >TODO</h1>
      </header>
      <section className='todos'>
        <div>
          <TodoForm
            onSubmit={handleTodoSubmit}
            todo={editing}
            update={handleUpdate} />
          <Footer
            activeCount={activeCount}
            completedCount={completedCount}
            onClearCompleted={handleRemoveAllCompleted}
            filterSelected={filterSelected}
            handleFilterChange={handleFilterChange} />
        </div>
        <TodoList
          onToggleCompleted={handleCompleted}
          onRemove={handleDelete}
          todos={filteredTodos}
          onEdit={handleEdit} />
      </section>
    </>
  )
}

export default App
