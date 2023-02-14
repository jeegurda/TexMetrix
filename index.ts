const canvas = document.querySelector<HTMLCanvasElement>('#canvas')
const textarea = document.querySelector<HTMLInputElement>('#textarea')
const info = document.querySelector<HTMLDivElement>('#info')

const fs = 20
const ff = 'sans-serif'

if (canvas) {
  const ctx = canvas.getContext('2d')

  if (ctx === null) {
    throw new Error('ctx died')
  }

  if (!textarea) {
    throw new Error('dom el missing')
  }

  const refX = 50
  const refY = 50

  const w = ctx.canvas.width
  const h = ctx.canvas.height
  const text = textarea.value

  const draw = (text: string) => {
    ctx.clearRect(0, 0, w, h)
    ctx.font = `${fs}px ${ff}`

    const metrics = ctx.measureText(text)

    ctx.fillText(text, refX, refY)

    const aPath = new Path2D()

    // h

    // baseline
    aPath.moveTo(0, refX)
    aPath.lineTo(w, refX)

    aPath.moveTo(0, refX - metrics.actualBoundingBoxAscent)
    aPath.lineTo(w, refX - metrics.actualBoundingBoxAscent)
    aPath.moveTo(0, refX + metrics.actualBoundingBoxDescent)
    aPath.lineTo(w, refX + metrics.actualBoundingBoxDescent)

    // v
    aPath.moveTo(refY, 0)
    aPath.lineTo(refY, h)

    aPath.moveTo(refY - metrics.actualBoundingBoxLeft, 0) // this can return negative for left-aligned text
    aPath.lineTo(refY - metrics.actualBoundingBoxLeft, h)
    aPath.moveTo(refY + metrics.actualBoundingBoxRight, 0)
    aPath.lineTo(refY + metrics.actualBoundingBoxRight, h)

    ctx.strokeStyle = 'rgb(0,0,0)'
    ctx.stroke(aPath)

    const fPath = new Path2D()

    fPath.moveTo(0, refY - metrics.fontBoundingBoxAscent)
    fPath.lineTo(w, refY - metrics.fontBoundingBoxAscent)
    fPath.moveTo(0, refY + metrics.fontBoundingBoxDescent)
    fPath.lineTo(w, refY + metrics.fontBoundingBoxDescent)

    ctx.strokeStyle = 'rgb(240,0,0)'
    ctx.stroke(fPath)
  }

  textarea.addEventListener<'input'>('input', (ev) =>
    draw((ev.target as HTMLInputElement).value || ''),
  )
  draw(text)
}
