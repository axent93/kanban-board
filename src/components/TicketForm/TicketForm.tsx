import './TicketForm.scss'

import { useState } from 'react'
import { v4 as uuid } from 'uuid'

import { useAppDispatch } from '../../hooks/useAppStore'
import { addNewTicket, updateTicket } from '../../store/reducers/boardSlice'
import { TTicketFormProps } from './TicketForm.types'

const TicketForm: React.FC<TTicketFormProps> = props => {
  const { setIsVisibleForm, value, selectedTicket, setSelectedTicket, columnId } = props
  const [ticketTitle, setTicketTitle] = useState<string>(value || '')
  const dispatch = useAppDispatch()

  /**
   * Handles ticket addition or update to redux state
   * After ticket is added, form is closed and input value is cleared
   *
   * @param event MouseEvent<HTMLButtonElement>
   */
  const handleTicketUpdate = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    event.preventDefault()
    if (selectedTicket) {
      dispatch(updateTicket({ ticketId: selectedTicket, columnId, value: ticketTitle }))
      if (setSelectedTicket) setSelectedTicket('')
      return
    }
    if (!ticketTitle) return
    const id = uuid()
    dispatch(addNewTicket({ ticket: { title: ticketTitle, id }, columnId }))
    setIsVisibleForm(false)
  }

  /**
   * Handles ticket title change
   * @param event React.ChangeEvent<HTMLInputElement>
   * @returns void
   */
  const handleTicketTitleChange = (event: React.ChangeEvent<HTMLInputElement>): void => setTicketTitle(event.target.value)

  /**
   * Handles form close if selectedTicket is set or if new ticket form is visible
   * @param event React.MouseEvent<HTMLButtonElement>
   * @returns void
   */
  const handleFormClose = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    event.preventDefault()
    if (selectedTicket && setSelectedTicket) setSelectedTicket('')
    else setIsVisibleForm(false)
  }

  return (
    <form
      name='ticket-form'
      className='ticket-form'
    >
      <input
        value={ticketTitle}
        required
        className='ticket-form__input'
        name='ticket-title'
        {...(!selectedTicket && { placeholder: 'Add new ticket' })}
        id='ticket-title'
        onChange={handleTicketTitleChange}
      />
      <button
        onClick={handleTicketUpdate}
        type='submit'
        disabled={!ticketTitle}
        className='ticket-form__button ticket-form__button--create'
      >
        {selectedTicket ? 'Update' : 'Create'}
      </button>
      <button
        onClick={handleFormClose}
        className='ticket-form__button ticket-form__button--cancel'
      >
        Cancel
      </button>
    </form>
  )
}

export default TicketForm
