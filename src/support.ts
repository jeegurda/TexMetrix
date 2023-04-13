// also see here
// https://github.com/mdn/browser-compat-data/blob/227451e3120ee48a5f5cf2844083e65cba4df167/api/TextMetrics.json
const checkTMInterface = () => {
  const props = [
    'actualBoundingBoxAscent',
    'actualBoundingBoxDescent',
    'actualBoundingBoxLeft',
    'actualBoundingBoxRight',

    'fontBoundingBoxAscent',
    'fontBoundingBoxDescent',

    'emHeightAscent', // same as font
    'emHeightDescent',

    'alphabeticBaseline',
    'hangingBaseline',
    'ideographicBaseline',

    'width',
  ]

  const supp: string[] = []
  const nosupp: string[] = []

  props.forEach((prop) =>
    prop in TextMetrics.prototype ? supp.push(prop) : nosupp.push(prop),
  )

  console.log(
    'Supported: %o. Not supported: %o',
    supp.join(', '),
    nosupp.join(', '),
  )
}

export { checkTMInterface }
