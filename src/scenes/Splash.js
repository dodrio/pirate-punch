import Phaser from 'phaser'
import res from 'res'

class Splash extends Phaser.Scene {
  constructor() {
    super('Splash')
  }

  preload() {
    this.load.webFont('Stacked Pixel', res.url('font.stacked-pixel'))
    this.load.image('phaser-logo', res.url('image.phaser-logo'))
  }

  async create() {
    const { gameCenterX, gameCenterY } = this.easySize

    const slogan = this.createSlogan()
    slogan.setPosition(gameCenterX, gameCenterY)
    this.add.existing(slogan)

    await this.easyTweens.fadeIn(slogan)
    await this.easyTime.delay(1500)
    await this.easyTweens.fadeOut(slogan)

    const phaserLogo = this.createPhaserLogo()
    phaserLogo.setPosition(gameCenterX, gameCenterY - 60)
    this.add.existing(phaserLogo)

    const phaserPower = this.createPhaserPower()
    phaserPower.setPosition(gameCenterX, gameCenterY + 180)
    this.add.existing(phaserPower)

    await this.easyTweens.fadeIn([phaserLogo, phaserPower])
    await this.easyTime.delay(1500)
  }

  createSlogan() {
    return this.make
      .text(
        {
          text: 'YIZ DESIGN',
          style: {
            font: '150px Stacked Pixel',
            fill: '#ffffff',
          },
        },
        false
      )
      .setOrigin(0.5)
      .setAlpha(0)
  }

  createPhaserLogo() {
    return this.make.sprite({ key: 'phaser-logo' }, false).setAlpha(0)
  }

  createPhaserPower() {
    return this.make
      .text(
        {
          text: 'POWER BY PHASER',
          style: {
            font: '60px Stacked Pixel',
            fill: '#ffffff',
          },
        },
        false
      )
      .setOrigin(0.5)
      .setAlpha(0)
  }

  nextScene() {
    this.scene.start('Boot')
  }
}

export default Splash
