export interface KeytanaStats {
  wpm: number
  accuracy: number
  mistakes: number
  timeElapsed: number
}

export interface KeytanaVisuals {
  bladeLength: number
  bladeSharpness: number
  bladeQuality: number
  handleQuality: number
  guardDesign: number
  defects: string[]
  colorScheme: string
}

export class KeytanaGenerator {
  private static readonly MAX_BLADE_LENGTH = 60
  private static readonly MIN_BLADE_LENGTH = 30
  private static readonly MAX_SHARPNESS = 10
  private static readonly MAX_QUALITY = 10

  static generateKeytana(stats: KeytanaStats): KeytanaVisuals {
    const visuals: KeytanaVisuals = {
      bladeLength: this.calculateBladeLength(stats.wpm),
      bladeSharpness: this.calculateSharpness(stats.accuracy),
      bladeQuality: this.calculateBladeQuality(stats.accuracy, stats.mistakes),
      handleQuality: this.calculateHandleQuality(stats),
      guardDesign: this.calculateGuardDesign(stats),
      defects: this.generateDefects(stats),
      colorScheme: this.determineColorScheme(stats)
    }

    return visuals
  }

  private static calculateBladeLength(wpm: number): number {
    // WPM affects blade length: 0-30 WPM = short, 30-60 WPM = medium, 60+ WPM = long
    if (wpm < 30) {
      return this.MIN_BLADE_LENGTH
    } else if (wpm < 60) {
      return this.MIN_BLADE_LENGTH + (wpm - 30) * 0.5
    } else {
      return this.MAX_BLADE_LENGTH
    }
  }

  private static calculateSharpness(accuracy: number): number {
    // Accuracy directly affects sharpness: 0-100% maps to 0-10
    return Math.round((accuracy / 100) * this.MAX_SHARPNESS)
  }

  private static calculateBladeQuality(accuracy: number, mistakes: number): number {
    // Quality is based on accuracy but reduced by mistakes
    let quality = (accuracy / 100) * this.MAX_QUALITY
    const mistakePenalty = Math.min(mistakes * 0.5, 5) // Max 5 point penalty
    quality = Math.max(quality - mistakePenalty, 1) // Minimum quality of 1
    return Math.round(quality)
  }

  private static calculateHandleQuality(stats: KeytanaStats): number {
    // Handle quality based on overall performance
    const avgWpm = stats.wpm / 100 // Normalize WPM
    const avgAccuracy = stats.accuracy / 100
    const timeEfficiency = Math.max(0, 1 - (stats.timeElapsed / 60)) // Penalize slow times
    
    const quality = (avgWpm + avgAccuracy + timeEfficiency) / 3 * this.MAX_QUALITY
    return Math.round(Math.max(quality, 1))
  }

  private static calculateGuardDesign(stats: KeytanaStats): number {
    // Guard design based on consistency (low variance in performance)
    const consistency = Math.max(0, 1 - (stats.mistakes / 10)) // Fewer mistakes = better consistency
    return Math.round(consistency * this.MAX_QUALITY)
  }

  private static generateDefects(stats: KeytanaStats): string[] {
    const defects: string[] = []
    
    // Mistakes create blade defects
    if (stats.mistakes > 0) {
      if (stats.mistakes >= 5) defects.push('chipped_blade')
      if (stats.mistakes >= 3) defects.push('rust_spots')
      if (stats.mistakes >= 7) defects.push('bent_blade')
      if (stats.mistakes >= 10) defects.push('cracked_blade')
    }
    
    // Low accuracy creates quality issues
    if (stats.accuracy < 80) {
      defects.push('dull_edge')
    }
    if (stats.accuracy < 60) {
      defects.push('rough_surface')
    }
    
    // Slow WPM creates craftsmanship issues
    if (stats.wpm < 20) {
      defects.push('uneven_grind')
    }
    if (stats.wpm < 10) {
      defects.push('poor_balance')
    }
    
    return defects
  }

  private static determineColorScheme(stats: KeytanaStats): string {
    const performance = (stats.wpm / 100 + stats.accuracy / 100) / 2
    
    if (performance >= 0.9) return 'legendary' // Gold/white
    if (performance >= 0.8) return 'epic'      // Blue/silver
    if (performance >= 0.7) return 'rare'      // Green/bronze
    if (performance >= 0.6) return 'common'    // Gray/steel
    return 'rusty'                             // Brown/rust
  }

