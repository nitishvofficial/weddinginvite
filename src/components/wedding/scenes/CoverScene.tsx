import { FadeUp, SceneFrame, VenueButton } from "@/components/wedding/ui";
import { wedding } from "@/config/wedding";
import coverImg from "@/assets/scene-church-cover.jpg";

export function CoverScene({ onOpen }: { onOpen: () => void }) {
  return (
    <SceneFrame
      image={coverImg}
      alt="Illustrated church at the end of a garden pathway under a pastel sunset sky"
      eager
      kenburns
      overlay="sky"
    >
      <div className="flex min-h-full w-full flex-col items-center px-6 pb-28 pt-[max(3rem,7vh)] text-center">
        <div>
          <FadeUp>
            <p className="font-caps text-[clamp(0.85rem,2.6vw,1.15rem)] uppercase tracking-[0.5em] text-burgundy">
              {wedding.family}
            </p>
          </FadeUp>
          <FadeUp delay={0.25}>
            <h1 className="mt-4 font-serif text-[clamp(1.05rem,3.4vw,1.5rem)] uppercase tracking-[0.4em] text-burgundy-deep">
              Wedding Invitation
            </h1>
          </FadeUp>
          <FadeUp delay={0.5}>
            <div aria-hidden="true" className="hairline mx-auto mt-7 w-44" />
          </FadeUp>
        </div>

        <FadeUp delay={0.75} className="mt-16 max-w-md">
          <p className="font-serif text-[clamp(1.1rem,2.8vw,1.4rem)] italic text-burgundy-deep">
            &ldquo;{wedding.bibleVerse}&rdquo;
          </p>
          <p className="mt-3 font-caps text-[0.7rem] uppercase tracking-[0.32em] text-burgundy">
            {wedding.bibleRef}
          </p>
        </FadeUp>

        <FadeUp delay={1.05} className="mt-auto">
          <VenueButton onClick={onOpen} ariaLabel="Open the invitation">
            Open Invitation
          </VenueButton>
          <p className="mt-4 font-serif text-xs italic text-burgundy-deep/70">
            An illustrated invitation in seven scenes
          </p>
        </FadeUp>
      </div>
    </SceneFrame>
  );
}
