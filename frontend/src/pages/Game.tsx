import { useEffect, useRef } from 'react'
import Phaser from 'phaser'
import TypingGameScene from '../game/TypingGameScene'

const Game = () => {
  const gameRef = useRef<Phaser.Game | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleResize() {
      if (gameRef.current) {
        const width = window.innerWidth;
        const height = window.innerHeight - 64; // Subtract navbar height (64px)
        gameRef.current.scale.resize(width, height);
        // Also update camera size for the active scene
        const scene = gameRef.current.scene.getAt(0);
        if (scene && scene.cameras && scene.cameras.main) {
          scene.cameras.main.setSize(width, height);
          scene.cameras.main.setViewport(0, 0, width, height);
        }
      }
    }

    if (containerRef.current && !gameRef.current) {
      const width = window.innerWidth
      const height = window.innerHeight - 64 // Subtract navbar height (64px)
      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width,
        height,
        parent: containerRef.current,
        backgroundColor: '#1f2937',
        scene: TypingGameScene,
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { x: 0, y: 0 },
            debug: false
          }
        }
      }

      gameRef.current = new Phaser.Game(config)
      window.addEventListener('resize', handleResize)
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      if (gameRef.current) {
        gameRef.current.destroy(true)
        gameRef.current = null
      }
    }
  }, [])

  return (
    <div className="game-container" style={{ width: '100%', height: 'calc(100vh - 64px)', margin: 0, padding: 0 }}>
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '100%',
          margin: 0,
          padding: 0,
        }}
      />
    </div>
  )
}

export default Game 