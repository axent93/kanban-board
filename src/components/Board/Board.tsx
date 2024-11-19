import './Board.scss'

import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd'

import { useAppDispatch, useAppSelector } from '../../hooks/useAppStore'
import { dragTicket } from '../../store/reducers/boardSlice'
import { computedColumns } from '../../store/selectors/boardSelectors'
import List from '../List/List'

const Board: React.FC = () => {
  const columns = useAppSelector(computedColumns) // Access the filtered items from the store
  const dispatch = useAppDispatch()

  /**
   * Handling drop method responsible for state change and tickets move across the boards
   * We use callback to optimize function calls
   *
   * @result DropResult<string>
   * @return void
   */
  const handleDragEnd = (result: DropResult<string>): void => {
    dispatch(dragTicket({ result }))
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <ul
        className='knb-board'
        style={{
          gridTemplateColumns: `repeat(${columns.length}, minmax(300px, 400px))`
        }}
      >
        {columns.map((column, index) => (
          <Droppable
            droppableId={column.id}
            key={`${column.id}-${index}-column`}
          >
            {(provided, snapshot) => (
              <List
                ref={provided.innerRef}
                {...provided.droppableProps}
                snapshot={snapshot}
                placeholderNode={provided.placeholder}
                id={column.id}
                name={column.name}
                tickets={column.tickets}
                className={column.className}
              />
            )}
          </Droppable>
        ))}
      </ul>
    </DragDropContext>
  )
}

export default Board
