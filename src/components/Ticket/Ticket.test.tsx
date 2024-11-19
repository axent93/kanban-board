import { DraggableStateSnapshot } from '@hello-pangea/dnd'
import { render } from '@testing-library/react'

import Ticket from './Ticket'

describe('Ticket Component', () => {
  const snapshot: DraggableStateSnapshot = {
    isDragging: false,
    draggingOver: null,
    combineWith: null,
    combineTargetFor: null,
    mode: 'FLUID',
    isDropAnimating: false,
    isClone: false,
    dropAnimation: null
  }

  const defaultProps = {
    title: 'Test Ticket',
    id: 'ticket-1',
    handleDoubleClickEvent: jest.fn(),
    handleDeleteTicket: jest.fn()
  }

  it('renders without crashing', () => {
    const { getByText } = render(
      <Ticket
        snapshot={snapshot}
        {...defaultProps}
      />
    )
    expect(getByText('Test Ticket')).toBeInTheDocument()
  })

  it('applies the correct class when dragging over "to-do"', () => {
    const draggingSnapshot = { ...snapshot, draggingOver: 'to-do' }
    const { container } = render(
      <Ticket
        {...defaultProps}
        snapshot={draggingSnapshot}
      />
    )
    expect(container.firstChild).toHaveClass('to-do-color')
  })

  it('applies the correct class when dragging over "in-progress"', () => {
    const draggingSnapshot = { ...snapshot, draggingOver: 'in-progress' }
    const { container } = render(
      <Ticket
        {...defaultProps}
        snapshot={draggingSnapshot}
      />
    )
    expect(container.firstChild).toHaveClass('in-progress-color')
  })

  it('applies the correct class when dragging over "done"', () => {
    const draggingSnapshot = { ...snapshot, draggingOver: 'done' }
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
        snapshot={snapshot}
      />
    )
    expect(container.firstChild).toHaveClass('ticket-card')
  })
})
