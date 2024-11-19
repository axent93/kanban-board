import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from 'redux-mock-store'

import { setFilterString } from '../../store/reducers/boardSlice'
import Search from './Search'

const mockStore = configureStore([])

describe('Search Component', () => {
  let store: ReturnType<typeof mockStore>

  beforeEach(() => {
    store = mockStore({})
    store.dispatch = jest.fn()
  })

  test('renders search input and icon', () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    )

    const inputElement = screen.getByPlaceholderText('Search for tickets...')
    const iconElement = screen.getByRole('img')

    expect(inputElement).toBeInTheDocument()
    expect(iconElement).toBeInTheDocument()
  })

  test('focuses input when icon is clicked', () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    )

    const inputElement = screen.getByPlaceholderText('Search for tickets...')
    const iconElement = screen.getByRole('img')

    fireEvent.click(iconElement)
    expect(inputElement).toHaveFocus()
  })

  test('updates searchString state on input change', () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    )

    const inputElement = screen.getByPlaceholderText('Search for tickets...')
    fireEvent.change(inputElement, { target: { value: 'test' } })

    expect(inputElement).toHaveValue('test')
  })

  test('dispatches setFilterString action on debounced input change', () => {
    jest.useFakeTimers()
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    )

    const inputElement = screen.getByPlaceholderText('Search for tickets...')
    fireEvent.change(inputElement, { target: { value: 'test' } })

    jest.advanceTimersByTime(200)

    expect(store.dispatch).toHaveBeenCalledWith(setFilterString('test'))
  })
})
