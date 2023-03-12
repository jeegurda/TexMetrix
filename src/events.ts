import { dom } from './dom'
import { Align, Baseline, Metrix } from './types'
import { debounce } from './utils'

const addEvents = (M: Metrix) => {
  dom.textInput.addEventListener('input', (ev) => {
    const value = (ev.target as HTMLTextAreaElement).value

    M.props.text = value
    M.draw()
  })

  dom.fontSizeInput.addEventListener('input', (ev) => {
    const value = (ev.target as HTMLInputElement).value

    M.props.fs = parseInt(value)
    M.draw()
  })

  Array.from(dom.alignInputs).forEach((input) => {
    input.addEventListener('change', (ev) => {
      const value = (ev.target as HTMLInputElement).value as Align

      M.props.align = value
      M.draw()
    })
  })

  Array.from(dom.baselineInputs).forEach((input) => {
    input.addEventListener('change', (ev) => {
      const value = (ev.target as HTMLInputElement).value as Baseline

      M.props.baseline = value
      M.draw()
    })
  })

  dom.rrInput.addEventListener('input', (ev) => {
    const value = (ev.target as HTMLInputElement).value

    dom.rrValue.innerHTML = value
    M.props.rr = Number(value)
    M.init() // rescaling required
    dom.canvasSizeValue.innerHTML = `${M.props.rw.toFixed(
      1,
    )}x${M.props.rh.toFixed(1)}`

    M.draw()
  })

  window.addEventListener('resize', () => {
    M.init()
    dom.canvasSizeValue.innerHTML = `${M.props.rw.toFixed(
      1,
    )}x${M.props.rh.toFixed(1)}`

    M.draw()
  })

  dom.canvasUi.addEventListener('contextmenu', (ev) => {
    ev.preventDefault()
  })

  let dx = 0
  let dy = 0

  let scaleLin = 0

  dom.canvasUi.addEventListener('wheel', (ev) => {
    ev.preventDefault()
    if (ev.ctrlKey) {
      scaleLin += -ev.deltaY / 100

      M.props.scaleMp = Math.pow(1.4, scaleLin)
      dom.zoomValue.innerHTML = M.props.scaleMp.toFixed(2)

      M.init()
    } else {
      dx += ev.deltaX
      dy += ev.deltaY

      M.props.drawX -= ev.deltaX
      M.props.drawY -= ev.deltaY
    }
    M.draw()
  })

  dom.canvasUi.addEventListener('mousedown', (ev) => {
    ev.preventDefault()
    dom.canvasUi.classList.add('grabbing')

    let downX = ev.clientX
    let downY = ev.clientY
    let origDrawX = M.props.drawX
    let origDrawY = M.props.drawY

    const handleMove = (ev: MouseEvent) => {
      ev.preventDefault()
      M.props.drawX = origDrawX + ev.clientX - downX
      M.props.drawY = origDrawY + ev.clientY - downY
      M.draw()
    }

    const handleUp = (ev: MouseEvent) => {
      dom.canvasUi.classList.remove('grabbing')
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup', handleUp)
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', handleUp)
  })
}

export { addEvents }
