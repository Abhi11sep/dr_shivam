"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera, Pause, Play, ChefHat, Heart, Sparkles } from "lucide-react";
import styles from "./HobbySection.module.css";

const PHOTOS = [
  { src: "/conferences/con1.jpg", alt: "A research presentation at a conference" },
  { src: "/education/iit_kanpur.jpg", alt: "IIT Kanpur campus" },
  { src: "/conferences/con4.jpg", alt: "Moments from an academic gathering" },
  { src: "/education/mnnit_allahabad.jpg", alt: "MNNIT Allahabad campus" },
  { src: "/conferences/con5.jpg", alt: "A conference group photograph" },
];

function FilmStrip({ reverse, paused }) {
  return <div className={styles.film} data-direction={reverse ? "right" : "left"} data-paused={paused} tabIndex={0} role="region" aria-label={reverse ? "Photo film moving to the right" : "Photo film moving to the left"}>
    <div className={styles.filmTrack}>
      {[0, 1].map(copy => <div className={styles.filmSet} key={copy} aria-hidden={copy === 1 ? "true" : undefined}>
        {PHOTOS.map((photo, index) => <figure className={styles.frame} key={photo.src}>
          <Image src={photo.src} alt={copy ? "" : photo.alt} fill sizes="(max-width: 639px) 150px, 220px" draggable={false} />
          <figcaption>{String(index + 1).padStart(2, "0")} / MOMENTS</figcaption>
        </figure>)}
      </div>)}
    </div>
  </div>;
}

function CameraIllustration() {
  return <svg viewBox="0 0 260 260" className={styles.cameraArt} role="img" aria-label="Custom illustration of a camera with a purple lens">
    <defs><linearGradient id="hobby-camera-body" x2="1" y2="1"><stop stopColor="#354962"/><stop offset="1" stopColor="#101d32"/></linearGradient><radialGradient id="hobby-camera-lens"><stop stopColor="#7dd3fc"/><stop offset=".35" stopColor="#635bc8"/><stop offset=".65" stopColor="#1c3157"/><stop offset="1" stopColor="#080f20"/></radialGradient></defs>
    <ellipse cx="130" cy="226" rx="98" ry="13" fill="#000" opacity=".2"/>
    <path d="M27 81Q27 66 43 66H79L91 45H159L172 66H217Q235 66 235 84V191Q235 209 216 209H45Q27 209 27 191Z" fill="url(#hobby-camera-body)" stroke="#8da4c3" strokeWidth="2"/>
    <path d="M29 109H233" stroke="#607692" opacity=".55"/>
    <rect x="47" y="55" width="29" height="11" rx="4" fill="#c4b5fd"/>
    <rect x="102" y="54" width="47" height="21" rx="5" fill="#071324" stroke="#607692"/>
    <rect x="41" y="121" width="31" height="68" rx="9" fill="#071324"/>
    <circle cx="144" cy="139" r="65" fill="#101b2c" stroke="#b6a5e3" strokeWidth="3"/>
    <circle cx="144" cy="139" r="54" fill="#253655" stroke="#7185a8" strokeWidth="2"/>
    <circle cx="144" cy="139" r="44" fill="url(#hobby-camera-lens)"/>
    <circle cx="144" cy="139" r="30" fill="none" stroke="#aca0eb" opacity=".6"/>
    <ellipse cx="127" cy="121" rx="12" ry="7" fill="#d6f8ff" opacity=".45" transform="rotate(-40 127 121)"/>
    <circle cx="210" cy="89" r="5" fill="#fb7185"/>
    <text x="45" y="96" fill="#cbd5e1" fontSize="9" letterSpacing="2">CAPTURE</text>
  </svg>;
}

