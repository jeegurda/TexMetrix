import { checkTMInterface } from './support'
import { Align, Baseline, Metrix } from './types'
import { dom } from './dom'
import './style.css'
import { addEvents } from './events'
import { getFonts, getFontString, te } from './utils'
import { updateDom } from './update-dom'
import { builtinFontData } from './common'

const mlOffset = 30
const mtOffset = 10

const ctx = dom.canvas.getContext('2d') ?? te('ctx died')

const fm = getFonts(builtinFontData)

const defFf = 'sans-serif'
const defFont = fm[defFf] ?? te('Default font family not found')

const M: Metrix = {
  text: 'my honest reaction 😅👌🏽',
  font: {
    fs: defFont[0].postscriptName,
    fsItalic: false,
    fsBold: false,
    ff: defFf,
    size: 60,
    lh: 80,
    align: Align.START,
    baseline: Baseline.ALPHABETIC,
  },
  props: {
    rw: 0,
    rh: 0,
    drawX: 100,
    drawY: dom.canvas.clientHeight - 100,
    scaleMp: 1,
    rr: window.devicePixelRatio,
    style: {
      blAlign: { color: '#c800c8', width: 0.5, display: true },
      fontBb: { color: '#f00000', width: 0.5, display: true },
      actualBb: { color: '#000000', width: 0.5, display: true },
    },
    shared: {
      cw: 0,
      ch: 0,
      fm,
    },
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

  M.props.shared.cw = cw
  M.props.shared.ch = ch
}

let af: number | null = null

const draw = () => {
  typeof af === 'number' && cancelAnimationFrame(af)
  af = requestAnimationFrame(drawSync)
}

const drawSync = () => {
  const { rw, rh } = M.props

  const drawText = (line: string, dx: number, dy: number) => {
    ctx.textAlign = M.font.align
    ctx.textBaseline = M.font.baseline
    ctx.font = getFontString(
      M.font.size,
      M.font.fs,
      M.font.fsBold,
      M.font.fsItalic,
    )
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
    // ctx.setLineDash([6 / M.props.scaleMp, 3 / M.props.scaleMp])
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
    // measuring line
    const m = new Path2D()
    const totalMlOffset = mlOffset / M.props.scaleMp
    const totalMtOffset = mtOffset / M.props.scaleMp

    const horMLY =
      (idx === 0 ? dy - mets.actualBoundingBoxAscent : lastMLYTop) -
      totalMlOffset
    const verMLx = dx + mets.actualBoundingBoxRight + totalMlOffset

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
    ctx.font = getFontString(
      M.font.size / 2,
      M.font.fs,
      M.font.fsBold,
      M.font.fsItalic,
    )

    const w = mets.actualBoundingBoxLeft + mets.actualBoundingBoxRight
    const horX = dx - mets.actualBoundingBoxLeft + w / 2
    const horY = horMLY - totalMtOffset
    ctx.fillText(`${w.toFixed(1)}px`, horX, horY)

    const h = mets.actualBoundingBoxAscent + mets.actualBoundingBoxDescent
    const verX = verMLx + totalMtOffset
    const verY = dy - mets.actualBoundingBoxAscent + h / 2
    ctx.translate(verX, verY)
    ctx.rotate(90 / (180 / Math.PI))
    ctx.fillText(`${h.toFixed(1)}px`, 0, 0)
    ctx.rotate(-90 / (180 / Math.PI))
    ctx.translate(-verX, -verY)

    // top point of text above hor line
    lastMLYTop = horY - M.font.size / 2
  }

  ctx.clearRect(0, 0, rw, rh)

  const lines = M.text.split('\n')

  lines.forEach((line, idx) => {
    const dx = M.props.drawX
    const dy = M.props.drawY + M.font.lh * idx

    drawText(line, dx, dy)

    ctx.globalAlpha = 0.5
    const mets = ctx.measureText(line)
    M.props.style.blAlign.display && drawBlAlign(idx, dx, dy)
    M.props.style.fontBb.display && drawFontBb(idx, mets, dx, dy)
    M.props.style.actualBb.display && drawActualBb(idx, mets, dx, dy)
    ctx.globalAlpha = 1

    M.props.style.actualBb.display && drawMl(idx, mets, dx, dy)
  })
}

M.draw = draw
M.init = init

addEvents(M)

init()
draw()
updateDom(M)

checkTMInterface()
