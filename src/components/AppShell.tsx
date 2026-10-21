import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import type { Role } from "@/lib/mock-data";

const nav: Record<Role, string[]> = {
  admin: ["Overview", "Customers", "Billing", "Complaints", "Staff", "GPS Map", "Reports", "Settings"],
  staff: ["Today", "My Tasks", "Collections", "Complaints", "Route Map", "Profile"],
  customer: ["Home", "Bills & Payments", "My Plan", "Complaints", "Location", "Profile"],
};

const roleLabel: Record<Role, string> = { admin: "Admin", staff: "Staff", customer: "Customer" };

export function AppShell({ role, title, children }: { role: Role; title: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background md:flex">
      <aside className="border-b border-sidebar-border bg-sidebar text-sidebar-foreground md:sticky md:top-0 md:h-screen md:w-64 md:border-b-0 md:border-r">
        <div className="flex items-center justify-between p-5">
          <Link to="/" className="font-display text-lg font-bold tracking-tight">
            Fieldline<span className="text-sidebar-primary">.</span>
          </Link>
          <span className="rounded-full bg-sidebar-accent px-2.5 py-0.5 text-xs font-semibold">{roleLabel[role]}</span>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 md:flex-col md:pb-0">
          {nav[role].map((item, i) => (
            <span
              key={item}
              className={`whitespace-nowrap rounded-md px-3 py-2 text-sm ${i === 0 ? "bg-sidebar-primary text-sidebar-primary-foreground font-semibold" : "text-sidebar-foreground/75 hover:bg-sidebar-accent"}`}
            >
              {item}
            </span>
          ))}
        </nav>
        <div className="hidden p-4 md:absolute md:bottom-0 md:block md:w-64">
          <p className="mb-2 text-xs uppercase tracking-wider text-sidebar-foreground/50">Switch role (demo)</p>
          <div className="flex gap-2 text-xs">
            <Link to="/admin" className="rounded bg-sidebar-accent px-2 py-1">Admin</Link>
            <Link to="/staff" className="rounded bg-sidebar-accent px-2 py-1">Staff</Link>
            <Link to="/customer" className="rounded bg-sidebar-accent px-2 py-1">Customer</Link>
          </div>
        </div>
      </aside>
      <main className="flex-1 p-5 md:p-8">
        <div className="mb-2 inline-block rounded bg-accent px-2 py-0.5 text-xs font-semibold text-accent-foreground">Demo data</div>
        <h1 className="mb-6 font-display text-3xl font-bold tracking-tight text-foreground">{title}</h1>
        {children}
      </main>
    </div>
  );
}

export function Card({ title, children, className = "" }: { title?: string; children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-xl border border-border bg-card p-5 text-card-foreground shadow-sm ${className}`}>
      {title && <h2 className="mb-4 font-display text-base font-semibold">{title}</h2>}
      {children}
    </section>
  );
}

export function Badge({ children }: { children: ReactNode }) {
  const s = String(children);
  const tone = /overdue|high/i.test(s)
    ? "bg-destructive/15 text-destructive"
    : /paid|resolved/i.test(s)
      ? "bg-success/15 text-success"
      : "bg-muted text-muted-foreground";
  return <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${tone}`}>{children}</span>;
}
