import { useState, useEffect } from "react"
import { Todo } from "./type"


interface TodoFormProps {
    onSubmit: (newTodo: Todo) => void
    todo: Todo | null
    update: (updatedTodo: Todo) => void
}


export const TodoForm: React.FC<TodoFormProps> = ({ onSubmit, todo, update }) => {
    const [form, setForm] = useState<Todo>({ id: '', title: '', description: '', completed: false })


    useEffect(() => {
        if (todo) {
            setForm(todo)

        } else {
            setForm({ id: '', title: '', description: '', completed: false })

        }
    }, [todo])

    const handleInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target
        setForm({
            ...form,
            [name]: value
        })
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        if (todo) {
            update(form)
        } else {
            onSubmit(form)
        }

        setForm({ id: '', title: '', description: '', completed: false })
    }
    return (
        <form
            className="form"
            onSubmit={handleSubmit}>
            <h2>Tarea</h2>
            <div className="form-title">
                <label> Tarea: </label>
                <input
                    autoFocus
                    name="title"
                    type="text"
                    value={form.title}
                    required
                    onChange={handleInput} />
            </div>
            <div className="form-description">
                <label>Descripcion:</label>
                <textarea
                    name="description"
                    value={form.description}
                    required
                    onChange={handleInput} />
            </div>
            <button type="submit"
                disabled={!form.title || !form.description}>
                Save
            </button>
        </form>
    )
}
