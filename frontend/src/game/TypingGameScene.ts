import Phaser from 'phaser'

const COMMON_WORDS = [
  'the','be','to','of','and','a','in','that','have','I','it','for','not','on','with','he','as','you','do','at',
  'this','but','his','by','from','they','we','say','her','she','or','an','will','my','one','all','would','there','their',
  'what','so','up','out','if','about','who','get','which','go','me','when','make','can','like','time','no','just','him',
  'know','take','people','into','year','your','good','some','could','them','see','other','than','then','now','look','only',
  'come','its','over','think','also','back','after','use','two','how','our','work','first','well','way','even','new','want',
  'because','any','these','give','day','most','us','is','are','was','were','has','had','did','been','does','having','each',
  'many','much','where','why','while','might','must','should','shall','may','very','every','again','off','down','still',
  'through','before','between','under','above','against','during','without','within','across','behind','beyond','upon',
  'since','until','among','around','toward','towards','upon','amongst','beside','besides','despite','except','inside',
  'outside','per','plus','regarding','round','save','than','unlike','versus','via','with','within','without','yes','no',
  'always','never','sometimes','often','usually','rarely','seldom','already','soon','late','early','ago','yet','once',
  'twice','next','last','least','most','more','less','enough','too','just','almost','quite','rather','really','simply',
  'truly','surely','certainly','clearly','obviously','perhaps','maybe','probably','possibly','definitely','absolutely',
  'actually','basically','generally','mainly','mostly','particularly','specifically','especially','seriously','honestly',
  'frankly','literally','virtually','nearly','barely','hardly','scarcely','merely','solely','totally','utterly','fully',
  'completely','entirely','wholly','partly','mostly','somewhat','altogether','together','apart','alone','along','ahead',
  'behind','below','beneath','beside','beyond','close','far','near','nearby','opposite','adjacent','distant','remote',
  'further','farthest','nearest','closest','deep','shallow','thick','thin','wide','narrow','broad','tiny','huge','large',
  'small','big','short','long','tall','high','low','old','young','new','ancient','modern','recent','future','past','present',
  'quick','slow','fast','rapid','sudden','gradual','steady','brief','temporary','permanent','constant','frequent','infrequent',
  'occasional','regular','irregular','usual','unusual','normal','abnormal','common','rare','unique','special','ordinary',
  'typical','atypical','familiar','unfamiliar','strange','weird','odd','curious','peculiar','bizarre','funny','amusing',
  'entertaining','boring','dull','exciting','thrilling','interesting','fascinating','amazing','incredible','wonderful',
  'marvelous','fantastic','terrific','awesome','awful','terrible','horrible','dreadful','frightful','fearful','scary',
  'creepy','spooky','chilling','alarming','shocking','surprising','unexpected','predictable','unpredictable','likely',
  'unlikely','possible','impossible','certain','uncertain','doubtful','hopeful','hopeless','optimistic','pessimistic',
  'positive','negative','happy','sad','joyful','cheerful','miserable','depressed','angry','furious','mad','upset','calm',
  'peaceful','relaxed','tense','nervous','anxious','worried','afraid','brave','courageous','fearless','timid','shy',
  'confident','proud','ashamed','embarrassed','guilty','innocent','honest','dishonest','truthful','deceitful','loyal',
  'faithful','unfaithful','trustworthy','reliable','unreliable','responsible','irresponsible','careful','careless',
  'thoughtful','thoughtless','considerate','inconsiderate','polite','rude','kind','unkind','friendly','unfriendly',
  'helpful','unhelpful','generous','selfish','selfless','greedy','mean','cruel','gentle','rough','soft','hard','firm',
  'strong','weak','powerful','powerless','capable','incapable','able','unable','fit','unfit','healthy','unhealthy',
  'sick','ill','well','fine','bad','good','better','best','worse','worst','right','wrong','correct','incorrect','true',
  'false','real','fake','genuine','artificial','natural','unnatural','normal','abnormal','usual','unusual','regular',
  'irregular','standard','nonstandard','typical','atypical','average','above','below','equal','unequal','same','different'
];

function getRandomSentence(): string {
  const words = [...COMMON_WORDS];
  for (let i = words.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [words[i], words[j]] = [words[j], words[i]];
  }
  return words.slice(0, 15).join(' ');
}

