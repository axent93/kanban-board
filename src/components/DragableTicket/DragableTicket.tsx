import { Draggable } from '@hello-pangea/dnd'
import { memo } from 'react'

import Ticket from '../Ticket/Ticket'
import { TDraggableTicketProps } from './DragableTicket.types'

const DraggableTicket: React.FC<TDraggableTicketProps> = memo(({ ticket, index, handleDoubleClickEvent, handleDeleteTicket }) => (
  <Draggable
    draggableId={ticket.id}
    index={index}
  >
    {(provided, snapshot) => (
      <Ticket
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        id={ticket.id}
        title={ticket.title}
        snapshot={snapshot}
        handleDoubleClickEvent={handleDoubleClickEvent}
        handleDeleteTicket={handleDeleteTicket}
      />
    )}
  </Draggable>
))

DraggableTicket.displayName = 'DraggableTicket'

export default DraggableTicket
