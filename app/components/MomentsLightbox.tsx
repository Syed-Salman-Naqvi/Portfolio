"use client";

import { useEffect, useState } from "react";

type Photo = [string, string];

type Props = {
  photos: Photo[];
  base: string;
};

export default function MomentsLightbox({ photos, base }: Props) {
  const [active, setActive] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState("50% 50%");

  useEffect(() => {
    if (active === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") {
        setActive((value) => value === null ? 0 : (value + 1) % photos.length);
      }
      if (event.key === "ArrowLeft") {
        setActive((value) => value === null ? 0 : (value - 1 + photos.length) % photos.length);
      }
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    document.body.classList.add("lightbox-open");
    setZoomed(false);
    setZoomOrigin("50% 50%");

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      document.body.classList.remove("lightbox-open");
    };
  }, [active, photos.length]);

  const openPhoto = (index: number) => {
    setActive(index);
    setZoomed(false);
    setZoomOrigin("50% 50%");
  };

  return (
    <>
      <div className="photo-grid">
        {photos.map(([src, title], i) => (
          <button
            className={"photo-card photo-card-" + (i + 1)}
            key={src}
            type="button"
            onClick={() => openPhoto(i)}
            aria-label={"Open photo " + (i + 1) + ": " + title}
          >
            <img src={base + "/" + src} alt={title} loading="lazy" />
            <span className="photo-overlay" />
            <span className="photo-caption">
              <small>0{i + 1}</small>
              <span>{title}</span>
            </span>
            <span className="photo-open">OPEN ↗</span>
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          className="moments-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Moments photo viewer"
          onClick={() => setActive(null)}
        >
          <button
            className="moments-lightbox-close"
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setActive(null);
            }}
            aria-label="Close photo viewer"
          >
            <span>CLOSE</span>
            <b>×</b>
          </button>

          <button
            className="moments-lightbox-arrow moments-lightbox-prev"
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setActive((active - 1 + photos.length) % photos.length);
            }}
            aria-label="Previous photo"
          >
            ←
          </button>

          <div
            className={"moments-lightbox-frame" + (zoomed ? " is-zoomed" : "")}
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={base + "/" + photos[active][0]}
              alt={photos[active][1]}
              style={{ transformOrigin: zoomOrigin }}
              onClick={(event) => {
                event.stopPropagation();

                if (zoomed) {
                  setZoomed(false);
                  setZoomOrigin("50% 50%");
                  return;
                }

                const rect = event.currentTarget.getBoundingClientRect();
                const x = ((event.clientX - rect.left) / rect.width) * 100;
                const y = ((event.clientY - rect.top) / rect.height) * 100;

                setZoomOrigin(x + "% " + y + "%");
                setZoomed(true);
              }}
            />
            <div>
              <span>PHOTO 0{active + 1} / {photos.length}</span>
              <span>ESC TO CLOSE • ← → TO NAVIGATE • CLICK TO ZOOM</span>
            </div>
          </div>

          <button
            className="moments-lightbox-arrow moments-lightbox-next"
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setActive((active + 1) % photos.length);
            }}
            aria-label="Next photo"
          >
            →
          </button>
        </div>
      )}
    </>
  );
}