const MOTIVATIONAL_MESSAGES = [
  "Keep going, you're getting better every time!",
  "Great job! Practice makes perfect.",
  "Every keystroke is progress!",
  "You're on your way to mastery!",
  "Mistakes are proof that you are trying.",
  "Stay focused and keep typing!",
  "Your speed is improving!",
  "Accuracy is key—well done!",
  "You’re building muscle memory!",
  "Keep your eyes on the goal!",
  "Every session counts!",
  "You’re typing like a pro!",
  "Don’t stop now!",
  "You’re crushing it!",
  "Keep your fingers moving!",
  "You’re making great progress!",
  "Stay positive and keep practicing!",
  "You’re getting faster!",
  "Your accuracy is impressive!",
  "Keep up the great work!",
  "You’re unstoppable!",
  "Every mistake is a lesson.",
  "You’re on fire!",
  "Keep challenging yourself!",
  "You’re a typing champion!",
  "Practice makes progress!",
  "You’re getting closer to your goal!",
  "Keep your momentum going!",
  "You’re a keyboard wizard!",
  "Stay sharp and keep going!",
  "You’re building great habits!",
  "Keep your hands relaxed!",
  "You’re a typing superstar!",
  "Stay motivated and keep typing!",
  "You’re making every second count!",
  "Keep your rhythm steady!",
  "You’re improving with every word!",
  "Stay determined!",
  "You’re a typing machine!",
  "Keep your focus!",
  "You’re getting more accurate!",
  "Stay consistent!",
  "You’re mastering the keyboard!",
  "Keep your eyes on the screen!",
  "You’re making fewer mistakes!",
  "Stay patient and persistent!",
  "You’re typing with confidence!",
  "Keep your posture straight!",
  "You’re learning fast!",
  "Stay calm and keep typing!",
  "You’re getting smoother!",
  "Keep your energy up!",
  "You’re on the right track!",
  "Stay curious and keep learning!",
  "You’re building speed!",
  "Keep your mind sharp!",
  "You’re typing smarter!",
  "Stay relaxed and keep going!",
  "You’re making steady progress!",
  "Keep your motivation high!",
  "You’re getting more comfortable!",
  "Stay focused on your goals!",
  "You’re typing with style!",
  "Keep your hands nimble!",
  "You’re getting better every day!",
  "Stay positive and keep improving!",
  "You’re a quick learner!",
  "Keep your spirits high!",
  "You’re typing with precision!",
  "Stay determined and keep practicing!",
  "You’re making it look easy!",
  "Keep your accuracy up!",
  "You’re a typing legend!",
  "Stay motivated and keep pushing!",
  "You’re getting closer to perfection!",
  "Keep your fingers flying!",
  "You’re typing with purpose!",
  "Stay focused and keep progressing!",
  "You’re a keyboard master!",
  "Keep your eyes on the prize!",
  "You’re typing at lightning speed!",
  "Stay sharp and keep practicing!",
  "You’re making great strides!",
  "Keep your momentum strong!",
  "You’re a typing expert!",
  "Stay patient and keep improving!",
  "You’re typing with confidence and skill!",
  "Keep your practice consistent!",
  "You’re getting faster and more accurate!",
  "Stay positive and keep learning!",
  "You’re a typing superstar in the making!",
  "Keep your focus and keep going!",
  "You’re making typing look easy!",
  "Stay motivated and keep striving!",
  "You’re on your way to greatness!",
  "Keep your hands moving!",
  "You’re typing with excellence!",
  "Stay determined and keep achieving!",
  "You’re building a great skill!",
  "Keep your progress steady!",
  "You’re a typing hero!",
  "Stay focused and keep winning!"
];

function getRandomMotivationalMessage(): string {
  const idx = Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length);
  return MOTIVATIONAL_MESSAGES[idx];
}

// Color scheme
const COLOR_NEUTRAL = '#5eead4'; // soft blueish teal
const COLOR_GOOD = '#ffe066'; // bright yellow
const COLOR_BAD = '#ff4d4f'; // bright red

// Group keys by finger for better visual separation
const QWERTY_FINGER_GROUPS = [
  // Row 1: qwertyuiop
  [
    ['q'],           // l-pinky
    ['w'],           // l-ring  
    ['e'],           // l-middle
    ['r', 't'],      // l-index
    ['y', 'u'],      // r-index
    ['i'],           // r-middle
    ['o'],           // r-ring
    ['p']            // r-pinky
  ],
  // Row 2: asdfghjkl
  [
    ['a'],           // l-pinky
    ['s'],           // l-ring
    ['d'],           // l-middle
    ['f', 'g'],      // l-index
    ['h', 'j'],      // r-index
    ['k'],           // r-middle
    ['l']            // r-ring
  ],
  // Row 3: zxcvbnm
  [
    ['z'],           // l-pinky
    ['x'],           // l-ring
    ['c'],           // l-middle
    ['v', 'b'],      // l-index
    ['n', 'm']       // r-index
  ],
  // Row 4: space
  [
    [' ']            // thumb
  ]
];

