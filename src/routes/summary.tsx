import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";

export const Route = createFileRoute("/summary")({
  head: () => ({
    meta: [
      { title: "Report Summary — MediAssist AI" },
      {
        name: "description",
        content:
          "Patient-friendly summary of an analysed medical report in the MediAssist AI prototype.",
      },
      { property: "og:title", content: "Report Summary — MediAssist AI" },
      {
        property: "og:description",
        content: "Placeholder for the upcoming MediAssist AI report summary screen.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SummaryPage,
});

function SummaryPage() {
  return (
    <PlaceholderPage
      title="Report Summary"
      description="The patient-friendly summary view will be built in the next step of this academic project."
    />
  );
}
