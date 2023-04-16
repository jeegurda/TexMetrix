const addMove = ({
  ui,
  onDown,
  onMove,
  onUp,
  onWheel,
}: {
  /** Attaches down listener to this element */
  ui: HTMLElement
  onDown: () => void
  /** Provides clientX/clientY based delta relative to the latest move (NOT relative to the down origin) */
  onMove: (dx: number, dy: number) => void
  onUp: () => void
  onWheel: (dx: number, dy: number, ev: MouseEvent) => void
}) => {
  let eventsAdded = false
  let lastX: number
  let lastY: number

  const handleUp = () => {
    removeMoveEvents()
    onUp()
  }

  const handleMove = (evt: MouseEvent) => {
    if (evt.buttons === 0) {
      // ok to happen once on button release, otherwise user input sequence was somehow broken
      // therefore remove events manually
      handleUp()
      return
    }
    evt.preventDefault()
    const dx = evt.clientX - lastX
    const dy = evt.clientY - lastY

    onMove(dx, dy)

    lastX = evt.clientX
    lastY = evt.clientY
  }

  const addMoveEvents = () => {
    if (eventsAdded) {
      console.warn('Events are already added')
      return
    }
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', handleUp)
    eventsAdded = true
  }

  const removeMoveEvents = () => {
    window.removeEventListener('mousemove', handleMove)
    window.removeEventListener('mouseup', handleUp)
    eventsAdded = false
  }

  ui.addEventListener('mousedown', (evt) => {
    evt.preventDefault()

    lastX = evt.clientX
    lastY = evt.clientY

    addMoveEvents()
    onDown()
  })

  ui.addEventListener('contextmenu', (evt) => {
    evt.preventDefault()
  })

  ui.addEventListener('wheel', (evt) => {
    evt.preventDefault()

    onWheel(evt.deltaX, evt.deltaY, evt)
  })
}

export { addMove }
