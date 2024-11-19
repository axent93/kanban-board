import { DropResult } from '@hello-pangea/dnd'
import { configureStore } from '@reduxjs/toolkit'

import { TTicketCard } from '@/components/Ticket/Ticket.types'

import boardReducer, { addNewTicket, dragTicket, removeTicket, setFilterString, updateTicket } from './boardSlice'

describe('boardSlice', () => {
  const initialState = {
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

  const store = configureStore({
    reducer: {
      board: boardReducer
    }
  })

  it('should handle initial state', () => {
    expect(store.getState().board).toEqual(initialState)
  })

  it('should handle setFilterString', () => {
    store.dispatch(setFilterString('test'))
    expect(store.getState().board.searchString).toEqual('test')
  })

  it('should handle addNewTicket', () => {
    const newTicket: TTicketCard = { id: '1', title: 'Test Ticket' }
    store.dispatch(addNewTicket({ ticket: newTicket, columnId: 'to-do' }))
    expect(store.getState().board.ticketColumns[0].tickets).toContainEqual(newTicket)
  })

  it('should handle updateTicket', () => {
    const newTicket: TTicketCard = { id: '1', title: 'Test Ticket 2' }
    store.dispatch(updateTicket({ ticketId: '1', columnId: 'to-do', value: 'Test Ticket 2' }))
    expect(store.getState().board.ticketColumns[0].tickets).toContainEqual(newTicket)
  })

  it('should handle removeTicket', () => {
    const newTicket: TTicketCard = { id: '1', title: 'Test Ticket' }
    store.dispatch(removeTicket({ ticketId: '1', columnId: 'to-do' }))
    expect(store.getState().board.ticketColumns[0].tickets).not.toContain(newTicket)
  })

  it('should handle dragTicket', () => {
    const newTicket: TTicketCard = { id: '2', title: 'Test Ticket' }
    store.dispatch(addNewTicket({ ticket: newTicket, columnId: 'to-do' }))

    const dropResult: DropResult<string> = {
      destination: { droppableId: 'in-progress', index: 0 },
      source: { droppableId: 'to-do', index: 0 },
      draggableId: '1',
      type: 'DEFAULT',
      reason: 'DROP',
      combine: null,
      mode: 'FLUID'
    }

    store.dispatch(dragTicket({ result: dropResult }))
    const state = store.getState().board
    expect(state.ticketColumns.find(column => column.id === 'to-do')?.tickets).not.toContainEqual(newTicket)
    expect(state.ticketColumns.find(column => column.id === 'in-progress')?.tickets).toContainEqual(newTicket)
  })
})
