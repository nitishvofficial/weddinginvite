/**
 * Central wedding configuration — the single source of truth for every
 * detail shown across the invitation scenes.
 *
 * Venue facts are verified:
 * - Holy Family Catholic Church, Kurmannapalem / Vadlapudi, Visakhapatnam 530046.
 * - Sobha Square function hall above the Hero showroom, 50 Feet Rd,
 *   Viswesyaraya Nagar, Auto Nagar / Srinagar, Visakhapatnam 530012
 *   (approx. 17.684495, 83.185698).
 */

const CHURCH_MAPS_QUERY =
  "Holy Family Catholic Church, Kurmannapalem, Vadlapudi, Visakhapatnam, Andhra Pradesh 530046";
const LUNCH_MAPS_QUERY =
  "Sobha Square, 50 Feet Rd, Viswesyaraya Nagar, Auto Nagar, Visakhapatnam, Andhra Pradesh 530012";

export const mapsSearchUrl = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

export const wedding = {
  family: "Vellanki's",
  bride: "Bala Maria Bhavya Sree",
  groom: "Nova Yashwanth Naidu",
  monogram: { left: "B", right: "N" },

  dateLine: "Sunday, 22 November 2026",
  dateParts: { weekday: "Sunday", day: "22", month: "November", year: "2026" },

  bibleVerse: "Marriage is Honourable in All",
  bibleRef: "Hebrews 13:4",

  formalIntro:
    "Mr. and Mrs. Ajay Kumar and Padmaja\nsolicit your prayers and gracious presence\nwith family on the auspicious occasion\nof the wedding of our only daughter",
  groomFamily:
    "Only son of Mr. & Mrs. Dasari Chandrasekhar Naidu (Late) & Alphonse Vijaya Prabhavathi of Porumamilla, Kadapa District",

  finaleWishes: "With Best Wishes from Near and Dear",

  ceremony: {
    heading: "Wedding Bells",
    dateLine: "On Sunday, 22nd November 2026 at 10:00 a.m.",
    venueName: "Holy Family Church, Nirmala School",
    venueAddress: "Vadlapudi, Kurmanapalem, Visakhapatnam",
    solemnizerLead: "Wedding Solemnized by:",
    solemnizers: [
      { name: "Rev. Fr. Jalumuru Ananda Rao" },
      {
        name: "Rev. Fr. Dr. Sarisa Prathap",
        note: "(Visakha Urban Dean, Vadlapudi Parish Priest)",
      },
      { name: "and Other Priests" },
    ],
    mapsUrl: mapsSearchUrl(CHURCH_MAPS_QUERY),
    /**
     * The original church-location QR code from the printed invitation.
     */
    qrImage: "/assets/church-venue-qr.png",
  },

  lunch: {
    heading: "Lunch",
    dateLine: "On Sunday, 22nd November 2026 from 12:30 p.m. onwards",
    venueName: "Sobha Square",
    venueAddress: "Hero Honda Showroom, D-Mart Road, Srinagar, NH-16, Gajuwaka, Visakhapatnam",
    mapsUrl: mapsSearchUrl(LUNCH_MAPS_QUERY),
    /** Newly generated QR pointing to the verified lunch venue. */
    qrImage: "/assets/lunch-venue-qr.png",
  },
} as const;

export type Wedding = typeof wedding;
