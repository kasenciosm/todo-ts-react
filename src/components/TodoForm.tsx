import { useState, useEffect } from "react"
import { Todo } from "./type"


interface TodoFormProps {
    onSubmit: (newTodo: Todo) => void
    todo: Todo | null
    update: (updatedTodo: Todo) => void
}


export const TodoForm: React.FC<TodoFormProps> = ({ onSubmit, todo, update }) => {
    const [form, setForm] = useState<Todo>({ id: '', title: '', description: '', completed: false })
    const [errors, setErrors] = useState<{ [key: string]: string }>({})


    useEffect(() => {
        if (todo) {
            setForm(todo)

        } else {
            setForm({ id: '', title: '', description: '', completed: false })

        }
    }, [todo])

    const handleInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target

        const newErrors = { ...errors }
        delete newErrors[name]

        setForm({
            ...form,
            [name]: value
        })
        setErrors(newErrors)
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()

        const newErrors: { [key: string]: string } = {};
        if (/^\s*$/.test(form.title)) {
            newErrors.title = 'El título no puede estar vacío'
        }
        if (/^\s*$/.test(form.description)) {
            newErrors.description = 'La descripción no puede estar vacía'
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }


        if (todo) {
            update(form)
        } else {
            onSubmit(form)
        }

        setForm({ id: '', title: '', description: '', completed: false })
        setErrors({})
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
            {errors.title && <p style={{ color: 'red', fontSize: '.5rem', marginTop: '0' }}>{errors.title}</p>}
            <div className="form-description">
                <label>Descripcion:</label>
                <textarea
                    name="description"
                    value={form.description}
                    required
                    onChange={handleInput} />
            </div>
            {errors.description && <p style={{ color: 'red', fontSize: '.5rem', margin: '0' }}>{errors.description}</p>}
            <button type="submit"
                disabled={!form.title || !form.description}>
                Save
            </button>
        </form>
    )
}
