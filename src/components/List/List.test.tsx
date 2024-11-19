import { DraggableProps } from '@hello-pangea/dnd'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
// eslint-disable-next-line import/no-named-as-default
import configureStore from 'redux-mock-store'

import List from './List'
import { TTicketListProps } from './List.types'

jest.mock('@hello-pangea/dnd', () => ({
  ...jest.requireActual('@hello-pangea/dnd'),
  Draggable: ({ children }: DraggableProps) =>
    children(
      {
        draggableProps: { 'data-rfd-draggable-context-id': '1', 'data-rfd-draggable-id': '1' },
        innerRef: jest.fn(),
        dragHandleProps: {
          'data-rfd-drag-handle-draggable-id': '1',
          'data-rfd-drag-handle-context-id': '1',
          role: 'button',
          'aria-describedby': 'rfd-drag-handle-1',
          tabIndex: 0,
          draggable: true,
          onDragStart: jest.fn()
        }
      },
      {
        isDragging: false,
        draggingOver: null,
        isDropAnimating: false,
        isClone: false,
        dropAnimation: null,
        combineWith: null,
        combineTargetFor: null,
        mode: null
      },
      {
        source: { index: 0, droppableId: '1' },
        draggableId: '',
        type: ''
      }
    )
}))

jest.mock('../Ticket/Ticket', () => ({ __esModule: true, default: () => <div>Mocked Ticket</div> }))
jest.mock('../TicketForm/TicketForm', () => ({ __esModule: true, default: () => <div>Mocked TicketForm</div> }))

const mockStore = configureStore([])

describe('List component', () => {
  let store: ReturnType<typeof mockStore>

  beforeEach(() => {
    store = mockStore({
      board: {
        columns: [
          {
            id: 'column-1',
            name: 'To Do',
            tickets: [],
            className: 'todo-column'
          },
          {
            id: 'column-2',
            name: 'In Progress',
            tickets: [],
            className: 'in-progress-column'
          }
        ]
      }
    })
  })

  const defaultProps: TTicketListProps = {
    id: '1',
    tickets: [{ id: '1', title: 'Ticket' }],
    name: 'Test List',
    className: '',
    placeholderNode: <div>Placeholder</div>,
    snapshot: { isDraggingOver: false, draggingOverWith: null, draggingFromThisWith: null, isUsingPlaceholder: false },
    'data-rfd-droppable-context-id': '123',
    'data-rfd-droppable-id': '123'
  }

  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <List {...defaultProps} />
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
        <List {...defaultProps} />
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
          {...defaultProps}
          snapshot={{ isDraggingOver: true, draggingOverWith: null, draggingFromThisWith: null, isUsingPlaceholder: false }}
        />
      </Provider>
    )
    expect(container.querySelector('.tickets-column__list')).toHaveClass('active')
  })
})
