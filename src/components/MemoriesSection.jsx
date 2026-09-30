"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera, Pause, Play } from "lucide-react";
import styles from "./MemoriesSection.module.css";

const MEMORIES = [
  { src: "/conferences/con1.jpg", label: "Conversations & connections" },
  { src: "/education/iit_kanpur.jpg", label: "Places that shape the journey" },
  { src: "/conferences/con2.jpg", label: "Sharing ideas" },
  { src: "/conferences/con3.jpg", label: "Beyond the laboratory" },
  { src: "/conferences/con4.jpg", label: "A moment to remember" },
  { src: "/education/mnnit_allahabad.jpg", label: "Academic beginnings" },
  { src: "/conferences/con5.jpg", label: "Learning together" },
  { src: "/hobby/lens.jpg", label: "Through a different lens" },
];

export default function MemoriesSection() {
  const [paused, setPaused] = useState(false);
  return (
    <section id="memories" className={styles.section} aria-labelledby="memories-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={styles.canvas} data-paused={paused}>
          <div className={styles.collage} aria-hidden="true">
            {[0, 1, 2, 3].map(row => {
              const photos = [...MEMORIES.slice(row * 2), ...MEMORIES.slice(0, row * 2)];
              return <div className={styles.lane} key={row}>
                {[0, 1].map(copy => <div className={styles.strip} key={copy}>
                  {photos.map(photo => <div className={styles.photo} key={photo.src}>
                    <Image src={photo.src} alt="" fill sizes="(max-width: 640px) 220px, 340px" />
                    <span>{photo.label}</span>
                  </div>)}
                </div>)}
              </div>;
            })}
          </div>
          <div className={styles.shade} />
          <header className={styles.heading}>
            <span className={styles.eyebrow}><Camera size={15} aria-hidden="true" /> The moments in between</span>
            <h2 id="memories-title">Memories<span>Beyond the research.</span></h2>
            <p>People, places, and little moments that make the journey meaningful.</p>
          </header>
          <div className={styles.bottom}>
            <span className={styles.note}>A few glimpses from the journey</span>
            <button type="button" className={styles.pause} onClick={() => setPaused(value => !value)} aria-label={paused ? "Play memories animation" : "Pause memories animation"} aria-pressed={paused}>
              {paused ? <Play size={15} /> : <Pause size={15} />}<span>{paused ? "Play" : "Pause"}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
