import { FadeUp, QrCard, SceneFrame, VenueButton } from "@/components/wedding/ui";
import { AddToCalendarButton } from "@/components/wedding/AddToCalendarButton";
import { CEREMONY_EVENT } from "@/utils/calendar";
import { wedding } from "@/config/wedding";
import ceremonyImg from "@/assets/scene-ceremony.jpg";

export function CeremonyScene() {
  const { ceremony } = wedding;

  return (
    <SceneFrame
      image={ceremonyImg}
      alt="Illustrated church sanctuary with a carved altar, stained glass windows and candlelight"
      overlay="ceremony"
    >
      <div className="flex min-h-full w-full flex-col items-center justify-center px-6 py-24 text-center sm:px-14">
        <FadeUp delay={0.15}>
          <h1 className="font-caps text-[clamp(1.6rem,4.8vw,2.7rem)] uppercase tracking-[0.4em] font-semibold text-burgundy-deep">
            {ceremony.heading}
          </h1>
          <div aria-hidden="true" className="hairline mx-auto mt-5 w-48" />
        </FadeUp>

        <FadeUp delay={0.35} className="mt-8">
          <p className="font-serif text-[clamp(1.08rem,2.7vw,1.4rem)] font-medium text-burgundy-deep">
            {ceremony.dateLine}
          </p>
          <p className="mt-4 font-caps text-[clamp(0.85rem,2.2vw,1.1rem)] uppercase tracking-[0.24em] font-medium text-burgundy">
            {ceremony.venueName}
          </p>
          <p className="mt-1 font-serif text-[clamp(0.96rem,2.3vw,1.18rem)] italic text-burgundy-deep/95">
            {ceremony.venueAddress}
          </p>
        </FadeUp>

        <FadeUp delay={0.55} className="mt-9 max-w-md">
          <p className="font-caps text-[0.7rem] uppercase tracking-[0.3em] font-medium text-burgundy">
            {ceremony.solemnizerLead}
          </p>
          <div className="mt-3.5 space-y-2">
            {ceremony.solemnizers.map((s) => (
              <div key={s.name}>
                <p className="font-serif text-[clamp(1.02rem,2.5vw,1.25rem)] font-medium text-burgundy-deep">
                  {s.name}
                </p>
                {"note" in s && s.note && (
                  <p className="mt-0.5 font-serif text-[0.85rem] italic text-burgundy-deep/85">
                    {s.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </FadeUp>

        <FadeUp
          delay={0.75}
          className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-center sm:gap-6"
        >
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
            <VenueButton href={ceremony.mapsUrl} ariaLabel="View church location on Google Maps">
              View Church Location
            </VenueButton>
            <AddToCalendarButton
              event={CEREMONY_EVENT}
              label="Add Ceremony to Calendar"
              filename="wedding-ceremony.ics"
            />
          </div>
          <QrCard
            src={ceremony.qrImage}
            caption="Scan for Church Location"
            mapsUrl={ceremony.mapsUrl}
          />
        </FadeUp>
      </div>
    </SceneFrame>
  );
}
