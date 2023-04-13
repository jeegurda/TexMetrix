import { checkTMInterface } from './support'
import { Align, Baseline, Fw, IMetrix } from './types'
import { dom } from './dom'
import { addEvents } from './events'
import { getFonts, te } from './utils'
import { updateDom } from './update-dom'
import { builtinFontData } from './common'
import { draw, init } from './draw'

const ctx = dom.canvas.getContext('2d') ?? te('ctx died')

const fm = getFonts(builtinFontData)

const defFf = 'sans-serif'
const defFont = fm[defFf] ?? te('Default font family not found')

const metrix: IMetrix = {
  text: 'my honest reaction 😅👌🏽',
  font: {
    fs: defFont[0].postscriptName,
    useItalic: false,
    useWeight: false,
    useFs: true,
    fw: Fw.w400,
    ff: defFf,
    size: 60,
    lh: 80,
    align: Align.START,
    baseline: Baseline.ALPHABETIC,
  },
  props: {
    rw: 0,
    rh: 0,
    drawX: 0,
    drawY: 0,
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
      ctx,
    },
  },
}

const setInitials = () => {
  // Here goes whatever requires style's loaded state

  metrix.props.drawX = 100
  metrix.props.drawY = dom.canvas.clientHeight - 100
}

const initApp = () => {
  setInitials()

  init(metrix)
  draw(metrix)

  addEvents(metrix)
  updateDom(metrix)
}

checkTMInterface()

if (dom.mainCss.sheet) {
  initApp()
} else {
  // Stylesheet can be NOT loaded yet, this happens in Safari only
  // expect 'sheet' to be undefined
  dom.mainCss.addEventListener('load', initApp)
}
