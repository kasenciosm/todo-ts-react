import { TODO_FILTERS } from "./consts/const"

export interface Todo {
    id: string,
    title: string,
    description: string,
    completed: boolean
}

export type TodoId = Pick<Todo, 'id'>

export type ListOfTodos = Todo[]

export type FilterValue = typeof TODO_FILTERS[keyof typeof TODO_FILTERS]