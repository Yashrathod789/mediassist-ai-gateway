import { Link } from "@tanstack/react-router";
import { FileText, MessageCircleQuestion, Sparkles, Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ACTIONS = [
  { label: "Upload New Report", to: "/upload", icon: Upload },
  { label: "View Report History", to: "/reports", icon: FileText },
  { label: "Latest Summary", to: "/reports", icon: Sparkles },
  { label: "Ask a Question", to: "/questions", icon: MessageCircleQuestion },
] as const;

/** Shortcut tiles to the main dashboard modules. */
export function QuickActions() {
  return (
    <Card className="border-border" style={{ boxShadow: "var(--shadow-card)" }}>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {ACTIONS.map((action) => (
          <Link
            key={action.label}
            to={action.to}
            className="flex items-center gap-3 rounded-xl border border-border bg-background/60 p-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
              <action.icon className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="min-w-0 truncate">{action.label}</span>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
