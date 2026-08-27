import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Report History — MediAssist AI" },
      { name: "description", content: "Browse previously uploaded medical reports and their AI summaries." },
      { property: "og:title", content: "Report History — MediAssist AI" },
      { property: "og:description", content: "Browse previously uploaded medical reports and their AI summaries." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <PlaceholderPage title="Report History" description="Browse previously uploaded medical reports and their AI summaries." />
  ),
});
