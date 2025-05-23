import { button, div, divCl } from '../../js/dom.mjs'

import * as Css from '../../js/css.mjs'
import * as Style from '../../js/style.mjs'
import * as Tron from '../../js/tron.mjs'

let pause

Style.initCss(console.log)

pause = button('Pause', '', { 'data-run': 'Pause' })

pause.onclick = () => {
  Css.disable(pause)

  if (pause.innerText == 'Resume') {
    Tron.cmd('step.send', [ 'Debugger.resume' ], err => {
      if (err) {
        console.log('resume: ' + err.message)
        Css.enable(pause)
        return
      }
      console.log('resumed')
      pause.innerText = 'Pause'
      Css.enable(pause)
    })
    return
  }

  Tron.cmd('step.send', [ 'Debugger.enable' ], err => {
    if (err) {
      console.log('enable: ' + err.message)
      Css.enable(pause)
      return
    }
    Tron.cmd('step.send', [ 'Debugger.pause' ], err => {
      if (err) {
        console.log('pause: ' + err.message)
        Css.enable(pause)
        return
      }
      console.log('paused')
      pause.innerText = 'Resume'
      Css.enable(pause)
    })
  })
}

globalThis.document.body.after(div([ divCl('step-h', 'Stepper'),
                                     pause ]))
