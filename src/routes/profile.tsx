import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { LogOut, Mail, ShieldCheck, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { getProfile, type ProfileUpdates } from "@/lib/profile-api";

export const Route = createFileRoute("/profile")({
  loader: async () => ({ profile: await getProfile() }),
  head: () => ({
    meta: [
      { title: "Profile — MediAssist AI" },
      { name: "description", content: "View and manage your MediAssist AI account details." },
      { property: "og:title", content: "Profile — MediAssist AI" },
      { property: "og:description", content: "View and manage your MediAssist AI account details." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProfilePage,
});

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function ProfilePage() {
  const { profile } = Route.useLoaderData();
  const navigate = useNavigate();
  const [saved, setSaved] = useState<ProfileUpdates>({
    fullName: profile.fullName,
    role: profile.role,
    organisation: profile.organisation,
    phone: profile.phone,
  });

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
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Profile</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              View and manage your MediAssist AI account details.
            </p>
          </div>
          <Button asChild variant="outline" className="justify-self-start sm:justify-self-end">
            <Link to="/dashboard">Back to Dashboard</Link>
          </Button>
        </header>

        <Card className="border-border" style={{ boxShadow: "var(--shadow-card)" }}>
          <CardContent className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4">
            <Avatar className="h-14 w-14">
              <AvatarFallback className="bg-secondary text-base font-semibold text-secondary-foreground">
                {initials(saved.fullName) || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-base font-semibold">{saved.fullName}</p>
              <p className="mt-0.5 flex items-center gap-1.5 truncate text-sm text-muted-foreground">
                <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                {profile.email}
              </p>
              <Badge variant="outline" className="mt-2">
                <User className="h-3 w-3" aria-hidden="true" />
                {saved.role}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border" style={{ boxShadow: "var(--shadow-card)" }}>
          <CardHeader>
            <CardTitle>Edit profile</CardTitle>
            <CardDescription>
              Update your personal details. Changes are saved for this prototype session only.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileForm
              initial={{ ...saved, email: profile.email }}
              onSaved={setSaved}
            />
          </CardContent>
        </Card>

        <Card className="border-border" style={{ boxShadow: "var(--shadow-card)" }}>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Session and sign-out options for this prototype.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="flex items-start gap-2 rounded-xl border border-border bg-background/60 p-3 text-xs text-muted-foreground">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="min-w-0">
                Academic project prototype — this account is a demo user. No real authentication
                backend is connected yet.
              </span>
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button
                variant="destructive"
                onClick={() => navigate({ to: "/login" })}
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
                Logout
              </Button>
              <Button asChild variant="outline">
                <Link to="/dashboard">Back to Dashboard</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
}
