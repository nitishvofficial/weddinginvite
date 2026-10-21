import { FadeUp, SceneFrame, VenueButton } from "@/components/wedding/ui";
import { SaveTheDateCalendar } from "@/components/wedding/SaveTheDateCalendar";
import { wedding } from "@/config/wedding";
import finaleImg from "@/assets/scene-finale.jpg";

export function FinaleScene({ onRevisit }: { onRevisit: () => void }) {
  return (
    <SceneFrame
      image={finaleImg}
      alt="Illustrated pastel church framed with roses under a soft sunset sky"
      kenburns
      overlay="sky"
    >
      <div className="flex min-h-full w-full flex-col items-center justify-center px-6 py-24 text-center">
        <FadeUp delay={0.2}>
          <p className="font-serif text-[clamp(1.1rem,2.9vw,1.5rem)] italic text-burgundy-deep">
            {wedding.finaleWishes}
          </p>
          <div aria-hidden="true" className="hairline mx-auto mt-7 w-44" />
        </FadeUp>

        <FadeUp delay={0.55} className="mt-8">
          <h1 className="script-name text-[clamp(2.5rem,8.5vw,4.6rem)] leading-[1.15]">
            {wedding.bride}
          </h1>
        </FadeUp>

        <FadeUp delay={0.75}>
          <p className="script-name my-1 text-[clamp(1.5rem,4vw,2.4rem)] leading-none">&amp;</p>
        </FadeUp>

        <FadeUp delay={0.95}>
          <h2 className="script-name text-[clamp(2.5rem,8.5vw,4.6rem)] leading-[1.15]">
            {wedding.groom}
          </h2>
        </FadeUp>

        <FadeUp delay={1.2} className="mt-9">
          <SaveTheDateCalendar />
        </FadeUp>

        <FadeUp delay={1.45} className="mt-8">
          <VenueButton onClick={onRevisit} ariaLabel="Return to the opening scene">
            Revisit Invitation
          </VenueButton>
        </FadeUp>
      </div>
    </SceneFrame>
  );
}
