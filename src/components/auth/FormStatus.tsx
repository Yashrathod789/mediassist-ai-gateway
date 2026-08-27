import { motion } from "motion/react";

export type Status = { type: "success" | "error"; message: string };

/** Small inline success/error banner used by the auth forms. */
export function FormStatus({ status }: { status: Status | null }) {
  if (!status) return null;

  return (
    <motion.p
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      role="status"
      aria-live="polite"
      className={
        status.type === "success"
          ? "rounded-md bg-accent px-3 py-2 text-sm text-accent-foreground"
          : "rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive"
      }
    >
      {status.message}
    </motion.p>
  );
}
