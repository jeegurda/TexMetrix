import { mlOffset, mtOffset } from './common'
import { IMetrix } from './types'
import { getFontString } from './utils'

const init = (m: IMetrix) => {
  const ctx = m.props.shared.ctx
  const cw = ctx.canvas.clientWidth
  const ch = ctx.canvas.clientHeight

  m.props.rw = cw / m.props.scaleMp
  m.props.rh = ch / m.props.scaleMp

  ctx.canvas.width = cw * m.props.rr
  ctx.canvas.height = ch * m.props.rr

  ctx.scale(m.props.rr * m.props.scaleMp, m.props.rr * m.props.scaleMp)

  m.props.shared.cw = cw
  m.props.shared.ch = ch
}

const drawSync = (m: IMetrix) => {
  const {
    rw,
    rh,
    shared: { ctx },
  } = m.props

  const drawText = (line: string, dx: number, dy: number): TextMetrics => {
    ctx.save()
    ctx.textAlign = m.font.align
    ctx.textBaseline = m.font.baseline
    ctx.font = getFontString(m)
    ctx.fillText(line, dx, dy)
    const mets = ctx.measureText(line)
    ctx.restore()

    return mets
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

    ctx.save()
    ctx.strokeStyle = m.props.style.blAlign.color
    ctx.lineWidth = m.props.style.blAlign.width
    ctx.stroke(blAlignPath)
    ctx.restore()
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

    ctx.save()
    ctx.strokeStyle = m.props.style.fontBb.color
    ctx.lineWidth = m.props.style.fontBb.width
    // ctx.setLineDash([6 / M.props.scaleMp, 3 / M.props.scaleMp])
    ctx.stroke(fPath)
    ctx.restore()
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

    ctx.save()
    ctx.strokeStyle = m.props.style.actualBb.color
    ctx.lineWidth = m.props.style.actualBb.width
    ctx.stroke(aPath)
    ctx.restore()
  }

  let lastMLYTop = 0

  const drawMl = (idx: number, mets: TextMetrics, dx: number, dy: number) => {
    // measuring line
    const p = new Path2D()
    const totalMlOffset = mlOffset / m.props.scaleMp
    const totalMtOffset = mtOffset / m.props.scaleMp

    const horMLY =
      (idx === 0 ? dy - mets.actualBoundingBoxAscent : lastMLYTop) -
      totalMlOffset
    const verMLx = dx + mets.actualBoundingBoxRight + totalMlOffset

    p.moveTo(dx - mets.actualBoundingBoxLeft, horMLY)
    p.lineTo(dx + mets.actualBoundingBoxRight, horMLY)
    p.moveTo(verMLx, dy - mets.actualBoundingBoxAscent)
    p.lineTo(verMLx, dy + mets.actualBoundingBoxDescent)

    ctx.save()
    ctx.strokeStyle = m.props.style.actualBb.color
    ctx.lineWidth = m.props.style.actualBb.width
    ctx.save() // save before alpha
    ctx.globalAlpha = 0.5
    ctx.stroke(p)
    ctx.restore() // restore alpha

    // measuring line text
    ctx.textAlign = 'center'
    ctx.textBaseline = 'bottom'
    ctx.font = getFontString(m, m.font.size / 2)

    const w = mets.actualBoundingBoxLeft + mets.actualBoundingBoxRight
    const horX = dx - mets.actualBoundingBoxLeft + w / 2
    const horY = horMLY - totalMtOffset
    ctx.fillText(`${w.toFixed(1)}px`, horX, horY)

    const h = mets.actualBoundingBoxAscent + mets.actualBoundingBoxDescent
    const verX = verMLx + totalMtOffset
    const verY = dy - mets.actualBoundingBoxAscent + h / 2
    ctx.save() // save before transform
    ctx.translate(verX, verY)
    ctx.rotate(90 / (180 / Math.PI))
    ctx.fillText(`${h.toFixed(1)}px`, 0, 0)
    ctx.restore() // restore transform

    ctx.textAlign = 'end'
    ctx.fillText(
      `(${mets.width.toFixed(1)}px/${
        mets.fontBoundingBoxAscent + mets.fontBoundingBoxDescent
      }px)`,
      dx - totalMtOffset,
      dy,
    )
    ctx.restore() // restore rest

    // top point of text above hor line
    lastMLYTop = horY - m.font.size / 2
  }

  ctx.clearRect(0, 0, rw, rh)

  const lines = m.text.split('\n')

  lines.forEach((line, idx) => {
    const dx = m.props.drawX
    const dy = m.props.drawY + m.font.lh * idx

    const mets = drawText(line, dx, dy)

    ctx.save()
    ctx.globalAlpha = 0.5
    m.props.style.blAlign.display && drawBlAlign(idx, dx, dy)
    m.props.style.fontBb.display && drawFontBb(idx, mets, dx, dy)
    m.props.style.actualBb.display && drawActualBb(idx, mets, dx, dy)
    ctx.restore() // restore alpha

    m.props.style.actualBb.display && drawMl(idx, mets, dx, dy)
  })
}

let af: number | null = null

const draw = (...args: Parameters<typeof drawSync>) => {
  typeof af === 'number' && cancelAnimationFrame(af)
  af = requestAnimationFrame(drawSync.bind(null, ...args))
}

export { draw, init }
