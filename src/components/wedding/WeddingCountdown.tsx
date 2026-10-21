import { useState, useEffect } from "react";

// Target: Sunday, 22 November 2026 at 10:00 AM IST
const WEDDING_TIMESTAMP = new Date("2026-11-22T10:00:00+05:30").getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function calculateTimeLeft(): TimeLeft {
  const diff = WEDDING_TIMESTAMP - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isPast: false,
  };
}

export function WeddingCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (timeLeft.isPast) {
    return (
      <div className="mx-auto mt-6 max-w-sm rounded-2xl border border-champagne-deep/40 bg-ivory/60 px-6 py-3 backdrop-blur-sm">
        <p className="font-serif text-base italic text-burgundy-deep">
          Celebrating Love &amp; Togetherness
        </p>
      </div>
    );
  }

  const pad = (n: number) => String(n).padStart(2, "0");

  const units = [
    { label: "DAYS", value: pad(timeLeft.days) },
    { label: "HOURS", value: pad(timeLeft.hours) },
    { label: "MINS", value: pad(timeLeft.minutes) },
    { label: "SECS", value: pad(timeLeft.seconds) },
  ];

  return (
    <div className="mx-auto mt-6 flex flex-col items-center">
      <p className="font-caps text-[0.62rem] uppercase tracking-[0.35em] text-burgundy">
        Counting Down to the Holy Matrimony
      </p>

      <div className="mt-3.5 flex items-center gap-2 sm:gap-3 rounded-2xl border border-champagne-deep/40 bg-ivory/70 px-4 py-2.5 shadow-[0_12px_28px_-15px_var(--burgundy-deep)] backdrop-blur-sm">
        {units.map((unit, idx) => (
          <div key={unit.label} className="flex items-center">
            <div className="flex min-w-[3rem] flex-col items-center px-1">
              <span className="font-serif text-[clamp(1.4rem,3.8vw,1.9rem)] font-semibold leading-none text-burgundy-deep tabular-nums">
                {unit.value}
              </span>
              <span className="mt-1 font-caps text-[0.55rem] tracking-[0.2em] text-burgundy/80">
                {unit.label}
              </span>
            </div>
            {idx < units.length - 1 && (
              <span className="mx-0.5 mb-3 font-serif text-lg font-light text-champagne-deep/70">
                :
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