// Finger mapping for QWERTY
const FINGER_KEY_MAP: { [key: string]: 'l-pinky'|'l-ring'|'l-middle'|'l-index'|'r-index'|'r-middle'|'r-ring'|'r-pinky'|'thumb' } = {
  // Left hand
  q: 'l-pinky', a: 'l-pinky', z: 'l-pinky',
  w: 'l-ring', s: 'l-ring', x: 'l-ring',
  e: 'l-middle', d: 'l-middle', c: 'l-middle',
  r: 'l-index', f: 'l-index', v: 'l-index', t: 'l-index', g: 'l-index', b: 'l-index',
  // Right hand
  y: 'r-index', h: 'r-index', n: 'r-index', u: 'r-index', j: 'r-index', m: 'r-index',
  i: 'r-middle', k: 'r-middle',
  o: 'r-ring', l: 'r-ring',
  p: 'r-pinky',
  // Space
  ' ': 'thumb',
};

const FINGER_HOME_POSITIONS = {
  'l-pinky':   { row: 1, col: 0 }, // a
  'l-ring':    { row: 1, col: 1 }, // s
  'l-middle':  { row: 1, col: 2 }, // d
  'l-index':   { row: 1, col: 3.5 }, // f/g (between)
  'r-index':   { row: 1, col: 5.5 }, // h/j (between)
  'r-middle':  { row: 1, col: 7 }, // k
  'r-ring':    { row: 1, col: 8 }, // l
  'r-pinky':   { row: 0, col: 9 }, // p
  'thumb':     { row: 3, col: 0 }, // space
};

// Key fill color mapping for legend
const KEY_LEGEND_FILL: { [key: string]: { color: number, alpha: number } } = {
  // dark gray
  q: { color: 0x1e1e1e, alpha: 0.27 }, a: { color: 0x1e1e1e, alpha: 0.27 }, z: { color: 0x1e1e1e, alpha: 0.27 }, p: { color: 0x1e1e1e, alpha: 0.27 },
  // gray
  w: { color: 0x3c3c3c, alpha: 0.27 }, s: { color: 0x3c3c3c, alpha: 0.27 }, x: { color: 0x3c3c3c, alpha: 0.27 }, o: { color: 0x3c3c3c, alpha: 0.27 }, l: { color: 0x3c3c3c, alpha: 0.27 },
  // light gray
  e: { color: 0x787878, alpha: 0.27 }, d: { color: 0x787878, alpha: 0.27 }, c: { color: 0x787878, alpha: 0.27 }, i: { color: 0x787878, alpha: 0.27 }, k: { color: 0x787878, alpha: 0.27 },
  // lighter gray
  r: { color: 0xb4b4b4, alpha: 0.27 }, f: { color: 0xb4b4b4, alpha: 0.27 }, v: { color: 0xb4b4b4, alpha: 0.27 }, t: { color: 0xb4b4b4, alpha: 0.27 }, g: { color: 0xb4b4b4, alpha: 0.27 }, b: { color: 0xb4b4b4, alpha: 0.27 },
  y: { color: 0xb4b4b4, alpha: 0.27 }, h: { color: 0xb4b4b4, alpha: 0.27 }, n: { color: 0xb4b4b4, alpha: 0.27 }, u: { color: 0xb4b4b4, alpha: 0.27 }, j: { color: 0xb4b4b4, alpha: 0.27 }, m: { color: 0xb4b4b4, alpha: 0.27 }
};

export default class TypingGameScene extends Phaser.Scene {
  private targetText: string = '';
  private playerInput: string = '';
  private isGameActive: boolean = false;
  private startTime: number = 0;
  private endTime: number = 0;
  private characterObjects: Phaser.GameObjects.Text[] = [];
  private statsText?: Phaser.GameObjects.Text;
  private layoutInfo: { x: number, y: number }[] = [];
  private timeText?: Phaser.GameObjects.Text;
  private updateTimer?: Phaser.Time.TimerEvent;
  private hasStartedTyping: boolean = false;
  private wpmHistory: number[] = [];
  private correctWordsHistory: number[] = [];
  private lastWpmUpdateTime: number = 0;
  private previousWpmHistory: number[] = [];
  private previousStatsGraphics?: Phaser.GameObjects.Graphics;
  private endGameStatsObjects: Phaser.GameObjects.GameObject[] = [];
  private keyboardLegendKeys: Phaser.GameObjects.Rectangle[] = [];
  private keyboardLegendLabels: Phaser.GameObjects.Text[] = [];


  create() {
    this.startNewGame();
    this.input.keyboard?.on('keydown', this.handleKeyDown, this);
    this.scale.on('resize', this.handleResize, this);
    this.updateKeyboardLegend();
  }

