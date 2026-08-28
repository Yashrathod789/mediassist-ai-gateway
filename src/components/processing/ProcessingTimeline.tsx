import { motion } from "motion/react";
import { Check, Clock, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { PROCESSING_STAGES, getStageStatus } from "@/lib/processing-api";

type ProcessingTimelineProps = {
  currentIndex: number;
};

/** Vertical pipeline showing each processing stage and its state. */
export function ProcessingTimeline({ currentIndex }: ProcessingTimelineProps) {
  return (
    <ol className="space-y-1" aria-live="polite">
      {PROCESSING_STAGES.map((stage, index) => {
        const status = getStageStatus(index, currentIndex);
        const isLast = index === PROCESSING_STAGES.length - 1;

        return (
          <motion.li
            key={stage.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: index * 0.05 }}
            className="grid grid-cols-[auto_minmax(0,1fr)] gap-3"
          >
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors",
                  status === "done" && "border-transparent bg-primary text-primary-foreground",
                  status === "active" && "border-primary bg-accent text-primary",
                  status === "pending" && "border-border bg-muted text-muted-foreground",
                )}
                aria-hidden="true"
              >
                {status === "done" ? (
                  <Check className="h-4 w-4" />
                ) : status === "active" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Clock className="h-4 w-4" />
                )}
              </span>
              {!isLast && (
                <span
                  className={cn(
                    "my-1 w-px flex-1 transition-colors",
                    status === "done" ? "bg-primary/60" : "bg-border",
                  )}
                  aria-hidden="true"
                />
              )}
            </div>

            <div className={cn("min-w-0 pb-5", isLast && "pb-0")}>
              <p
                className={cn(
                  "text-sm font-medium",
                  status === "pending" && "text-muted-foreground",
                )}
              >
                {stage.label}
                <span className="sr-only">
                  {status === "done"
                    ? " — completed"
                    : status === "active"
                      ? " — in progress"
                      : " — waiting"}
                </span>
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">{stage.description}</p>
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}
