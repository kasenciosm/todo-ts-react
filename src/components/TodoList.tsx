import { ListOfTodos, Todo, TodoId } from './type'
import { MdOutlineDone } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";

interface List {
    todos: ListOfTodos
    onRemove: ({ id }: TodoId) => void
    onToggleCompleted: ({ id }: TodoId) => void
    onEdit: (todo: Todo) => void
}

const TodoList: React.FC<List> = ({ todos, onRemove, onToggleCompleted, onEdit }) => {

    const handleRemove = (id: string) => {
        onRemove({ id })
    }

    const handleToggleComplete = (id: string) => {
        onToggleCompleted({ id })
    }

    if (todos.length === 0) {
        return (
            <section className='no-todos'>
                <h2 >No hay tareas</h2>
            </section>
        )
    }

    const handleEdit = (todo: Todo) => {
        onEdit(todo)
    }

    return (
        <section className='list-todo'>
            <ul className='list'>
                {todos.map((todo) => (
                    <li key={todo.id}
                        style={{
                            textDecoration: todo.completed ? 'line-through' : 'none',
                            color: todo.completed ? 'red' : 'inherit',
                            border: todo.completed ? '1px solid red' : 'inherit',
                            boxShadow: todo.completed ? '0 0 8px rgba(236, 128, 128, 0.8)' : '0 0 4px #000c'
                        }}>
                        <h3 className='list-title'>{todo.title}</h3>
                        <p className='list-desc'>{todo.description}</p>
                        <div className='buttons'>
                            <button
                                className='button-completed'
                                onClick={() => handleToggleComplete(todo.id)}>
                                <MdOutlineDone size={18} />
                            </button>
                            <button
                                className='button-edit'
                                onClick={() => { handleEdit(todo) }}>
                                <MdOutlineEdit size={18} />
                            </button>
                            <button
                                className='button-remove'
                                onClick={() => handleRemove(todo.id)}>
                                <MdDeleteOutline size={18} />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default TodoList