function BadmintonIllustration() {
  return <svg viewBox="0 0 440 350" className={styles.sportArt} role="img" aria-label="Custom illustration of a mint badminton racket and a feather shuttlecock">
    <defs><pattern id="hobby-racket-strings" width="12" height="12" patternUnits="userSpaceOnUse"><path d="M0 0H12M0 0V12" stroke="#d2faf0" strokeWidth=".8" opacity=".65"/></pattern><linearGradient id="hobby-racket-rim"><stop stopColor="#a7f3d0"/><stop offset="1" stopColor="#2dd4bf"/></linearGradient><linearGradient id="hobby-shuttle-feather" x2="0" y2="1"><stop stopColor="#fffdf3"/><stop offset="1" stopColor="#b4dfd6"/></linearGradient></defs>
    <circle cx="208" cy="158" r="126" fill="#5eead4" opacity=".045"/><circle cx="208" cy="158" r="101" fill="none" stroke="#5eead4" strokeDasharray="3 10" opacity=".18"/>
    <g transform="rotate(30 195 172)">
      <ellipse cx="177" cy="113" rx="67" ry="86" fill="#10372f" stroke="url(#hobby-racket-rim)" strokeWidth="8"/>
      <ellipse cx="177" cy="113" rx="60" ry="79" fill="url(#hobby-racket-strings)" stroke="#e1fff5" strokeWidth="1.5"/>
      <path d="M157 196L175 225L192 196M175 224V284" stroke="#74dcc7" strokeWidth="5" fill="none"/>
      <rect x="165" y="274" width="20" height="65" rx="7" fill="#163047" stroke="#8dd1c0" strokeWidth="2"/>
      {[284,294,304,314,324].map(y=><path key={y} d={"M166 "+y+"l18 6"} stroke="#5bb5a4" strokeWidth="2"/>)}
    </g>
    <g className={styles.shuttle} transform="translate(295 90) rotate(22)">
      {[-30,-15,0,15,30].map((x,i)=><path key={x} d={"M0 80Q"+(x-10)+" 48 "+(x-20)+" 3Q"+x+" -12 "+(x+15)+" 4L9 80Z"} fill="url(#hobby-shuttle-feather)" stroke="#9ac7bb" strokeWidth="1" opacity={i===2?1:.9}/>)}
      <path d="M-18 59L20 59M-13 69H16" stroke="#62ab98" strokeWidth="2"/>
      <path d="M-10 78Q-16 105 3 109Q23 105 14 78Z" fill="#e7cda4" stroke="#bc9d72"/>
      <path d="M-10 80H14" stroke="#438c7e" strokeWidth="6"/>
    </g>
    <path d="M334 242Q371 195 359 156" fill="none" stroke="#a7f3d0" strokeWidth="1.5" strokeDasharray="4 7" opacity=".35"/>
  </svg>;
}

function CookingIllustration() {
  return <svg viewBox="0 0 440 340" className={styles.cookingArt} role="img" aria-label="Custom illustration of a warm meal with vegetables in a cooking pan">
    <defs><linearGradient id="hobby-pan" x2="0" y2="1"><stop stopColor="#566579"/><stop offset="1" stopColor="#192638"/></linearGradient><radialGradient id="hobby-soup"><stop stopColor="#f6c879"/><stop offset="1" stopColor="#df9051"/></radialGradient></defs>
    <circle cx="218" cy="171" r="132" fill="#fb923c" opacity=".05"/>
    <g className={styles.steam} fill="none" stroke="#ffe2bb" strokeWidth="3" strokeLinecap="round" opacity=".45"><path d="M167 101Q151 80 168 59Q184 39 167 21"/><path d="M215 84Q200 62 216 44Q232 25 219 10"/><path d="M263 102Q247 80 262 64Q277 47 266 33"/></g>
    <rect x="307" y="167" width="102" height="22" rx="11" fill="#b79474" stroke="#e7c9a8" strokeWidth="2" transform="rotate(-18 307 167)"/>
    <ellipse cx="211" cy="203" rx="115" ry="85" fill="url(#hobby-pan)" stroke="#8997a9" strokeWidth="3"/>
    <ellipse cx="211" cy="189" rx="108" ry="74" fill="#15202d" stroke="#b5c0ce" strokeWidth="2"/>
    <ellipse cx="211" cy="186" rx="94" ry="61" fill="url(#hobby-soup)"/>
    {[ [164,165],[235,154],[269,192],[196,218] ].map(([x,y])=><g key={x}><circle cx={x} cy={y} r="15" fill="#d25f51"/><circle cx={x} cy={y} r="10" fill="#ee8970"/><path d={"M"+(x-4)+" "+y+"h8"} stroke="#ffd4a1" strokeWidth="2"/></g>)}
    {[[184,147],[221,192],[249,218],[150,199]].map(([x,y])=><g key={x} transform={"translate("+x+" "+y+")"}><ellipse rx="15" ry="8" fill="#6d9c5a" transform="rotate(-25)"/><path d="M-10 5L10 -5" stroke="#b9d78a"/></g>)}
    <g fill="#fff0cb"><rect x="196" y="158" width="13" height="15" rx="3" transform="rotate(20 196 158)"/><rect x="255" y="172" width="13" height="15" rx="3"/><rect x="177" y="187" width="14" height="15" rx="3"/></g>
    <g transform="translate(53 269) rotate(-20)"><ellipse rx="17" ry="27" fill="#b7895e" stroke="#f0cea2" strokeWidth="2"/><rect x="-4" y="20" width="8" height="65" rx="4" fill="#b7895e"/></g>
    <path d="M330 269q16 -31 36 -22q-4 29 -36 22M334 270q-13 -23 -29 -17q3 22 29 17" fill="#719c65"/><path d="M332 279l3 -22" stroke="#b6d198" strokeWidth="2"/>
  </svg>;
}

