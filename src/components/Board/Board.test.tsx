/* eslint-disable import/no-named-as-default */
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import { computedColumns } from '../../store/selectors/boardSelectors'
import { TTicketList } from '../List/List.types'
import Board from './Board'

jest.mock('../../store/selectors/boardSelectors')
jest.mock('../../store/reducers/boardSlice')

const mockStore = configureStore([])

describe('Board Component', () => {
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
    ;(computedColumns as jest.MockedFunction<typeof computedColumns>).mockReturnValue(
      (store.getState() as { board: { columns: TTicketList[] } }).board.columns
    )
  })

  it('should render the board with columns', () => {
    render(
      <Provider store={store}>
        <Board />
      </Provider>
    )

    expect(screen.getByText('To Do')).toBeInTheDocument()
    expect(screen.getByText('In Progress')).toBeInTheDocument()
  })
})
