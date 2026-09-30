"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Camera, Pause, Play } from "lucide-react";
import styles from "./HobbySection.module.css";

const photos = [
  { src: "/skills/skill1.png", alt: "Indoor air filtration design" },
  { src: "/skills/skill2.png", alt: "Material processing illustration" },
  { src: "/skills/skill3.png", alt: "Cylindrical filter architecture" },
  { src: "/skills/skill4.png", alt: "Electrostatic air treatment design" },
  { src: "/skills/skill5.png", alt: "Layered filter design" },
  { src: "/skills/skill6.png", alt: "Extrusion system model" },
  { src: "/skills/skill7.png", alt: "Syringe pump setup" },
];
const secondRow = [...photos.slice(3), ...photos.slice(0, 3)];

// Both the cord and the clips use the same quadratic curve.
function PhotoRow({ items, reverse = false, paused }) {
  const row = useRef(null);
  const wire = useRef(null);
  const phase = useRef(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const element = row.current;
    const cards = [...element.querySelectorAll('[data-hanger]')];
    const list = element.querySelector('[data-photo-list]');
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0, step = 0, cardWidth = 0, sag = 0;
    let frame, previous = 0, visible = false;
    const paint = () => {
      const total = step * cards.length;
      if (!total) return;
      cards.forEach((card, index) => {
        const x = query.matches ? index * step : ((index * step + phase.current) % total + total) % total - step;
        const t = Math.max(0, Math.min(1, (x + cardWidth / 2) / width));
        const y = 26 + 4 * sag * t * (1 - t);
        card.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
      });
    };
    const measure = () => {
      width = element.clientWidth;
      cardWidth = cards[0].offsetWidth;
      step = cardWidth + parseFloat(getComputedStyle(element).getPropertyValue('--print-gap'));
      sag = Math.min(64, width * .085);
      wire.current.setAttribute('viewBox', '0 0 ' + width + ' 170');
      wire.current.querySelector('path').setAttribute('d', 'M0 26 Q' + width / 2 + ' ' + (26 + 2 * sag) + ' ' + width + ' 26');
      element.dataset.reducedMotion = String(query.matches);
      list.style.width = query.matches ? step * cards.length + 'px' : '100%';
      paint();
    };
    const tick = time => {
      if (previous && visible && !document.hidden && !paused && !hovered && !focused && !query.matches) {
        const elapsed = Math.min(time - previous, 50) / 1000;
        phase.current += elapsed * (reverse ? 24 : -22);
        paint();
      }
      previous = time;
      frame = requestAnimationFrame(tick);
    };
    const resize = new ResizeObserver(measure);
    resize.observe(element);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(element);
    query.addEventListener('change', measure);
    measure();
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      observer.disconnect();
      query.removeEventListener('change', measure);
    };
  }, [paused, hovered, focused, reverse]);

  return <div ref={row} className={styles.row} role="region" aria-label={reverse ? "Photos moving from left to right" : "Photos moving from right to left"} tabIndex={0}
    onPointerEnter={event => { if (event.pointerType === "mouse") setHovered(true); }} onPointerLeave={() => setHovered(false)}
    onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} data-still={paused || hovered || focused}>
    <svg ref={wire} className={styles.wire} aria-hidden="true" preserveAspectRatio="none"><path d="M0 26 Q500 154 1000 26" /></svg>
    <div className={styles.photoList} data-photo-list>
      {items.map((photo, index) => <div data-hanger className={styles.hanger} key={photo.src} style={{ "--tilt": [-2.4, 1.8, -1.2, 2.1, -.9, 1.4, -1.8][index] + "deg", "--sway-delay": -index * 1.3 + "s" }}>
        <figure className={styles.print}>
          <span className={styles.clip} aria-hidden="true"><i /></span>
          <div className={styles.photo}><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 639px) 160px, 204px" draggable={false} /></div>
          <figcaption><span>little moments</span><small>{String(photos.indexOf(photo) + 1).padStart(2, "0")}</small></figcaption>
        </figure>
      </div>)}
    </div>
  </div>;
}

export default function HobbySection() {
  const [paused, setPaused] = useState(false);

  return <section id="hobby" className={styles.section} aria-labelledby="hobby-heading">
    <div className={styles.container}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>Beyond the research</span>
        <h2 id="hobby-heading">Hobby<span>.</span></h2>
        <p className={styles.subtitle}>Creative pursuits, fresh perspectives, and moments worth keeping.</p>
      </header>
      <div className={styles.photographyHeader}>
        <h3 className={styles.subheading}>
          <span className={styles.photographyLabel}><Camera size={16} aria-hidden="true" /> Through my lens</span>
          <span>Photo<em>graphy</em><b>.</b></span>
        </h3>
        <button type="button" aria-pressed={paused} onClick={() => setPaused(value => !value)}>
          {paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
          {paused ? "Resume gallery" : "Pause gallery"}
        </button>
      </div>
      <div className={styles.gallery} data-paused={paused} aria-label="Photographs clipped to two illuminated wires">
        <PhotoRow items={photos} reverse paused={paused} />
        <PhotoRow items={secondRow} paused={paused} />
      </div>
      <p className={styles.previewNote}>Preview collection · Images from Skills, until the photographs arrive.</p>
    </div>
  </section>;
}
