import { DraggableProvided, DraggableStateSnapshot } from '@hello-pangea/dnd'
import { render } from '@testing-library/react'

import DraggableTicket from './DragableTicket'
import { TDraggableTicketProps } from './DragableTicket.types'

jest.mock('@hello-pangea/dnd', () => ({
  Draggable: ({ children }: { children: (provided: DraggableProvided, snapshot: DraggableStateSnapshot) => React.ReactNode }) =>
    children(
      {
        innerRef: jest.fn(),
        draggableProps: {
          'data-rfd-draggable-context-id': '1',
          'data-rfd-draggable-id': '1'
        },
        dragHandleProps: {
          'data-rfd-drag-handle-draggable-id': '1',
          'data-rfd-drag-handle-context-id': '1',
          role: 'button',
          'aria-describedby': 'drag-handle-1',
          tabIndex: 0,
          draggable: true,
          onDragStart: jest.fn()
        }
      },
      {
        isDragging: false,
        isDropAnimating: false,
        isClone: false,
        dropAnimation: null,
        draggingOver: null,
        combineWith: null,
        combineTargetFor: null,
        mode: null
      }
    )
}))

const mockTicket = {
  id: '1',
  title: 'Test Ticket'
}

const defaultProps: TDraggableTicketProps = {
  ticket: mockTicket,
  index: 0,
  handleDoubleClickEvent: jest.fn(),
  handleDeleteTicket: jest.fn()
}

describe('DraggableTicket', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<DraggableTicket {...defaultProps} />)
    expect(getByText('Test Ticket')).toBeInTheDocument()
  })

  it('calls handleDoubleClickEvent on double click', () => {
    const { getByText } = render(<DraggableTicket {...defaultProps} />)
    const ticketElement = getByText('Test Ticket')
    ticketElement.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }))
    expect(defaultProps.handleDoubleClickEvent).toHaveBeenCalled()
  })
})
