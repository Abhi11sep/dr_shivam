const fs = require('fs');
const path = 'src/components/ResearchWorkSection.jsx';
let s = fs.readFileSync(path, 'utf8');
s = s.replace('function ResearchCard({ work, onPreview })', `const PROJECT_IDENTITIES = {
  meaa: { field: "Electrostatic filtration", statement: "Enhancing particle capture. Preserving airflow.", tags: ["Aerosol charging", "Filter engineering", "Ozone-free operation"] },
  sugarcane: { field: "Sustainable materials", statement: "From agricultural residue to cleaner air.", tags: ["Waste valorisation", "Biodegradable media", "Chamber validation"] },
  "ml-health": { field: "Environmental intelligence", statement: "Connecting air-quality data with health risk.", tags: ["Machine learning", "Source-informed prediction", "Low-cost sensing"] },
  "review-indoor": { field: "Review & perspective", statement: "Rethinking the future of indoor air purification.", tags: ["Global evidence", "Health implications", "Emerging technologies"] },
};

function ResearchCard({ work, onPreview, nextWork })`);
s = s.replace('  const Icon = work.icon;', '  const Icon = work.icon;\n  const identity = PROJECT_IDENTITIES[work.id];');
s = s.replace('<article id={work.id} className={styles.work} style={{ "--accent": work.accent.detailAccent }}>','<article id={work.id} aria-labelledby={work.id + "-title"} className={styles.work} style={{ "--accent": work.accent.detailAccent, "--accent-end": work.accent.detailAccentEnd }}>\n      <div className={styles.chapterDivider}><span>Research Work {work.number}</span><span>{identity.field}</span></div>');
s = s.replace('<span className={styles.workNumber}>{work.number}</span>', '<span className={styles.workNumber} aria-hidden="true">{work.number}</span>');
s = s.replace('<div className={styles.identity}>', '<div className={styles.identity}>\n          <span className={styles.projectEyebrow}><Icon size={15} aria-hidden="true" />{identity.field}</span>');
s = s.replace('<p className={styles.category}><Icon size={14} aria-hidden="true" />{work.title}</p>', '<p className={styles.category}>{work.title !== work.heading ? work.title : "Monopolar electrostatically assisted air filtration"}</p>');
s = s.replace('<h3>{work.heading}</h3>', '<h3 id={work.id + "-title"}>{work.heading}</h3>\n          <p className={styles.statement}>{identity.statement}</p>\n          <div className={styles.tags}>{identity.tags.map(tag => <span key={tag}>{tag}</span>)}</div>');
s = s.replace('    </article>', '      <footer className={styles.projectEnd}><span><Icon size={15} aria-hidden="true" /> End of Research Work {work.number}</span>{nextWork ? <a href={"#" + nextWork.id}>Up next · Work {nextWork.number}<span aria-hidden="true">↗</span></a> : <a href="#research-work">Back to research overview<span aria-hidden="true">↑</span></a>}</footer>\n    </article>');
s = s.replace('RESEARCH_WORKS.map(work => <ResearchCard key={work.id} work={work} onPreview={setSelectedImage} />)', 'RESEARCH_WORKS.map((work, index) => <ResearchCard key={work.id} work={work} nextWork={RESEARCH_WORKS[index + 1]} onPreview={setSelectedImage} />)');
fs.writeFileSync(path, s);
