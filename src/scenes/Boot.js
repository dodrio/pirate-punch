import Phaser from 'phaser'
import res from 'res'

class Boot extends Phaser.Scene {
  constructor() {
    super('Boot')
  }

  init() {
    const { width, height } = this.game.config
    this.gameWidth = width
    this.gameHeight = height
    this.gameCenterX = width / 2
    this.gameCenterY = height / 2
  }

  preload() {
    this.load.webFont('Stacked Pixel', res.url('font.stacked-pixel'))
  }

  create() {
    const progressBoxX = 200
    const progressBoxY = this.gameCenterY
    const progressBoxWidth = this.gameWidth - 2 * progressBoxX
    const progressBoxHeight = 70

    const progressBarX = progressBoxX + 10
    const progressBarY = progressBoxY + 10
    const progressBarWidth = progressBoxWidth - 20
    const progressBarHeight = progressBoxHeight - 20

    const percentTextX = this.gameCenterX
    const percentTextY = this.gameCenterY + progressBoxHeight / 2

    const assetTextX = this.gameCenterX
    const assetTextY = this.gameCenterY + 100

    const progressBar = this.add.graphics()

    const progressBox = this.add.graphics()
    progressBox.fillStyle(0x222222, 0.5)
    progressBox.fillRect(
      progressBoxX,
      progressBoxY,
      progressBoxWidth,
      progressBoxHeight
    )

    const percentText = this.add
      .text(percentTextX, percentTextY, '0%', {
        fontFamily: 'Stacked Pixel',
        fontSize: 40,
        color: '#ffffff',
      })
      .setOrigin(0.5)

    const assetText = this.add
      .text(assetTextX, assetTextY, '', {
        fontFamily: 'Stacked Pixel',
        fontSize: 40,
        color: '#ffffff',
      })
      .setOrigin(0.5, 0.5)

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

    this.load.on('progress', function(progress) {
      progressBar.clear()
      progressBar.fillStyle(0xffffff, 1)
      progressBar.fillRect(
        progressBarX,
        progressBarY,
        progressBarWidth * progress,
        progressBarHeight
      )

      percentText.setText(Number.parseInt(progress * 100) + '%')
    })

    this.load.on('fileprogress', function(file) {
      assetText.setText('Loading asset: ' + file.src)
    })

    this.load.once('complete', () => {
      progressBar.destroy()
      progressBox.destroy()
      percentText.destroy()
      assetText.destroy()

      this.nextScene()
    })

    this.load.start()
  }

  nextScene() {
    this.scene.start('Play')
  }
}

export default Boot
