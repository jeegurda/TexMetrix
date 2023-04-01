import { checkTMInterface } from './support'
import { Align, Baseline, IMetrix } from './types'
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
      ctx,
    },
  },
}

init(metrix)
draw(metrix)

addEvents(metrix)
updateDom(metrix)

checkTMInterface()
