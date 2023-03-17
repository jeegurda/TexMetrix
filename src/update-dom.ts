import { dom } from './dom'
import { Metrix } from './types'

const updateCanvasRes = (M: Metrix) => {
  dom.canvasSizeValue.innerHTML =
    M.props.rw.toFixed(1) + 'x' + M.props.rh.toFixed(1)
  dom.renderPixelValue.innerHTML =
    (M.props.rw * M.props.rr).toFixed(1) +
    'x' +
    (M.props.rh * M.props.rr).toFixed(1)
}

const updateTextInputStyle = (M: Metrix) => {
  dom.textInput.style.fontFamily = M.font.ff
  dom.textInput.style.fontStyle = M.font.fs
  dom.textInput.style.fontWeight = M.font.fw
}

const updateDom = (M: Metrix) => {
  dom.textInput.value = M.text
  updateTextInputStyle(M)
  dom.ffInput.value = String(M.font.ff)
  dom.fontSizeInput.value = String(M.font.size)
  dom.lhInput.value = String(M.font.lh)
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

export { updateDom, updateCanvasRes, updateTextInputStyle }
