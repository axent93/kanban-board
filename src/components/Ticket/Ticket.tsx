import './Ticket.scss'

import { forwardRef, useMemo } from 'react'

import { TTicketCardProps } from './Ticket.types'

const Ticket = forwardRef<HTMLElement, TTicketCardProps>((props, ref) => {
  const { title, id, snapshot, handleDoubleClickEvent, handleDeleteTicket, ...dragableProps } = props

  /**
   * Memorizing className in order to prevent unnecessary re-rendering
   */
  const className = useMemo(() => {
    const classList = 'ticket-card '
    switch (snapshot.draggingOver) {
      case 'to-do':
        return classList + 'to-do-color'
      case 'in-progress':
        return classList + 'in-progress-color'
      case 'done':
        return classList + 'done-color'
      default:
        return classList
    }
  }, [snapshot.draggingOver])

  return (
    <article
      ref={ref}
      {...dragableProps}
      className={className}
      onDoubleClick={event => handleDoubleClickEvent(event, id)}
    >
      <h4>{title}</h4>
      <button
        onClick={event => handleDeleteTicket(event, id)}
        className='ticket-card__delete-icon'
      >
        X
      </button>
    </article>
  )
})

Ticket.displayName = 'Ticket'

export default Ticket
