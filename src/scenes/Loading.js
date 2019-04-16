import Phaser from 'phaser'
import res from 'res'

class Loading extends Phaser.Scene {
  constructor() {
    super('Loading')
  }

  async create() {
    const updateProgressCallback = this.addProgress()

    const mixerProgress = { value: 0 }

    const updateSyntheticalProgress = () => {
      const progress = this.load.progress * 0.5 + mixerProgress.value * 0.5
      updateProgressCallback(progress)
    }

    // real progress
    this.load.image('background', res.url('image.background'))
    this.load.image('stump', res.url('image.stump'))
    this.load.image('trunk1', res.url('image.trunk1'))
    this.load.image('trunk2', res.url('image.trunk2'))
    this.load.image('branchLeft', res.url('image.branch_left'))
    this.load.image('branchRight', res.url('image.branch_right'))
    this.load.image('btn-play', res.url('image.btn-play'))

    this.load.atlas(
      'man',
      res.url('image.man', { type: 'image' }),
      res.url('image.man', { type: 'json' })
    )

    this.load.audio('theme', res.url('sound.theme'))
    this.load.audio('cut', res.url('sound.cut'))
    this.load.audio('death', res.url('sound.death'))

    this.load.on('progress', progress => {
      updateProgressCallback(progress)
    })

    const filesLoaded = new Promise(resolve => {
      this.load.once('complete', resolve)
    })
    this.load.start()

    // fake progress
    const mixerLoaded = new Promise(resolve => {
      this.tweens.add({
        targets: mixerProgress,
        value: 1,
        duration: 1000,
        onUpdate: updateSyntheticalProgress,
        onComplete: resolve,
        ease: 'Power2',
      })
    })

    await Promise.all([filesLoaded, mixerLoaded])
    await this.easyTime.delay(500)

    this.nextScene()
  }

  addProgress() {
    const { gameCenterX, gameCenterY, gameWidth } = this.easySize

    const progressBoxX = 200
    const progressBoxY = gameCenterY
    const progressBoxWidth = gameWidth - 2 * progressBoxX
    const progressBoxHeight = 70

    const progressBarX = progressBoxX + 10
    const progressBarY = progressBoxY + 10
    const progressBarWidth = progressBoxWidth - 20
    const progressBarHeight = progressBoxHeight - 20

    const percentTextX = gameCenterX
    const percentTextY = gameCenterY + progressBoxHeight / 2

    const progressBox = this.add.graphics()
    progressBox.fillStyle(0x333333)
    progressBox.fillRect(
      progressBoxX,
      progressBoxY,
      progressBoxWidth,
      progressBoxHeight
    )

    const progressBar = this.add.graphics()

    const percentText = this.add
      .text(percentTextX, percentTextY, '0%', {
        fontFamily: 'Stacked Pixel',
        fontSize: 40,
        color: '#000000',
      })
      .setOrigin(0.5)

    return function updateProgressBar(progress) {
      progressBar.clear()
      progressBar.fillStyle(0xffffff, 1)
      progressBar.fillRect(
        progressBarX,
        progressBarY,
        progressBarWidth * progress,
        progressBarHeight
      )

      percentText.setText(Number.parseInt(progress * 100) + '%')
    }
  }

  nextScene() {
    this.scene.start('Play')
  }
}

export default Loading
