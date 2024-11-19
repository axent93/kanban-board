import { useEffect } from 'react'

/**
 * Debounce hook that will watch over your dependency list and call callback function every {delay} ms
 *
 * @param callback Callback function with the debounced value as the argument
 * @param delay Delay time in milliseconds
 * @param dependencies The dependency value to debounce
 */
const useDebounce = <T>(callback: (values: T[]) => void, delay: number, dependencies: T[]) => {
  useEffect(() => {
    const handler = setTimeout(() => {
      callback(dependencies)
    }, delay)

    // Cleanup timeout if dependency changes or on unmount
    return () => {
      clearTimeout(handler)
    }
  }, [...dependencies, delay, callback])
}

export default useDebounce
