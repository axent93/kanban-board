import './Ticket.scss'

import { DraggableStateSnapshot } from '@hello-pangea/dnd'
import { forwardRef, useMemo } from 'react'

import { TTicketCard } from './Ticket.types'

const Ticket = forwardRef<HTMLElement, TTicketCard & { snapshot: DraggableStateSnapshot }>((props, ref) => {
  const { title, snapshot, ...dragableProps } = props

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
    >
      <h4>{title}</h4>
    </article>
  )
})

Ticket.displayName = 'Ticket'

export default Ticket
