import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { UploadReportPanel } from "@/components/upload/UploadReportPanel";

export const Route = createFileRoute("/upload")({
  head: () => ({
    meta: [
      { title: "Upload Medical Report — MediAssist AI" },
      {
        name: "description",
        content:
          "Upload a medical report file to begin AI-powered text analysis and generate a patient-friendly summary.",
      },
      { property: "og:title", content: "Upload Medical Report — MediAssist AI" },
      {
        property: "og:description",
        content:
          "Upload a medical report and extract its text with simulated OCR before continuing to AI analysis.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: UploadPage,
});

function UploadPage() {
  return (
    <DashboardLayout>
      <UploadReportPanel />
    </DashboardLayout>
  );
}
