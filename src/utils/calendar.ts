export interface CalendarEvent {
  title: string;
  description: string;
  location: string;
  startIsoUtc: string; // e.g. "20261122T043000Z"
  endIsoUtc: string;   // e.g. "20261122T063000Z"
}

export const CEREMONY_EVENT: CalendarEvent = {
  title: "Holy Matrimony: Maria & Yaswanth",
  description: "Wedding Solemnization of Bala Maria Bhavya Sree & Nova Yaswanth Naidu at Holy Family Catholic Church.",
  location: "Holy Family Catholic Church, Kurmannapalem, Vadlapudi, Visakhapatnam 530046",
  startIsoUtc: "20261122T043000Z", // 10:00 AM IST
  endIsoUtc: "20261122T063000Z",   // 12:00 PM IST
};

export const LUNCH_EVENT: CalendarEvent = {
  title: "Wedding Lunch: Maria & Yaswanth",
  description: "Wedding Lunch & Celebration for Bala Maria Bhavya Sree & Nova Yaswanth Naidu at Sobha Square.",
  location: "Sobha Square, 50 Feet Rd, Viswesyaraya Nagar, Auto Nagar, Visakhapatnam 530012",
  startIsoUtc: "20261122T070000Z", // 12:30 PM IST
  endIsoUtc: "20261122T103000Z",   // 4:00 PM IST
};

export const FULL_WEDDING_EVENT: CalendarEvent = {
  title: "Wedding of Bala Maria Bhavya Sree & Nova Yaswanth Naidu",
  description: "Holy Matrimony (10:00 AM at Holy Family Catholic Church, Vadlapudi) followed by Wedding Lunch (12:30 PM onwards at Sobha Square).",
  location: "Holy Family Catholic Church, Kurmannapalem, Visakhapatnam",
  startIsoUtc: "20261122T043000Z", // 10:00 AM IST
  endIsoUtc: "20261122T110000Z",   // 4:30 PM IST
};

export function getGoogleCalendarUrl(event: CalendarEvent): string {
  const base = "https://calendar.google.com/calendar/render?action=TEMPLATE";
  const params = new URLSearchParams({
    text: event.title,
    dates: `${event.startIsoUtc}/${event.endIsoUtc}`,
    details: event.description,
    location: event.location,
  });
  return `${base}&${params.toString()}`;
}

export function downloadIcsFile(event: CalendarEvent, filename = "wedding-event.ics"): void {
  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Vellanki Wedding//Invitation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `SUMMARY:${event.title.replace(/,/g, "\\,")}`,
    `DESCRIPTION:${event.description.replace(/,/g, "\\,")}`,
    `LOCATION:${event.location.replace(/,/g, "\\,")}`,
    `DTSTART:${event.startIsoUtc}`,
    `DTEND:${event.endIsoUtc}`,
    "STATUS:CONFIRMED",
    "SEQUENCE:0",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
