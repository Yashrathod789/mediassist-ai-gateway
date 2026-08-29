import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ReportHistoryList } from "@/components/reports/ReportHistoryList";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Report History — MediAssist AI" },
      {
        name: "description",
        content:
          "View previously uploaded demo medical reports, their status and their available AI summaries.",
      },
      { property: "og:title", content: "Report History — MediAssist AI" },
      {
        property: "og:description",
        content: "View your previously uploaded reports and their available summaries.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReportsPage,
});

function ReportsPage() {
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
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Report History</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              View your previously uploaded reports and their available summaries.
            </p>
            <Badge variant="outline" className="mt-2">
              Demo data — not a real medical analysis
            </Badge>
          </div>
          <div className="flex flex-wrap gap-2 sm:justify-self-end">
            <Button asChild>
              <Link to="/upload">Upload New Report</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </header>

        <ReportHistoryList />

        <p className="pb-4 text-center text-xs text-muted-foreground">
          Academic project prototype — demo reports are for demonstration only and are not medical
          advice.
        </p>
      </motion.div>
    </DashboardLayout>
  );
}
