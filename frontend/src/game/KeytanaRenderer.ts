import Phaser from 'phaser'
import { KeytanaGenerator, KeytanaStats, KeytanaVisuals } from './KeytanaGenerator'

export class KeytanaRenderer {
  private scene: Phaser.Scene
  private keytanaGroup: Phaser.GameObjects.Group
  private pixelSize: number = 2

  constructor(scene: Phaser.Scene) {
    this.scene = scene
    this.keytanaGroup = this.scene.add.group()
  }

  renderKeytana(stats: KeytanaStats, x: number, y: number): Phaser.GameObjects.Group {
    // Clear previous keytana
    this.keytanaGroup.clear(true, true)

    // Generate keytana visuals
    const visuals = KeytanaGenerator.generateKeytana(stats)
    
    // Generate pixel art
    const pixels = KeytanaGenerator.generatePixelArt(visuals)
    
    // Render pixels as rectangles
    this.renderPixels(pixels, x, y)
    
    // Add stats text
    this.addStatsText(visuals, x, y + 150)
    
    return this.keytanaGroup
  }

  private renderPixels(pixels: number[][], startX: number, startY: number): void {
    for (let y = 0; y < pixels.length; y++) {
      for (let x = 0; x < pixels[y].length; x++) {
        const color = pixels[y][x]
        if (color !== 0) { // Skip transparent pixels
          const pixelX = startX + (x * this.pixelSize)
          const pixelY = startY + (y * this.pixelSize)
          
          const pixel = this.scene.add.rectangle(
            pixelX, 
            pixelY, 
            this.pixelSize, 
            this.pixelSize, 
            color
          )
          
          this.keytanaGroup.add(pixel)
        }
      }
    }
  }

  private addStatsText(visuals: KeytanaVisuals, x: number, y: number): void {
    const statsText = this.scene.add.text(x, y, 
      `Blade Length: ${visuals.bladeLength}\n` +
      `Sharpness: ${visuals.bladeSharpness}/10\n` +
      `Quality: ${visuals.bladeQuality}/10\n` +
      `Handle: ${visuals.handleQuality}/10\n` +
      `Guard: ${visuals.guardDesign}/10\n` +
      `Defects: ${visuals.defects.length}\n` +
      `Rarity: ${visuals.colorScheme}`, {
      fontSize: '14px',
      color: '#ffffff',
      fontFamily: 'JetBrains Mono, monospace',
      align: 'center'
    }).setOrigin(0.5)

    this.keytanaGroup.add(statsText)
  }

  setVisible(visible: boolean): void {
    this.keytanaGroup.setVisible(visible)
  }

  destroy(): void {
    this.keytanaGroup.destroy(true, true)
  }
} 