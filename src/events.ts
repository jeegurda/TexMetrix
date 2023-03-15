import { dom } from './dom'
import { Align, Baseline, Metrix } from './types'
import { validateSelectValue } from './utils'

const addEvents = (M: Metrix) => {
  dom.textInput.addEventListener('input', (ev) => {
    M.props.text = dom.textInput.value
    M.draw()
  })

  dom.fontSizeInput.addEventListener('input', (ev) => {
    M.props.fs = parseInt(dom.fontSizeInput.value)
    M.draw()
  })

  dom.alignInput.addEventListener('change', (ev) => {
    M.props.align = validateSelectValue<Align>(dom.alignInput.value, Align)
    M.draw()
  })

  dom.baselineInput.addEventListener('change', (ev) => {
    M.props.baseline = validateSelectValue<Baseline>(
      dom.baselineInput.value,
      Baseline,
    )
    M.draw()
  })

  dom.rrInput.addEventListener('input', (ev) => {
    const value = dom.rrInput.value

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

  let scaleLin = 0

  dom.canvasUi.addEventListener('wheel', (ev) => {
    ev.preventDefault()
    if (ev.ctrlKey) {
      scaleLin += -ev.deltaY / 100

      let scaleD = M.props.scaleMp

      const scaleExp = Math.pow(1.4, scaleLin)

      M.props.scaleMp = scaleExp

      dom.zoomValue.innerHTML = M.props.scaleMp.toFixed(2)

      scaleD -= M.props.scaleMp

      const xBefore = M.props.rw * (ev.offsetX / M.props.rest.cw)
      const yBefore = M.props.rh * (ev.offsetY / M.props.rest.ch)

      M.init()

      const xAfter = M.props.rw * (ev.offsetX / M.props.rest.cw)
      const yAfter = M.props.rh * (ev.offsetY / M.props.rest.ch)

      M.props.drawX += xAfter - xBefore
      M.props.drawY += yAfter - yBefore
    } else {
      const dx = ev.deltaX / M.props.scaleMp
      const dy = ev.deltaY / M.props.scaleMp

      M.props.drawX -= dx
      M.props.drawY -= dy
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
      M.props.drawX = origDrawX + (ev.clientX - downX) / M.props.scaleMp
      M.props.drawY = origDrawY + (ev.clientY - downY) / M.props.scaleMp
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
