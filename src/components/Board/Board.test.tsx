/* eslint-disable import/no-named-as-default */
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import { dummyStore } from '../../__mocks__/dataMock'
import { computedColumns } from '../../store/selectors/boardSelectors'
import { TTicketList } from '../List/List.types'
import Board from './Board'

jest.mock('../../store/selectors/boardSelectors')
jest.mock('../../store/reducers/boardSlice')

const mockStore = configureStore([])

describe('Board Component', () => {
  let store: ReturnType<typeof mockStore>

  beforeEach(() => {
    store = mockStore(dummyStore)
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
