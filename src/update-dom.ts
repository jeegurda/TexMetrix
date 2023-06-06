import { dom } from './dom'
import { IFont, IMetrix } from './types'
import { te } from './utils'

const getOptsFromArr = (arr: IFont[] | string[]): HTMLOptionElement[] => {
  return arr.map((item) => {
    const opt = document.createElement('option')
    if (typeof item === 'string') {
      opt.value = item
      opt.innerHTML = item
    } else {
      opt.value = item.postscriptName
      opt.innerHTML = item.style
      opt.title = item.fullName
    }
    return opt
  })
}

const updateCanvasRes = (m: IMetrix) => {
  dom.canvasSizeValue.innerHTML =
    m.props.rw.toFixed(1) + 'x' + m.props.rh.toFixed(1)
  dom.renderPixelValue.innerHTML =
    (m.props.rw * m.props.rr).toFixed(1) +
    'x' +
    (m.props.rh * m.props.rr).toFixed(1)
}

const updateTextInputStyle = (m: IMetrix) => {
  dom.textInput.style.fontFamily = m.font.useFs ? m.font.fs : m.font.ff
  dom.textInput.style.fontStyle = m.font.useItalic ? 'italic' : 'normal'
  dom.textInput.style.fontWeight = m.font.useWeight ? m.font.fw : ''
}

const updateFf = (m: IMetrix) => {
  dom.ffInput.innerHTML = ''
  dom.ffInput.append(...getOptsFromArr(Object.keys(m.props.shared.fm)))
  dom.ffInput.value = m.font.ff
}

const updateFs = (m: IMetrix, reset: boolean = false) => {
  const record =
    m.props.shared.fm[m.font.ff] ?? te('Selected font-family is not in fontmap')

  dom.fsInput.innerHTML = ''
  dom.fsInput.append(...getOptsFromArr(record))

  if (reset) {
    m.font.fs = record[0].postscriptName
  }

  const availableValues = record.map(({ postscriptName }) => postscriptName)
  if (!availableValues.includes(m.font.fs)) {
    console.warn(
      '%o is not in available styles list. Who tf set that?',
      m.font.fs,
    )
  }

  dom.fsInput.value = m.font.fs
}

const updateDom = (m: IMetrix) => {
  dom.textInput.value = m.text
  updateTextInputStyle(m)
  updateFf(m)
  updateFs(m)
  dom.useFsInput.checked = m.font.useFs
  dom.fsInput.disabled = !dom.useFsInput.checked
  dom.useItalicInput.checked = m.font.useItalic
  dom.useWeightInput.checked = m.font.useWeight
  dom.fwInput.value = m.font.fw
  dom.fwInput.disabled = !dom.useWeightInput.checked

  dom.fontSizeInput.value = String(m.font.size)
  dom.fontSizeValue.innerHTML = String(m.font.size)
  dom.lhInput.value = String(m.font.lh)
  dom.lhValue.innerHTML = String(m.font.lh)
  dom.alignInput.value = m.font.align
  dom.baselineInput.value = m.font.baseline

  dom.rrValue.innerHTML = String(m.props.rr)
  dom.dprValue.innerHTML = String(window.devicePixelRatio)
  dom.rrInput.value = String(m.props.rr)
  updateCanvasRes(m)
  dom.zoomValue.innerHTML = String(m.props.scaleMp)

  dom.lineStyle.blAlign.color.value = m.props.style.blAlign.color
  dom.lineStyle.blAlign.width.value = String(m.props.style.blAlign.width)
  dom.lineStyle.blAlign.display.checked = m.props.style.blAlign.display
  dom.lineStyle.fontBb.color.value = m.props.style.fontBb.color
  dom.lineStyle.fontBb.width.value = String(m.props.style.fontBb.width)
  dom.lineStyle.fontBb.display.checked = m.props.style.fontBb.display
  dom.lineStyle.actualBb.color.value = m.props.style.actualBb.color
  dom.lineStyle.actualBb.width.value = String(m.props.style.actualBb.width)
  dom.lineStyle.actualBb.display.checked = m.props.style.actualBb.display

  dom.lineStyle.alphabeticBl.display.disabled = !(
    'alphabeticBaseline' in TextMetrics.prototype
  )
  dom.lineStyle.hangingBl.display.disabled = !(
    'hangingBaseline' in TextMetrics.prototype
  )
  dom.lineStyle.ideographicBl.display.disabled = !(
    'ideographicBaseline' in TextMetrics.prototype
  )

  dom.lineStyle.alphabeticBl.display.checked =
    m.props.style.alphabeticBl.display
  dom.lineStyle.ideographicBl.display.checked =
    m.props.style.ideographicBl.display
  dom.lineStyle.hangingBl.display.checked = m.props.style.hangingBl.display
}

export { updateDom, updateCanvasRes, updateTextInputStyle, updateFf, updateFs }