  private clearCharacterObjects() {
    // Only clear the sentence/game text when starting a new game
    this.characterObjects.forEach(obj => obj.destroy());
    this.characterObjects = [];
    if (this.timeText) {
      this.timeText.destroy();
      this.timeText = undefined;
    }
    if (this.updateTimer) {
      this.updateTimer.destroy();
      this.updateTimer = undefined;
    }
  }

  private startNewGame() {
    // Clear all end game stats objects
    if (this.endGameStatsObjects && this.endGameStatsObjects.length > 0) {
      this.endGameStatsObjects.forEach(obj => obj.destroy());
      this.endGameStatsObjects = [];
    }
    if (this.previousStatsGraphics) {
      this.previousStatsGraphics.destroy();
      this.previousStatsGraphics = undefined;
    }
    if (this.statsText) {
      this.statsText.destroy();
      this.statsText = undefined;
    }
    // Save current WPM history to previous before resetting
    if (this.wpmHistory && this.wpmHistory.length > 0) {
      this.previousWpmHistory = [...this.wpmHistory];
    }
    this.clearCharacterObjects();
    this.targetText = getRandomSentence();
    this.playerInput = '';
    this.isGameActive = true;
    this.hasStartedTyping = false;
    this.startTime = 0;
    this.endTime = 0;
    this.layoutInfo = [];
    this.wpmHistory = [];
    this.correctWordsHistory = [];
    this.lastWpmUpdateTime = 0;
    this.createCharacterObjects();
    this.updateCharacterColors();
    this.createTimeDisplay();
    this.startSidebarUpdates();
    this.destroyKeyboardLegend();
    this.updateKeyboardLegend();
  }

  private createTimeDisplay() {
    // Remove previous time text if any
    if (this.timeText) {
      this.timeText.destroy();
      this.timeText = undefined;
    }
    // Place time at the top center, under the navbar
    this.timeText = this.add.text(this.cameras.main.centerX, 32, '0s', {
      fontSize: '24px',
      color: COLOR_NEUTRAL,
      fontFamily: 'JetBrains Mono, monospace',
      align: 'center',
    }).setOrigin(0.5);
  }

  private startSidebarUpdates() {
    // Clear existing timer
    if (this.updateTimer) {
      this.updateTimer.destroy();
    }
    // Update every second
    this.updateTimer = this.time.addEvent({
      delay: 1000,
      callback: this.updateSidebar,
      callbackScope: this,
      loop: true
    });
    // Initial update
    this.updateSidebar();
  }

  private updateSidebar() {
    if (!this.isGameActive || !this.timeText) {
      return;
    }
    const currentTime = Date.now();
    const timeElapsed = this.hasStartedTyping ? (currentTime - this.startTime) / 1000 : 0;
    this.timeText.setText(`${Math.round(timeElapsed)}s`);

    // --- WPM tracking for graph ---
    if (this.hasStartedTyping) {
      const nowSec = Math.floor(timeElapsed);
      if (nowSec > this.lastWpmUpdateTime) {
        // Track correct words at this second
        const correctWords = this.calculateCorrectWords();
        this.correctWordsHistory[nowSec] = correctWords;
        // Calculate WPM using a more accurate method
        let wpm = 0;
        if (nowSec >= 1) {
          // Use a 3-second window for more responsive feedback
          const window = 3;
          const start = Math.max(0, nowSec - window + 1);
          const wordsTyped = this.correctWordsHistory[nowSec] - (this.correctWordsHistory[start - 1] || 0);
          const seconds = nowSec - start + 1;
          
          // Calculate WPM with better accuracy
          if (seconds > 0) {
            // Use exponential smoothing for smoother transitions
            const currentWpm = (wordsTyped / seconds) * 60;
            const previousWpm = this.wpmHistory[nowSec - 1] || 0;
            const smoothingFactor = 0.7; // 70% weight to current, 30% to previous
            wpm = (currentWpm * smoothingFactor) + (previousWpm * (1 - smoothingFactor));
          }
        }
        this.wpmHistory[nowSec] = wpm;
        this.lastWpmUpdateTime = nowSec;
      }
    }
  }