  // Generate pixel art data for the Keytana
  static generatePixelArt(visuals: KeytanaVisuals): number[][] {
    const width = 64
    const height = 32
    const pixels: number[][] = Array(height).fill(null).map(() => Array(width).fill(0))
    
    // Color palette (0 = transparent, 1-8 = different colors)
    const colors = this.getColorPalette(visuals.colorScheme)
    
    // Draw handle (bottom part)
    this.drawHandle(pixels, colors, visuals.handleQuality)
    
    // Draw guard
    this.drawGuard(pixels, colors, visuals.guardDesign)
    
    // Draw blade
    this.drawBlade(pixels, colors, visuals)
    
    // Apply defects
    this.applyDefects(pixels, visuals.defects)
    
    return pixels
  }

  private static getColorPalette(colorScheme: string): number[] {
    switch (colorScheme) {
      case 'legendary':
        return [0, 0xFFFF00, 0xFFFFFF, 0xFFD700, 0x000000] // Gold/white
      case 'epic':
        return [0, 0x0066FF, 0xC0C0C0, 0x0044CC, 0x000000] // Blue/silver
      case 'rare':
        return [0, 0x00FF00, 0xCD7F32, 0x008800, 0x000000] // Green/bronze
      case 'common':
        return [0, 0x808080, 0xC0C0C0, 0x404040, 0x000000] // Gray/steel
      case 'rusty':
        return [0, 0x8B4513, 0xA0522D, 0x654321, 0x000000] // Brown/rust
      default:
        return [0, 0x808080, 0xC0C0C0, 0x404040, 0x000000]
    }
  }

  private static drawHandle(pixels: number[][], colors: number[], quality: number): void {
    const handleWidth = 12
    const handleHeight = Math.max(4, quality)
    const startX = 52
    const startY = 16 - Math.floor(handleHeight / 2)
    
    // Draw handle base
    for (let y = startY; y < startY + handleHeight; y++) {
      for (let x = startX; x < startX + handleWidth; x++) {
        if (x >= 0 && x < 64 && y >= 0 && y < 32) {
          pixels[y][x] = colors[2] // Handle color
        }
      }
    }
    
    // Add handle wrapping based on quality
    if (quality >= 7) {
      for (let y = startY; y < startY + handleHeight; y++) {
        for (let x = startX + 2; x < startX + handleWidth - 2; x += 2) {
          if (x >= 0 && x < 64 && y >= 0 && y < 32) {
            pixels[y][x] = colors[3] // Wrapping color
          }
        }
      }
    }
  }

  private static drawGuard(pixels: number[][], colors: number[], design: number): void {
    const guardWidth = 4
    const guardHeight = Math.max(8, design * 2)
    const startX = 40
    const startY = 16 - Math.floor(guardHeight / 2)
    
    // Draw guard base
    for (let y = startY; y < startY + guardHeight; y++) {
      for (let x = startX; x < startX + guardWidth; x++) {
        if (x >= 0 && x < 64 && y >= 0 && y < 32) {
          pixels[y][x] = colors[1] // Guard color
        }
      }
    }
    
    // Add guard details based on design quality
    if (design >= 5) {
      // Add decorative elements
      for (let y = startY + 2; y < startY + guardHeight - 2; y += 2) {
        if (startX >= 0 && startX < 64 && y >= 0 && y < 32) {
          pixels[y][startX] = colors[3]
        }
      }
    }
  }

  private static drawBlade(pixels: number[][], colors: number[], visuals: KeytanaVisuals): void {
    const bladeWidth = Math.min(visuals.bladeLength, 40)
    const bladeHeight = Math.max(2, visuals.bladeSharpness)
    const startX = 0
    const startY = 16 - Math.floor(bladeHeight / 2)
    
    // Draw blade
    for (let y = startY; y < startY + bladeHeight; y++) {
      for (let x = startX; x < startX + bladeWidth; x++) {
        if (x >= 0 && x < 64 && y >= 0 && y < 32) {
          pixels[y][x] = colors[1] // Blade color
        }
      }
    }
    
    // Add blade edge based on sharpness
    if (visuals.bladeSharpness >= 7) {
      for (let x = startX; x < startX + bladeWidth; x++) {
        if (x >= 0 && x < 64 && startY - 1 >= 0 && startY - 1 < 32) {
          pixels[startY - 1][x] = colors[0] // Sharp edge
        }
        if (x >= 0 && x < 64 && startY + bladeHeight < 32) {
          pixels[startY + bladeHeight][x] = colors[0] // Sharp edge
        }
      }
    }
    
    // Add blade shine based on quality
    if (visuals.bladeQuality >= 6) {
      for (let x = startX + 2; x < startX + bladeWidth - 2; x += 4) {
        const shineY = startY + Math.floor(bladeHeight / 2)
        if (x >= 0 && x < 64 && shineY >= 0 && shineY < 32) {
          pixels[shineY][x] = colors[2] // Shine color
        }
      }
    }
  }

