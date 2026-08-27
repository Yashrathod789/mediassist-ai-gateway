import { motion } from "motion/react";
import { ShieldCheck } from "lucide-react";
import { BrandHeader } from "./BrandHeader";

type AuthLayoutProps = {
  children: React.ReactNode;
};

/** Shared page shell for the Login and Register screens. */
export function AuthLayout({ children }: AuthLayoutProps) {
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
          <div className="mt-8">{children}</div>
        </div>

        <p className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          Academic project — no real patient data is processed.
        </p>
      </motion.div>
    </main>
  );
}
