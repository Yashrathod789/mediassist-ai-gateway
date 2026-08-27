import { createFileRoute, Link } from "@tanstack/react-router";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCards } from "@/components/dashboard/StatCards";
import { ReportActivityChart } from "@/components/dashboard/ReportActivityChart";
import { RecentReports } from "@/components/dashboard/RecentReports";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import {
  getDashboardStats,
  getRecentActivity,
  getRecentReports,
  getReportActivity,
} from "@/lib/dashboard-api";

export const Route = createFileRoute("/dashboard")({
  loader: async () => ({
    stats: await getDashboardStats(),
    reports: await getRecentReports(),
    activity: await getRecentActivity(),
    chart: await getReportActivity(),
  }),
  head: () => ({
    meta: [
      { title: "Dashboard — MediAssist AI" },
      {
        name: "description",
        content:
          "Overview of uploaded medical reports, AI summary status and report activity in MediAssist AI.",
      },
      { property: "og:title", content: "Dashboard — MediAssist AI" },
      {
        property: "og:description",
        content: "Manage medical reports and view AI-generated summaries in one place.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { stats, reports, activity, chart } = Route.useLoaderData();

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl space-y-6">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Welcome back!</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your medical reports and view AI-generated summaries in one place.
          </p>
        </header>

        <StatCards stats={stats} />

        <Card
          className="border-border bg-card"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <CardHeader>
            <CardTitle>Upload a New Medical Report</CardTitle>
            <CardDescription>
              Add a medical report so MediAssist AI can process it and generate a
              patient-friendly summary. This prototype does not provide medical diagnosis.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild size="lg">
              <Link to="/upload">
                <Upload className="h-4 w-4" aria-hidden="true" />
                Upload Report
              </Link>
            </Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <ReportActivityChart data={chart} />
          </div>
          <QuickActions />
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <RecentReports reports={reports} />
          </div>
          <RecentActivity items={activity} />
        </div>

        <p className="pb-4 text-center text-xs text-muted-foreground">
          Academic prototype — all figures and reports shown are fictional demo data.
        </p>
      </div>
    </DashboardLayout>
  );
}
