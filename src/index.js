import 'regenerator-runtime/runtime'

import Phaser from 'phaser'
import WebFontLoaderPlugin from './plugins/web-font-loader'
import pluginEasySize from './plugins/easy-size'
import pluginEasyTweens from './plugins/easy-tweens'
import pluginEasyTime from './plugins/easy-time'

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
        plugin: WebFontLoaderPlugin,
        start: true,
      },
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
