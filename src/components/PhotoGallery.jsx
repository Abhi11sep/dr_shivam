"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { galleryPhotos } from "@/lib/gallery-photos";
import { introDuration, introKeyframes, settledTiles } from "@/lib/gallery-intro";
import styles from "./PhotoGallery.module.css";

export default function PhotoGallery() {
  const [finished, setFinished] = useState(false);
  const collection = useRef(null);

  useEffect(() => {
    const cards = collection.current.querySelectorAll("figure");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.dataset.visible = "true";
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    cards.forEach(card => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="gallery-title" data-finished={finished}>
      <style>{introKeyframes}</style>
      <div className={styles.mosaic} aria-hidden="true">
        {galleryPhotos.map((photo, index) => <div className={styles.tile} key={photo.src}
          onAnimationEnd={index === 0 ? () => setFinished(true) : undefined}
          style={{
            left: `${settledTiles[index].left}%`, top: `${settledTiles[index].top}%`,
            width: `${settledTiles[index].width}%`, height: `${settledTiles[index].height}%`,
            animationName: `gallery-tile-${index}`, animationDuration: `${introDuration}s`,
          }}>
          <div className={styles.tilePhoto}>
          <Image src={photo.src} alt="" fill sizes="(max-width: 640px) 100vw, 85vw" loading="eager" fetchPriority={index === 0 ? "high" : "auto"} />
          </div>
        </div>)}
      </div>
      <div className={styles.heroShade} />
      <header className={styles.heroText}>
        <span className={styles.eyebrow}>The personal collection / Dr. Shivam</span>
        <h1 id="gallery-title">Life, in <em>frames.</em></h1>
        <p>People. Places. Everything in between.</p>
      </header>
      <div className={styles.heroBottom}>
        <span>PHOTO GALLERY <span className={styles.count}> / 01—{String(galleryPhotos.length).padStart(2, "0")}</span></span>
        <a href="#collection" onClick={() => setFinished(true)}>Explore the collection <ArrowDown size={16} /></a>
      </div>
      {!finished && <button className={styles.skip} onClick={() => setFinished(true)}>Skip intro <ArrowUpRight size={14} /></button>}
    </section>

    <section id="collection" className={styles.collection} ref={collection} aria-labelledby="collection-title">
      <div className={styles.collectionHeading}>
        <div><span className={styles.eyebrow}>A visual journal</span><h2 id="collection-title">Small moments.<br /><em>Lasting impressions.</em></h2></div>
        <p>A few glimpses beyond the research.<br />Every frame has a story of its own.</p>
      </div>
      <div className={styles.grid}>
        {galleryPhotos.map((photo, index) => <figure className={styles.card} key={photo.src}>
          <div className={styles.imageWrap}>
            <Image src={photo.src} alt={photo.alt} width={1200} height={900} sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 60vw" />
            <span className={styles.photoIndex}>{String(index + 1).padStart(2, "0")}</span>
          </div>
          <figcaption><span className={styles.category}>{photo.category}</span><h3>{photo.title}</h3><p>{photo.caption}</p></figcaption>
        </figure>)}
      </div>
      <div className={styles.outro}><span className={styles.eyebrow}>More memories to come</span><p>The journey continues<span>.</span></p><Link href="/#memories">Back to the portfolio <ArrowUpRight size={17} /></Link></div>
    </section>
  </div>;
}
