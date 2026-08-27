import { Activity } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { ActivityItem } from "@/lib/dashboard-api";

/** Timeline of recent (demo) application activity. */
export function RecentActivity({ items }: { items: ActivityItem[] }) {
  return (
    <Card className="border-border" style={{ boxShadow: "var(--shadow-card)" }}>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Demo activity log for this prototype.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.id} className="flex items-start gap-3">
              <span
                className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground"
                aria-hidden="true"
              >
                <Activity className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.timestamp}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
