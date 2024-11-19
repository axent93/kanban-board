import { configureStore } from '@reduxjs/toolkit'

import { loadState, saveState } from './localStorage'
import boardReducer from './reducers/boardSlice'

const persistedState = loadState()

export const store = configureStore({
  reducer: {
    board: boardReducer
  },
  // setting preloaded state from localstorage snapshot
  preloadedState: persistedState
})

/**
 * store subscriber to localstorage
 */
store.subscribe((): void => {
  const { board } = store.getState()
  saveState<RootState>({ board })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
