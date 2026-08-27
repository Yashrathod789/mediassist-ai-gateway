import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";

export const Route = createFileRoute("/questions")({
  head: () => ({
    meta: [
      { title: "Ask Questions — MediAssist AI" },
      { name: "description", content: "Ask questions about your medical reports in plain language." },
      { property: "og:title", content: "Ask Questions — MediAssist AI" },
      { property: "og:description", content: "Ask questions about your medical reports in plain language." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <PlaceholderPage title="Ask Questions" description="Ask questions about your medical reports in plain language." />
  ),
});
