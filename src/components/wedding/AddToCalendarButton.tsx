import { useState, useRef, useEffect } from "react";
import { Calendar, Check, ExternalLink, Download } from "lucide-react";
import {
  type CalendarEvent,
  getGoogleCalendarUrl,
  downloadIcsFile,
} from "@/utils/calendar";

interface AddToCalendarButtonProps {
  event: CalendarEvent;
  label?: string;
  filename?: string;
}

export function AddToCalendarButton({
  event,
  label = "Add to Calendar",
  filename = "wedding-invitation.ics",
}: AddToCalendarButtonProps) {
  const [open, setOpen] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleDownload = () => {
    downloadIcsFile(event, filename);
    setDownloaded(true);
    setTimeout(() => {
      setDownloaded(false);
      setOpen(false);
    }, 1500);
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-champagne-deep/60 bg-ivory/85 px-6 py-3 font-caps text-[0.66rem] uppercase tracking-[0.24em] text-burgundy-deep shadow-[0_12px_32px_-16px_var(--burgundy-deep)] backdrop-blur-sm transition duration-300 hover:border-champagne-deep hover:bg-champagne/45 focus-visible:bg-champagne/45 active:scale-[0.98]"
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={label}
      >
        <Calendar className="h-3.5 w-3.5 text-burgundy" />
        <span>{label}</span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-1/2 z-30 mt-2 w-64 -translate-x-1/2 rounded-2xl border border-champagne-deep/60 bg-ivory/95 p-2 shadow-[0_20px_45px_-15px_rgba(42,22,27,0.35)] backdrop-blur-md animate-in fade-in zoom-in-95 duration-200"
        >
          <a
            href={getGoogleCalendarUrl(event)}
            target="_blank"
            rel="noopener noreferrer"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-left font-serif text-[0.95rem] text-burgundy-deep transition hover:bg-champagne/40 active:bg-champagne/60"
          >
            <span className="font-medium">Google Calendar</span>
            <ExternalLink className="h-3.5 w-3.5 text-burgundy/70" />
          </a>

          <button
            type="button"
            role="menuitem"
            onClick={handleDownload}
            className="flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-left font-serif text-[0.95rem] text-burgundy-deep transition hover:bg-champagne/40 active:bg-champagne/60"
          >
            <span className="font-medium">
              {downloaded ? "Added to Calendar!" : "Apple / Outlook (.ics)"}
            </span>
            {downloaded ? (
              <Check className="h-3.5 w-3.5 text-emerald-600" />
            ) : (
              <Download className="h-3.5 w-3.5 text-burgundy/70" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}
