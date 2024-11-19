import { DropResult } from '@hello-pangea/dnd'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { TTicketList } from '@/components/List/List.types'
import { TTicketCard } from '@/components/Ticket/Ticket.types'

export type TReduxBoardState = {
  ticketColumns: TTicketList[]
  searchString: string
}

type TNewTicketAction = {
  payload: {
    ticket: TTicketCard
    columnId: string
  }
  type: string
}

type TUpdateTicketAction = {
  payload: {
    ticketId: string
    columnId: string
    value: string
  }
  type: string
}

type TTicketRemoveAction = {
  payload: {
    ticketId: string
    columnId: string
  }
  type: string
}

type TDragTicketAction = {
  payload: {
    result: DropResult<string>
  }
}

const initialState: TReduxBoardState = {
  searchString: '',
  ticketColumns: [
    {
      id: 'to-do',
      name: 'To do',
      className: 'to-do',
      tickets: []
    },
    {
      id: 'in-progress',
      name: 'In Progress',
      className: 'in-progress',
      tickets: []
    },
    {
      id: 'done',
      name: 'Done',
      className: 'done',
      tickets: []
    }
  ]
}

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    /**
     * This reducer handles search string update for filtering tickets
     *
     * @param state TReduxBoardState
     * @param action PayloadAction<string>
     */
    setFilterString: (state, action: PayloadAction<string>) => {
      state.searchString = action.payload
    },
    /**
     * This reducer handles new ticket addition at the beginning of the ticket list
     *
     * @param state TReduxBoardState
     * @param action TNewTicketAction
     */
    addNewTicket(state, action: TNewTicketAction): void {
      const { ticket, columnId } = action.payload
      const column = state.ticketColumns.find(col => col.id === columnId)
      if (column) {
        column.tickets = [ticket, ...column.tickets]
      }
    },
    /**
     * This reducer handles ticket update by ID
     *
     * @param state TReduxBoardState
     * @param action TNewTicketAction
     */
    updateTicket(state, action: TUpdateTicketAction): void {
      const { ticketId, columnId, value } = action.payload
      const column = state.ticketColumns.find(col => col.id === columnId)
      if (column) {
        const ticket = column.tickets.find(ticket => ticket.id === ticketId)
        if (ticket) ticket.title = value
      }
    },
    /**
     * This reducer handles ticket removal by ID
     *
     * @param state TReduxBoardState
     * @param action TTicketRemoveAction
     */
    removeTicket(state, action: TTicketRemoveAction): void {
      const { ticketId, columnId } = action.payload

      const column = state.ticketColumns.find(col => col.id === columnId)
      if (column) {
        column.tickets = column.tickets.filter(ticket => ticket.id !== ticketId)
      }
    },
    /**
     * This reducer handles ticket move across the boards
     *
     * @param state TReduxBoardState
     * @param action TDragTicketAction
     */
    dragTicket(state, action: TDragTicketAction): void {
      const { destination, source } = action.payload.result
      if (!destination) return

      // instead of passing twice to search for indexes with findIndex method we can create a map with direct index access by ID
      const columnIndexMap = state.ticketColumns.reduce(
        (map, { id }, index) => {
          map[id] = index
          return map
        },
        {} as Record<string, number>
      )

      const sourceIndex = columnIndexMap[source.droppableId]
      const destIndex = columnIndexMap[destination.droppableId]

      if (sourceIndex === undefined || destIndex === undefined) return

      const [movedTicket] = state.ticketColumns[sourceIndex].tickets.splice(source.index, 1)
      state.ticketColumns[destIndex].tickets.splice(destination.index, 0, movedTicket)
    }
  }
})

export default boardSlice.reducer

export const { addNewTicket, updateTicket, removeTicket, dragTicket, setFilterString } = boardSlice.actions
