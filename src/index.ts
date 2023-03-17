import { checkTMInterface } from './support'
import { Align, Baseline, Metrix } from './types'
import { dom } from './dom'
import './style.css'
import { addEvents } from './events'
import { te } from './utils'

const ff = 'serif' // TODO: move to input
const mlOffset = 30
const mtOffset = 10

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
    lh: 80,
    align: Align.START,
    baseline: Baseline.ALPHABETIC,
    rr: window.devicePixelRatio,
    style: {
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
  const { rw, rh, lh } = M.props

  const drawText = (line: string, dx: number, dy: number) => {
    ctx.textAlign = M.props.align
    ctx.textBaseline = M.props.baseline
    ctx.font = `${M.props.fs}px ${ff}`
    ctx.fillText(line, dx, dy)
  }

  const drawBlAlign = (idx: number, dx: number, dy: number) => {
    const blAlignPath = new Path2D()
    blAlignPath.moveTo(0, dy)
    blAlignPath.lineTo(rw, dy)

    // draw idx-independent lines once
    if (idx === 0) {
      blAlignPath.moveTo(dx, 0)
      blAlignPath.lineTo(dx, rh)
    }

    ctx.strokeStyle = M.props.style.blAlign.color
    ctx.lineWidth = M.props.style.blAlign.width
    ctx.stroke(blAlignPath)
  }

  const drawFontBb = (
    idx: number,
    mets: TextMetrics,
    dx: number,
    dy: number,
  ) => {
    const fPath = new Path2D()
    fPath.moveTo(0, dy - mets.fontBoundingBoxAscent)
    fPath.lineTo(rw, dy - mets.fontBoundingBoxAscent)
    fPath.moveTo(0, dy + mets.fontBoundingBoxDescent)
    fPath.lineTo(rw, dy + mets.fontBoundingBoxDescent)

    ctx.strokeStyle = M.props.style.fontBb.color
    ctx.lineWidth = M.props.style.fontBb.width
    ctx.stroke(fPath)
  }

  const drawActualBb = (
    idx: number,
    mets: TextMetrics,
    dx: number,
    dy: number,
  ) => {
    // h
    const aPath = new Path2D()
    aPath.moveTo(0, dy - mets.actualBoundingBoxAscent)
    aPath.lineTo(rw, dy - mets.actualBoundingBoxAscent)
    aPath.moveTo(0, dy + mets.actualBoundingBoxDescent)
    aPath.lineTo(rw, dy + mets.actualBoundingBoxDescent)

    // v
    // draw idx-independent Y lines once
    if (idx === 0) {
      aPath.moveTo(dx - mets.actualBoundingBoxLeft, 0) // this can return negative for left-aligned text
      aPath.lineTo(dx - mets.actualBoundingBoxLeft, rh)
    }
    aPath.moveTo(dx + mets.actualBoundingBoxRight, 0)
    aPath.lineTo(dx + mets.actualBoundingBoxRight, rh)

    ctx.strokeStyle = M.props.style.actualBb.color
    ctx.lineWidth = M.props.style.actualBb.width
    ctx.stroke(aPath)
  }

  let lastMLYTop = 0

  const drawMl = (idx: number, mets: TextMetrics, dx: number, dy: number) => {
    const yBase = idx === 0 ? dy - mets.actualBoundingBoxAscent : lastMLYTop

    // measuring line
    const m = new Path2D()
    const horMLY = yBase - mlOffset / M.props.scaleMp
    const verMLx = dx + mets.actualBoundingBoxRight + mlOffset / M.props.scaleMp

    m.moveTo(dx - mets.actualBoundingBoxLeft, horMLY)
    m.lineTo(dx + mets.actualBoundingBoxRight, horMLY)
    m.moveTo(verMLx, dy - mets.actualBoundingBoxAscent)
    m.lineTo(verMLx, dy + mets.actualBoundingBoxDescent)

    ctx.globalAlpha = 0.5
    ctx.strokeStyle = M.props.style.actualBb.color
    ctx.lineWidth = M.props.style.actualBb.width
    ctx.stroke(m)
    ctx.globalAlpha = 1

    // measuring line text
    ctx.textAlign = 'center'
    ctx.textBaseline = 'bottom'
    ctx.font = `${M.props.fs / 2}px sans-serif`

    const w = mets.actualBoundingBoxLeft + mets.actualBoundingBoxRight
    const horX = dx - mets.actualBoundingBoxLeft + w / 2
    const horY = horMLY - mtOffset / M.props.scaleMp
    ctx.fillText(`${w.toFixed(1)}px`, horX, horY)

    const h = mets.actualBoundingBoxAscent + mets.actualBoundingBoxDescent
    const verX = verMLx + mtOffset / M.props.scaleMp
    const verY = dy - mets.actualBoundingBoxAscent + h / 2
    ctx.translate(verX, verY)
    ctx.rotate(90 / (180 / Math.PI))
    ctx.fillText(`${h.toFixed(1)}px`, 0, 0)
    ctx.rotate(-90 / (180 / Math.PI))
    ctx.translate(-verX, -verY)

    // top point of text above hor line
    lastMLYTop = horY - M.props.fs / 2
  }

  ctx.clearRect(0, 0, rw, rh)

  const lines = M.props.text.split('\n')

  lines.forEach((line, idx) => {
    const dx = M.props.drawX
    const dy = M.props.drawY + lh * idx

    drawText(line, dx, dy)

    ctx.globalAlpha = 0.5
    const mets = ctx.measureText(line)
    drawBlAlign(idx, dx, dy)
    drawFontBb(idx, mets, dx, dy)
    drawActualBb(idx, mets, dx, dy)
    ctx.globalAlpha = 1

    drawMl(idx, mets, dx, dy)
  })
}

M.draw = draw
M.init = init

const initInputValues = () => {
  dom.textInput.value = M.props.text
  dom.fontSizeInput.value = String(M.props.fs)
  dom.lhInput.value = String(M.props.lh)
  dom.alignInput.value = M.props.align
  dom.baselineInput.value = M.props.baseline

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

  dom.lineInputs.blAlign.color.value = M.props.style.blAlign.color
  dom.lineInputs.blAlign.width.value = String(M.props.style.blAlign.width)
  dom.lineInputs.fontBb.color.value = M.props.style.fontBb.color
  dom.lineInputs.fontBb.width.value = String(M.props.style.fontBb.width)
  dom.lineInputs.actualBb.color.value = M.props.style.actualBb.color
  dom.lineInputs.actualBb.width.value = String(M.props.style.actualBb.width)
}

addEvents(M)

init()
draw()
initInputValues()

checkTMInterface()

window.M = M
