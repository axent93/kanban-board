import './List.scss'

import React, { forwardRef, useCallback, useState } from 'react'

import { useAppDispatch } from '../../hooks/useAppStore'
import { removeTicket } from '../../store/reducers/boardSlice'
import DraggableTicket from '../DragableTicket/DragableTicket'
import { TTicketCard } from '../Ticket/Ticket.types'
import TicketForm from '../TicketForm/TicketForm'
import { TTicketListProps } from './List.types'

const List = forwardRef<HTMLElement, TTicketListProps>((props, ref) => {
  const { id: columnId, tickets, name, className = '', placeholderNode, snapshot, ...droppableProps } = props
  const [isVisibleForm, setIsVisibleForm] = useState<boolean>(false)
  const [selectedTicket, setSelectedTicket] = useState<string>('')
  const dispatch = useAppDispatch()

  /**
   * Handles ticket double click event for editing
   * @param event - React.MouseEvent<HTMLElement>
   * @param id - string
   */
  const handleDoubleClickEvent = (event: React.MouseEvent<HTMLElement>, id: string) => {
    event.preventDefault()
    setSelectedTicket(id)
  }

  /**
   * Handles ticket deleting
   * @param event - React.MouseEvent<HTMLButtonElement>
   * @param id - string
   */
  const handleDeleteTicket = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
    event.preventDefault()
    dispatch(removeTicket({ ticketId: id, columnId }))
  }

  /**
   * Renders ticket or ticket form based on selected ticket state
   * @param ticket - TTicketCard
   * @param index - number
   * @returns JSX.Element
   */
  const renderTicket = useCallback(
    (ticket: TTicketCard, index: number) => {
      return selectedTicket === ticket.id ? (
        <TicketForm
          key={`form-${ticket.id}`}
          columnId={columnId}
          selectedTicket={selectedTicket}
          setSelectedTicket={setSelectedTicket}
          setIsVisibleForm={setIsVisibleForm}
          value={ticket.title}
        />
      ) : (
        <DraggableTicket
          key={ticket.id}
          ticket={ticket}
          index={index}
          handleDoubleClickEvent={handleDoubleClickEvent}
          handleDeleteTicket={handleDeleteTicket}
        />
      )
    },
    [selectedTicket, columnId, setSelectedTicket, setIsVisibleForm, handleDoubleClickEvent, handleDeleteTicket]
  )

  return (
    <li className={`tickets-column ${className}`}>
      <section className='tickets-column__heading'>
        <h3>{name}</h3>
        <p>
          <strong>({tickets.length})</strong>
        </p>
        <button
          onClick={() => setIsVisibleForm(true)}
          className='tickets-column__heading--button'
        >
          +
        </button>
      </section>
      <section
        ref={ref}
        {...droppableProps}
        className={`tickets-column__list${snapshot.isDraggingOver ? ' active' : ''}`}
      >
        {isVisibleForm && (
          <TicketForm
            columnId={columnId}
            setIsVisibleForm={setIsVisibleForm}
          />
        )}
        {tickets.map(renderTicket)}
        {placeholderNode}
      </section>
    </li>
  )
})

List.displayName = 'List'

export default List
