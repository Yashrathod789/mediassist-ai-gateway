import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Bell, CheckCheck, CircleCheck as CheckCircle2, Clock, FileText, Loader as Loader2, Settings, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Notification, NotificationType } from "@/lib/notifications-api";

const TYPE_META: Record<
  NotificationType,
  { label: string; icon: typeof FileText; accent: string }
> = {
  report_processing: { label: "Processing", icon: Loader2, accent: "bg-secondary text-secondary-foreground" },
  report_completed: { label: "Completed", icon: CheckCircle2, accent: "bg-accent text-accent-foreground" },
  summary_generated: { label: "Summary", icon: Sparkles, accent: "bg-accent text-accent-foreground" },
  account_update: { label: "Account", icon: Settings, accent: "bg-secondary text-secondary-foreground" },
};

type Filter = "all" | "unread";

type NotificationListProps = {
  notifications: Notification[];
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
};

export function NotificationList({ notifications, onMarkRead, onMarkAllRead }: NotificationListProps) {
  const [filter, setFilter] = useState<Filter>("all");

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications],
  );

  const visible = useMemo(() => {
    const sorted = [...notifications].sort((a, b) => Number(a.read) - Number(b.read));
    return filter === "unread" ? sorted.filter((n) => !n.read) : sorted;
  }, [notifications, filter]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div
          role="group"
          aria-label="Filter notifications"
          className="flex flex-wrap gap-2"
        >
          <Button
            type="button"
            size="sm"
            variant={filter === "all" ? "default" : "outline"}
            aria-pressed={filter === "all"}
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button
            type="button"
            size="sm"
            variant={filter === "unread" ? "default" : "outline"}
            aria-pressed={filter === "unread"}
            onClick={() => setFilter("unread")}
          >
            Unread
            {unreadCount > 0 && (
              <Badge variant="secondary" className="ml-1.5">
                {unreadCount}
              </Badge>
            )}
          </Button>
        </div>

        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={onMarkAllRead}
          disabled={unreadCount === 0}
        >
          <CheckCheck className="h-4 w-4" aria-hidden="true" />
          Mark all as read
        </Button>
      </div>

      {visible.length === 0 ? (
        <Card className="border-dashed" style={{ boxShadow: "var(--shadow-card)" }}>
          <CardContent className="py-12 text-center">
            <span
              className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground"
              aria-hidden="true"
            >
              <Bell className="h-5 w-5" />
            </span>
            <p className="mt-3 text-base font-medium">
              {filter === "unread" ? "No unread notifications" : "No notifications"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {filter === "unread"
                ? "You're all caught up."
                : "Notifications about your reports and account will appear here."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <ul className="space-y-3">
          <AnimatePresence initial={false}>
            {visible.map((notification) => {
              const meta = TYPE_META[notification.type];
              const Icon = meta.icon;

              return (
                <motion.li
                  key={notification.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <Card
                    className={cn(
                      "border-border transition-colors",
                      notification.read ? "bg-background/40" : "bg-card",
                    )}
                    style={{ boxShadow: "var(--shadow-card)" }}
                  >
                    <CardContent className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-3">
                      <span
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                          meta.accent,
                        )}
                        aria-hidden="true"
                      >
                        <Icon
                          className={cn(
                            "h-5 w-5",
                            notification.type === "report_processing" && !notification.read && "animate-spin",
                          )}
                        />
                      </span>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p
                            className={cn(
                              "truncate text-sm",
                              notification.read ? "font-normal text-muted-foreground" : "font-medium",
                            )}
                          >
                            {notification.title}
                          </p>
                          {!notification.read && (
                            <span
                              className="h-2 w-2 shrink-0 rounded-full bg-primary"
                              aria-label="Unread"
                            />
                          )}
                          <Badge variant="outline">{meta.label}</Badge>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {notification.message}
                        </p>
                        <p className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 shrink-0" aria-hidden="true" />
                          {notification.timestamp}
                        </p>
                      </div>

                      {!notification.read && (
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          onClick={() => onMarkRead(notification.id)}
                          className="shrink-0"
                        >
                          Mark as read
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}
