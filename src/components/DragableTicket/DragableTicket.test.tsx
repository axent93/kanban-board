import '../../__mocks__/dndMock' // Adjust the import path based on your folder structure

import { render } from '@testing-library/react'

import { dummyTicket } from '../../__mocks__/dataMock'
import DraggableTicket from './DragableTicket'
import { TDraggableTicketProps } from './DragableTicket.types'

const defaultProps: TDraggableTicketProps = {
  ticket: dummyTicket,
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
