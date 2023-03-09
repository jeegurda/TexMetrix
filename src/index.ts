import { checkTMInterface } from './support'
import { Align, Baseline } from './types'
import * as dom from './dom'
import './style.css'

const ff = 'sans-serif' // TODO: move to input

if (!dom.canvas || !dom.textInput || !dom.fontSizeInput || !dom.dprInput) {
  throw new Error('dom el missing')
}

const ctx = dom.canvas.getContext('2d')

if (ctx === null) {
  throw new Error('ctx died')
}

let text = 'jee'
let fs = 60
let baseline: Baseline = 'alphabetic'
let align: Align = 'start'
let dpr = window.devicePixelRatio

let rw = 0
let rh = 0

const resizeCanvas = () => {
  rw = ctx.canvas.clientWidth * dpr
  rh = ctx.canvas.clientHeight * dpr

  ctx.canvas.width = rw
  ctx.canvas.height = rh
}

const init = () => {
  resizeCanvas()
  ctx.scale(dpr, dpr)
}

const draw = () => {
  let refX = 100
  let refY = 100

  ctx.textAlign = align
  ctx.textBaseline = baseline

  ctx.clearRect(0, 0, rw, rh)
  ctx.font = `${fs}px ${ff}`

  const metrics = ctx.measureText(text)

  ctx.fillText(text, refX, refY)

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

const initInputValues = () => {
  dom.textInput!.value = text
  dom.dprInput!.value = String(dpr)
}

initInputValues()
init()
draw()

checkTMInterface()
