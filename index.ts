const canvas = document.querySelector<HTMLCanvasElement>('#canvas')
const textarea = document.querySelector<HTMLInputElement>('#textarea')

const sizeInput = document.querySelector<HTMLInputElement>('#input-size')

const inputX = document.querySelector<HTMLInputElement>('#input-x')
const inputY = document.querySelector<HTMLInputElement>('#input-y')

const initFs = 20
const ff = 'sans-serif'
const dpr = window.devicePixelRatio
const initRefX = 20
const initRefY = 50
const w = 400
const h = 400

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

    console.log(refX, refY)

    ctx.clearRect(0, 0, w, h)
    ctx.font = `${fs}px ${ff}`

    const metrics = ctx.measureText(text)

    ctx.fillText(text, refX, refY)

    const aPath = new Path2D()

    // h

    // baseline
    aPath.moveTo(0, refY)
    aPath.lineTo(w, refY)

    aPath.moveTo(0, refY - metrics.actualBoundingBoxAscent)
    aPath.lineTo(w, refY - metrics.actualBoundingBoxAscent)
    aPath.moveTo(0, refY + metrics.actualBoundingBoxDescent)
    aPath.lineTo(w, refY + metrics.actualBoundingBoxDescent)

    // v
    aPath.moveTo(refX, 0)
    aPath.lineTo(refX, h)

    aPath.moveTo(refX - metrics.actualBoundingBoxLeft, 0) // this can return negative for left-aligned text
    aPath.lineTo(refX - metrics.actualBoundingBoxLeft, h)
    aPath.moveTo(refX + metrics.actualBoundingBoxRight, 0)
    aPath.lineTo(refX + metrics.actualBoundingBoxRight, h)

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

  init()
  draw()
}
