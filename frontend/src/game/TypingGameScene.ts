import Phaser from 'phaser'

export default class TypingGameScene extends Phaser.Scene {
  private textDisplay!: Phaser.GameObjects.Text
  private inputText!: Phaser.GameObjects.Text
  private currentText: string = ''
  private targetText: string = 'The quick brown fox jumps over the lazy dog.'
  private currentIndex: number = 0
  private startTime: number = 0
  private isGameActive: boolean = false

  constructor() {
    super({ key: 'TypingGameScene' })
  }

  create() {
    // Set background
    this.cameras.main.setBackgroundColor('#1f2937')

    // Create text display
    this.textDisplay = this.add.text(400, 200, this.targetText, {
      fontSize: '24px',
      color: '#ffffff',
      fontFamily: 'JetBrains Mono, monospace',
      wordWrap: { width: 700 }
    }).setOrigin(0.5)

    // Create input text
    this.inputText = this.add.text(400, 300, '', {
      fontSize: '20px',
      color: '#60a5fa',
      fontFamily: 'JetBrains Mono, monospace'
    }).setOrigin(0.5)

    // Create instructions
    this.add.text(400, 400, 'Start typing to begin the game!', {
      fontSize: '16px',
      color: '#9ca3af',
      fontFamily: 'JetBrains Mono, monospace'
    }).setOrigin(0.5)

    // Set up keyboard input
    this.input.keyboard?.on('keydown', this.handleKeyDown, this)

    // Start game when first key is pressed
    this.input.keyboard?.on('keydown-ANY', () => {
      if (!this.isGameActive) {
        this.startGame()
      }
    })
  }

  private startGame() {
    this.isGameActive = true
    this.startTime = Date.now()
    this.currentText = ''
    this.currentIndex = 0
    this.updateDisplay()
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (!this.isGameActive) return

    const key = event.key

    if (key === 'Backspace') {
      if (this.currentText.length > 0) {
        this.currentText = this.currentText.slice(0, -1)
        this.currentIndex = Math.max(0, this.currentIndex - 1)
      }
    } else if (key.length === 1) {
      this.currentText += key
      this.currentIndex++
    }

    this.updateDisplay()

    // Check if game is complete
    if (this.currentText === this.targetText) {
      this.endGame()
    }
  }

  private updateDisplay() {
    // Update input text
    this.inputText.setText(this.currentText)

    // Update target text with highlighting
    let highlightedText = ''
    for (let i = 0; i < this.targetText.length; i++) {
      if (i < this.currentText.length) {
        if (this.currentText[i] === this.targetText[i]) {
          highlightedText += `%c[${this.targetText[i]}]%c`
        } else {
          highlightedText += `%e[${this.targetText[i]}]%e`
        }
      } else {
        highlightedText += this.targetText[i]
      }
    }

    this.textDisplay.setText(highlightedText)
  }

  private endGame() {
    const endTime = Date.now()
    const duration = (endTime - this.startTime) / 1000
    const wpm = Math.round((this.targetText.length / 5) / (duration / 60))
    const accuracy = Math.round((this.currentText.length / this.targetText.length) * 100)

    this.isGameActive = false

    // Display results
    this.add.text(400, 500, `Game Complete!\nWPM: ${wpm}\nAccuracy: ${accuracy}%`, {
      fontSize: '20px',
      color: '#10b981',
      fontFamily: 'JetBrains Mono, monospace',
      align: 'center'
    }).setOrigin(0.5)

    // Add restart instruction
    this.add.text(400, 600, 'Press SPACE to restart', {
      fontSize: '16px',
      color: '#9ca3af',
      fontFamily: 'JetBrains Mono, monospace'
    }).setOrigin(0.5)

    // Listen for restart
    this.input.keyboard?.once('keydown-SPACE', () => {
      this.scene.restart()
    })
  }
} 