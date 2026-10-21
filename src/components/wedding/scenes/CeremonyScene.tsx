import { FadeUp, QrCard, SceneFrame, VenueButton } from "@/components/wedding/ui";
import { wedding } from "@/config/wedding";
import ceremonyImg from "@/assets/scene-ceremony.jpg";

export function CeremonyScene() {
  const { ceremony } = wedding;

  return (
    <SceneFrame
      image={ceremonyImg}
      alt="Illustrated church sanctuary with a carved altar, stained glass windows and candlelight"
      overlay="cream"
    >
      <div className="flex min-h-full w-full flex-col items-center justify-center px-7 py-24 text-center sm:px-14">
        <FadeUp delay={0.15}>
          <h1 className="font-caps text-[clamp(1.5rem,4.6vw,2.6rem)] uppercase tracking-[0.4em] text-burgundy-deep">
            {ceremony.heading}
          </h1>
          <div aria-hidden="true" className="hairline mx-auto mt-5 w-48" />
        </FadeUp>

        <FadeUp delay={0.4} className="mt-8">
          <p className="font-serif text-[clamp(1.05rem,2.7vw,1.35rem)] text-burgundy-deep">
            {ceremony.dateLine}
          </p>
          <p className="mt-4 font-caps text-[clamp(0.8rem,2.2vw,1.05rem)] uppercase tracking-[0.24em] text-burgundy">
            {ceremony.venueName}
          </p>
          <p className="mt-1 font-serif text-[clamp(0.95rem,2.3vw,1.15rem)] italic text-burgundy-deep/85">
            {ceremony.venueAddress}
          </p>
        </FadeUp>

        <FadeUp delay={0.7} className="mt-10 max-w-md">
          <p className="font-caps text-[0.68rem] uppercase tracking-[0.3em] text-burgundy">
            {ceremony.solemnizerLead}
          </p>
          <div className="mt-4 space-y-2.5">
            {ceremony.solemnizers.map((s) => (
              <div key={s.name}>
                <p className="font-serif text-[clamp(1.02rem,2.5vw,1.25rem)] text-burgundy-deep">
                  {s.name}
                </p>
                {s.note && (
                  <p className="mt-0.5 font-serif text-[0.85rem] italic text-burgundy-deep/75">
                    {s.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.95} className="mt-10 flex flex-col items-center gap-7 sm:flex-row sm:items-center sm:gap-10">
          <VenueButton href={ceremony.mapsUrl} ariaLabel="View church location on Google Maps">
            View Church Location
          </VenueButton>
          <QrCard
            src={ceremony.qrImage}
            caption="Scan for Church Location"
          />
        </FadeUp>
      </div>
    </SceneFrame>
  );
}
