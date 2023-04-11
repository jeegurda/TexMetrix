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

const updateDom = (M: IMetrix) => {
  dom.textInput.value = M.text
  updateTextInputStyle(M)
  updateFf(M)
  updateFs(M)
  dom.useFsInput.checked = M.font.useFs
  dom.fsInput.disabled = !dom.useFsInput.checked
  dom.useItalicInput.checked = M.font.useItalic
  dom.useWeightInput.checked = M.font.useWeight
  dom.fwInput.value = M.font.fw
  dom.fwInput.disabled = !dom.useWeightInput.checked

  dom.fontSizeInput.value = String(M.font.size)
  dom.fontSizeValue.innerHTML = String(M.font.size)
  dom.lhInput.value = String(M.font.lh)
  dom.lhValue.innerHTML = String(M.font.lh)
  dom.alignInput.value = M.font.align
  dom.baselineInput.value = M.font.baseline

  dom.rrValue.innerHTML = String(M.props.rr)
  dom.dprValue.innerHTML = String(window.devicePixelRatio)
  dom.rrInput.value = String(M.props.rr)
  updateCanvasRes(M)
  dom.zoomValue.innerHTML = String(M.props.scaleMp)

  dom.lineStyle.blAlign.color.value = M.props.style.blAlign.color
  dom.lineStyle.blAlign.width.value = String(M.props.style.blAlign.width)
  dom.lineStyle.blAlign.display.checked = M.props.style.blAlign.display
  dom.lineStyle.fontBb.color.value = M.props.style.fontBb.color
  dom.lineStyle.fontBb.width.value = String(M.props.style.fontBb.width)
  dom.lineStyle.fontBb.display.checked = M.props.style.fontBb.display
  dom.lineStyle.actualBb.color.value = M.props.style.actualBb.color
  dom.lineStyle.actualBb.width.value = String(M.props.style.actualBb.width)
  dom.lineStyle.actualBb.display.checked = M.props.style.actualBb.display
}

export { updateDom, updateCanvasRes, updateTextInputStyle, updateFf, updateFs }
