import { dom } from './dom'
import { Align, Baseline, Metrix } from './types'

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
    M.props.dpr = Number(value)
    M.init() // rescaling required
    dom.rrPixelValue.innerHTML = `${M.props.rw}x${M.props.rh}`

    M.draw()
  })

  window.addEventListener('resize', () => {
    M.init()
    dom.rrPixelValue.innerHTML = `${M.props.rw}x${M.props.rh}`

    M.draw()
  })
}

export { addEvents }
