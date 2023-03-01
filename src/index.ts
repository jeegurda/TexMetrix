import { checkTMInterface } from './support'
import { Align, Baseline } from './types'

const canvas = document.querySelector<HTMLCanvasElement>('#canvas')
const textarea = document.querySelector<HTMLInputElement>('#textarea')
const sizeInput = document.querySelector<HTMLInputElement>('#input-size')
const inputX = document.querySelector<HTMLInputElement>('#input-x')
const inputY = document.querySelector<HTMLInputElement>('#input-y')
const alignInputs = document.querySelectorAll<HTMLInputElement>('.input-align')
const baselineInputs =
  document.querySelectorAll<HTMLInputElement>('.input-baseline')

const initFs = 60
const ff = 'sans-serif'
const dpr = window.devicePixelRatio
const initRefX = 20
const initRefY = 50
const w = 800
const h = 400
const initAlign = 'start'
const initBaseline = 'alphabetic'

if (canvas) {
  const ctx = canvas.getContext('2d')

  if (ctx === null) {
    throw new Error('ctx died')
  }

  if (!textarea || !sizeInput || !inputX || !inputY) {
    throw new Error('dom el missing')
  }

  let fs = initFs
  let text = textarea.value
  let refXPerc = initRefX
  let refYPerc = initRefY

  let baseline: Baseline = initBaseline
  let align: Align = initAlign

  ctx.canvas.style.width = `${w}px`
  ctx.canvas.style.height = `${h}px`
  ctx.canvas.width = w * dpr
  ctx.canvas.height = h * dpr

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

  textarea.addEventListener<'input'>('input', (ev) => {
    const value = (ev.target as HTMLInputElement).value
    text = value
    draw()
  })

  sizeInput.addEventListener('input', (ev) => {
    const value = (ev.target as HTMLInputElement).value
    fs = parseInt(value) || initFs
    draw()
  })

  inputX.addEventListener('input', (ev) => {
    const value = (ev.target as HTMLInputElement).value
    refXPerc = parseInt(value) ?? initRefX
    draw()
  })
  inputY.addEventListener('input', (ev) => {
    const value = (ev.target as HTMLInputElement).value
    refYPerc = parseInt(value) ?? initRefY
    draw()
  })

  Array.from(alignInputs).forEach((input) =>
    input.addEventListener('change', (ev) => {
      const value = (ev.target as HTMLInputElement).value as Align
      align = value
      draw()
    }),
  )
  Array.from(baselineInputs).forEach((input) =>
    input.addEventListener('change', (ev) => {
      const value = (ev.target as HTMLInputElement).value as Baseline
      baseline = value
      draw()
    }),
  )

  init()
  draw()
}

checkTMInterface()
