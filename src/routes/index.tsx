import { createFileRoute } from "@tanstack/react-router";
import { InvitationExperience } from "@/components/wedding/InvitationExperience";
import { wedding } from "@/config/wedding";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: `${wedding.family} Wedding Invitation — ${wedding.bride} & ${wedding.groom}`,
      },
      {
        name: "description",
        content: `You are warmly invited to the wedding of ${wedding.bride} and ${wedding.groom} — ${wedding.dateLine}. Holy Family Church, Vadlapudi, Visakhapatnam; Lunch at Sobha Square, Gajuwaka.`,
      },
      { property: "og:title", content: `${wedding.family} Wedding Invitation` },
      {
        property: "og:description",
        content: `${wedding.bride} & ${wedding.groom} — ${wedding.dateLine}. Open the invitation.`,
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <InvitationExperience />;
}
