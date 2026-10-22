import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { CoverScene } from "@/components/wedding/scenes/CoverScene";
import { CoupleScene } from "@/components/wedding/scenes/CoupleScene";
import { FormalScene } from "@/components/wedding/scenes/FormalScene";
import { CeremonyScene } from "@/components/wedding/scenes/CeremonyScene";
import { ArrivalScene } from "@/components/wedding/scenes/ArrivalScene";
import { ReceptionScene } from "@/components/wedding/scenes/ReceptionScene";
import { FinaleScene } from "@/components/wedding/scenes/FinaleScene";
import { PetalsOverlay } from "@/components/wedding/PetalsOverlay";
import { wedding } from "@/config/wedding";

import coverImg from "@/assets/scene-church-cover.jpg";
import coupleImg from "@/assets/scene-church-couple.jpg";
import formalImg from "@/assets/scene-formal-panel.jpg";
import ceremonyImg from "@/assets/scene-ceremony.jpg";
import arrivalImg from "@/assets/scene-arrival.jpg";
import receptionImg from "@/assets/scene-reception-panel.jpg";
import finaleImg from "@/assets/scene-finale.jpg";

const BGM_SRC = "/assets/wedding-bgm.mp3";

const SCENE_IMAGES = [
  coverImg,
  coupleImg,
  formalImg,
  ceremonyImg,
  arrivalImg,
  receptionImg,
  finaleImg,
];

interface SceneCtx {
  go: (index: number) => void;
  startAudio: () => void;
}

const SCENES: { id: string; label: string; render: (ctx: SceneCtx) => React.ReactNode }[] = [
  {
    id: "cover",
    label: "Opening",
    render: (ctx) => (
      <CoverScene
        onOpen={() => {
          ctx.startAudio();
          ctx.go(1);
        }}
      />
    ),
  },
  { id: "couple", label: "The Couple", render: () => <CoupleScene /> },
  { id: "formal", label: "The Invitation", render: () => <FormalScene /> },
  { id: "ceremony", label: "Ceremony", render: () => <CeremonyScene /> },
  { id: "arrival", label: "The Journey", render: () => <ArrivalScene /> },
  { id: "reception", label: "Lunch Venue", render: () => <ReceptionScene /> },
  {
    id: "finale",
    label: "Save Date",
    render: () => <FinaleScene />,
  },
];

const TRANSITION_LOCK_MS = 1200;

