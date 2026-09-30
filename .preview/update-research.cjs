const fs = require('fs');
const file = 'src/components/ResearchWorkSection.jsx';
let source = fs.readFileSync(file, 'utf8');
source = source.replace('useState, useEffect', 'useState, useEffect, useRef').replace('import { createPortal } from "react-dom";\n', '').replace('import { motion, AnimatePresence } from "framer-motion";', '').replace('  Lightbulb,\n', '');
const extensions = {RA3:'gif',RA4:'gif',RB3:'gif',RB4:'jpg',RC4:'jpg'};
for (const [key,ext] of Object.entries(extensions)) source = source.replace(`/research/${key.toLowerCase()}.png`, `/research/${key.toLowerCase()}.${ext}`);
const labels = {
 RA3:['Filtration efficiency enhancement','Efficiency & Pressure Drop'], RA4:['Ozone generation comparison for monopolar and dual-pole arrangements','Ozone-Free Operation'], RB3:['Performance increment by filter processing and drying technique','Laboratory Performance'], RD1:['Illustration of indoor pollutant sources and air purification','Indoor Air Purification'], RD2:['Worldwide comparisons of indoor and outdoor particulate and gaseous pollutants','Indoor & Outdoor Comparison'], RD3:['Indoor air pollution health risk analysis','Health Risk Analysis'], RD4:['Comparison of advanced filter-manufacturing technologies','Technology Assessment']
};
for (const [key,[alt,label]] of Object.entries(labels)) {
 const re = new RegExp(`(key: "${key}",[\\s\\S]*?alt: ")[^"]*(",\\s*label: ")[^"]*`);
 source = source.replace(re, `$1${alt}$2${label}`);
}
source = source.slice(0, source.indexOf('/* ─── Image Gallery Item'));
source += `
const STAGE_TITLES = ["Overview", "Approach & Development", "Evaluation & Findings", "Research Outcome"];

function ResearchCard({ work, onPreview }) {
  const Icon = work.icon;
  const texts = work.id === "review-indoor"
    ? [[work.overview, work.overviewExtra], [work.details[0].text], [work.details[1].text], work.findings.map(item => item.text)]
    : [[work.overview], work.details.map(item => item.text), work.findings.map(item => item.text), [work.highlight]];
  return (
    <article id={work.id} className={styles.work} style={{ "--accent": work.accent.detailAccent }}>
      <header className={styles.workHeader}>
        <span className={styles.workNumber}>{work.number}</span>
        <div className={styles.identity}>
          <p className={styles.category}><Icon size={14} aria-hidden="true" />{work.title}</p>
          <h3>{work.heading}</h3>
        </div>
        {work.note && <span className={styles.noteBadge}>{work.note.type === "award" ? <Award size={16} aria-hidden="true" /> : <ShieldCheck size={16} aria-hidden="true" />}{work.note.text}</span>}
      </header>
      <div className={styles.panels}>
        {work.images.map((image, index) => (
          <div className={styles.panel} key={image.key}>
            <figure className={styles.figure}>
              <button type="button" className={styles.imageButton} onClick={() => onPreview(image)} aria-label={"Enlarge " + image.label}>
                <Image src={image.src} alt={image.alt} fill sizes="(max-width: 767px) 90vw, 45vw" unoptimized={image.src.endsWith(".gif")} className={styles.figureImage} />
                <span className={styles.zoomBadge}><Maximize2 size={14} /> Enlarge</span>
              </button>
              <figcaption><span>{image.key}</span>{image.label}</figcaption>
            </figure>
            <div className={styles.panelContent}>
              <span className={styles.stage}>0{index + 1} / {STAGE_TITLES[index]}</span>
              {texts[index].map((text, i) => <p key={i}>{text}</p>)}
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

export default function ResearchWorkSection() {
  const [selectedImage, setSelectedImage] = useState(null);
  const dialogRef = useRef(null);
  const open = selectedImage !== null;
  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => { dialog.close(); document.body.style.overflow = previousOverflow; };
  }, [open]);
  return (
    <section id="research-work" className="relative py-24 sm:py-28" aria-labelledby="research-work-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-pill border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider"><FlaskConical size={16} /><span>Research Portfolio</span></div>
          <h2 id="research-work-title" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 tracking-tight">Research <span className="text-gradient">Work</span></h2>
          <p className="text-slate-400 text-base sm:text-lg">Advancing cleaner air through filtration, sustainable materials, environmental intelligence, and critical review.</p>
        </div>
        <nav className={styles.navigation} aria-label="Research projects">
          {RESEARCH_WORKS.map(work => <a href={"#" + work.id} key={work.id}><span>{work.number}</span>{work.id === "meaa" ? "Electrostatic Filtration" : work.id === "sugarcane" ? "Sustainable Materials" : work.id === "ml-health" ? "Machine Learning" : "Review & Perspective"}</a>)}
        </nav>
        <div className={styles.collection}>{RESEARCH_WORKS.map(work => <ResearchCard key={work.id} work={work} onPreview={setSelectedImage} />)}</div>
      </div>
      <dialog ref={dialogRef} className={styles.dialog} aria-label="Research figure preview" onCancel={() => setSelectedImage(null)} onClick={event => { if (event.target === event.currentTarget) setSelectedImage(null); }}>
        {selectedImage && <div className={styles.preview}>
          <button type="button" autoFocus className={styles.close} onClick={() => setSelectedImage(null)} aria-label="Close preview"><X size={22} /></button>
          <div className={styles.previewImage}><Image src={selectedImage.src} alt={selectedImage.alt} fill sizes="95vw" unoptimized={selectedImage.src.endsWith(".gif")} className={styles.figureImage} /></div>
          <p>{selectedImage.key} · {selectedImage.label}</p>
        </div>}
      </dialog>
    </section>
  );
}
`;
fs.writeFileSync(file, source);
for (const group of ['RA','RB','RC','RD']) for(let i=1;i<=4;i++) {
 const key = group+i, ext = extensions[key] || 'png';
 fs.copyFileSync('C:/Users/ASUS/Desktop/'+key+'.'+ext, 'public/research/'+key.toLowerCase()+'.'+ext);
}

