import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";

export const Route = createFileRoute("/upload")({
  head: () => ({
    meta: [
      { title: "Upload Report — MediAssist AI" },
      { name: "description", content: "Upload a medical report for AI summarization in MediAssist AI." },
      { property: "og:title", content: "Upload Report — MediAssist AI" },
      { property: "og:description", content: "Upload a medical report for AI summarization in MediAssist AI." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <PlaceholderPage title="Upload Report" description="Upload a medical report for AI summarization in MediAssist AI." />
  ),
});
