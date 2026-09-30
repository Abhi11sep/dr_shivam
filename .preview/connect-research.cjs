const fs = require('fs');
const path = 'src/components/ResearchWorkSection.jsx';
let s=fs.readFileSync(path,'utf8');
s=s.replace('      <div className={styles.panels}>','      <div className={styles.journey}>\n        <div className={styles.journeyHeading}><span>Research journey</span><span>Four connected steps</span></div>\n      <div className={styles.panels}>');
s=s.replace('<div className={styles.panel} key={image.key}>','<div className={styles.panel} key={image.key}>\n            {index < 3 && <span className={styles.stepConnector} aria-hidden="true"><svg viewBox="0 0 32 32"><path d="M 1 1 L 31 31" /><circle cx="16" cy="16" r="3" /></svg></span>}');
s=s.replace('sizes="(max-width: 767px) 90vw, 45vw"','sizes="(max-width: 767px) 90vw, 43vw"');
s=s.replace('<figcaption><span>{image.key}</span>{image.label}</figcaption>','<figcaption><span>{image.key}</span>{image.label}{image.src.endsWith(".gif") && <span className={styles.animationLabel}>Animated</span>}</figcaption>');
s=s.replace('      <footer className={styles.projectEnd}>','      </div>\n      <footer className={styles.projectEnd}>');
fs.writeFileSync(path,s);
