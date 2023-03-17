import { dom } from './dom'
import { Align, Baseline, Metrix } from './types'
import { updateCanvasRes, updateTextInputStyle } from './update-dom'
import { validateSelectValue } from './utils'

const addEvents = (M: Metrix) => {
  dom.textInput.addEventListener('input', () => {
    M.text = dom.textInput.value
    M.draw()
  })

  dom.ffInput.addEventListener('change', () => {
    M.font.ff = dom.ffInput.value
    updateTextInputStyle(M)
    M.draw()
  })

  dom.fontSizeInput.addEventListener('input', () => {
    M.font.size = Number(dom.fontSizeInput.value)
    M.draw()
  })

  dom.lhInput.addEventListener('input', () => {
    M.font.lh = Number(dom.lhInput.value)
    M.draw()
  })

  dom.alignInput.addEventListener('change', () => {
    M.font.align = validateSelectValue<Align>(dom.alignInput.value, Align)
    M.draw()
  })

  dom.baselineInput.addEventListener('change', () => {
    M.font.baseline = validateSelectValue<Baseline>(
      dom.baselineInput.value,
      Baseline,
    )
    M.draw()
  })

  dom.rrInput.addEventListener('input', () => {
    const value = dom.rrInput.value

    dom.rrValue.innerHTML = value
    M.props.rr = Number(value)
    M.init() // rescaling required
    updateCanvasRes(M)

    M.draw()
  })

  window.addEventListener('resize', () => {
    M.init()
    updateCanvasRes(M)

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

      const xBefore = M.props.rw * (ev.offsetX / M.props.shared.cw)
      const yBefore = M.props.rh * (ev.offsetY / M.props.shared.ch)

      M.init()

      const xAfter = M.props.rw * (ev.offsetX / M.props.shared.cw)
      const yAfter = M.props.rh * (ev.offsetY / M.props.shared.ch)

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

    const handleUp = () => {
      dom.canvasUi.classList.remove('grabbing')
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup', handleUp)
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', handleUp)
  })

  const styleProps = ['blAlign', 'fontBb', 'actualBb'] as const

  styleProps.forEach((prop) => {
    dom.lineStyle[prop].color.addEventListener('input', () => {
      M.props.style[prop].color = dom.lineStyle[prop].color.value
      M.draw()
    })
    dom.lineStyle[prop].width.addEventListener('input', () => {
      M.props.style[prop].width = Number(dom.lineStyle[prop].width.value)
      M.draw()
    })
    dom.lineStyle[prop].display.addEventListener('input', () => {
      M.props.style[prop].display = dom.lineStyle[prop].display.checked
      M.draw()
    })
  })
}

export { addEvents }
