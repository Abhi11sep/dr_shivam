const fs = require('fs');
const file = 'src/components/ResearchWorkSection.jsx';
let source = fs.readFileSync(file, 'utf8');
source = source.replace('<div className="text-center max-w-3xl mx-auto space-y-4">', `<div className={styles.sectionHeading + " text-center max-w-3xl mx-auto space-y-4"}>
          <div className={styles.researchEmblem} aria-hidden="true">
            <svg viewBox="0 0 320 320" className={styles.emblemOrbit}>
              <defs><path id="research-emblem-orbit" d="M160,160 m-126,0 a126,126 0 1,1 252,0 a126,126 0 1,1 -252,0" /></defs>
              <circle cx="160" cy="160" r="145" className={styles.emblemOuterRing} />
              <circle cx="160" cy="160" r="108" className={styles.emblemInnerRing} />
              <text className={styles.emblemText} textLength="791.7" lengthAdjust="spacing"><textPath href="#research-emblem-orbit">RESEARCH WORK · CLEAN AIR · INNOVATION · </textPath></text>
            </svg>
            <div className={styles.emblemCore}><FlaskConical strokeWidth={1} /></div>
          </div>`);
fs.writeFileSync(file, source);
