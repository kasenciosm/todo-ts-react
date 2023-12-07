import { Filters } from "./Filters"
import { FilterValue } from "./type"

interface Props {
    activeCount: number
    completedCount: number
    filterSelected: FilterValue
    onClearCompleted: () => void
    handleFilterChange: (filter: FilterValue) => void
}

export const Footer: React.FC<Props> = ({
    activeCount = 0,
    completedCount = 0,
    filterSelected,
    handleFilterChange,
    onClearCompleted
}) => {
    return (
        <footer className="footer">
            <span>
                <strong className="count">{activeCount} </strong>
                Tareas Pendientes
            </span>

            <Filters
                filterSelected={filterSelected}
                onFilterChange={handleFilterChange} />
            <div className="delete-completed">

                {
                    completedCount > 0 && (
                        <button onClick={onClearCompleted}>
                            Borrar Completados
                        </button>
                    )
                }
            </div>
        </footer>
    )
}