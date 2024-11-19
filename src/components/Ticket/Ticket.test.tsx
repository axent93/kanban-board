import { render } from '@testing-library/react'

import { dummySnapshot } from '../../__mocks__/dataMock'
import Ticket from './Ticket'

describe('Ticket Component', () => {
  const defaultProps = {
    title: 'Test Ticket',
    id: 'ticket-1',
    handleDoubleClickEvent: jest.fn(),
    handleDeleteTicket: jest.fn()
  }

  it('renders without crashing', () => {
    const { getByText } = render(
      <Ticket
        snapshot={dummySnapshot}
        {...defaultProps}
      />
    )
    expect(getByText('Test Ticket')).toBeInTheDocument()
  })

  it('applies the correct class when dragging over "to-do"', () => {
    const draggingSnapshot = { ...dummySnapshot, draggingOver: 'to-do' }
    const { container } = render(
      <Ticket
        {...defaultProps}
        snapshot={draggingSnapshot}
      />
    )
    expect(container.firstChild).toHaveClass('to-do-color')
  })

  it('applies the correct class when dragging over "in-progress"', () => {
    const draggingSnapshot = { ...dummySnapshot, draggingOver: 'in-progress' }
    const { container } = render(
      <Ticket
        {...defaultProps}
        snapshot={draggingSnapshot}
      />
    )
    expect(container.firstChild).toHaveClass('in-progress-color')
  })

  it('applies the correct class when dragging over "done"', () => {
    const draggingSnapshot = { ...dummySnapshot, draggingOver: 'done' }
    const { container } = render(
      <Ticket
        {...defaultProps}
        snapshot={draggingSnapshot}
      />
    )
    expect(container.firstChild).toHaveClass('done-color')
  })

  it('applies the default class when not dragging over any column', () => {
    const { container } = render(
      <Ticket
        {...defaultProps}
        snapshot={dummySnapshot}
      />
    )
    expect(container.firstChild).toHaveClass('ticket-card')
  })
})