  private static applyDefects(pixels: number[][], defects: string[]): void {
    defects.forEach(defect => {
      switch (defect) {
        case 'chipped_blade':
          this.addChip(pixels)
          break
        case 'rust_spots':
          this.addRustSpots(pixels)
          break
        case 'bent_blade':
          this.addBend(pixels)
          break
        case 'cracked_blade':
          this.addCrack(pixels)
          break
        case 'dull_edge':
          this.addDullEdge(pixels)
          break
        case 'rough_surface':
          this.addRoughSurface(pixels)
          break
        case 'uneven_grind':
          this.addUnevenGrind(pixels)
          break
        case 'poor_balance':
          this.addPoorBalance(pixels)
          break
      }
    })
  }

  private static addChip(pixels: number[][]): void {
    // Add a chip in the blade
    const chipX = 10 + Math.floor(Math.random() * 20)
    const chipY = 14 + Math.floor(Math.random() * 4)
    if (chipX >= 0 && chipX < 64 && chipY >= 0 && chipY < 32) {
      pixels[chipY][chipX] = 0 // Transparent chip
    }
  }

  private static addRustSpots(pixels: number[][]): void {
    // Add rust spots
    for (let i = 0; i < 3; i++) {
      const rustX = 5 + Math.floor(Math.random() * 30)
      const rustY = 12 + Math.floor(Math.random() * 8)
      if (rustX >= 0 && rustX < 64 && rustY >= 0 && rustY < 32) {
        pixels[rustY][rustX] = 0x8B4513 // Rust color
      }
    }
  }

  private static addBend(pixels: number[][]): void {
    // Add a slight bend to the blade
    for (let x = 15; x < 25; x++) {
      const bendY = 16 + Math.sin((x - 15) * 0.3) * 2
      const y = Math.floor(bendY)
      if (x >= 0 && x < 64 && y >= 0 && y < 32) {
        pixels[y][x] = pixels[16][x] // Move blade pixels
        pixels[16][x] = 0 // Clear original position
      }
    }
  }

  private static addCrack(pixels: number[][]): void {
    // Add a crack in the blade
    const crackY = 15
    for (let x = 8; x < 18; x += 2) {
      if (x >= 0 && x < 64 && crackY >= 0 && crackY < 32) {
        pixels[crackY][x] = 0x000000 // Black crack
      }
    }
  }

  private static addDullEdge(pixels: number[][]): void {
    // Make the blade edge dull
    for (let x = 5; x < 35; x++) {
      if (x >= 0 && x < 64 && 14 >= 0 && 14 < 32) {
        pixels[14][x] = 0x808080 // Dull edge
      }
      if (x >= 0 && x < 64 && 18 >= 0 && 18 < 32) {
        pixels[18][x] = 0x808080 // Dull edge
      }
    }
  }

  private static addRoughSurface(pixels: number[][]): void {
    // Add rough surface texture
    for (let x = 5; x < 35; x += 3) {
      for (let y = 15; y < 17; y++) {
        if (x >= 0 && x < 64 && y >= 0 && y < 32) {
          pixels[y][x] = 0x404040 // Rough texture
        }
      }
    }
  }

  private static addUnevenGrind(pixels: number[][]): void {
    // Add uneven grinding marks
    for (let x = 5; x < 35; x += 2) {
      const offset = Math.sin(x * 0.5) * 0.5
      const y = 15 + Math.floor(offset)
      if (x >= 0 && x < 64 && y >= 0 && y < 32) {
        pixels[y][x] = 0x606060 // Grinding marks
      }
    }
  }

  private static addPoorBalance(pixels: number[][]): void {
    // Add poor balance by making handle crooked
    for (let x = 45; x < 55; x++) {
      const offset = Math.sin((x - 45) * 0.5) * 1
      const y = 16 + Math.floor(offset)
      if (x >= 0 && x < 64 && y >= 0 && y < 32) {
        pixels[y][x] = pixels[16][x] // Move handle pixels
        pixels[16][x] = 0 // Clear original position
      }
    }
  }
} 