export function InvitationExperience() {
  const [index, setIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const reduced = useReducedMotion();
  const lockUntilRef = useRef(0);
  const touchStartYRef = useRef<number | null>(null);
  const touchStartScrollRef = useRef(0);
  const touchConsumedRef = useRef(false);

  /* Initialize looped background music and trigger automatic playback */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const audio = new Audio(BGM_SRC);
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    // Attempt immediate autoplay on mount
    audio.play().catch(() => {
      // Browser prevented autoplay before interaction
    });

    // Start on any initial user interaction if autoplay was initially restricted
    const handleInteraction = () => {
      if (audio.paused) {
        audio.play().catch(() => {});
      }
      window.removeEventListener("pointerdown", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("wheel", handleInteraction);
    };

    window.addEventListener("pointerdown", handleInteraction, { passive: true });
    window.addEventListener("touchstart", handleInteraction, { passive: true });
    window.addEventListener("keydown", handleInteraction);
    window.addEventListener("wheel", handleInteraction, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("wheel", handleInteraction);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const startAudio = useCallback(() => {
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play().catch(() => {});
    }
  }, []);

  const go = useCallback(
    (to: number) => {
      const clamped = Math.max(0, Math.min(SCENES.length - 1, to));
      const now = performance.now();
      if (now < lockUntilRef.current || clamped === index) return;
      lockUntilRef.current = now + (reduced ? 250 : TRANSITION_LOCK_MS);
      setIndex(clamped);
    },
    [index, reduced],
  );

  const goNext = useCallback(() => go(index + 1), [go, index]);
  const goPrev = useCallback(() => go(index - 1), [go, index]);

  /* Preload every illustration once the opening scene has settled. */
  useEffect(() => {
    const timer = window.setTimeout(() => {
      for (const src of SCENE_IMAGES) {
        const img = new Image();
        img.src = src;
      }
    }, 1500);
    return () => window.clearTimeout(timer);
  }, []);

  /* Mouse wheel: advance at scene edges, otherwise let inner content scroll. */
  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 8) return;
      const scrollable = (event.target as HTMLElement | null)?.closest(
        "[data-scrollable]",
      ) as HTMLElement | null;
      if (scrollable && scrollable.scrollHeight > scrollable.clientHeight) {
        const atTop = scrollable.scrollTop <= 2;
        const atBottom =
          scrollable.scrollTop + scrollable.clientHeight >= scrollable.scrollHeight - 2;
        if (event.deltaY > 0 && !atBottom) return;
        if (event.deltaY < 0 && !atTop) return;
      }
      if (event.deltaY > 0) goNext();
      else goPrev();
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [goNext, goPrev]);

  /* Touch swipe, aware of inner scrolling. */
  useEffect(() => {
    const onStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      touchStartYRef.current = touch.clientY;
      touchConsumedRef.current = false;
      const scrollable = (event.target as HTMLElement | null)?.closest(
        "[data-scrollable]",
      ) as HTMLElement | null;
      touchStartScrollRef.current = scrollable ? scrollable.scrollTop : -1;
    };
    const onMove = (event: TouchEvent) => {
      if (touchStartYRef.current === null) return;
      const scrollable = (event.target as HTMLElement | null)?.closest(
        "[data-scrollable]",
      ) as HTMLElement | null;
      if (
        scrollable &&
        touchStartScrollRef.current >= 0 &&
        Math.abs(scrollable.scrollTop - touchStartScrollRef.current) > 4
      ) {
        touchConsumedRef.current = true;
      }
    };
    const onEnd = (event: TouchEvent) => {
      if (touchStartYRef.current === null) return;
      const touch = event.changedTouches[0];
      if (!touch) return;
      const deltaY = touchStartYRef.current - touch.clientY;
      touchStartYRef.current = null;
      if (touchConsumedRef.current || Math.abs(deltaY) < 56) return;
      if (deltaY > 0) goNext();
      else goPrev();
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onEnd);
    };
  }, [goNext, goPrev]);

  /* Keyboard controls. */
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest("a, button, input, textarea, select");
      if (event.key === "ArrowDown" || event.key === "PageDown" || event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      } else if (event.key === "ArrowUp" || event.key === "PageUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      } else if (event.key === "Home") {
        event.preventDefault();
        go(0);
      } else if (event.key === "End") {
        event.preventDefault();
        go(SCENES.length - 1);
      } else if (event.key === " " && !interactive) {
        event.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, goNext, goPrev]);

  const scene = SCENES[index] ?? SCENES[0]!;
  const started = index > 0;

  return (
    <div className="fixed inset-0 overflow-hidden bg-background text-foreground">
      <PetalsOverlay />
      <AnimatePresence mode="wait">
        <motion.main
          key={scene.id}
          initial={{ opacity: 0, scale: 1.025 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.995 }}
          transition={{
            duration: reduced ? 0.15 : 0.95,
            ease: "easeOut",
          }}
          className="absolute inset-0"
        >
          {scene.render({ go, startAudio })}
        </motion.main>
      </AnimatePresence>

      {/* Scene progress dots */}
      {started && (
        <nav
          aria-label="Invitation scenes"
          className="fixed right-4 top-1/2 z-20 flex -translate-y-1/2 flex-col items-center gap-3"
        >
          {SCENES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => go(i)}
              aria-label={`Scene ${i + 1} of ${SCENES.length}: ${s.label}`}
              aria-current={i === index}
              className="group flex h-6 w-6 items-center justify-center"
            >
              <span
                className={`block rounded-full transition-all duration-500 ${
                  i === index
                    ? "h-2.5 w-2.5 bg-burgundy"
                    : "h-1.5 w-1.5 bg-burgundy/30 group-hover:bg-burgundy/60"
                }`}
              />
            </button>
          ))}
        </nav>
      )}

      {/* Floating Intuitive Bottom Navigation Bar */}
      {started && (
        <motion.nav
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          aria-label="Scene navigation"
          className="fixed bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-champagne-deep/45 bg-ivory/95 px-2.5 py-1.5 shadow-[0_12px_32px_-8px_rgba(42,22,27,0.38)] backdrop-blur-md sm:gap-2 sm:px-3"
        >
          {/* Back button */}
          <button
            type="button"
            onClick={goPrev}
            aria-label="Go to previous scene"
            className="flex items-center gap-1 rounded-full px-2.5 py-1 text-burgundy-deep/80 transition-all hover:bg-champagne/25 hover:text-burgundy active:scale-95"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            <span className="font-caps text-[0.66rem] font-medium uppercase tracking-wider">
              Back
            </span>
          </button>

          {/* Scene progress badge */}
          <span
            aria-hidden="true"
            className="select-none rounded-full bg-champagne-deep/15 px-2.5 py-0.5 font-serif text-[0.72rem] italic text-burgundy"
          >
            {index + 1} / {SCENES.length}
          </span>

          {/* Next scene button or Restart button */}
          {index < SCENES.length - 1 ? (
            <button
              type="button"
              onClick={goNext}
              aria-label={`Next scene: ${SCENES[index + 1]?.label ?? ""}`}
              className="flex items-center gap-1.5 rounded-full bg-burgundy px-3.5 py-1 text-ivory shadow-sm transition-all hover:bg-burgundy-deep active:scale-95"
            >
              <span className="font-caps text-[0.68rem] font-semibold uppercase tracking-[0.14em] whitespace-nowrap">
                Next: {SCENES[index + 1]?.label}
              </span>
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => go(0)}
              aria-label="Revisit invitation from beginning"
              className="flex items-center gap-1.5 rounded-full bg-burgundy px-3.5 py-1 text-ivory shadow-sm transition-all hover:bg-burgundy-deep active:scale-95"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="font-caps text-[0.68rem] font-semibold uppercase tracking-[0.14em] whitespace-nowrap">
                Start Over
              </span>
            </button>
          )}
        </motion.nav>
      )}

      <p aria-live="polite" className="sr-only">
        Scene {index + 1} of {SCENES.length}: {scene.label}
      </p>
    </div>
  );
}
