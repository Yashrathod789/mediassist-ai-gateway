import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { ReportStatus, ReportSummaryRow } from "@/lib/dashboard-api";

function StatusBadge({ status }: { status: ReportStatus }) {
  if (status === "Completed") return <Badge variant="secondary">Completed</Badge>;
  if (status === "Processing") return <Badge variant="outline">Processing</Badge>;
  return <Badge variant="destructive">Failed</Badge>;
}

/** Recent (fictional) report list with status and a view action. */
export function RecentReports({ reports }: { reports: ReportSummaryRow[] }) {
  return (
    <Card className="border-border" style={{ boxShadow: "var(--shadow-card)" }}>
      <CardHeader>
        <CardTitle>Recent Reports</CardTitle>
        <CardDescription>Demo entries — no real patient data is shown.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {reports.map((report) => (
          <div
            key={report.id}
            className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border bg-background/60 p-3"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{report.name}</p>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">
                Uploaded {report.uploadedAt}
              </p>
              <div className="mt-2 sm:hidden">
                <StatusBadge status={report.status} />
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <span className="hidden sm:inline">
                <StatusBadge status={report.status} />
              </span>
              <Button asChild size="sm" variant="outline">
                <Link to="/reports">View</Link>
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
