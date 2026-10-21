import { motion, useReducedMotion } from "framer-motion";
import { AddToCalendarButton } from "@/components/wedding/AddToCalendarButton";
import { FULL_WEDDING_EVENT } from "@/utils/calendar";

const DAYS_OF_WEEK = ["S", "M", "T", "W", "T", "F", "S"];

// November 2026 starts on Sunday (day 1 is index 0)
// Total days: 30
const DAYS_IN_MONTH = Array.from({ length: 30 }, (_, i) => i + 1);

export function SaveTheDateCalendar() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="mx-auto flex w-full max-w-[290px] flex-col items-center rounded-2xl border border-champagne-deep/55 bg-ivory/85 p-5 shadow-[0_20px_45px_-20px_rgba(42,22,27,0.3)] backdrop-blur-md transition-all duration-300 sm:max-w-[310px]">
      {/* Title */}
      <div className="text-center">
        <p className="font-serif text-[1.35rem] italic leading-tight text-burgundy-deep">
          Save the Date
        </p>
        <div className="mt-1 flex items-center justify-center gap-2">
          <span className="text-[0.6rem] text-champagne-deep">✦</span>
          <p className="font-caps text-[0.66rem] uppercase tracking-[0.35em] text-burgundy font-medium">
            November 2026
          </p>
          <span className="text-[0.6rem] text-champagne-deep">✦</span>
        </div>
      </div>

      <div aria-hidden="true" className="hairline my-3 w-36 opacity-70" />

      {/* Weekday Row */}
      <div className="grid w-full grid-cols-7 text-center">
        {DAYS_OF_WEEK.map((day, i) => (
          <span
            key={`${day}-${i}`}
            className="font-caps text-[0.62rem] font-medium tracking-wider text-burgundy/80"
          >
            {day}
          </span>
        ))}
      </div>

      {/* Calendar Days Grid */}
      <div className="mt-2 grid w-full grid-cols-7 gap-y-1 text-center">
        {DAYS_IN_MONTH.map((day) => {
          const isWeddingDay = day === 22;

          if (isWeddingDay) {
            return (
              <div
                key={day}
                className="relative flex h-8 w-full items-center justify-center"
              >
                {/* Looping Heart Drawing Animation */}
                <motion.svg
                  viewBox="0 0 32 32"
                  className="pointer-events-none absolute -inset-1.5 h-11 w-11 text-burgundy"
                  fill="none"
                  aria-hidden="true"
                >
                  {/* Subtle heart fill pulse */}
                  <motion.path
                    d="M 16,8 C 16,3 9,0 5.5,5 C 2,10 6,17.5 16,24.5 C 26,17.5 30,10 26.5,5 C 23,0 16,3 16,8 Z"
                    fill="rgba(196, 142, 63, 0.18)"
                    animate={
                      reducedMotion
                        ? {}
                        : {
                            scale: [1, 1.08, 1],
                            opacity: [0.6, 0.9, 0.6],
                          }
                    }
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  {/* Glowing gold heart stroke drawing */}
                  <motion.path
                    d="M 16,8 C 16,3 9,0 5.5,5 C 2,10 6,17.5 16,24.5 C 26,17.5 30,10 26.5,5 C 23,0 16,3 16,8 Z"
                    stroke="url(#goldGradient)"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={
                      reducedMotion
                        ? { pathLength: 1 }
                        : {
                            pathLength: [0, 1, 1, 0],
                          }
                    }
                    transition={{
                      duration: 3.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      times: [0, 0.45, 0.8, 1],
                    }}
                  />
                  <defs>
                    <linearGradient id="goldGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#AA7A1E" />
                      <stop offset="50%" stopColor="#FCE195" />
                      <stop offset="100%" stopColor="#AA7A1E" />
                    </linearGradient>
                  </defs>
                </motion.svg>

                {/* Day 22 text */}
                <span className="relative z-10 font-serif text-[0.95rem] font-bold text-burgundy-deep drop-shadow-sm">
                  {day}
                </span>

                {/* Little diamond sparkle */}
                <motion.span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-0.5 -top-1 text-[0.65rem] text-amber-500"
                  animate={reducedMotion ? {} : { scale: [0.7, 1.25, 0.7], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  ✦
                </motion.span>
              </div>
            );
          }

          return (
            <div
              key={day}
              className="flex h-8 w-full items-center justify-center font-serif text-[0.84rem] text-burgundy-deep/70 transition-colors hover:text-burgundy"
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* 1-Tap Save to Calendar action */}
      <div className="mt-4 pt-1">
        <AddToCalendarButton
          event={FULL_WEDDING_EVENT}
          label="Save Date to Calendar"
          filename="save-the-date-wedding.ics"
        />
      </div>
    </div>
  );
}
