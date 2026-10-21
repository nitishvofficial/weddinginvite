import { FadeUp, SceneFrame } from "@/components/wedding/ui";
import { wedding } from "@/config/wedding";
import panelImg from "@/assets/scene-formal-panel.jpg";

export function FormalScene() {
  return (
    <SceneFrame
      image={panelImg}
      alt="Cream invitation panel framed by ivory arches, columns and white blossoms"
      overlay="cream"
    >
      <div className="flex min-h-full w-full flex-col items-center justify-center px-7 py-24 text-center sm:px-14">
        <FadeUp delay={0.2}>
          <p className="whitespace-pre-line font-serif text-[clamp(1rem,2.6vw,1.3rem)] leading-relaxed text-burgundy-deep">
            {wedding.formalIntro}
          </p>
        </FadeUp>

        <FadeUp delay={0.55} className="mt-10">
          <div aria-hidden="true" className="hairline mx-auto mb-8 w-36" />
          <h1 className="script-name text-[clamp(2.4rem,8.5vw,4.6rem)] leading-[1.15]">
            {wedding.bride}
          </h1>
        </FadeUp>

        <FadeUp delay={0.8}>
          <p className="my-2 font-serif text-[clamp(1rem,2.6vw,1.35rem)] italic text-burgundy-deep">
            with
          </p>
        </FadeUp>

        <FadeUp delay={1}>
          <h2 className="script-name text-[clamp(2.4rem,8.5vw,4.6rem)] leading-[1.15]">
            {wedding.groom}
          </h2>
          <div aria-hidden="true" className="hairline mx-auto mt-8 w-36" />
        </FadeUp>

        <FadeUp delay={1.3} className="mt-8 max-w-md">
          <p className="font-serif text-[clamp(0.95rem,2.3vw,1.15rem)] leading-relaxed text-burgundy-deep/90">
            {wedding.groomFamily}
          </p>
        </FadeUp>
      </div>
    </SceneFrame>
  );
}