  private createCharacterObjects() {
    // Wider sentence area: up to 95% of screen, max 1200px
    const width = Math.min(this.cameras.main.width * 0.95, 1200);
    const fontSize = Math.max(Math.round(this.cameras.main.width / 45), 18); // Slightly larger min font size
    const lineHeight = fontSize * 1.7;
    let x = this.cameras.main.centerX - width / 2;
    let y = Math.max(this.cameras.main.height * 0.18, 80); // Responsive top margin
    let line = '';
    let lineStartIdx = 0;
    this.layoutInfo = [];
    // Calculate layout
    for (let i = 0; i < this.targetText.length; i++) {
      line += this.targetText[i];
      if (this.targetText[i] === ' ' || i === this.targetText.length - 1) {
        const nextWordEnd = this.targetText.indexOf(' ', i + 1);
        const nextWord = this.targetText.slice(i + 1, nextWordEnd === -1 ? undefined : nextWordEnd);
        const testLine = line + nextWord;
        const tempText = this.add.text(0, 0, testLine, { fontSize: `${fontSize}px`, fontFamily: 'JetBrains Mono, monospace' }).setVisible(false);
        if (tempText.width > width) {
          this.layoutLine(line, x, y, fontSize, lineStartIdx);
          y += lineHeight;
          lineStartIdx = i + 1;
          line = '';
        }
        tempText.destroy();
      }
    }
    if (line.length > 0) {
      this.layoutLine(line, x, y, fontSize, lineStartIdx);
    }
    // Create character objects
    this.characterObjects = [];
    for (let i = 0; i < this.targetText.length; i++) {
      const { x, y } = this.layoutInfo[i];
      const charObj = this.add.text(x, y, this.targetText[i], {
        fontSize: `${fontSize}px`,
        fontFamily: 'JetBrains Mono, monospace',
        color: COLOR_NEUTRAL,
      });
      this.characterObjects.push(charObj);
    }
  }

  private layoutLine(line: string, x: number, y: number, fontSize: number, globalStartIdx: number) {
    // Center the line in the available space
    const tempText = this.add.text(0, 0, line, { fontSize: `${fontSize}px`, fontFamily: 'JetBrains Mono, monospace' }).setVisible(false);
    const lineWidth = tempText.width;
    tempText.destroy();
    let cx = this.cameras.main.centerX - lineWidth / 2;
    for (let i = 0; i < line.length; i++) {
      this.layoutInfo[globalStartIdx + i] = { x: cx, y };
      const tempChar = this.add.text(0, 0, line[i], { fontSize: `${fontSize}px`, fontFamily: 'JetBrains Mono, monospace' }).setVisible(false);
      cx += tempChar.width;
      tempChar.destroy();
    }
  }

  private updateCharacterColors() {
    for (let i = 0; i < this.characterObjects.length; i++) {
      let color = COLOR_NEUTRAL; // Default neutral
      let displayText = this.targetText[i]; // Default to target character
      
      if (this.playerInput[i] !== undefined) {
        if (this.playerInput[i] === this.targetText[i]) {
          color = COLOR_GOOD; // Good for correct
          // For spaces, show green underscore
          if (this.targetText[i] === ' ') {
            displayText = '_';
          }
        } else {
          color = COLOR_BAD; // Bad for incorrect
          // Replace with what the player actually typed
          displayText = this.playerInput[i];
          // For spaces, show red underscore
          if (this.playerInput[i] === ' ') {
            displayText = '_';
          }
        }
      }
      
      this.characterObjects[i].setColor(color);
      this.characterObjects[i].setText(displayText);
    }
  }

