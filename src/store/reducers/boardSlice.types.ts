import { DropResult } from '@hello-pangea/dnd'

import { TTicketList } from '@/components/List/List.types'
import { TTicketCard } from '@/components/Ticket/Ticket.types'

export type TReduxBoardState = {
  ticketColumns: TTicketList[]
  searchString: string
}

export type TNewTicketAction = {
  payload: {
    ticket: TTicketCard
    columnId: string
  }
  type: string
}

export type TUpdateTicketAction = {
  payload: {
    ticketId: string
    columnId: string
    value: string
  }
  type: string
}

export type TTicketRemoveAction = {
  payload: {
    ticketId: string
    columnId: string
  }
  type: string
}

export type TDragTicketAction = {
  payload: {
    result: DropResult<string>
  }
}
