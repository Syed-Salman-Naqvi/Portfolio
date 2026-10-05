"use client";

import { useEffect, useState } from "react";

type Props = {
  images: string[];
  base: string;
};

export default function ProjectLightbox({ images, base }: Props) {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((value) => value === null ? 0 : (value + 1) % images.length);
      if (event.key === "ArrowLeft") setActive((value) => value === null ? 0 : (value - 1 + images.length) % images.length);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, images.length]);

  return (
    <>
      <div className="snapshot-grid">
        {images.map((src, index) => (
          <button className="snapshot-item" key={src} type="button" onClick={() => setActive(index)} aria-label={`Open project screenshot ${index + 1}`}>
            <img src={`${base}/${src}`} alt={`Project screenshot ${index + 1}`} loading="lazy" />
            <span className="snapshot-index">0{index + 1}</span>
            <span className="snapshot-open">OPEN ↗</span>
          </button>
        ))}
      </div>

      {active !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Project screenshot viewer" onClick={() => setActive(null)}>
          <button className="lightbox-close" type="button" onClick={() => setActive(null)} aria-label="Close">×</button>
          <button className="lightbox-arrow lightbox-prev" type="button" onClick={(event) => { event.stopPropagation(); setActive((active - 1 + images.length) % images.length); }} aria-label="Previous">←</button>
          <div className="lightbox-frame" onClick={(event) => event.stopPropagation()}>
            <img src={`${base}/${images[active]}`} alt={`Project screenshot ${active + 1}`} />
            <div><span>PROJECT SNAPSHOT 0{active + 1}</span><span>ESC TO CLOSE • ← → TO NAVIGATE</span></div>
          </div>
          <button className="lightbox-arrow lightbox-next" type="button" onClick={(event) => { event.stopPropagation(); setActive((active + 1) % images.length); }} aria-label="Next">→</button>
        </div>
      )}
    </>
  );
}
