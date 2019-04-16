import Phaser from 'phaser'

class EasyTimePlugin extends Phaser.Plugins.ScenePlugin {
  constructor(scene, pluginManager) {
    super(scene, pluginManager)
  }

  delay() {
    return new Promise(resolve => {
      const config = { delay: 1000, callback: resolve }
      this.scene.time.addEvent(config)
    })
  }
}

export default EasyTimePlugin
