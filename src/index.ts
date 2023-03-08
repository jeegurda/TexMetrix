import { checkTMInterface } from './support'
import { Align, Baseline } from './types'
import * as dom from './dom'
import './style.css'

const initFs = 60
const ff = 'sans-serif'
const dpr = window.devicePixelRatio
const initRefX = 20
const initRefY = 50
const w = 800
const h = 400
const initAlign = 'start'
const initBaseline = 'alphabetic'

if (!dom.canvas || !dom.textInput || !dom.fontSizeInput) {
  throw new Error('dom el missing')
}

const ctx = dom.canvas.getContext('2d')

if (ctx === null) {
  throw new Error('ctx died')
}

let fs = initFs
let text = 'jee'
let refXPerc = initRefX
let refYPerc = initRefY

let baseline: Baseline = initBaseline
let align: Align = initAlign

ctx.canvas.style.width = `${w}px`
ctx.canvas.style.height = `${h}px`
ctx.canvas.width = w * dpr
ctx.canvas.height = h * dpr

dom.textInput.value = text

const init = () => {
  ctx.scale(dpr, dpr)
}

const draw = () => {
  let refX = (refXPerc / 100) * w
  let refY = (refYPerc / 100) * h

  ctx.textAlign = align
  ctx.textBaseline = baseline

  ctx.clearRect(0, 0, w, h)
  ctx.font = `${fs}px ${ff}`

  const metrics = ctx.measureText(text)

  ctx.fillText(text, refX, refY)

  const blAlignPath = new Path2D()

  // baseline
  blAlignPath.moveTo(0, refY)
  blAlignPath.lineTo(w, refY)

  // align
  blAlignPath.moveTo(refX, 0)
  blAlignPath.lineTo(refX, h)

  ctx.strokeStyle = 'rgb(200,0,200)'
  ctx.stroke(blAlignPath)

  const bbPath = new Path2D()

  // h bb
  bbPath.moveTo(0, refY - metrics.actualBoundingBoxAscent)
  bbPath.lineTo(w, refY - metrics.actualBoundingBoxAscent)
  bbPath.moveTo(0, refY + metrics.actualBoundingBoxDescent)
  bbPath.lineTo(w, refY + metrics.actualBoundingBoxDescent)

  // v bb
  bbPath.moveTo(refX - metrics.actualBoundingBoxLeft, 0) // this can return negative for left-aligned text
  bbPath.lineTo(refX - metrics.actualBoundingBoxLeft, h)
  bbPath.moveTo(refX + metrics.actualBoundingBoxRight, 0)
  bbPath.lineTo(refX + metrics.actualBoundingBoxRight, h)

  ctx.strokeStyle = 'rgb(0,0,0)'
  ctx.stroke(bbPath)

  const fPath = new Path2D()

  // font bb
  fPath.moveTo(0, refY - metrics.fontBoundingBoxAscent)
  fPath.lineTo(w, refY - metrics.fontBoundingBoxAscent)
  fPath.moveTo(0, refY + metrics.fontBoundingBoxDescent)
  fPath.lineTo(w, refY + metrics.fontBoundingBoxDescent)

  ctx.strokeStyle = 'rgb(240,0,0)'
  ctx.stroke(fPath)
}

dom.textInput.addEventListener<'input'>('input', (ev) => {
  const value = (ev.target as HTMLInputElement).value
  text = value
  draw()
})

dom.fontSizeInput.addEventListener('input', (ev) => {
  const value = (ev.target as HTMLInputElement).value
  fs = parseInt(value) || initFs
  draw()
})

Array.from(dom.alignInputs).forEach((input) =>
  input.addEventListener('change', (ev) => {
    const value = (ev.target as HTMLInputElement).value as Align
    align = value
    draw()
  }),
)
Array.from(dom.baselineInputs).forEach((input) =>
  input.addEventListener('change', (ev) => {
    const value = (ev.target as HTMLInputElement).value as Baseline
    baseline = value
    draw()
  }),
)

init()
draw()

checkTMInterface()
