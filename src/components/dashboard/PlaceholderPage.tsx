import { Link } from "@tanstack/react-router";
import { Construction } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardLayout } from "./DashboardLayout";

type PlaceholderPageProps = {
  title: string;
  description: string;
};

/** Simple placeholder screen for modules planned in later project steps. */
export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <DashboardLayout>
      <Card className="mx-auto max-w-2xl border-border" style={{ boxShadow: "var(--shadow-card)" }}>
        <CardHeader className="items-start">
          <span
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground"
            aria-hidden="true"
          >
            <Construction className="h-5 w-5" />
          </span>
          <CardTitle className="mt-3">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This module is planned for a later step of the project. No medical processing happens
            here yet.
          </p>
          <Button asChild className="mt-4">
            <Link to="/dashboard">Back to Dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
