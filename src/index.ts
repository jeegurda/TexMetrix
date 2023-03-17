import { checkTMInterface } from './support'
import { Align, Baseline, Metrix } from './types'
import { dom } from './dom'
import './style.css'
import { addEvents } from './events'
import { te } from './utils'

const ff = 'serif' // TODO: move to input

const ctx = dom.canvas.getContext('2d') ?? te('ctx died')

const M: Metrix = {
  props: {
    rw: 0,
    rh: 0,

    drawX: 100,
    drawY: dom.canvas.clientHeight - 100,

    scaleMp: 1,

    text: 'my honest reaction 😅👌🏽',
    fs: 60,
    align: Align.START,
    baseline: Baseline.ALPHABETIC,
    rr: window.devicePixelRatio,
    lines: {
      blAlign: { color: '#c800c8', width: 0.5 },
      fontBb: { color: '#f00000', width: 0.5 },
      actualBb: { color: '#000000', width: 0.5 },
    },

    rest: {},
  },
  draw: () => {},
  init: () => {},
}

const init = () => {
  const cw = ctx.canvas.clientWidth
  const ch = ctx.canvas.clientHeight

  M.props.rw = cw / M.props.scaleMp
  M.props.rh = ch / M.props.scaleMp

  ctx.canvas.width = cw * M.props.rr
  ctx.canvas.height = ch * M.props.rr

  ctx.scale(M.props.rr * M.props.scaleMp, M.props.rr * M.props.scaleMp)

  M.props.rest.cw = cw
  M.props.rest.ch = ch
}

let af: number | null = null

const draw = () => {
  typeof af === 'number' && cancelAnimationFrame(af)
  af = requestAnimationFrame(drawSync)
}

const drawSync = () => {
  const { rw, rh, drawX: dx, drawY: dy } = M.props

  ctx.textAlign = M.props.align
  ctx.textBaseline = M.props.baseline

  ctx.clearRect(0, 0, rw, rh)
  ctx.font = `${M.props.fs}px ${ff}`

  const metrics = ctx.measureText(M.props.text)

  ctx.fillText(M.props.text, dx, dy)

  ctx.globalAlpha = 0.5

  // baseline
  const blAlignPath = new Path2D()
  blAlignPath.moveTo(0, dy)
  blAlignPath.lineTo(rw, dy)

  // align
  blAlignPath.moveTo(dx, 0)
  blAlignPath.lineTo(dx, rh)

  ctx.strokeStyle = M.props.lines.blAlign.color
  ctx.lineWidth = M.props.lines.blAlign.width
  ctx.stroke(blAlignPath)

  // font bb
  const fPath = new Path2D()
  fPath.moveTo(0, dy - metrics.fontBoundingBoxAscent)
  fPath.lineTo(rw, dy - metrics.fontBoundingBoxAscent)
  fPath.moveTo(0, dy + metrics.fontBoundingBoxDescent)
  fPath.lineTo(rw, dy + metrics.fontBoundingBoxDescent)

  ctx.strokeStyle = M.props.lines.fontBb.color
  ctx.lineWidth = M.props.lines.fontBb.width
  ctx.stroke(fPath)

  // h actual bb
  const bbPath = new Path2D()
  bbPath.moveTo(0, dy - metrics.actualBoundingBoxAscent)
  bbPath.lineTo(rw, dy - metrics.actualBoundingBoxAscent)
  bbPath.moveTo(0, dy + metrics.actualBoundingBoxDescent)
  bbPath.lineTo(rw, dy + metrics.actualBoundingBoxDescent)

  // v actual bb
  bbPath.moveTo(dx - metrics.actualBoundingBoxLeft, 0) // this can return negative for left-aligned text
  bbPath.lineTo(dx - metrics.actualBoundingBoxLeft, rh)
  bbPath.moveTo(dx + metrics.actualBoundingBoxRight, 0)
  bbPath.lineTo(dx + metrics.actualBoundingBoxRight, rh)

  ctx.strokeStyle = M.props.lines.actualBb.color
  ctx.lineWidth = M.props.lines.actualBb.width
  ctx.stroke(bbPath)

  ctx.globalAlpha = 1

  // measuring lines
  const m = new Path2D()
  const horMLY =
    dy - metrics.actualBoundingBoxAscent - (30 / M.props.scaleMp) * 2
  const verMLx =
    dx + metrics.actualBoundingBoxRight + (30 / M.props.scaleMp) * 2

  m.moveTo(dx - metrics.actualBoundingBoxLeft, horMLY)
  m.lineTo(dx + metrics.actualBoundingBoxRight, horMLY)
  m.moveTo(verMLx, dy - metrics.actualBoundingBoxAscent)
  m.lineTo(verMLx, dy + metrics.actualBoundingBoxDescent)

  ctx.strokeStyle = M.props.lines.actualBb.color
  ctx.lineWidth = M.props.lines.actualBb.width
  ctx.stroke(m)

  ctx.textAlign = 'center'
  ctx.textBaseline = 'bottom'

  ctx.font = `${M.props.fs / 2}px sans-serif`

  const w = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight
  const horX = dx - metrics.actualBoundingBoxLeft + w / 2
  const horY = horMLY - (10 / M.props.scaleMp) * 2
  ctx.fillText(`${w.toFixed(1)}px`, horX, horY)

  const h = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
  const verX = verMLx + (10 / M.props.scaleMp) * 2
  const verY = dy - metrics.actualBoundingBoxAscent + h / 2
  ctx.translate(verX, verY)
  ctx.rotate(90 / (180 / Math.PI))
  ctx.fillText(`${h.toFixed(1)}px`, 0, 0)
  ctx.rotate(-90 / (180 / Math.PI))
  ctx.translate(-verX, -verY)
}

M.draw = draw
M.init = init

const initInputValues = () => {
  dom.textInput.value = M.props.text
  dom.rrInput.value = String(M.props.rr)

  dom.rrValue.innerHTML = String(M.props.rr)
  dom.dprValue.innerHTML = String(window.devicePixelRatio)
  dom.canvasSizeValue.innerHTML = `${M.props.rw.toFixed(
    1,
  )}x${M.props.rh.toFixed(1)}`
  dom.renderPixelValue.innerHTML = `${(M.props.rw * M.props.rr).toFixed(1)}x${(
    M.props.rh * M.props.rr
  ).toFixed(1)}`
  dom.zoomValue.innerHTML = String(M.props.scaleMp)

  dom.lineInputs.blAlign.color.value = M.props.lines.blAlign.color
  dom.lineInputs.blAlign.width.value = String(M.props.lines.blAlign.width)
  dom.lineInputs.fontBb.color.value = M.props.lines.fontBb.color
  dom.lineInputs.fontBb.width.value = String(M.props.lines.fontBb.width)
  dom.lineInputs.actualBb.color.value = M.props.lines.actualBb.color
  dom.lineInputs.actualBb.width.value = String(M.props.lines.actualBb.width)
}

addEvents(M)

init()
draw()
initInputValues()

checkTMInterface()

window.M = M
