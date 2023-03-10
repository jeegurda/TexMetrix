const textInput = document.querySelector<HTMLTextAreaElement>('.text-input')
const fontSizeInput =
  document.querySelector<HTMLInputElement>('.font-size-input')
const alignInputs = document.querySelectorAll<HTMLInputElement>('.align-input')
const baselineInputs =
  document.querySelectorAll<HTMLInputElement>('.baseline-input')

const canvas = document.querySelector<HTMLCanvasElement>('.canvas canvas')

const dprInput = document.querySelector<HTMLInputElement>('.dpr-input')

const dom = {
  textInput,
  fontSizeInput,
  alignInputs,
  baselineInputs,

  canvas,

  dprInput,
} as const

Object.entries(dom).forEach(([key, el]) => {
  if (el === null) {
    throw new Error(`dom el missing (${key})`)
  }
})

const existingDom = dom as NonNullable<typeof dom>

export { existingDom as dom }
