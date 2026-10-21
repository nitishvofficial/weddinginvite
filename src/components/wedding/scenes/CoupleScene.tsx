import { FadeUp, Monogram, SceneFrame } from "@/components/wedding/ui";
import { wedding } from "@/config/wedding";
import coupleImg from "@/assets/scene-church-couple.jpg";

export function CoupleScene() {
  return (
    <SceneFrame
      image={coupleImg}
      alt="Illustrated bride and groom walking a garden path toward a pastel church"
      overlay="sky"
    >
      <div className="flex min-h-full w-full flex-col items-center px-6 pb-24 pt-[max(2.5rem,6vh)] text-center">
        <FadeUp delay={0.2}>
          <Monogram left={wedding.monogram.left} right={wedding.monogram.right} />
        </FadeUp>

        <FadeUp delay={0.55} className="mt-4">
          <h1 className="script-name text-[clamp(2.6rem,9.5vw,5.2rem)] leading-[1.15]">
            {wedding.bride}
          </h1>
        </FadeUp>

        <FadeUp delay={0.85}>
          <p className="my-1 font-serif text-[clamp(1rem,2.6vw,1.4rem)] italic text-burgundy-deep">
            with
          </p>
        </FadeUp>

        <FadeUp delay={1.05}>
          <h2 className="script-name text-[clamp(2.6rem,9.5vw,5.2rem)] leading-[1.15]">
            {wedding.groom}
          </h2>
        </FadeUp>

        <FadeUp delay={1.4} className="mt-8">
          <div aria-hidden="true" className="hairline mx-auto mb-6 w-40" />
          <p className="font-caps text-[clamp(0.72rem,2vw,0.95rem)] uppercase tracking-[0.34em] text-burgundy-deep">
            {wedding.dateLine}
          </p>
        </FadeUp>
      </div>
    </SceneFrame>
  );
}
