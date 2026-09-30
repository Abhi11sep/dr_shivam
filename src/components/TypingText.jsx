"use client";

import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from "react";

export default function TypingText({ children, className }) {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame;
    let startedAt;
    const animate = (time) => {
      startedAt ??= time;
      const nextProgress = Math.min((time - startedAt) / 2400, 1);
      setProgress(nextProgress);
      if (nextProgress < 1) frame = requestAnimationFrame(animate);
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setProgress(1);
        } else {
          frame = requestAnimationFrame(animate);
        }
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  // Keep every character in the layout so typing never moves the page below it.
  function countCharacters(nodes) {
    return Children.toArray(nodes).reduce((total, node) => total + (
      typeof node === "string" ? node.replace(/\s/g, "").length :
        isValidElement(node) ? countCharacters(node.props.children) : 0
    ), 0);
  }
  const visibleCharacters = Math.ceil(countCharacters(children) * progress);
  let characterIndex = 0;
  function revealContent(nodes) {
    return Children.map(nodes, (node) => {
      if (typeof node === "string") {
        return node.split(/(\s+)/).map((word, wordIndex) => {
          if (/^\s+$/.test(word)) return word;
          return (
            <span key={wordIndex} className="inline-block">
              {Array.from(word).map((character, index) => {
                const visible = characterIndex++ < visibleCharacters;
                return <span key={index} style={{ opacity: visible ? 1 : 0 }}>{character}</span>;
              })}
            </span>
          );
        });
      }
      return isValidElement(node)
        ? cloneElement(node, {}, revealContent(node.props.children))
        : node;
    });
  }

  return (
    <div ref={containerRef} className={className} data-typing-complete={progress === 1}>
      {progress === 1 ? <div className="space-y-6">{children}</div> : <>
        <div className="sr-only">{children}</div>
        <div aria-hidden="true" className="space-y-6">{revealContent(children)}</div>
      </>}
    </div>
  );
}
