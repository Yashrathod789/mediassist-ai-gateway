import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { NotificationList } from "@/components/notifications/NotificationList";
import { getNotifications, type Notification } from "@/lib/notifications-api";

export const Route = createFileRoute("/notifications")({
  loader: async () => ({ notifications: await getNotifications() }),
  head: () => ({
    meta: [
      { title: "Notifications — MediAssist AI" },
      {
        name: "description",
        content:
          "View demo notifications about report processing, AI summaries and account updates in MediAssist AI.",
      },
      { property: "og:title", content: "Notifications — MediAssist AI" },
      {
        property: "og:description",
        content: "Demo notifications for report processing, summaries and account updates.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NotificationsPage,
});

function NotificationsPage() {
  const { notifications: initial } = Route.useLoaderData();
  const [notifications, setNotifications] = useState<Notification[]>(initial);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="mx-auto max-w-3xl space-y-6"
      >
        <header className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
          <div className="min-w-0">
            <h1 className="flex items-center gap-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              Notifications
              {unreadCount > 0 && (
                <Badge variant="default" className="align-middle">
                  {unreadCount} new
                </Badge>
              )}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Updates about your reports, AI summaries and account.
            </p>
          </div>
          <Button asChild variant="outline" className="justify-self-start sm:justify-self-end">
            <Link to="/dashboard">Back to Dashboard</Link>
          </Button>
        </header>

        <NotificationList
          notifications={notifications}
          onMarkRead={markRead}
          onMarkAllRead={markAllRead}
        />

        <p className="flex items-start gap-2 rounded-xl border border-border bg-background/60 p-3 text-xs text-muted-foreground">
          <Bell className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="min-w-0">
            Academic project prototype — these notifications are fictional demo data. No real
            notification backend is connected yet.
          </span>
        </p>
      </motion.div>
    </DashboardLayout>
  );
}
