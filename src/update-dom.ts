import { builtinFontData } from './common'
import { dom } from './dom'
import { FontRecord, Metrix } from './types'
import { getFonts, te } from './utils'

const getOptsFromArr = (arr: FontRecord[] | string[]): HTMLOptionElement[] => {
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

const updateCanvasRes = (M: Metrix) => {
  dom.canvasSizeValue.innerHTML =
    M.props.rw.toFixed(1) + 'x' + M.props.rh.toFixed(1)
  dom.renderPixelValue.innerHTML =
    (M.props.rw * M.props.rr).toFixed(1) +
    'x' +
    (M.props.rh * M.props.rr).toFixed(1)
}

const updateTextInputStyle = (M: Metrix) => {
  dom.textInput.style.fontFamily = M.font.fs
  dom.textInput.style.fontStyle = M.font.fsItalic ? 'italic' : 'normal'
  dom.textInput.style.fontWeight = M.font.fsBold ? 'bold' : 'normal'
}

const updateFf = (M: Metrix) => {
  dom.ffInput.innerHTML = ''
  dom.ffInput.append(...getOptsFromArr(Object.keys(M.props.shared.fm)))
  dom.ffInput.value = M.font.ff
}

const updateFs = (M: Metrix, reset: boolean = false) => {
  const record =
    M.props.shared.fm[M.font.ff] ?? te('Selected font-family is not in fontmap')

  dom.fsInput.innerHTML = ''
  dom.fsInput.append(...getOptsFromArr(record))

  if (reset) {
    M.font.fs = record[0].postscriptName
  }

  const availableValues = record.map(({ postscriptName }) => postscriptName)
  if (!availableValues.includes(M.font.fs)) {
    console.warn(
      '%o is not in available styles list. Who tf set that?',
      M.font.fs,
    )
  }

  dom.fsInput.value = M.font.fs
}

const updateDom = (M: Metrix) => {
  dom.textInput.value = M.text
  updateTextInputStyle(M)
  updateFf(M)
  updateFs(M)
  dom.fsBoldInput.checked = M.font.fsBold
  dom.fsItalicInput.checked = M.font.fsItalic

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
