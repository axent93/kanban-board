/* eslint-disable import/no-named-as-default */

import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import { dummyStore } from '../../__mocks__/dataMock'
import { addNewTicket } from '../../store/reducers/boardSlice'
import TicketForm from './TicketForm'

const mockStore = configureStore([])

describe('TicketForm', () => {
  let store: ReturnType<typeof mockStore>
  let setIsVisibleForm: jest.Mock

  beforeEach(() => {
    store = mockStore(dummyStore)
    store.dispatch = jest.fn()
    setIsVisibleForm = jest.fn()
  })

  it('renders TicketForm component', () => {
    render(
      <Provider store={store}>
        <TicketForm
          setIsVisibleForm={setIsVisibleForm}
          columnId='column-1'
        />
      </Provider>
    )

    expect(screen.getByPlaceholderText('Add new ticket')).toBeInTheDocument()
    expect(screen.getByText('Create')).toBeInTheDocument()
    expect(screen.getByText('Cancel')).toBeInTheDocument()
  })

  it('handles ticket title change', () => {
    render(
      <Provider store={store}>
        <TicketForm
          setIsVisibleForm={setIsVisibleForm}
          columnId='column-1'
        />
      </Provider>
    )

    const input = screen.getByPlaceholderText('Add new ticket')
    fireEvent.change(input, { target: { value: 'New Ticket' } })
    expect(input).toHaveValue('New Ticket')
  })

  it('dispatches addNewTicket action on form submit', () => {
    render(
      <Provider store={store}>
        <TicketForm
          setIsVisibleForm={setIsVisibleForm}
          columnId='column-1'
        />
      </Provider>
    )

    const input = screen.getByPlaceholderText('Add new ticket')
    fireEvent.change(input, { target: { value: 'New Ticket' } })

    const createButton = screen.getByText('Create')
    fireEvent.click(createButton)

    expect(store.dispatch).toHaveBeenCalledWith(
      addNewTicket({
        ticket: expect.objectContaining({ title: 'New Ticket' }),
        columnId: 'column-1'
      })
    )
    expect(setIsVisibleForm).toHaveBeenCalledWith(false)
  })

  it('does not dispatch addNewTicket action if title is empty', () => {
    render(
      <Provider store={store}>
        <TicketForm
          setIsVisibleForm={setIsVisibleForm}
          columnId='column-1'
        />
      </Provider>
    )

    expect(screen.getByText('Create')).toBeInTheDocument()
  })

  it('calls handleTicketFormToggle on cancel button click', () => {
    render(
      <Provider store={store}>
        <TicketForm
          setIsVisibleForm={setIsVisibleForm}
          columnId='column-1'
        />
      </Provider>
    )
    expect(screen.getByText('Cancel')).toBeInTheDocument()
  })
})
