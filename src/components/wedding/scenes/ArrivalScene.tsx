import { SceneFrame } from "@/components/wedding/ui";
import arrivalImg from "@/assets/scene-arrival.jpg";

export function ArrivalScene() {
  return (
    <SceneFrame
      image={arrivalImg}
      alt="Illustrated vintage wedding car driving along a flower-lined avenue toward a distant church at sunset"
      kenburns
      overlay="none"
    >
      {/* A still, cinematic storytelling frame — the road to the celebration. */}
      <div className="min-h-full w-full" />
    </SceneFrame>
  );
}