  private createKeyboardLegend(nextKey: string) {
    this.destroyKeyboardLegend();
    const keySize = 44;
    const keyGap = 8;
    const fingerGap = 5; // gap between keys used by the same finger
    const handGap = 60; // gap between left and right hands
    const rowGap = 10;
    const legendY = this.cameras.main.centerY + 100;
    
    // Define individual key positions like on a real QWERTY keyboard
    const keyPositions = [
      // Top row: q w e r t y u i o p
      { key: 'q', finger: 'l-pinky', x: 0 },
      { key: 'w', finger: 'l-ring', x: 1 },
      { key: 'e', finger: 'l-middle', x: 2 },
      { key: 'r', finger: 'l-index', x: 3 },
      { key: 't', finger: 'l-index', x: 4 },
      { key: 'y', finger: 'r-index', x: 6 }, // Skip 5 for hand gap
      { key: 'u', finger: 'r-index', x: 7 },
      { key: 'i', finger: 'r-middle', x: 8 },
      { key: 'o', finger: 'r-ring', x: 9 },
      { key: 'p', finger: 'r-pinky', x: 10 },
      
      // Home row: a s d f g h j k l
      { key: 'a', finger: 'l-pinky', x: 0 },
      { key: 's', finger: 'l-ring', x: 1 },
      { key: 'd', finger: 'l-middle', x: 2 },
      { key: 'f', finger: 'l-index', x: 3 },
      { key: 'g', finger: 'l-index', x: 4 },
      { key: 'h', finger: 'r-index', x: 6 },
      { key: 'j', finger: 'r-index', x: 7 },
      { key: 'k', finger: 'r-middle', x: 8 },
      { key: 'l', finger: 'r-ring', x: 9 },
      
      // Bottom row: z x c v b n m
      { key: 'z', finger: 'l-pinky', x: 0 },
      { key: 'x', finger: 'l-ring', x: 1 },
      { key: 'c', finger: 'l-middle', x: 2 },
      { key: 'v', finger: 'l-index', x: 3 },
      { key: 'b', finger: 'l-index', x: 4 },
      { key: 'n', finger: 'r-index', x: 6 },
      { key: 'm', finger: 'r-index', x: 7 },
      
      // Space
      { key: ' ', finger: 'thumb', x: 5 } // Center position
    ];
    
    // Calculate total width and column positions with extra space for stagger
    const columnWidth = keySize + fingerGap + 10; // Extra space to prevent overlap from stagger
    const maxColumn = Math.max(...keyPositions.map(kp => kp.x));
    const totalWidth = maxColumn * columnWidth + keySize;
    const startX = this.cameras.main.centerX - totalWidth / 2;
    
    // Draw each row with staggered positioning
    const rows = [
      ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
      ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
      [' ']
    ];
    
    // Stagger offsets for each row (relative to the base column position)
    const rowStagger = [
      0,    // Top row (qwerty) - no offset
      0.3,  // Home row (asdf) - slight right offset
      0.6,  // Bottom row (zxcv) - more right offset
      0     // Space row - no offset
    ];
    
    rows.forEach((row, rowIdx) => {
      const y = legendY - (rows.length * (keySize + rowGap)) / 2 + rowIdx * (keySize + rowGap);
      
      row.forEach((key) => {
        // Find the key position
        const keyPos = keyPositions.find(kp => kp.key === key);
        if (!keyPos) return;
        
        // Calculate x position for this key with stagger
        let x = startX + (keyPos.x + rowStagger[rowIdx]) * columnWidth;
        
        // Special handling for space key
        if (key === ' ') {
          x = this.cameras.main.centerX - (keySize * 5) / 2; // Center the spacebar
        }
        
        const isSpace = key === ' ';
        const w = isSpace ? keySize * 5 : keySize;
        const highlight = (nextKey === ' ' && isSpace) || (nextKey && key === nextKey.toLowerCase());
        const isHighlighted = highlight;
        
        const fill = KEY_LEGEND_FILL[key];
        const fillColor = isHighlighted ? 0xffe066 : (fill ? fill.color : 0x000000);
        const fillAlpha = isHighlighted ? 1 : (fill ? fill.alpha : 0);
        const rect = this.add.rectangle(x + w / 2, y + keySize / 2, w, keySize)
          .setStrokeStyle(isHighlighted ? 3 : 2, isHighlighted ? 0xffe066 : 0x5eead4)
          .setFillStyle(fillColor, fillAlpha)
          .setAlpha(1);
        (rect as any).radius = 10;
        this.keyboardLegendKeys.push(rect);
        
        if (!isSpace) {
          const label = this.add.text(x + w / 2, y + keySize / 2, key.toUpperCase(), {
            fontSize: '22px',
            color: isHighlighted ? '#111' : COLOR_NEUTRAL,
            fontFamily: 'JetBrains Mono, monospace',
            fontStyle: 'bold',
          }).setOrigin(0.5);
          this.keyboardLegendLabels.push(label);
        }
      });
    });
  }

  private destroyKeyboardLegend() {
    this.keyboardLegendKeys.forEach(obj => obj.destroy());
    this.keyboardLegendLabels.forEach(obj => obj.destroy());
    this.keyboardLegendKeys = [];
    this.keyboardLegendLabels = [];
  }



  // Update legend
  private updateKeyboardLegend() {
    if (!this.isGameActive) return;
    const nextKey = this.targetText[this.playerInput.length] || '';
    this.createKeyboardLegend(nextKey);
  }

  private calculateRunningAverage(data: number[], windowSize: number): number[] {
    if (data.length === 0) return [];
    if (data.length === 1) return data;
    
    const smoothed: number[] = [];
    const halfWindow = Math.floor(windowSize / 2);
    
    for (let i = 0; i < data.length; i++) {
      const start = Math.max(0, i - halfWindow);
      const end = Math.min(data.length - 1, i + halfWindow);
      const window = data.slice(start, end + 1);
      const average = window.reduce((sum, val) => sum + val, 0) / window.length;
      smoothed.push(average);
    }
    
    return smoothed;
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (!this.isGameActive) {
      if (event.code === 'Space') {
        this.startNewGame();
      }
      return;
    }
    
    if (event.key.length === 1) {
      // Start timing on first character
      if (!this.hasStartedTyping) {
        this.hasStartedTyping = true;
        this.startTime = Date.now();
      }
      
      // Allow typing beyond the target length to handle mistakes
      this.playerInput += event.key;
      this.updateCharacterColors();
      this.updateKeyboardLegend();
      
      // End game when player reaches the end of the target text
      if (this.playerInput.length >= this.targetText.length) {
        this.endGame();
      }
    } else if (event.key === 'Backspace') {
      if (this.playerInput.length > 0) {
        this.playerInput = this.playerInput.slice(0, -1);
        this.updateCharacterColors();
        this.updateKeyboardLegend();
      }
    }
  }

