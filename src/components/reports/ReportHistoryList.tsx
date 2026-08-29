import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { FileText, Loader2, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DEMO_REPORT_HISTORY,
  STATUS_FILTERS,
  STATUS_LABEL,
  filterReports,
  type StatusFilter,
} from "@/lib/reports-api";

export function ReportHistoryList() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");

  const reports = useMemo(
    () => filterReports(DEMO_REPORT_HISTORY, search, status),
    [search, status],
  );

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search reports..."
            aria-label="Search reports"
            className="pl-9"
          />
        </div>
        <div
          role="group"
          aria-label="Filter by status"
          className="flex flex-wrap gap-2 sm:justify-self-end"
        >
          {STATUS_FILTERS.map((filter) => (
            <Button
              key={filter.value}
              type="button"
              size="sm"
              variant={status === filter.value ? "default" : "outline"}
              aria-pressed={status === filter.value}
              onClick={() => setStatus(filter.value)}
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </div>

      {reports.length === 0 ? (
        <Card className="border-dashed" style={{ boxShadow: "var(--shadow-card)" }}>
          <CardContent className="py-12 text-center">
            <p className="text-base font-medium">No reports found</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try changing your search or filter.
            </p>
          </CardContent>
        </Card>
      ) : (
        <ul className="space-y-4">
          {reports.map((report, index) => (
            <motion.li
              key={report.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.05, ease: "easeOut" }}
            >
              <Card className="border-border" style={{ boxShadow: "var(--shadow-card)" }}>
                <CardContent className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
                  <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-3">
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground"
                      aria-hidden="true"
                    >
                      <FileText className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="truncate text-sm font-medium">{report.name}</p>
                        <Badge variant={report.status === "completed" ? "default" : "secondary"}>
                          {report.status === "processing" && (
                            <Loader2 className="mr-1 h-3 w-3 animate-spin" aria-hidden="true" />
                          )}
                          {STATUS_LABEL[report.status]}
                        </Badge>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {report.reportType} · {report.fileType} · Uploaded {report.uploadedAt}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 md:justify-self-end">
                    {report.status === "completed" ? (
                      <>
                        <Button asChild size="sm">
                          <Link to="/summary">View Summary</Link>
                        </Button>
                        <Button asChild size="sm" variant="outline">
                          <Link to="/questions">Ask Questions</Link>
                        </Button>
                      </>
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        Processing — summary not available yet
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
}
