import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { FileText, HelpCircle, Info, ListChecks, MessageSquareText, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { getReportSummary } from "@/lib/summary-api";

export const Route = createFileRoute("/summary")({
  loader: async () => ({ summary: await getReportSummary() }),
  head: () => ({
    meta: [
      { title: "Report Summary — MediAssist AI" },
      {
        name: "description",
        content:
          "Patient-friendly summary of an analysed medical report, with key findings and plain-language explanations.",
      },
      { property: "og:title", content: "Report Summary — MediAssist AI" },
      {
        property: "og:description",
        content: "Key findings and simple explanations generated from a sample medical report.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SummaryPage,
});

function SummaryPage() {
  const { summary } = Route.useLoaderData();

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
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Report Summary</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              A plain-language overview generated from your processed report. This prototype does
              not provide medical diagnosis.
            </p>
          </div>
          <Button asChild variant="outline" className="justify-self-start sm:justify-self-end">
            <Link to="/dashboard">Back to Dashboard</Link>
          </Button>
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
              <p className="truncate text-sm font-medium">{summary.reportName}</p>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">
                {summary.reportType} · {summary.processedAt}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="border-border" style={{ boxShadow: "var(--shadow-card)" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <ListChecks className="h-4 w-4 text-primary" aria-hidden="true" />
                Key Findings
              </CardTitle>
              <CardDescription>Main points extracted from the report text.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {summary.keyFindings.map((finding) => (
                  <li key={finding} className="flex items-start gap-2 text-sm">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                      aria-hidden="true"
                    />
                    <span className="min-w-0">{finding}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border" style={{ boxShadow: "var(--shadow-card)" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
                Patient-Friendly Explanation
              </CardTitle>
              <CardDescription>The same information in everyday language.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-relaxed">
              {summary.patientExplanation.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="border-border" style={{ boxShadow: "var(--shadow-card)" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <HelpCircle className="h-4 w-4 text-primary" aria-hidden="true" />
              Medical Terms Explained
            </CardTitle>
            <CardDescription>Short definitions for terms used in the report.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {summary.terms.map((item) => (
              <div key={item.term} className="rounded-xl border border-border bg-background/60 p-3">
                <Badge variant="secondary">{item.term}</Badge>
                <p className="mt-2 text-sm text-muted-foreground">{item.meaning}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border" style={{ boxShadow: "var(--shadow-card)" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <MessageSquareText className="h-4 w-4 text-primary" aria-hidden="true" />
              Questions You Could Ask
            </CardTitle>
            <CardDescription>
              Discuss these with a qualified doctor — the prototype cannot answer them clinically.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <ul className="space-y-2">
              {summary.suggestedQuestions.map((question) => (
                <li key={question} className="text-sm text-muted-foreground">
                  “{question}”
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button asChild>
                <Link to="/questions">Open Q&amp;A Module</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/upload">Upload Another Report</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <p className="flex items-start gap-2 rounded-xl border border-border bg-background/60 p-3 text-xs text-muted-foreground">
          <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="min-w-0">
            Academic project prototype — all content shown is fictional sample data and is not
            medical advice. Always consult a qualified healthcare professional.
          </span>
        </p>
      </motion.div>
    </DashboardLayout>
  );
}