  private endGame() {
    this.isGameActive = false;
    this.endTime = Date.now();

    // Stop sidebar updates
    if (this.updateTimer) {
      this.updateTimer.destroy();
      this.updateTimer = undefined;
    }

    // Force a final sidebar update
    this.updateSidebar();

    // DO NOT destroy or clear this.characterObjects here!
    // The sentence/game text should remain visible.

    this.destroyKeyboardLegend(); // Hide legend on end screen
    this.showStats();
  }

  private calculateCorrectWords(): number {
    // Trim both strings to handle any trailing spaces
    const targetTextTrimmed = this.targetText.trim();
    const playerInputTrimmed = this.playerInput.trim();
    
    const targetWords = targetTextTrimmed.split(' ').filter(word => word.length > 0);
    const playerWords = playerInputTrimmed.split(' ').filter(word => word.length > 0);
    
    let correctWords = 0;
    
    // Count words that are completely correct
    for (let i = 0; i < Math.min(targetWords.length, playerWords.length); i++) {
      if (targetWords[i] === playerWords[i]) {
        correctWords++;
      }
    }
    
    // Debug logging
    console.log('Target text:', JSON.stringify(targetTextTrimmed));
    console.log('Player input:', JSON.stringify(playerInputTrimmed));
    console.log('Target words:', targetWords);
    console.log('Player words:', playerWords);
    console.log('Correct words:', correctWords);
    console.log('Target length:', targetWords.length, 'Player length:', playerWords.length);
    
    return correctWords;
  }

