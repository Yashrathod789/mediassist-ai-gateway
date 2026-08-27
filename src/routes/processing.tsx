import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export const Route = createFileRoute("/processing")({
  head: () => ({
    meta: [
      { title: "Report Processing — MediAssist AI" },
      {
        name: "description",
        content:
          "Your uploaded medical report is ready for processing in the MediAssist AI prototype.",
      },
      { property: "og:title", content: "Report Processing — MediAssist AI" },
      {
        property: "og:description",
        content: "Placeholder stage for upcoming MediAssist AI report analysis.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProcessingPage,
});

function ProcessingPage() {
  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="mx-auto max-w-2xl"
      >
        <Card className="border-border" style={{ boxShadow: "var(--shadow-card)" }}>
          <CardHeader className="items-start">
            <span
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground"
              aria-hidden="true"
            >
              <Cpu className="h-5 w-5" />
            </span>
            <CardTitle className="mt-3">Your report is ready for processing.</CardTitle>
            <CardDescription>
              The analysis stage will be added in the next step of this academic project. No
              OCR, NLP or AI summarization runs yet.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 sm:flex-row">
            <Button asChild>
              <Link to="/dashboard">Back to Dashboard</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/upload">Upload Another Report</Link>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
    </DashboardLayout>
  );
}
