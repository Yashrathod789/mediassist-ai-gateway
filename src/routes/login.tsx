import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ShieldCheck } from "lucide-react";
import { BrandHeader } from "@/components/auth/BrandHeader";
import { LoginForm } from "@/components/auth/LoginForm";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — MediAssist AI" },
      {
        name: "description",
        content:
          "Sign in to MediAssist AI, an NLP and deep learning system for medical report summarization and patient-friendly explanations.",
      },
      { property: "og:title", content: "Login — MediAssist AI" },
      {
        property: "og:description",
        content: "Secure sign-in for the MediAssist AI medical report summarization system.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <main
      className="flex min-h-screen items-center justify-center px-4 py-10"
      style={{ backgroundImage: "var(--gradient-page)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div
          className="rounded-2xl border border-border bg-card p-6 sm:p-8"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <BrandHeader />
          <div className="mt-8">
            <LoginForm />
          </div>
        </div>

        <p className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          Academic project — no real patient data is processed.
        </p>
      </motion.div>
    </main>
  );
}
