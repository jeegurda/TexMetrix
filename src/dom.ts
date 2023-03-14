const textInput = document.querySelector<HTMLTextAreaElement>('.text-input')
const fontSizeInput =
  document.querySelector<HTMLInputElement>('.font-size-input')
const alignInput = document.querySelector<HTMLSelectElement>('.align-input')
const baselineInput =
  document.querySelector<HTMLSelectElement>('.baseline-input')

const canvas = document.querySelector<HTMLCanvasElement>('.canvas canvas')

const rrValue = document.querySelector<HTMLSpanElement>('.rr-value')
const dprValue = document.querySelector<HTMLSpanElement>('.dpr-value')
const rrInput = document.querySelector<HTMLInputElement>('.rr-input')
const canvasSizeValue =
  document.querySelector<HTMLSpanElement>('.canvas-size-value')
const renderPixelValue = document.querySelector<HTMLSpanElement>(
  '.render-pixel-value',
)

const canvasUi = document.querySelector<HTMLDivElement>('.canvas-ui')

const zoomValue = document.querySelector<HTMLSpanElement>('.zoom-value')

const nullableDom = {
  textInput,
  fontSizeInput,
  alignInput,
  baselineInput,

  canvas,

  rrValue,
  dprValue,
  rrInput,
  canvasSizeValue,
  renderPixelValue,

  zoomValue,

  canvasUi,
} as const

Object.entries(nullableDom).forEach(([key, el]) => {
  if (el === null) {
    throw new Error(`dom el missing (${key})`)
  }
})

type ExistingDom = {
  [K in keyof typeof nullableDom]: NonNullable<typeof nullableDom[K]>
}

const dom = nullableDom as ExistingDom

export { dom }
