import { DraggableStateSnapshot } from '@hello-pangea/dnd'

import { TTicketListProps } from '@/components/List/List.types'

export const dummyStore = {
  board: {
    searchString: 'test',
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
}

export const dummyTicket = {
  id: '1',
  title: 'Test Ticket'
}

export const dummySnapshot: DraggableStateSnapshot = {
  isDragging: false,
  draggingOver: null,
  combineWith: null,
  combineTargetFor: null,
  mode: 'FLUID',
  isDropAnimating: false,
  isClone: false,
  dropAnimation: null
}

export const dummyList: TTicketListProps = {
  id: '1',
  tickets: [{ id: '1', title: 'Ticket' }],
  name: 'Test List',
  className: '',
  placeholderNode: <div>Placeholder</div>,
  snapshot: { isDraggingOver: false, draggingOverWith: null, draggingFromThisWith: null, isUsingPlaceholder: false },
  'data-rfd-droppable-context-id': '123',
  'data-rfd-droppable-id': '123'
}