  private showStats() {
    const timeElapsed = (this.endTime - this.startTime) / 1000;
    const correct = this.playerInput.split('').filter((c, i) => c === this.targetText[i]).length;
    const mistakes = this.playerInput.length - correct;
    const accuracy = this.playerInput.length > 0 ? Math.round((correct / this.playerInput.length) * 100) : 100;
    const correctWords = this.calculateCorrectWords();
    const wpm = timeElapsed > 0 ? Math.round(correctWords / (timeElapsed / 60)) : 0;
    if (this.statsText) this.statsText.destroy();
    if (this.previousStatsGraphics) {
      this.previousStatsGraphics.destroy();
      this.previousStatsGraphics = undefined;
    }
    if (this.endGameStatsObjects && this.endGameStatsObjects.length > 0) {
      this.endGameStatsObjects.forEach(obj => obj.destroy());
      this.endGameStatsObjects = [];
    }

    // Find the bottom of the sentence (max y in layoutInfo)
    const sentenceBottom = this.layoutInfo.length > 0 ? Math.max(...this.layoutInfo.map(l => l.y)) : this.cameras.main.centerY - 100;
    const statsStartY = sentenceBottom + 60; // 60px below sentence

    // Layout parameters
    const centerX = this.cameras.main.centerX;
    const colGap = Math.max(this.cameras.main.width * 0.08, 60); // gap between columns
    const colWidth = Math.min(this.cameras.main.width * 0.28, 340); // width of each column
    const leftColX = centerX - colGap/2 - colWidth/2;
    const rightColX = centerX + colGap/2 + colWidth/2;
    let y = statsStartY;

    // --- Left Column ---
    // Large WPM
    const wpmText = this.add.text(leftColX, y, `WPM: ${wpm}`,
      {
        fontSize: '64px',
        color: COLOR_NEUTRAL,
        fontFamily: 'JetBrains Mono, monospace',
        align: 'center',
      }).setOrigin(0.5, 0);
    this.endGameStatsObjects.push(wpmText);
    y += 80;
    // Large Accuracy
    const accuracyText = this.add.text(leftColX, y, `ACC: ${accuracy}%`,
      {
        fontSize: '48px',
        color: COLOR_GOOD,
        fontFamily: 'JetBrains Mono, monospace',
        align: 'center',
      }).setOrigin(0.5, 0);
    this.endGameStatsObjects.push(accuracyText);
    y += 70;
    // Row of smaller stats
    const statsRow = `Correct: ${correctWords}   Mistakes: ${mistakes}   Time: ${Math.round(timeElapsed)}s`;
    const statsRowText = this.add.text(leftColX, y, statsRow, {
      fontSize: '26px',
      color: COLOR_NEUTRAL,
      fontFamily: 'JetBrains Mono, monospace',
      align: 'center',
    }).setOrigin(0.5, 0);
    this.endGameStatsObjects.push(statsRowText);

    // --- Right Column ---
    // Simple line graph for WPM history
    const graphHeight = 200;
    const graphWidth = colWidth;
    const graphY = statsStartY + 30;
    const graphX = rightColX - graphWidth / 2;
    // Draw previous game graph in grey if available
    this.previousStatsGraphics = this.add.graphics();
    if (this.previousWpmHistory && this.previousWpmHistory.length > 1) {
      this.previousStatsGraphics.lineStyle(3, 0x888888, 1);
      const prevData = this.previousWpmHistory.filter(v => typeof v === 'number');
      const smoothedPrevData = this.calculateRunningAverage(prevData, 3);
      const prevN = smoothedPrevData.length;
      const prevMaxWpm = Math.max(60, ...smoothedPrevData);
      const prevMinWpm = 0;
      for (let i = 1; i < prevN; i++) {
        const x1 = graphX + ((i - 1) / (prevN - 1)) * graphWidth;
        const y1 = graphY + graphHeight - ((smoothedPrevData[i - 1] - prevMinWpm) / (prevMaxWpm - prevMinWpm)) * graphHeight;
        const x2 = graphX + (i / (prevN - 1)) * graphWidth;
        const y2 = graphY + graphHeight - ((smoothedPrevData[i] - prevMinWpm) / (prevMaxWpm - prevMinWpm)) * graphHeight;
        this.previousStatsGraphics.moveTo(x1, y1);
        this.previousStatsGraphics.lineTo(x2, y2);
      }
      this.previousStatsGraphics.strokePath();
      this.endGameStatsObjects.push(this.previousStatsGraphics);
    }
    // Draw current game graph in blueish teal
    const graphics = this.add.graphics();
    graphics.lineStyle(3, 0x5eead4, 1);
    const wpmData = this.wpmHistory.filter(v => typeof v === 'number');
    const smoothedWpmData = this.calculateRunningAverage(wpmData, 3);
    const maxWpm = Math.max(60, ...smoothedWpmData); // Ensure at least 60 for scale
    const minWpm = 0;
    const n = smoothedWpmData.length;
    if (n > 1) {
      for (let i = 1; i < n; i++) {
        const x1 = graphX + ((i - 1) / (n - 1)) * graphWidth;
        const y1 = graphY + graphHeight - ((smoothedWpmData[i - 1] - minWpm) / (maxWpm - minWpm)) * graphHeight;
        const x2 = graphX + (i / (n - 1)) * graphWidth;
        const y2 = graphY + graphHeight - ((smoothedWpmData[i] - minWpm) / (maxWpm - minWpm)) * graphHeight;
        graphics.moveTo(x1, y1);
        graphics.lineTo(x2, y2);
      }
      graphics.strokePath();
      this.endGameStatsObjects.push(graphics);
    }

    // --- Motivational message and replay prompt ---
    let belowY = Math.max(y + 90, graphY + graphHeight + 40);
    const motivational = getRandomMotivationalMessage();
    const motivationalText = this.add.text(centerX, belowY, motivational, {
      fontSize: '22px',
      color: COLOR_GOOD,
      fontFamily: 'JetBrains Mono, monospace',
      align: 'center',
      wordWrap: { width: Math.min(this.cameras.main.width * 0.9, 900) }
    }).setOrigin(0.5);
    this.endGameStatsObjects.push(motivationalText);
    belowY += 60;
    this.statsText = this.add.text(centerX, belowY, 'Press SPACE to play again', {
      fontSize: '28px',
      color: COLOR_NEUTRAL,
      fontFamily: 'JetBrains Mono, monospace',
      align: 'center',
    }).setOrigin(0.5);
    this.endGameStatsObjects.push(this.statsText);
  }

  private handleResize() {
    this.clearCharacterObjects();
    this.layoutInfo = [];
    this.createCharacterObjects();
    this.updateCharacterColors();
    
    // Recreate sidebar if game is active
    if (this.isGameActive) {
      this.createTimeDisplay();
      this.startSidebarUpdates();
      this.destroyKeyboardLegend();
      this.updateKeyboardLegend();
    }
    
    if (!this.isGameActive && this.statsText) {
      this.statsText.setX(this.cameras.main.centerX);
      this.statsText.setY(this.cameras.main.centerY + 200);
    }
  }
} 