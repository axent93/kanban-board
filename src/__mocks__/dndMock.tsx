import { DraggableProps } from '@hello-pangea/dnd'

jest.mock('@hello-pangea/dnd', () => {
  const originalModule = jest.requireActual('@hello-pangea/dnd')
  return {
    ...originalModule,
    Draggable: ({ children, ref }: DraggableProps & { ref: (element?: HTMLElement | null) => void }) => {
      return children(
        {
          draggableProps: {
            'data-rfd-draggable-context-id': '1',
            'data-rfd-draggable-id': '1'
          },
          dragHandleProps: {
            'data-rfd-drag-handle-draggable-id': '1',
            'data-rfd-drag-handle-context-id': '1',
            role: 'button',
            'aria-describedby': 'rfd-drag-handle-1',
            tabIndex: 0,
            draggable: true,
            onDragStart: jest.fn()
          },
          innerRef: ref
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
    }
  }
})

export {}
