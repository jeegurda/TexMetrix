const debounce = (fn: (...args: unknown[]) => unknown, delay: number) => {
  let t: null | number = null

  return (...args: unknown[]) => {
    if (t !== null) {
      clearTimeout(t)
    }

    t = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

export { debounce }
