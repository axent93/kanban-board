import { LOCAL_STORAGE_KEY } from '../config'

/**
 * Loads a snapshot object from localStorage Redux state.
 * Returns the parsed object or undefined if not found or an error occurs.
 * @returns The parsed state or undefined
 */
export const loadState = <T = object>(): T | undefined => {
  try {
    const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (!serializedState) return undefined
    return JSON.parse(serializedState) as T
  } catch (err) {
    console.error('Error loading state from localStorage:', err)
    return undefined
  }
}

/**
 * Saves a snapshot of Redux state to localStorage.
 * @param state The redux state object to save
 */
export const saveState = <T>(state: T): void => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem(LOCAL_STORAGE_KEY, serializedState)
  } catch (err) {
    console.error('Error saving state to localStorage:', err)
  }
}
