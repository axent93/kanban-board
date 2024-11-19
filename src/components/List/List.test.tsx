/* eslint-disable import/no-named-as-default */
import '../../__mocks__/dndMock' // Adjust the import path based on your folder structure

import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import { dummyList, dummyStore } from '../../__mocks__/dataMock'
import List from './List'

jest.mock('../Ticket/Ticket', () => ({ __esModule: true, default: () => <div>Mocked Ticket</div> }))
jest.mock('../TicketForm/TicketForm', () => ({ __esModule: true, default: () => <div>Mocked TicketForm</div> }))

const mockStore = configureStore([])

describe('List component', () => {
  let store: ReturnType<typeof mockStore>

  beforeEach(() => {
    store = mockStore(dummyStore)
  })

  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <List
          ref={jest.fn()}
          {...dummyList}
        />
      </Provider>
    )

    expect(screen.getByText('Test List')).toBeInTheDocument()
    expect(screen.getByText(/(1)/)).toBeInTheDocument()
    expect(screen.getByText('Placeholder')).toBeInTheDocument()
    expect(screen.getByText('Mocked Ticket')).toBeInTheDocument()
  })

  it('toggles the ticket form visibility when the button is clicked', () => {
    const { getByText } = render(
      <Provider store={store}>
        <List {...dummyList} />
      </Provider>
    )
    const button = getByText('+')
    fireEvent.click(button)
    expect(getByText('Mocked TicketForm')).toBeInTheDocument()
  })

  it('applies the active class when isDraggingOver is true', () => {
    const { container } = render(
      <Provider store={store}>
        <List
          {...dummyList}
          snapshot={{ isDraggingOver: true, draggingOverWith: null, draggingFromThisWith: null, isUsingPlaceholder: false }}
        />
      </Provider>
    )
    expect(container.querySelector('.tickets-column__list')).toHaveClass('active')
  })
})
