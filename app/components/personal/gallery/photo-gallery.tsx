'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image, { type StaticImageData } from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Photo {
  image: StaticImageData;
  alt: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
  title?: string;
}

function scrollBehavior(): ScrollBehavior {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
}

// Tracks whether a horizontal scroller can move further left or right.
function useScrollEdges(ref: React.RefObject<HTMLElement | null>) {
  const [edges, setEdges] = useState({ atStart: true, atEnd: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setEdges({
        atStart: scrollLeft <= 1,
        atEnd: scrollLeft + clientWidth >= scrollWidth - 1,
      });
    };

    update();
    el.addEventListener('scroll', update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => {
      el.removeEventListener('scroll', update);
      observer.disconnect();
    };
  }, [ref]);

  return edges;
}

const arrowClass =
  'flex items-center justify-center rounded-full bg-black/60 p-2 text-white backdrop-blur-sm transition hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white aria-disabled:pointer-events-none aria-disabled:opacity-0';

export default function PhotoGallery({ photos, title = 'Gallery' }: PhotoGalleryProps) {
  const stripRef = useRef<HTMLUListElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const strip = useScrollEdges(stripRef);

  const scrollStrip = (direction: 1 | -1) => {
    const el = stripRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.9, behavior: scrollBehavior() });
  };

  const goTo = useCallback(
    (index: number, behavior: ScrollBehavior = scrollBehavior()) => {
      const el = slidesRef.current;
      if (!el) return;
      const clamped = Math.max(0, Math.min(photos.length - 1, index));
      el.scrollTo({ left: clamped * el.clientWidth, behavior });
    },
    [photos.length]
  );

  const open = (index: number) => {
    setCurrent(index);
    dialogRef.current?.showModal();
    goTo(index, 'instant');
  };

  const close = () => dialogRef.current?.close();

  // The slide track is the source of truth for the current photo, so swipes,
  // trackpad scrolling, arrows, and keys all stay in sync.
  const onSlidesScroll = () => {
    const el = slidesRef.current;
    if (!el) return;
    setCurrent(Math.round(el.scrollLeft / el.clientWidth));
  };

  const onDialogKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(current + 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(current - 1);
    }
  };

  return (
    <section
      id="gallery"
      className="rounded-lg border border-neutral-accent/30 bg-black/60 p-4 shadow-lg backdrop-blur-xs md:p-5"
      aria-roledescription="carousel"
      aria-label={title}
    >
      <h2 className="mb-4 text-3xl font-bold text-neutral-heading">{title}</h2>

      <div className="relative">
        <ul
          ref={stripRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {photos.map((photo, index) => (
            <li key={photo.image.src} className="shrink-0 snap-start">
              <button
                type="button"
                onClick={() => open(index)}
                className="relative block h-60 w-80 max-w-[80vw] overflow-hidden rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-accent"
                aria-label={`View photo ${index + 1} of ${photos.length}: ${photo.alt}`}
              >
                <Image
                  src={photo.image}
                  alt={photo.alt}
                  fill
                  placeholder="blur"
                  sizes="320px"
                  className="object-cover transition-transform duration-300 ease-out hover:scale-105"
                />
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => scrollStrip(-1)}
          aria-disabled={strip.atStart}
          aria-label="Scroll gallery left"
          className={cn(arrowClass, 'absolute top-1/2 left-2 hidden -translate-y-1/2 md:flex')}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          type="button"
          onClick={() => scrollStrip(1)}
          aria-disabled={strip.atEnd}
          aria-label="Scroll gallery right"
          className={cn(arrowClass, 'absolute top-1/2 right-2 hidden -translate-y-1/2 md:flex')}
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Native modal dialog: focus trapping, Escape to close, focus return, and
          top-layer stacking (above the sidebar) all come from the browser. */}
      <dialog
        ref={dialogRef}
        onKeyDown={onDialogKeyDown}
        aria-label={`${title} viewer`}
        className="m-0 h-dvh max-h-none w-dvw max-w-none bg-transparent p-0 text-white backdrop:bg-black/90 backdrop:backdrop-blur-sm"
      >
        <div
          ref={slidesRef}
          onScroll={onSlidesScroll}
          className="flex h-full snap-x snap-mandatory overflow-x-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {photos.map((photo, index) => (
            // Clicking the empty space around a photo closes the viewer.
            <div
              key={photo.image.src}
              onClick={(event) => event.target === event.currentTarget && close()}
              className="flex h-full w-full shrink-0 snap-center snap-always items-center justify-center p-4 md:p-16"
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${photos.length}`}
            >
              <Image
                src={photo.image}
                alt={photo.alt}
                placeholder="blur"
                sizes="100vw"
                draggable={false}
                className="h-auto max-h-full w-auto max-w-full rounded-lg object-contain select-none"
              />
            </div>
          ))}
        </div>

        <p className="absolute top-4 left-4 rounded-full bg-black/60 px-3 py-1 text-sm tabular-nums">
          {current + 1} / {photos.length}
        </p>
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className={cn(arrowClass, 'absolute top-4 right-4')}
        >
          <X className="h-6 w-6" />
        </button>
        <button
          type="button"
          onClick={() => goTo(current - 1)}
          aria-disabled={current === 0}
          aria-label="Previous photo"
          className={cn(arrowClass, 'absolute top-1/2 left-4 hidden -translate-y-1/2 sm:flex')}
        >
          <ChevronLeft className="h-7 w-7" />
        </button>
        <button
          type="button"
          onClick={() => goTo(current + 1)}
          aria-disabled={current === photos.length - 1}
          aria-label="Next photo"
          className={cn(arrowClass, 'absolute top-1/2 right-4 hidden -translate-y-1/2 sm:flex')}
        >
          <ChevronRight className="h-7 w-7" />
        </button>
      </dialog>
    </section>
  );
}
