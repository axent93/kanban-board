import './List.scss'

import { Draggable } from '@hello-pangea/dnd'
import { forwardRef, useState } from 'react'

import Ticket from '../Ticket/Ticket'
import TicketForm from '../TicketForm/TicketForm'
import { TTicketListProps } from './List.types'

const List = forwardRef<HTMLElement, TTicketListProps>((props, ref) => {
  const { id: columnId, tickets, name, className = '', placeholderNode, snapshot, ...droppableProps } = props
  const [isVisibleForm, setIsVisibleForm] = useState<boolean>(false)

  /**
   * Handles ticket form creating toggle
   */
  const handleTicketFormToggle = (): void => {
    setIsVisibleForm(prev => !prev)
  }

  return (
    <li className={`tickets-column ${className}`}>
      <section className='tickets-column__heading'>
        <h3>{name}</h3>
        <p>
          <strong>({tickets.length})</strong>
        </p>
        <button
          onClick={handleTicketFormToggle}
          className='tickets-column__heading--button'
        >
          +
        </button>
      </section>
      <section
        ref={ref}
        {...droppableProps}
        className={`tickets-column__list ${snapshot.isDraggingOver ? 'active' : ''}`}
      >
        {isVisibleForm && (
          <TicketForm
            columnId={columnId}
            setIsVisibleForm={setIsVisibleForm}
            handleTicketFormToggle={handleTicketFormToggle}
          />
        )}
        {tickets.map((ticket, index) => (
          <Draggable
            key={ticket.id}
            draggableId={ticket.id}
            index={index}
          >
            {(provided, snapshot) => (
              <Ticket
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                snapshot={snapshot}
                key={`${name}-${index}-ticket`}
                title={ticket.title}
                id={ticket.id}
              />
            )}
          </Draggable>
        ))}
        {placeholderNode}
      </section>
    </li>
  )
})

List.displayName = 'List'

export default List
