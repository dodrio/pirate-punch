import 'regenerator-runtime/runtime'

import Phaser from 'phaser'
import WebFontLoaderPlugin from './plugins/web-font-loader'

import env from './util/env'
import dc from './util/device-compatibility'

import Boot from './scenes/Boot'
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
  scene: [Boot, Play],
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
  },
}

window.onload = function() {
  const game = new Phaser.Game(config)
  window.game = game
}
