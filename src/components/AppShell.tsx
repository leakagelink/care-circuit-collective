import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  Menu, X, LayoutDashboard, Users, Receipt, LifeBuoy, UserCog, MapPin,
  BarChart3, Settings, CalendarCheck, ListChecks, Wallet, Map, User, Home, Package,
} from "lucide-react";
import { SectionContent } from "@/components/Sections";
import type { Role } from "@/lib/mock-data";

const nav: Record<Role, string[]> = {
  admin: ["Overview", "Customers", "Billing", "Complaints", "Staff", "GPS Map", "Reports", "Settings"],
  staff: ["Today", "My Tasks", "Collections", "Complaints", "Route Map", "Profile"],
  customer: ["Home", "Bills & Payments", "My Plan", "Complaints", "Location", "Profile"],
};

const roleLabel: Record<Role, string> = { admin: "Admin", staff: "Staff", customer: "Customer" };

const itemIcons: Record<string, typeof LayoutDashboard> = {
  Overview: LayoutDashboard, Customers: Users, Billing: Receipt, Complaints: LifeBuoy,
  Staff: UserCog, "GPS Map": MapPin, Reports: BarChart3, Settings: Settings,
  Today: CalendarCheck, "My Tasks": ListChecks, Collections: Wallet,
  "Route Map": Map, Profile: User, Home: Home, "Bills & Payments": Receipt,
  "My Plan": Package, Location: MapPin,
};

const maxBottomItems = 4;

export function AppShell({ role, title, children }: { role: Role; title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const go = (i: number) => { setActive(i); setOpen(false); if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" }); };
  const switcher = (
    <div className="flex gap-2 text-xs">
      <Link to="/admin" className="rounded bg-sidebar-accent px-2 py-1">Admin</Link>
      <Link to="/staff" className="rounded bg-sidebar-accent px-2 py-1">Staff</Link>
      <Link to="/customer" className="rounded bg-sidebar-accent px-2 py-1">Customer</Link>
    </div>
  );
  const items = (
    <nav className="fl-stagger flex flex-col gap-1 px-3">
      {nav[role].map((item, i) => (
        <button type="button" key={item} onClick={() => go(i)} className={`text-left cursor-pointer whitespace-nowrap rounded-md px-3 py-2 text-sm transition-all duration-200 hover:translate-x-1 ${i === active ? "bg-sidebar-primary text-sidebar-primary-foreground font-semibold shadow-md" : "text-sidebar-foreground/75 hover:bg-sidebar-accent"}`}>
          {item}
        </button>
      ))}
    </nav>
  );
  return (
    <div className="min-h-screen bg-background lg:flex">
      <header className="sticky top-0 z-30 grid shadow-md backdrop-blur grid-cols-[minmax(0,1fr)_auto] items-center gap-3 bg-sidebar px-4 py-3 text-sidebar-foreground lg:hidden">
        <div className="flex min-w-0 items-center gap-3">
          <Link to="/" className="truncate font-display text-lg font-bold">Fieldline<span className="text-sidebar-primary">.</span></Link>
          <span className="shrink-0 rounded-full bg-sidebar-accent px-2.5 py-0.5 text-xs font-semibold">{roleLabel[role]}</span>
        </div>
        <button aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)} className="shrink-0 rounded-md p-2 hover:bg-sidebar-accent">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>
      {open && (
        <div className="fixed inset-0 z-20 lg:hidden">
          <div className="fl-fade absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <aside className="fl-drawer absolute left-0 top-14 flex h-[calc(100%-3.5rem)] w-72 max-w-[85%] flex-col justify-between bg-sidebar py-4 text-sidebar-foreground">
            {items}
            <div className="p-4"><p className="mb-2 text-xs uppercase tracking-wider text-sidebar-foreground/50">Switch role (demo)</p>{switcher}</div>
          </aside>
        </div>
      )}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:flex">
        <div className="flex items-center justify-between p-5">
          <Link to="/" className="font-display text-lg font-bold tracking-tight">Fieldline<span className="text-sidebar-primary">.</span></Link>
          <span className="rounded-full bg-sidebar-accent px-2.5 py-0.5 text-xs font-semibold">{roleLabel[role]}</span>
        </div>
        <div className="flex-1">{items}</div>
        <div className="p-4"><p className="mb-2 text-xs uppercase tracking-wider text-sidebar-foreground/50">Switch role (demo)</p>{switcher}</div>
      </aside>
      <main className="min-w-0 flex-1 p-4 pb-24 sm:p-6 sm:pb-28 lg:p-8 lg:pb-8">
        <div className="mb-2 inline-block rounded bg-accent px-2 py-0.5 text-xs font-semibold text-accent-foreground">Demo data</div>
        <h1 className="fl-rise mb-6 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{active === 0 ? title : nav[role][active]}</h1>
        {active === 0 ? children : <div key={active} className="fl-rise"><SectionContent item={nav[role][active] ?? ""} /></div>}
      </main>
      <nav aria-label="Bottom navigation" className="fixed inset-x-0 bottom-0 z-20 flex items-stretch justify-around border-t border-sidebar-border bg-sidebar pb-[env(safe-area-inset-bottom)] text-sidebar-foreground lg:hidden">
        {nav[role].slice(0, maxBottomItems).map((item, i) => {
          const Icon = itemIcons[item];
          return (
            <button type="button" key={item} onClick={() => go(i)} className={`flex flex-1 cursor-pointer flex-col items-center gap-0.5 py-2 text-[11px] ${i === active ? "font-semibold text-sidebar-primary" : "text-sidebar-foreground/75"}`}>
              {Icon && <span className={`rounded-full px-3 py-0.5 transition-colors ${i === active ? "fl-pop bg-sidebar-primary/20" : ""}`}><Icon className="h-5 w-5" /></span>}
              <span className="max-w-full truncate">{item}</span>
            </button>
          );
        })}
        {nav[role].length > maxBottomItems && (
          <button onClick={() => setOpen(true)} aria-label="More menu" className="flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] text-sidebar-foreground/75">
            <Menu className="h-5 w-5" />
            <span>More</span>
          </button>
        )}
      </nav>
    </div>
  );
}

export function Card({ title, children, className = "" }: { title?: string; children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-xl border border-border bg-card p-5 text-card-foreground shadow-sm fl-card ${className}`}>
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
  return <span className={`rounded-full px-2 py-0.5 text-xs font-medium fl-pop ${tone}`}>{children}</span>;
}
