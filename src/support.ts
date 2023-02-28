// also see here
// https://github.com/mdn/browser-compat-data/blob/227451e3120ee48a5f5cf2844083e65cba4df167/api/TextMetrics.json
const checkTMInterface = () => {
  // bounding boxes
  const actualBB = [
    'actualBoundingBoxAscent',
    'actualBoundingBoxDescent',
    'actualBoundingBoxLeft',
    'actualBoundingBoxRight',
  ]
  const fontBB = ['fontBoundingBoxAscent', 'fontBoundingBoxDescent']
  const emHeight = ['emHeightAscent', 'emHeightDescent']
  const baseline = [
    'alphabeticBaseline',
    'hangingBaseline',
    'ideographicBaseline',
  ]

  const rest = ['width']

  const checkSupport = (props: string[]) => {
    props.forEach((prop) => {
      console.log(
        `%o is${prop in TextMetrics.prototype ? '' : ' NOT'} in proto`,
        prop,
      )
    })
  }

  checkSupport(actualBB)
  checkSupport(fontBB)
  checkSupport(emHeight)
  checkSupport(baseline)
  checkSupport(rest)
}

export { checkTMInterface }
