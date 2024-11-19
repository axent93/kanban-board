/* eslint-disable import/no-named-as-default */

import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import { TTicketList } from './components/List/List.types'
import { computedColumns } from './store/selectors/boardSelectors'

jest.mock('./store/selectors/boardSelectors')
jest.mock('./store/reducers/boardSlice')

const mockStore = configureStore([])

import App from './App'

describe('App Component', () => {
  let store: ReturnType<typeof mockStore>

  beforeEach(() => {
    store = mockStore({
      searchString: 'test',
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
    store.dispatch = jest.fn()
  })

  it('should render the App with board', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    )

    expect(screen.getByText('To Do')).toBeInTheDocument()
    expect(screen.getByText('In Progress')).toBeInTheDocument()
  })

  it('should render the App with search', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    )

    expect(screen.getByPlaceholderText('Search for tickets...')).toBeInTheDocument()
  })
})
