import { FadeUp, QrCard, SceneFrame, VenueButton } from "@/components/wedding/ui";
import { wedding } from "@/config/wedding";
import receptionImg from "@/assets/scene-reception-panel.jpg";

export function ReceptionScene() {
  const { lunch } = wedding;

  return (
    <SceneFrame
      image={receptionImg}
      alt="Cream reception panel with fluted columns, blossom garlands and tulip planters"
      overlay="cream"
    >
      <div className="flex min-h-full w-full flex-col items-center justify-center px-7 py-24 text-center sm:px-14">
        <FadeUp delay={0.15}>
          <h1 className="font-caps text-[clamp(1.7rem,5vw,2.9rem)] uppercase tracking-[0.45em] text-burgundy-deep">
            {lunch.heading}
          </h1>
          <div aria-hidden="true" className="hairline mx-auto mt-5 w-48" />
        </FadeUp>

        <FadeUp delay={0.4} className="mt-8 max-w-lg">
          <p className="font-serif text-[clamp(1.05rem,2.7vw,1.35rem)] text-burgundy-deep">
            {lunch.dateLine}
          </p>
          <p className="mt-5 font-caps text-[clamp(0.85rem,2.3vw,1.1rem)] uppercase tracking-[0.24em] text-burgundy">
            {lunch.venueName}
          </p>
          <p className="mx-auto mt-2 max-w-sm font-serif text-[clamp(0.95rem,2.3vw,1.15rem)] italic leading-relaxed text-burgundy-deep/85">
            {lunch.venueAddress}
          </p>
        </FadeUp>

        <FadeUp delay={0.7} className="mt-10 flex flex-col items-center gap-7 sm:flex-row sm:items-center sm:gap-10">
          <VenueButton href={lunch.mapsUrl} ariaLabel="Get directions to the lunch venue on Google Maps">
            Get Directions
          </VenueButton>
          <QrCard src={lunch.qrImage} caption="Scan for Lunch Location" mapsUrl={lunch.mapsUrl} />
        </FadeUp>
      </div>
    </SceneFrame>
  );
}
