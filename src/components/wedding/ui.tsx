import { motion, useReducedMotion } from "framer-motion";
import { QrCode } from "lucide-react";
import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Scene frame: full-bleed illustration, soft overlay, scrollable body */
/* ------------------------------------------------------------------ */

interface SceneFrameProps {
  image: string;
  alt: string;
  eager?: boolean;
  /** Very slow, gentle drift — only for hero storytelling scenes. */
  kenburns?: boolean;
  overlay?: "sky" | "cream" | "none";
  children: ReactNode;
}

export function SceneFrame({
  image,
  alt,
  eager = false,
  kenburns = false,
  overlay = "sky",
  children,
}: SceneFrameProps) {
  const reduced = useReducedMotion();

  return (
    <section className="relative h-dvh w-full overflow-hidden bg-background">
      <motion.div
        className="absolute inset-0 will-change-transform"
        animate={
          kenburns && !reduced ? { scale: [1.03, 1.09, 1.03] } : { scale: 1 }
        }
        transition={{ duration: 42, repeat: Infinity, ease: "easeInOut" }}
      >
        <img
          src={image}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-cover object-center"
        />
      </motion.div>

      {overlay !== "none" && (
        <div
          aria-hidden="true"
          className={`absolute inset-0 ${
            overlay === "cream" ? "wedding-overlay-cream" : "wedding-overlay-sky"
          }`}
        />
      )}

      <div
        data-scrollable
        className="relative z-10 h-full w-full overflow-y-auto overscroll-contain"
      >
        {children}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FadeUp reveal                                                       */
/* ------------------------------------------------------------------ */

export function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.05, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Venue button                                                        */
/* ------------------------------------------------------------------ */

export function VenueButton({
  href,
  onClick,
  children,
  ariaLabel,
}: {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  ariaLabel?: string;
}) {
  const className =
    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-champagne-deep/50 bg-ivory/80 px-8 py-3.5 font-caps text-[0.68rem] uppercase tracking-[0.28em] text-burgundy-deep shadow-[0_18px_40px_-18px_var(--burgundy-deep)] backdrop-blur-sm transition duration-300 hover:border-champagne-deep hover:bg-champagne/45 focus-visible:bg-champagne/45 active:scale-[0.98]";

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={className} aria-label={ariaLabel}>
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Venue QR card                                                       */
/* ------------------------------------------------------------------ */

export function QrCard({
  src,
  caption,
  mapsUrl,
}: {
  src: string | null;
  caption: string;
  mapsUrl?: string;
}) {
  return (
    <div className="flex w-fit flex-col items-center gap-3 rounded-2xl border border-champagne-deep/50 bg-ivory/85 px-5 py-4 shadow-[0_18px_40px_-20px_var(--burgundy-deep)] backdrop-blur-sm">
      {src ? (
        <img
          src={src}
          width={120}
          height={120}
          alt={`${caption} QR code`}
          className="h-[120px] w-[120px] rounded-md"
        />
      ) : (
        <div
          aria-label={`${caption} QR code coming soon`}
          className="flex h-[120px] w-[120px] items-center justify-center rounded-md border border-dashed border-champagne-deep/70"
        >
          <QrCode aria-hidden="true" className="h-10 w-10 text-champagne-deep" />
        </div>
      )}
      <p className="text-center font-caps text-[0.62rem] uppercase tracking-[0.24em] text-burgundy-deep">
        {caption}
      </p>
      {src && mapsUrl && (
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-caps text-[0.6rem] uppercase tracking-[0.22em] text-champagne-deep underline-offset-4 transition hover:text-burgundy hover:underline"
        >
          Open in Maps
        </a>
      )}
      {!src && (
        <p className="font-caps text-[0.55rem] uppercase tracking-[0.2em] text-muted-foreground">
          Coming soon
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Monogram                                                            */
/* ------------------------------------------------------------------ */

export function Monogram({ left, right }: { left: string; right: string }) {
  return (
    <div
      aria-label={`Wedding monogram ${left} and ${right}`}
      className="script-name flex items-baseline justify-center leading-none"
    >
      <span className="text-[clamp(4rem,14vw,7.5rem)]">{left}</span>
      <span
        aria-hidden="true"
        className="mx-[0.12em] font-serif italic text-[0.34em] text-burgundy"
      >
        &
      </span>
      <span className="text-[clamp(4rem,14vw,7.5rem)]">{right}</span>
    </div>
  );
}
