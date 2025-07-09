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
  return words.slice(0, 45).join(' ');
}

export default class TypingGameScene extends Phaser.Scene {
  private targetText: string = '';
  private playerInput: string = '';
  private isGameActive: boolean = false;
  private startTime: number = 0;
  private endTime: number = 0;
  private characterObjects: Phaser.GameObjects.Text[] = [];
  private statsText?: Phaser.GameObjects.Text;
  private layoutInfo: { x: number, y: number }[] = [];

  create() {
    this.startNewGame();
    this.input.keyboard?.on('keydown', this.handleKeyDown, this);
    this.scale.on('resize', this.handleResize, this);
  }

  private clearCharacterObjects() {
    this.characterObjects.forEach(obj => obj.destroy());
    this.characterObjects = [];
  }

  private startNewGame() {
    this.clearCharacterObjects();
    this.targetText = getRandomSentence();
    this.playerInput = '';
    this.isGameActive = true;
    this.startTime = Date.now();
    this.endTime = 0;
    this.layoutInfo = [];
    this.createCharacterObjects();
    this.updateCharacterColors();
    if (this.statsText) this.statsText.destroy();
  }

  private createCharacterObjects() {
    const width = this.cameras.main.width * 0.8;
    const fontSize = Math.round(this.cameras.main.width / 50);
    const lineHeight = fontSize * 1.7;
    let x = this.cameras.main.centerX - width / 2;
    let y = this.cameras.main.height * 0.2; // Move text to top 20% of screen
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
        color: '#ffffff',
      });
      this.characterObjects.push(charObj);
    }
  }

  private layoutLine(line: string, x: number, y: number, fontSize: number, globalStartIdx: number) {
    // Center the line
    const tempText = this.add.text(0, 0, line, { fontSize: `${fontSize}px`, fontFamily: 'JetBrains Mono, monospace' }).setVisible(false);
    const lineWidth = tempText.width;
    tempText.destroy();
    let cx = this.cameras.main.centerX - lineWidth / 2;
    for (let i = 0; i < line.length; i++) {
      this.layoutInfo[globalStartIdx + i] = { x: cx, y };
      // Use a dummy char to get width
      const tempChar = this.add.text(0, 0, line[i], { fontSize: `${fontSize}px`, fontFamily: 'JetBrains Mono, monospace' }).setVisible(false);
      cx += tempChar.width;
      tempChar.destroy();
    }
  }

  private updateCharacterColors() {
    for (let i = 0; i < this.characterObjects.length; i++) {
      let color = '#ffffff'; // Default white
      if (this.playerInput[i] !== undefined) {
        if (this.playerInput[i] === this.targetText[i]) {
          color = '#10b981'; // Green for correct
        } else {
          color = '#ef4444'; // Red for incorrect
        }
      }
      this.characterObjects[i].setColor(color);
    }
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (!this.isGameActive) {
      if (event.code === 'Space') {
        this.startNewGame();
      }
      return;
    }
    
    if (event.key.length === 1) {
      if (this.playerInput.length < this.targetText.length) {
        this.playerInput += event.key;
        this.updateCharacterColors();
        
        if (this.playerInput.length === this.targetText.length) {
          this.endGame();
        }
      }
    } else if (event.key === 'Backspace') {
      if (this.playerInput.length > 0) {
        this.playerInput = this.playerInput.slice(0, -1);
        this.updateCharacterColors();
      }
    }
  }

  private endGame() {
    this.isGameActive = false;
    this.endTime = Date.now();
    this.showStats();
  }

  private showStats() {
    const timeElapsed = (this.endTime - this.startTime) / 1000;
    const correct = this.playerInput.split('').filter((c, i) => c === this.targetText[i]).length;
    const mistakes = this.playerInput.length - correct;
    const accuracy = this.playerInput.length > 0 ? Math.round((correct / this.playerInput.length) * 100) : 100;
    const wpm = timeElapsed > 0 ? Math.round((this.targetText.length / 5) / (timeElapsed / 60)) : 0;
    
    const stats = `WPM: ${wpm}\nMistakes: ${mistakes}\nAccuracy: ${accuracy}%\nTime: ${Math.round(timeElapsed)}s\nPress SPACE to play again`;
    
    if (this.statsText) this.statsText.destroy();
    
    this.statsText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 200, stats, {
      fontSize: '28px',
      color: '#ffffff',
      fontFamily: 'JetBrains Mono, monospace',
      align: 'center',
    }).setOrigin(0.5);
  }

  private handleResize() {
    this.clearCharacterObjects();
    this.layoutInfo = [];
    this.createCharacterObjects();
    this.updateCharacterColors();
    
    if (!this.isGameActive && this.statsText) {
      this.statsText.setX(this.cameras.main.centerX);
      this.statsText.setY(this.cameras.main.centerY + 200);
    }
  }
} 