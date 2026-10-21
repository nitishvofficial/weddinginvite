import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { CoverScene } from "@/components/wedding/scenes/CoverScene";
import { CoupleScene } from "@/components/wedding/scenes/CoupleScene";
import { FormalScene } from "@/components/wedding/scenes/FormalScene";
import { CeremonyScene } from "@/components/wedding/scenes/CeremonyScene";
import { ArrivalScene } from "@/components/wedding/scenes/ArrivalScene";
import { ReceptionScene } from "@/components/wedding/scenes/ReceptionScene";
import { FinaleScene } from "@/components/wedding/scenes/FinaleScene";
import { wedding } from "@/config/wedding";

import coverImg from "@/assets/scene-church-cover.jpg";
import coupleImg from "@/assets/scene-church-couple.jpg";
import formalImg from "@/assets/scene-formal-panel.jpg";
import ceremonyImg from "@/assets/scene-ceremony.jpg";
import arrivalImg from "@/assets/scene-arrival.jpg";
import receptionImg from "@/assets/scene-reception-panel.jpg";
import finaleImg from "@/assets/scene-finale.jpg";

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
}

const SCENES: { id: string; label: string; render: (ctx: SceneCtx) => React.ReactNode }[] = [
  { id: "cover", label: "Opening", render: (ctx) => <CoverScene onOpen={() => ctx.go(1)} /> },
  { id: "couple", label: "The Couple", render: () => <CoupleScene /> },
  { id: "formal", label: "The Invitation", render: () => <FormalScene /> },
  { id: "ceremony", label: "Wedding Ceremony", render: () => <CeremonyScene /> },
  { id: "arrival", label: "The Arrival", render: () => <ArrivalScene /> },
  { id: "reception", label: "Lunch", render: () => <ReceptionScene /> },
  {
    id: "finale",
    label: "Best Wishes",
    render: (ctx) => <FinaleScene onRevisit={() => ctx.go(0)} />,
  },
];

const TRANSITION_LOCK_MS = 1200;

export function InvitationExperience() {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();
  const lockUntilRef = useRef(0);
  const touchStartYRef = useRef<number | null>(null);
  const touchStartScrollRef = useRef(0);
  const touchConsumedRef = useRef(false);

  const go = useCallback(
    (to: number) => {
      const clamped = Math.max(0, Math.min(SCENES.length - 1, to));
      const now = performance.now();
      if (now < lockUntilRef.current || clamped === index) return;
      lockUntilRef.current =
        now + (reduced ? 250 : TRANSITION_LOCK_MS);
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
          scrollable.scrollTop + scrollable.clientHeight >=
          scrollable.scrollHeight - 2;
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
      touchStartYRef.current = event.touches[0].clientY;
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
      const deltaY = touchStartYRef.current - event.changedTouches[0].clientY;
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
          {scene.render({ go })}
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

      {/* Next cue */}
      {index < SCENES.length - 1 && (
        <motion.button
          type="button"
          onClick={goNext}
          aria-label={`Next scene: ${SCENES[index + 1]?.label ?? ""}`}
          className="fixed bottom-6 left-1/2 z-20 -translate-x-1/2 rounded-full p-3 text-burgundy-deep/80 backdrop-blur-sm transition hover:text-burgundy"
          animate={reduced ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown aria-hidden="true" className="h-7 w-7" />
        </motion.button>
      )}

      <p aria-live="polite" className="sr-only">
        Scene {index + 1} of {SCENES.length}: {scene.label}
      </p>
    </div>
  );
}
