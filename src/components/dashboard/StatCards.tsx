import { motion } from "motion/react";
import { CheckCircle2, Clock, FileText, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { DashboardStats } from "@/lib/dashboard-api";

type StatCardsProps = { stats: DashboardStats };

/** Four summary tiles at the top of the dashboard (demo values). */
export function StatCards({ stats }: StatCardsProps) {
  const items = [
    { label: "Total Reports", value: stats.totalReports, icon: FileText },
    { label: "Completed", value: stats.completed, icon: CheckCircle2 },
    { label: "Processing", value: stats.processing, icon: Clock },
    { label: "Recent Reports", value: stats.recentReports, icon: Sparkles },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.06, ease: "easeOut" }}
        >
          <Card className="border-border" style={{ boxShadow: "var(--shadow-card)" }}>
            <CardContent className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm text-muted-foreground">{item.label}</p>
                <p className="mt-1 text-3xl font-semibold tracking-tight">{item.value}</p>
              </div>
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground"
                aria-hidden="true"
              >
                <item.icon className="h-5 w-5" />
              </span>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
