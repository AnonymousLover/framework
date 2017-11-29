import { vLoad, vPop, vModal, $pop, $modal, $load } from './components/container'
import $dialog, { vMsgBox, vLoading, vActionSheet } from './components/dialog'
import { vInput, vForm } from './components/form'
import $keyboard, { vKeyboardModal, vKeyboardSimple, vKeyboardComplex } from './components/keyboard'
import { vPassword, vPasswordSuite } from './components/password'
import { vCarousel, vCarouselBanner } from './components/carousel'
import { vScroll, vSticky } from './components/scroll'
import { vProgressNumber, vProgressCircle, vProgressLine } from './components/progress'

// mixins
import keyboardMixins from './_components/mixins/keyboard'

export {
  // func
  $pop,
  $modal,
  $load,
  $dialog,
  $keyboard,
  // component
  vLoad,
  vPop,
  vModal,
  vMsgBox,
  vLoading,
  vActionSheet,
  vInput,
  vForm,
  vKeyboardSimple,
  vKeyboardComplex,
  vKeyboardModal,
  vPassword,
  vPasswordSuite,
  vCarousel,
  vCarouselBanner,
  vScroll,
  vSticky,
  vProgressNumber,
  vProgressLine,
  vProgressCircle,
  // mixins
  keyboardMixins
}
