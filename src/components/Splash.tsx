import { useEffect, useState } from "react";
import { Route } from "lucide-react";

/**
 * Animated splash screen shown on full page load.
 * Fades out automatically; purely presentational.
 */
export function Splash() {
  const [phase, setPhase] = useState<"visible" | "fading" | "done">("visible");

  useEffect(() => {
    const fadeTimer = setTimeout(() => setPhase("fading"), 1800);
    const doneTimer = setTimeout(() => setPhase("done"), 2500);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-sidebar text-sidebar-foreground transition-opacity duration-700 ${
        phase === "fading" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {/* soft ambient glows */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-sidebar-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />

      {/* logo mark with pulsing rings */}
      <div className="relative flex items-center justify-center">
        <span className="splash-ring absolute h-24 w-24 rounded-full border border-sidebar-primary/40" />
        <span className="splash-ring splash-ring-delay absolute h-24 w-24 rounded-full border border-sidebar-primary/25" />
        <div className="splash-rise flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-sidebar-primary shadow-[0_10px_40px_-10px_var(--sidebar-primary)]">
          <Route className="h-9 w-9 text-sidebar-primary-foreground" strokeWidth={2.2} />
        </div>
      </div>

      {/* wordmark + tagline */}
      <h1 className="splash-rise splash-rise-delay-1 mt-8 font-display text-4xl font-bold tracking-tight sm:text-5xl">
        Fieldline<span className="text-sidebar-primary">.</span>
      </h1>
      <p className="splash-rise splash-rise-delay-2 mt-3 max-w-xs text-center text-sm text-sidebar-foreground/60 sm:max-w-none">
        Customers · Billing · Field teams · Support
      </p>

      {/* loading bar */}
      <div className="splash-rise splash-rise-delay-3 absolute bottom-16 flex w-56 flex-col items-center gap-4">
        <div className="h-1 w-full overflow-hidden rounded-full bg-sidebar-accent">
          <div className="splash-bar h-full rounded-full bg-gradient-to-r from-primary to-sidebar-primary" />
        </div>
        <p className="text-xs text-sidebar-foreground/50">Demo preview — sign-in is simulated</p>
      </div>
    </div>
  );
}
