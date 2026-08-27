import { createFileRoute, Link } from "@tanstack/react-router";
import { BrandHeader } from "@/components/auth/BrandHeader";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create Account — MediAssist AI" },
      {
        name: "description",
        content: "Registration for MediAssist AI is coming soon. Sign in with an existing account.",
      },
      { property: "og:title", content: "Create Account — MediAssist AI" },
      { property: "og:description", content: "Registration for MediAssist AI is coming soon." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <main
      className="flex min-h-screen items-center justify-center px-4 py-10"
      style={{ backgroundImage: "var(--gradient-page)" }}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center"
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        <BrandHeader />
        <h2 className="mt-8 text-lg font-semibold">Create Account</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The registration form is coming soon in the next stage of the project.
        </p>
        <Link
          to="/login"
          className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Back to Login
        </Link>
      </div>
    </main>
  );
}
