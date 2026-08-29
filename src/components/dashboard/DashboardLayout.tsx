import { useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Bell, FileText, HeartPulse, LayoutDashboard, LogOut, Menu, MessageCircleQuestionMark as MessageCircleQuestion, Upload, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "Upload Report", to: "/upload", icon: Upload },
  { label: "Report History", to: "/reports", icon: FileText },
  { label: "Ask Questions", to: "/questions", icon: MessageCircleQuestion },
  { label: "Notifications", to: "/notifications", icon: Bell },
  { label: "Profile", to: "/profile", icon: User },
] as const;

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();

  return (
    <nav className="flex flex-1 flex-col gap-1 p-3" aria-label="Dashboard navigation">
      {NAV_ITEMS.map((item) => {
        const active = pathname === item.to;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="truncate">{item.label}</span>
          </Link>
        );
      })}

      <button
        type="button"
        onClick={() => {
          onNavigate?.();
          navigate({ to: "/login" });
        }}
        className="mt-2 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
      >
        <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
        Logout
      </button>
    </nav>
  );
}

function BrandMark() {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-primary-foreground"
        style={{ backgroundImage: "var(--gradient-brand)" }}
        aria-hidden="true"
      >
        <HeartPulse className="h-5 w-5" />
      </div>
      <span className="truncate text-base font-semibold tracking-tight">MediAssist AI</span>
    </div>
  );
}

type DashboardLayoutProps = {
  children: React.ReactNode;
};

/** Shared shell (navbar + sidebar) for all authenticated dashboard screens. */
export function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen w-full" style={{ backgroundImage: "var(--gradient-page)" }}>
      <header className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-2">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <div className="border-b border-border p-4">
                  <BrandMark />
                </div>
                <NavLinks onNavigate={() => setMobileOpen(false)} />
              </SheetContent>
            </Sheet>
            <BrandMark />
          </div>

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              aria-label="Notifications"
              onClick={() => navigate({ to: "/notifications" })}
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 px-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground">
                    DU
                  </span>
                  <span className="hidden text-sm font-medium sm:inline">Demo User</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel className="font-normal">
                  <span className="block text-sm font-medium">Demo User</span>
                  <span className="block text-xs text-muted-foreground">demo@mediassist.ai</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => navigate({ to: "/profile" })}>
                  <User className="h-4 w-4" /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => navigate({ to: "/login" })}>
                  <LogOut className="h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="sticky top-[61px] hidden h-[calc(100vh-61px)] w-64 shrink-0 border-r border-border bg-card/60 lg:flex lg:flex-col">
          <NavLinks />
        </aside>

        <motion.main
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}
