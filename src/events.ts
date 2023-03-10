import { dom } from './dom'

const addEvents = (Metrix: Metrix) => {
  dom.textInput.addEventListener<'input'>('input', (ev) => {
    const value = (ev.target as HTMLTextAreaElement).value
    text = value
    draw()
  })
  dom.fontSizeInput.addEventListener('input', (ev) => {
    const value = (ev.target as HTMLInputElement).value
    fs = parseInt(value)
    draw()
  })
  Array.from(dom.alignInputs).forEach((input) => {
    input.addEventListener('change', (ev) => {
      const value = (ev.target as HTMLInputElement).value as Align
      align = value
      draw()
    })
  })
  Array.from(dom.baselineInputs).forEach((input) => {
    input.addEventListener('change', (ev) => {
      const value = (ev.target as HTMLInputElement).value as Baseline
      baseline = value
      draw()
    })
  })
  dom.dprInput.addEventListener('input', (ev) => {
    const value = Number((ev.target as HTMLInputElement).value)
    dpr = value
    init() // rescaling required
    draw()
  })

  window.addEventListener('resize', () => {
    init()
    draw()
  })
}

export { addEvents }
