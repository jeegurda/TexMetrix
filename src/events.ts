import { builtinFontData } from './common'
import { dom } from './dom'
import { draw, init } from './draw'
import { setColors } from './initials'
import { addMove } from './move'
import { Align, Baseline, FontData, Fw, IMetrix } from './types'
import {
  updateCanvasRes,
  updateDom,
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

  dom.useFsInput.addEventListener('change', () => {
    m.font.useFs = dom.useFsInput.checked
    dom.fsInput.disabled = !dom.useFsInput.checked
    updateTextInputStyle(m)
    draw(m)
  })

  dom.fsInput.addEventListener('change', () => {
    m.font.fs = dom.fsInput.value
    updateTextInputStyle(m)
    draw(m)
  })

  dom.useItalicInput.addEventListener('change', () => {
    m.font.useItalic = dom.useItalicInput.checked
    updateTextInputStyle(m)
    draw(m)
  })

  dom.useWeightInput.addEventListener('change', () => {
    m.font.useWeight = dom.useWeightInput.checked
    dom.fwInput.disabled = !dom.useWeightInput.checked
    updateTextInputStyle(m)
    draw(m)
  })

  dom.fwInput.addEventListener('change', () => {
    m.font.fw = validateEnumValue<Fw>(dom.fwInput.value, Fw)
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
    m.font.align = validateEnumValue<Align>(dom.alignInput.value, Align)
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

  const blStyleProps = ['alphabeticBl', 'hangingBl', 'ideographicBl'] as const

  blStyleProps.forEach((prop) => {
    dom.lineStyle[prop].display.addEventListener('input', () => {
      m.props.style[prop].display = dom.lineStyle[prop].display.checked
      draw(m)
    })
  })

  // Overall scale (zoom) level, stored as a linear value
  let scaleLin = 0

  addMove({
    ui: dom.canvasUi,
    onDown: () => {
      dom.canvasUi.classList.add('grabbing')
    },
    onMove: (dx, dy) => {
      m.props.drawX += dx / m.props.scaleMp
      m.props.drawY += dy / m.props.scaleMp

      draw(m)
    },
    onUp: () => {
      dom.canvasUi.classList.remove('grabbing')
    },
    onWheel: (dx, dy, evt) => {
      // auto-set when pinching on os x
      if (evt.ctrlKey) {
        scaleLin += -dy / 100

        const scaleExp = Math.pow(1.4, scaleLin)

        m.props.scaleMp = scaleExp

        dom.zoomValue.innerHTML = m.props.scaleMp.toFixed(2)

        const xBefore = m.props.rw * (evt.offsetX / m.props.shared.cw)
        const yBefore = m.props.rh * (evt.offsetY / m.props.shared.ch)

        init(m)

        const xAfter = m.props.rw * (evt.offsetX / m.props.shared.cw)
        const yAfter = m.props.rh * (evt.offsetY / m.props.shared.ch)

        m.props.drawX += xAfter - xBefore
        m.props.drawY += yAfter - yBefore
      } else {
        m.props.drawX -= dx / m.props.scaleMp
        m.props.drawY -= dy / m.props.scaleMp
      }
      draw(m)
    },
  })

  const updateTheme = () => {
    setColors(m)
    updateDom(m) // update color inputs
    draw(m) // update canvas
  }

  dom.disableDarkTheme.addEventListener('change', () => {
    updateTheme()
  })

  matchMedia('(prefers-color-scheme: dark)').onchange = (ev) =>
    (ev.target as MediaQueryList).matches && updateTheme()
  matchMedia('(prefers-color-scheme: light)').onchange = (ev) =>
    (ev.target as MediaQueryList).matches && updateTheme()
}

export { addEvents }
