"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Maximize2, Pause, Play, X } from "lucide-react";
import styles from "./SkillsGallery.module.css";

const images = [
  { title: "Indoor air filtration", alt: "Room model showing airflow through an air filtration unit" },
  { title: "Material processing", alt: "Illustrated material preparation and oven processing workflow" },
  { title: "Filter architecture", alt: "Cutaway model of a cylindrical air filter with a fan and airflow arrows" },
  { title: "Electrostatic air treatment", alt: "Cutaway duct with charged particles, a filter, fan, and high-voltage supply" },
  { title: "Layered filter design", alt: "Exploded view of filter layers and a honeycomb mesh connected to a voltage supply" },
  { title: "Extrusion system", alt: "Model of a motor-driven extrusion system with a hopper and collection screen" },
  { title: "Syringe pump setup", alt: "Syringe pump, stepper motor, high-voltage supply, and collection screen" },
];
const wrap = (index) => (index + images.length) % images.length;

export default function SkillsGallery() {
  const [active, setActive] = useState(0);
  const [opened, setOpened] = useState(null);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const gallery = useRef(null);
  const [focused, setFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const dialog = useRef(null);
  const touchStart = useRef(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0 });
    observer.observe(gallery.current);
    const syncVisibility = () => setPageVisible(!document.hidden);
    syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncVisibility);
    };
  }, []);

  useEffect(() => {
    if (!inView || !pageVisible || paused || focused || reducedMotion || opened !== null) return;
    const timer = window.setInterval(() => setActive(index => wrap(index + 1)), 2000);
    return () => window.clearInterval(timer);
  }, [inView, pageVisible, paused, focused, reducedMotion, opened]);

  useEffect(() => {
    if (opened === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [opened]);

  const move = (direction) => setActive(index => wrap(index + direction));
  const movePopup = (direction) => {
    setOpened(index => wrap(index + direction));
    setActive(index => wrap(index + direction));
  };
  const open = (index) => {
    setActive(index);
    setOpened(index);
    dialog.current.showModal();
  };
  const close = () => dialog.current.close();

  return (
    <div ref={gallery} className={styles.gallery}>
      <div className={styles.heading}>
        <div><span className={styles.eyebrow}>From concept to creation</span><h3>Engineering in focus</h3></div>
        <p>A collection of ideas, made tangible. Select a design to explore.</p>
      </div>
      <div className={styles.carousel} role="region" aria-roledescription="carousel" aria-label="Engineering designs"
        onPointerDownCapture={() => setFocused(false)}
        onFocusCapture={event => setFocused(event.target.matches(":focus-visible") && !event.target.hasAttribute("data-rotation-control"))} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
        onKeyDown={event => {
          if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
          if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
        }}>
        <div className={styles.stage}
          onTouchStart={event => { touchStart.current = event.touches[0].clientX; }}
          onTouchEnd={event => {
            if (touchStart.current === null) return;
            const distance = event.changedTouches[0].clientX - touchStart.current;
            if (Math.abs(distance) > 45) move(distance > 0 ? -1 : 1);
            touchStart.current = null;
          }}>
          {images.map((item, index) => {
            const offset = wrap(index - active + 3) - 3;
            return (
              <button key={item.title} type="button" className={styles.slide} data-active={offset === 0} data-near={Math.abs(offset) <= 1}
                aria-label={`${offset === 0 ? "Open" : "Select"} image ${index + 1}: ${item.title}`} aria-expanded={offset === 0}
                onClick={() => offset === 0 ? open(index) : setActive(index)}>
                <span className={styles.slideNumber}>0{index + 1}</span>
                <span className={styles.imagePanel}><Image src={`/skills/skill${index + 1}.png`} alt={item.alt} fill sizes="(max-width: 639px) 75vw, 520px" draggable={false} /></span>
                <span className={styles.caption}><span><small>DESIGN / 0{index + 1}</small>{item.title}</span><Maximize2 size={16} aria-hidden="true" /></span>
              </button>
            );
          })}
        </div>
        <div className={styles.controls}>
          <button type="button" onClick={() => move(-1)} aria-label="Previous design"><ArrowLeft size={18} /></button>
          <div className={styles.indicators} aria-label="Choose a design">{images.map((item, index) => <button key={item.title} type="button" onClick={() => setActive(index)} aria-label={`Show design ${index + 1}: ${item.title}`} aria-current={active === index ? "true" : undefined} />)}</div>
          <button type="button" onClick={() => move(1)} aria-label="Next design"><ArrowRight size={18} /></button>
          <button type="button" className={styles.pause} data-rotation-control onClick={() => { setFocused(false); if (reducedMotion) { setReducedMotion(false); setPaused(false); } else { setPaused(!paused); } }} aria-label={paused || reducedMotion ? "Play carousel" : "Pause carousel"}>{paused || reducedMotion ? <Play size={15} /> : <Pause size={15} />}</button>
        </div>
        <p className={styles.current}>{String(active + 1).padStart(2, "0")} <span>/ 07</span> <span className={styles.currentTitle}>{images[active].title}</span></p>
      </div>
      <dialog ref={dialog} className={styles.dialog} aria-labelledby="design-title" onClose={() => setOpened(null)}
        onClick={event => { if (event.target === event.currentTarget) close(); }}
        onKeyDown={event => {
          if (event.key === "ArrowLeft") { event.preventDefault(); event.stopPropagation(); movePopup(-1); }
          if (event.key === "ArrowRight") { event.preventDefault(); event.stopPropagation(); movePopup(1); }
        }}>
        {opened !== null && <div className={styles.modal}>
          <div className={styles.modalHeader}><div><span className={styles.eyebrow}>Design {opened + 1} / {images.length}</span><h3 id="design-title">{images[opened].title}</h3></div><button type="button" onClick={close} aria-label="Close image viewer" autoFocus><X size={22} /></button></div>
          <div className={styles.modalImage}><Image src={`/skills/skill${opened + 1}.png`} alt={images[opened].alt} fill sizes="(max-width: 767px) 90vw, 1000px" loading="eager" /></div>
          <div className={styles.modalFooter}><button type="button" onClick={() => movePopup(-1)} aria-label="Previous image"><ArrowLeft size={20} /><span>Previous</span></button><p aria-live="polite">{opened + 1} / {images.length}</p><button type="button" onClick={() => movePopup(1)} aria-label="Next image"><span>Next</span><ArrowRight size={20} /></button></div>
        </div>}
      </dialog>
    </div>
  );
}
