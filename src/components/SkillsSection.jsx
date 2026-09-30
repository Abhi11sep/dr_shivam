import Image from "next/image";
import { BrainCircuit, Zap, FlaskConical, Box, Cpu, Workflow, ArrowUpRight, Layers, Activity } from "lucide-react";
import styles from "./SkillsSection.module.css";
import SkillsGallery from "./SkillsGallery";

const software = {
  matlab: "MATLAB", python: "Python", inventor: "Autodesk Inventor", shapr3d: "Shapr3D", "3d-printing": "3D printing", arduino: "Arduino",
};
function Logos({ names }) {
  return <div className={styles.logos}>{names.map(name => <div className={styles.logo} key={name} title={software[name]}><Image src={`/skills/${name}.png`} alt={software[name]} width={100} height={52} /></div>)}</div>;
}
function Label({ icon: Icon, children, number }) {
  return <div className={styles.cardLabel}><span><Icon size={19} strokeWidth={1.5} aria-hidden="true" />{children}</span><small>{number}</small></div>;
}
function Signal({ circuit = false }) {
  return <svg className={styles.signal} viewBox="0 0 250 84" fill="none" aria-hidden="true">
    <path d="M0 21H250M0 42H250M0 63H250M42 0V84M84 0V84M126 0V84M168 0V84M210 0V84" stroke="currentColor" opacity=".09" />
    {circuit ? <g stroke="currentColor" strokeWidth="1.4"><rect x="99" y="17" width="52" height="50" rx="8" /><rect x="113" y="30" width="24" height="24" rx="3" /><path className={styles.circuitFlow} d="M15 20H58V33H99M25 67H72V52H99M151 33H184V12H234M151 52H197V70H242" /><g fill="currentColor"><circle cx="15" cy="20" r="3"/><circle cx="25" cy="67" r="3"/><circle cx="234" cy="12" r="3"/><circle cx="242" cy="70" r="3"/></g></g> : <><path className={styles.graphLine} pathLength="100" d="M0 70C20 70 25 35 46 43S76 75 101 46 126 57 145 31 177 57 197 25 223 23 250 9" stroke="currentColor" strokeWidth="2" /><path className={styles.graphGuide} d="M0 75C37 72 55 54 89 55S144 37 173 32 218 19 250 15" stroke="currentColor" strokeDasharray="3 5" opacity=".4" /></>}
  </svg>;
}

export default function SkillsSection() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div><span className={styles.eyebrow}><Workflow size={14} aria-hidden="true" /> Technical toolkit</span><h2 id="skills-heading">Skills & <span className="text-gradient-accent">Engineering Expertise</span></h2></div>
          <p>Computational thinking. Experimental craft.<br />An interconnected approach to cleaner air.</p>
        </header>
        <div className={styles.bento}>
          <article className={`${styles.card} ${styles.models}`}>
            <Label icon={BrainCircuit} number="01">Model & discover</Label>
            <h3>Machine learning.<br />Real-world insight.</h3>
            <div className={styles.chart}><span>COMPUTATION / SIMULATION</span><Signal /></div>
            <p>Machine learning models, numerical simulation, and complex data analysis with MATLAB and Python.</p>
            <Logos names={["matlab", "python"]} />
            <div className={styles.tags}><span>Data analysis</span><span>Predictive modelling</span></div>
          </article>
          <article className={`${styles.card} ${styles.electro}`}>
            <Label icon={Zap} number="02">Engineer & improve</Label>
            <h3>Electrostatic<br />technology</h3>
            <p>Proprietary monopolar high-voltage DC systems for enhanced air filtration.</p>
            <span className={styles.note}>HIGH-VOLTAGE DC / AIR FILTRATION</span>
          </article>
          <article className={`${styles.card} ${styles.analysis}`}>
            <Label icon={FlaskConical} number="03">Measure & understand</Label>
            <h3>Analytical<br />instrumentation</h3>
            <p>Instrument operation and data interpretation for chemical analysis.</p>
            <div className={styles.tags}><span>GC–MS</span><span>Ion chromatography</span></div>
          </article>
          <article className={`${styles.card} ${styles.hardware}`}>
            <Label icon={Cpu} number="04">Connect & monitor</Label>
            <h3>Small sensors.<br />Meaningful data.</h3>
            <p>Custom Arduino-based devices for data collection and real-time experimental monitoring.</p>
            <Signal circuit />
            <Logos names={["arduino"]} />
            <div className={styles.sensorStatus}><span /> Sensor → acquisition → insight</div>
          </article>
          <div className={`${styles.card} ${styles.portrait}`}>
            <div className={styles.portraitHeading}><span className={styles.eyebrow}>The researcher behind the tools</span><h3>Curiosity,<br /><em>put into practice.</em></h3></div>
            
            <div className={styles.portraitImage}><Image src="/profile.png" alt="Dr. Shivam, environmental engineering researcher at IIT Kanpur" fill sizes="(max-width: 639px) 360px, (max-width: 1099px) 600px, 640px" /></div>
            <div className={styles.orbit}><div className={`${styles.floating} ${styles.modelChip}`}><BrainCircuit size={18} aria-hidden="true" /><span><small>COMPUTATIONAL</small>Model & predict</span></div>
            <div className={`${styles.floating} ${styles.labChip}`}><FlaskConical size={18} aria-hidden="true" /><span><small>EXPERIMENTAL</small>Build & validate</span></div></div>
            <div className={styles.identity}><span>Dr. Shivam</span><small>FARE Fellow · IIT Kanpur</small></div>
            <span className={styles.portraitCaption}>Environmental engineering<br />Research through making.</span>
          </div>
          <article className={`${styles.card} ${styles.cad}`}>
            <div className={styles.cadCopy}><Label icon={Box} number="05">Design & fabricate</Label>
            <h3>From a model<br />to something real.</h3>
            <p>Precision components designed in Inventor and Shapr3D, built on a self-maintained DIY 3D printer.</p></div>
            <div className={styles.cadImage}><Image src="/skills/skill3.png" alt="Three-dimensional cutaway model of an air filtration system" fill sizes="(max-width: 639px) 80vw, 280px" /></div>
            <Logos names={["inventor", "shapr3d", "3d-printing"]} />
          </article>
          <article className={`${styles.card} ${styles.method}`}>
            <Layers size={29} strokeWidth={1.3} aria-hidden="true" /><h3>One connected<br />research process.</h3>
            <p>Model. Build. Measure. Refine.</p>
          </article>
          <article className={`${styles.card} ${styles.toolkit}`}>
            <span className={styles.eyebrow}>Across disciplines</span><h3>A practical toolkit.</h3>
            <div className={styles.toolList}><span>Computation</span><span>Instrumentation</span><span>Prototyping</span><span>Electronics</span></div>
          </article>
          <a href="#skills-designs" className={`${styles.card} ${styles.statement}`}>
            <div><span className={styles.eyebrow}>From concept to creation</span><h3>Engineering ideas.<br /><em>Making cleaner air possible.</em></h3><p>Explore seven engineering studies below.</p></div>
            <span className={styles.exploreIcon}><ArrowUpRight size={25} aria-hidden="true" /></span>
            <Activity className={styles.statementArt} size={130} strokeWidth={.65} aria-hidden="true" />
          </a>
          <div id="skills-designs" className={styles.designs}><SkillsGallery /></div>
        </div>
      </div>
    </section>
  );
}
