import { builtinFontData } from './common'
import { dom } from './dom'
import { draw, init } from './draw'
import { Align, Baseline, FontData, IMetrix } from './types'
import {
  updateCanvasRes,
  updateFf,
  updateFs,
  updateTextInputStyle,
} from './update-dom'
import { getFonts, validateEnumValue } from './utils'

const addEvents = (m: IMetrix) => {
  dom.textInput.addEventListener('input', () => {
    m.text = dom.textInput.value
    draw(m)
  })

  dom.ffInput.addEventListener('change', () => {
    m.font.ff = dom.ffInput.value
    updateFs(m, true)
    updateTextInputStyle(m)
    draw(m)
  })

  dom.fsInput.addEventListener('change', () => {
    m.font.fs = dom.fsInput.value
    updateTextInputStyle(m)
    draw(m)
  })

  dom.fsItalicInput.addEventListener('change', () => {
    m.font.fsItalic = dom.fsItalicInput.checked
    updateTextInputStyle(m)
    draw(m)
  })

  dom.fsBoldInput.addEventListener('change', () => {
    m.font.fsBold = dom.fsBoldInput.checked
    updateTextInputStyle(m)
    draw(m)
  })

  dom.localFontsButton.addEventListener('click', () => {
    const updateLocalFonts = (fd: FontData[]) => {
      m.props.shared.fm = getFonts(builtinFontData.concat(fd))
      updateFf(m)
      updateFs(m)
    }

    if (window.queryLocalFonts) {
      window
        .queryLocalFonts()
        .then((data: FontData[]) => {
          if (data.length === 0) {
            console.warn(
              'Empty array, permission denied. Enable manually in browser',
            )
          } else {
            updateLocalFonts(data)
          }
        })
        .catch((reason: Error) => {
          console.error('Local fonts query failed: %o', reason)
        })
    } else {
      console.warn('Local fonts not supported')
    }
  })

  dom.fontSizeInput.addEventListener('input', () => {
    m.font.size = Number(dom.fontSizeInput.value)
    dom.fontSizeValue.innerHTML = dom.fontSizeInput.value
    draw(m)
  })

  dom.lhInput.addEventListener('input', () => {
    m.font.lh = Number(dom.lhInput.value)
    dom.lhValue.innerHTML = dom.lhInput.value
    draw(m)
  })

  dom.alignInput.addEventListener('change', () => {
    m.font.align = validateEnumValue(dom.alignInput.value, Align)
    draw(m)
  })

  dom.baselineInput.addEventListener('change', () => {
    m.font.baseline = validateEnumValue<Baseline>(
      dom.baselineInput.value,
      Baseline,
    )
    draw(m)
  })

  dom.rrInput.addEventListener('input', () => {
    const value = dom.rrInput.value

    dom.rrValue.innerHTML = value
    m.props.rr = Number(value)
    init(m) // rescaling required
    updateCanvasRes(m)

    draw(m)
  })

  window.addEventListener('resize', () => {
    init(m)
    updateCanvasRes(m)

    draw(m)
  })

  const styleProps = ['blAlign', 'fontBb', 'actualBb'] as const

  styleProps.forEach((prop) => {
    dom.lineStyle[prop].color.addEventListener('input', () => {
      m.props.style[prop].color = dom.lineStyle[prop].color.value
      draw(m)
    })
    dom.lineStyle[prop].width.addEventListener('input', () => {
      m.props.style[prop].width = Number(dom.lineStyle[prop].width.value)
      draw(m)
    })
    dom.lineStyle[prop].display.addEventListener('input', () => {
      m.props.style[prop].display = dom.lineStyle[prop].display.checked
      draw(m)
    })
  })

  dom.canvasUi.addEventListener('contextmenu', (ev) => {
    ev.preventDefault()
  })

  let scaleLin = 0

  dom.canvasUi.addEventListener('wheel', (ev) => {
    ev.preventDefault()
    if (ev.ctrlKey) {
      scaleLin += -ev.deltaY / 100

      const scaleExp = Math.pow(1.4, scaleLin)

      m.props.scaleMp = scaleExp

      dom.zoomValue.innerHTML = m.props.scaleMp.toFixed(2)

      const xBefore = m.props.rw * (ev.offsetX / m.props.shared.cw)
      const yBefore = m.props.rh * (ev.offsetY / m.props.shared.ch)

      init(m)

      const xAfter = m.props.rw * (ev.offsetX / m.props.shared.cw)
      const yAfter = m.props.rh * (ev.offsetY / m.props.shared.ch)

      m.props.drawX += xAfter - xBefore
      m.props.drawY += yAfter - yBefore
    } else {
      const dx = ev.deltaX / m.props.scaleMp
      const dy = ev.deltaY / m.props.scaleMp

      m.props.drawX -= dx
      m.props.drawY -= dy
    }
    draw(m)
  })

  let eventsAdded = false
  let downX: number
  let downY: number
  let origDrawX: number
  let origDrawY: number

  const handleUp = () => {
    dom.canvasUi.classList.remove('grabbing')
    removeMoveEvents()
  }

  const handleMove = (evt: MouseEvent) => {
    if (evt.buttons === 0) {
      // ok to happen once on button release, otherwise user input sequence was somehow broken
      // therefore remove events manually
      handleUp()
      return
    }
    evt.preventDefault()
    m.props.drawX = origDrawX + (evt.clientX - downX) / m.props.scaleMp
    m.props.drawY = origDrawY + (evt.clientY - downY) / m.props.scaleMp
    draw(m)
  }

  const addMoveEvents = () => {
    if (eventsAdded) {
      console.warn('Events already exist')
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

  dom.canvasUi.addEventListener('mousedown', (ev) => {
    ev.preventDefault()
    dom.canvasUi.classList.add('grabbing')

    downX = ev.clientX
    downY = ev.clientY
    origDrawX = m.props.drawX
    origDrawY = m.props.drawY

    addMoveEvents()
  })
}

export { addEvents }
