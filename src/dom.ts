const textInput = document.querySelector<HTMLTextAreaElement>('.text-input')
const fontSizeInput =
  document.querySelector<HTMLInputElement>('.font-size-input')
const alignInputs = document.querySelectorAll<HTMLInputElement>('.align-input')
const baselineInputs =
  document.querySelectorAll<HTMLInputElement>('.baseline-input')

const canvas = document.querySelector<HTMLCanvasElement>('.canvas canvas')

const rrValue = document.querySelector<HTMLSpanElement>('.rr-value')
const dprValue = document.querySelector<HTMLSpanElement>('.dpr-value')
const rrInput = document.querySelector<HTMLInputElement>('.rr-input')
const rrPixelValue = document.querySelector<HTMLSpanElement>('.rr-pixel-value')

const nullableDom = {
  textInput,
  fontSizeInput,
  alignInputs,
  baselineInputs,

  canvas,

  rrValue,
  dprValue,
  rrInput,
  rrPixelValue,
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
