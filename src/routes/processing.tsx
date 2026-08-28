import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ProcessingTimeline } from "@/components/processing/ProcessingTimeline";
import { PROCESSING_STAGES, STAGE_DURATION_MS } from "@/lib/processing-api";

export const Route = createFileRoute("/processing")({
  head: () => ({
    meta: [
      { title: "Report Processing — MediAssist AI" },
      {
        name: "description",
        content:
          "Follow each stage of the MediAssist AI report pipeline, from text extraction to a patient-friendly explanation.",
      },
      { property: "og:title", content: "Report Processing — MediAssist AI" },
      {
        property: "og:description",
        content: "Simulated processing pipeline for MediAssist AI report analysis.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProcessingPage,
});

const LAST_INDEX = PROCESSING_STAGES.length - 1;

function ProcessingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex >= LAST_INDEX) return;
    const timer = setTimeout(() => setCurrentIndex((index) => index + 1), STAGE_DURATION_MS);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const isComplete = currentIndex >= LAST_INDEX;
  const percent = Math.round((currentIndex / LAST_INDEX) * 100);

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="mx-auto max-w-3xl space-y-6"
      >
        <header className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Report Processing</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {isComplete
                ? "Your report is ready. You can now open the patient-friendly summary."
                : "Your report is ready for processing. Each stage below is a frontend simulation."}
            </p>
          </div>
          <Button asChild variant="outline" className="justify-self-start sm:justify-self-end">
            <Link to="/dashboard">Back to Dashboard</Link>
          </Button>
        </header>

        <Card className="border-border" style={{ boxShadow: "var(--shadow-card)" }}>
          <CardHeader className="items-start">
            <span
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground"
              aria-hidden="true"
            >
              <Cpu className="h-5 w-5" />
            </span>
            <CardTitle className="mt-3">Analysis pipeline</CardTitle>
            <CardDescription>
              No OCR, NLP or AI summarization runs yet — these stages are placeholders for the
              backend built in a later step.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <Progress value={percent} />
              <p className="mt-2 text-xs text-muted-foreground">
                {isComplete ? "Processing complete" : `Processing… ${percent}%`}
              </p>
            </div>

            <ProcessingTimeline currentIndex={currentIndex} />

            <div className="flex flex-col gap-2 sm:flex-row">
              <Button asChild disabled={!isComplete} aria-disabled={!isComplete}>
                <Link to="/summary" disabled={!isComplete}>
                  View Report Summary
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/upload">Upload Another Report</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <p className="pb-4 text-center text-xs text-muted-foreground">
          Academic prototype — stages are simulated and do not provide medical diagnosis.
        </p>
      </motion.div>
    </DashboardLayout>
  );
}
