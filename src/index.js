import 'regenerator-runtime/runtime'

import Phaser from 'phaser'

import ScaleManager from 'phaser-harmony/scale/ScaleManager'

import pluginWebFontLoader from 'phaser-harmony/plugins/web-font-loader'
import pluginEasySize from 'phaser-harmony/plugins/easy-size'
import pluginEasyTweens from 'phaser-harmony/plugins/easy-tweens'
import pluginEasyTime from 'phaser-harmony/plugins/easy-time'
import pluginDOM from 'phaser-harmony/plugins/gameobjects/dom/DOMPlugin'
import pluginHTML5Video from 'phaser-harmony/plugins/gameobjects/html5video/HTML5VideoPlugin'
import pluginCanvasVideo from 'phaser-harmony/plugins/gameobjects/canvasvideo/CanvasVideoPlugin'

import env from './util/env'
import dc from './util/device-compatibility'

import Splash from './scenes/Splash'
import Loading from './scenes/Loading'
import Play from './scenes/Play'

if (env.isProduction()) {
  // remove useless reference of Phaser
  delete window.Phaser
}

dc.disableScroll()

const config = {
  type: Phaser.AUTO,
  autoFocus: true,
  parent: 'game-container',
  scaleManagerClass: ScaleManager,
  scaleMode: Phaser.Scale.FIT,
  autoCenter: Phaser.Scale.CENTER_BOTH,
  forceOrientation: true,
  banner: !env.isProduction(),
  width: 1080,
  height: 1750,
  backgroundColor: 0x000000,
  transparent: false,
  scene: [Splash, Loading, Play],
  physics: {
    default: 'arcade',
  },
  plugins: {
    global: [
      {
        key: 'WebFontLoader',
        plugin: pluginWebFontLoader,
        start: true,
      },
      { key: 'DOM', plugin: pluginDOM, start: true },
      { key: 'HTML5Video', plugin: pluginHTML5Video, start: true },
      { key: 'CanvasVideo', plugin: pluginCanvasVideo, start: true },
    ],
    scene: [
      { key: 'easySize', plugin: pluginEasySize, mapping: 'easySize' },
      { key: 'easyTweens', plugin: pluginEasyTweens, mapping: 'easyTweens' },
      { key: 'easyTime', plugin: pluginEasyTime, mapping: 'easyTime' },
    ],
  },
}

window.onload = function() {
  const game = new Phaser.Game(config)
  window.game = game
}
