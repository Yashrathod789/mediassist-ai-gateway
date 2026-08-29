import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { QuestionPanel } from "@/components/questions/QuestionPanel";
import { DEMO_REPORT_NAME } from "@/lib/questions-api";

export const Route = createFileRoute("/questions")({
  head: () => ({
    meta: [
      { title: "Ask Questions — MediAssist AI" },
      {
        name: "description",
        content:
          "Ask questions about your processed medical report and get simple, plain-language demo explanations.",
      },
      { property: "og:title", content: "Ask Questions — MediAssist AI" },
      {
        property: "og:description",
        content: "Ask questions about your processed report and get simple explanations.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: QuestionsPage,
});

function QuestionsPage() {
  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="mx-auto max-w-4xl space-y-6"
      >
        <header className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Ask Questions</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Ask questions about your processed report and get simple explanations.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 sm:justify-self-end">
            <Button asChild variant="outline">
              <Link to="/summary">View Report Summary</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </header>

        <Card className="border-border" style={{ boxShadow: "var(--shadow-card)" }}>
          <CardContent className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground"
              aria-hidden="true"
            >
              <FileText className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{DEMO_REPORT_NAME}</p>
              <Badge variant="outline" className="mt-1">
                Demo data — not a real medical analysis
              </Badge>
            </div>
          </CardContent>
        </Card>

        <QuestionPanel />

        <p className="pb-4 text-center text-xs text-muted-foreground">
          Academic project prototype — demo responses are for demonstration only and are not medical
          advice.
        </p>
      </motion.div>
    </DashboardLayout>
  );
}