export default function HobbySection() {
  const [paused, setPaused] = useState(false);
  return <section id="hobby" className={styles.section} aria-labelledby="hobby-heading">
    <div className={styles.container}>
      <header className={styles.header}><span className={styles.eyebrow}>Beyond the research</span><h2 id="hobby-heading">A little room for <span>joy.</span></h2><p>Fresh perspectives, a little movement, and the pleasure of making something from scratch.</p></header>
      <article className={styles.photography} aria-labelledby="photography-title">
        <div className={styles.photoHeading}><div><span className={styles.kicker}>01 / Through my lens</span><h3 id="photography-title">Photo<span>graphy.</span></h3></div><button type="button" className={styles.pause} aria-pressed={paused} onClick={()=>setPaused(value=>!value)}>{paused?<Play size={15}/>:<Pause size={15}/>}<span>{paused?"Resume film":"Pause film"}</span></button></div>
        <div className={styles.filmScene}><div className={styles.strips}><FilmStrip reverse paused={paused}/><FilmStrip paused={paused}/></div><div className={styles.camera}><CameraIllustration/><span><Camera size={13}/> Life, one frame at a time.</span></div></div>
        <p className={styles.photoNote}>Finding beauty in places, people, and everyday details. <span>Sample frames from the portfolio.</span></p>
      </article>
      <div className={styles.hobbyGrid}>
        <article className={styles.badminton} aria-labelledby="badminton-title"><div className={styles.cardIntro}><span className={styles.kicker}>02 / Play & recharge</span><h3 id="badminton-title">Badminton<span>.</span></h3><p>A change of pace, a clear mind.</p></div><BadmintonIllustration/><div className={styles.cardContent}><p>A quick rally is a refreshing break from the desk. Badminton brings together movement, focus, and the simple enjoyment of a good game.</p><div className={styles.chips}><span>Quick reflexes</span><span>Friendly rallies</span><span>Fresh energy</span></div><div className={styles.cardFooter}><Heart size={14}/><span>Finding balance, one rally at a time.</span></div></div></article>
        <article className={styles.cooking} aria-labelledby="cooking-title"><div className={styles.cardIntro}><span className={styles.kicker}>03 / Make & savour</span><h3 id="cooking-title">Cooking<span>.</span></h3><p>A little curiosity. A pinch of creativity.</p></div><CookingIllustration/><div className={styles.cardContent}><p>The kitchen offers another kind of exploration: trying flavours, working with simple ingredients, and turning a small idea into something comforting to share.</p><div className={styles.chips}><span>Fresh ingredients</span><span>New flavours</span><span>Made with care</span></div><div className={styles.cardFooter}><ChefHat size={15}/><span>Small experiments. Delicious possibilities.</span><Sparkles size={13}/></div></div></article>
      </div>
    </div>
  </section>;
}
