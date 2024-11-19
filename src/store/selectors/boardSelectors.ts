import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../index'

const selectBoard = (state: RootState) => state.board

/**
 * Memoized selector for filtered tickets
 */
export const computedColumns = createSelector([selectBoard], ({ searchString, ticketColumns }) => {
  if (!searchString) {
    // If no filter is applied, return the full array of tickets
    return ticketColumns
  }

  const lowerCaseSearchString = searchString.toLowerCase()

  // Filter items based on the search string (case-insensitive)
  return ticketColumns.map(column => {
    return {
      ...column,
      tickets: column.tickets.filter(ticket => ticket.title.toLowerCase().includes(lowerCaseSearchString))
    }
  })
})
