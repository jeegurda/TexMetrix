import { checkTMInterface } from './support'
import { Metrix } from './types'
import { dom } from './dom'
import './style.css'
import { addEvents } from './events'

const ff = 'sans-serif' // TODO: move to input

const ctx = dom.canvas.getContext('2d')

if (ctx === null) {
  throw new Error('ctx died')
}

const M: Metrix = {
  props: {
    rw: 0,
    rh: 0,

    text: 'jee',
    fs: 60,
    align: 'start',
    baseline: 'alphabetic',
    dpr: window.devicePixelRatio,
  },
  draw: () => {},
  init: () => {},
}

const init = () => {
  M.props.rw = ctx.canvas.clientWidth * M.props.dpr
  M.props.rh = ctx.canvas.clientHeight * M.props.dpr

  ctx.canvas.width = M.props.rw
  ctx.canvas.height = M.props.rh

  ctx.scale(M.props.dpr, M.props.dpr)
}

const draw = () => {
  const refX = 100
  const refY = 100

  const { rw, rh } = M.props

  ctx.textAlign = M.props.align
  ctx.textBaseline = M.props.baseline

  ctx.clearRect(0, 0, rw, rh)
  ctx.font = `${M.props.fs}px ${ff}`

  const metrics = ctx.measureText(M.props.text)

  ctx.fillText(M.props.text, refX, refY)

  const blAlignPath = new Path2D()

  // baseline
  blAlignPath.moveTo(0, refY)
  blAlignPath.lineTo(rw, refY)

  // align
  blAlignPath.moveTo(refX, 0)
  blAlignPath.lineTo(refX, rh)

  ctx.strokeStyle = 'rgb(200,0,200)'
  ctx.stroke(blAlignPath)

  const bbPath = new Path2D()

  // h bb
  bbPath.moveTo(0, refY - metrics.actualBoundingBoxAscent)
  bbPath.lineTo(rw, refY - metrics.actualBoundingBoxAscent)
  bbPath.moveTo(0, refY + metrics.actualBoundingBoxDescent)
  bbPath.lineTo(rw, refY + metrics.actualBoundingBoxDescent)

  // v bb
  bbPath.moveTo(refX - metrics.actualBoundingBoxLeft, 0) // this can return negative for left-aligned text
  bbPath.lineTo(refX - metrics.actualBoundingBoxLeft, rh)
  bbPath.moveTo(refX + metrics.actualBoundingBoxRight, 0)
  bbPath.lineTo(refX + metrics.actualBoundingBoxRight, rh)

  ctx.strokeStyle = 'rgb(0,0,0)'
  ctx.stroke(bbPath)

  const fPath = new Path2D()

  // font bb
  fPath.moveTo(0, refY - metrics.fontBoundingBoxAscent)
  fPath.lineTo(rw, refY - metrics.fontBoundingBoxAscent)
  fPath.moveTo(0, refY + metrics.fontBoundingBoxDescent)
  fPath.lineTo(rw, refY + metrics.fontBoundingBoxDescent)

  ctx.strokeStyle = 'rgb(240,0,0)'
  ctx.stroke(fPath)
}

M.draw = draw
M.init = init

const initInputValues = () => {
  dom.textInput.value = M.props.text
  dom.rrInput.value = String(M.props.dpr)

  dom.rrValue.innerHTML = String(M.props.dpr)
  dom.dprValue.innerHTML = String(window.devicePixelRatio)
  dom.rrPixelValue.innerHTML = `${M.props.rw}x${M.props.rh}`
}

addEvents(M)

init()
draw()
initInputValues()

checkTMInterface()
