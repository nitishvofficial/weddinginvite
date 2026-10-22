import { describe, expect, it } from "vitest";
import { wedding } from "@/config/wedding";

describe("wedding details", () => {
  it("carries the couple's names exactly", () => {
    expect(wedding.bride).toBe("Bala Maria Bhavya Sree");
    expect(wedding.groom).toBe("Nova Yashwanth Naidu");
  });

  it("states the wedding date of Sunday, 22 November 2026", () => {
    expect(wedding.dateLine).toBe("Sunday, 22 November 2026");
    expect(wedding.dateParts).toEqual({
      weekday: "Sunday",
      day: "22",
      month: "November",
      year: "2026",
    });
  });

  it("keeps the ceremony details and officiating clergy", () => {
    expect(wedding.ceremony.dateLine).toContain("22nd November 2026 at 10:00 a.m.");
    expect(wedding.ceremony.venueName).toBe("Holy Family Church, Nirmala School");
    expect(wedding.ceremony.venueAddress).toContain("Vadlapudi, Kurmanapalem, Visakhapatnam");
    const names = wedding.ceremony.solemnizers.map((s) => s.name);
    expect(names).toContain("Rev. Fr. Jalumuru Ananda Rao");
    expect(names).toContain("Rev. Fr. Dr. Sarisa Prathap");
    expect(names).toContain("and Other Priests");
  });

  it("preserves the groom's family line verbatim", () => {
    expect(wedding.groomFamily).toBe(
      "Only son of Mr. & Mrs. Dasari Chandrasekhar Naidu (Late) & Alphonse Vijaya Prabhavathi of Porumamilla, Kadapa District",
    );
  });

  it("keeps the lunch schedule and venue", () => {
    expect(wedding.lunch.dateLine).toContain("12:30 p.m. onwards");
    expect(wedding.lunch.venueName).toBe("Sobha Square");
    expect(wedding.lunch.venueAddress).toContain("Gajuwaka, Visakhapatnam");
  });

  it("links both venues to their verified Google Maps destinations", () => {
    expect(wedding.ceremony.mapsUrl).toContain("Holy%20Family");
    expect(wedding.ceremony.mapsUrl).toContain("530046");
    expect(wedding.lunch.mapsUrl).toContain("Sobha%20Square");
    expect(wedding.lunch.mapsUrl).toContain("530012");
  });

  it("keeps the two QR codes distinct with verified asset paths", () => {
    expect(wedding.ceremony.qrImage).toBe("/assets/church-venue-qr.png");
    expect(wedding.lunch.qrImage).toBe("/assets/lunch-venue-qr.png");
    expect(wedding.lunch.qrImage).not.toBe(wedding.ceremony.qrImage);
  });

  it("references the correct Bible verse", () => {
    expect(wedding.bibleVerse).toBe("Marriage is Honourable in All");
    expect(wedding.bibleRef).toBe("Hebrews 13:4");
  });
});
