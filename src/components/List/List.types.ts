import { DroppableProvidedProps, DroppableStateSnapshot } from '@hello-pangea/dnd'
import { ReactNode } from 'react'

import { TTicketCard } from '../Ticket/Ticket.types'

export type TTicketList = {
  id: string
  name: string
  tickets: TTicketCard[]
  className?: string
}

export type TTicketListProps = TTicketList &
  DroppableProvidedProps & {
    placeholderNode: ReactNode
    snapshot: DroppableStateSnapshot
  }
