import { checkTMInterface } from './support'
import { Align, Baseline, Metrix } from './types'
import { dom } from './dom'
import './style.css'
import { addEvents } from './events'
import { te } from './utils'

const ff = 'sans-serif' // TODO: move to input

const ctx = dom.canvas.getContext('2d') ?? te('ctx died')

const M: Metrix = {
  props: {
    rw: 0,
    rh: 0,

    drawX: 100,
    drawY: 100,

    scaleMp: 1,

    text: 'jee',
    fs: 60,
    align: Align.START,
    baseline: Baseline.ALPHABETIC,
    rr: window.devicePixelRatio,

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

  const blAlignPath = new Path2D()

  // baseline
  blAlignPath.moveTo(0, dy)
  blAlignPath.lineTo(rw, dy)

  // align
  blAlignPath.moveTo(dx, 0)
  blAlignPath.lineTo(dx, rh)

  ctx.strokeStyle = 'rgb(200,0,200)'
  ctx.stroke(blAlignPath)

  const bbPath = new Path2D()

  // h bb
  bbPath.moveTo(0, dy - metrics.actualBoundingBoxAscent)
  bbPath.lineTo(rw, dy - metrics.actualBoundingBoxAscent)
  bbPath.moveTo(0, dy + metrics.actualBoundingBoxDescent)
  bbPath.lineTo(rw, dy + metrics.actualBoundingBoxDescent)

  // v bb
  bbPath.moveTo(dx - metrics.actualBoundingBoxLeft, 0) // this can return negative for left-aligned text
  bbPath.lineTo(dx - metrics.actualBoundingBoxLeft, rh)
  bbPath.moveTo(dx + metrics.actualBoundingBoxRight, 0)
  bbPath.lineTo(dx + metrics.actualBoundingBoxRight, rh)

  ctx.strokeStyle = 'rgb(0,0,0)'
  ctx.stroke(bbPath)

  const fPath = new Path2D()

  // font bb
  fPath.moveTo(0, dy - metrics.fontBoundingBoxAscent)
  fPath.lineTo(rw, dy - metrics.fontBoundingBoxAscent)
  fPath.moveTo(0, dy + metrics.fontBoundingBoxDescent)
  fPath.lineTo(rw, dy + metrics.fontBoundingBoxDescent)

  ctx.strokeStyle = 'rgb(240,0,0)'
  ctx.stroke(fPath)
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
}

addEvents(M)

init()
draw()
initInputValues()

checkTMInterface()

window.M = M
