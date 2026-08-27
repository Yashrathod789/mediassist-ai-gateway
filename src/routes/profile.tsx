import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — MediAssist AI" },
      { name: "description", content: "View and manage your MediAssist AI account details." },
      { property: "og:title", content: "Profile — MediAssist AI" },
      { property: "og:description", content: "View and manage your MediAssist AI account details." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <PlaceholderPage title="Profile" description="View and manage your MediAssist AI account details." />
  ),
});
