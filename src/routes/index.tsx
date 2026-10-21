import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fieldline — Customer, Billing & Service Platform" },
      { name: "description", content: "Manage customers, recurring billing, GPS locations and complaints across admin, staff and customer portals." },
      { property: "og:title", content: "Fieldline — Customer, Billing & Service Platform" },
      { property: "og:description", content: "One platform for customers, billing, field staff and complaints." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const roles = [
  { to: "/admin" as const, name: "Admin dashboard", desc: "Customers, billing, complaints, staff and reports." },
  { to: "/staff" as const, name: "Staff portal", desc: "Today's visits, collections and assigned complaints." },
  { to: "/customer" as const, name: "Customer portal", desc: "Bills, payments, plan details and support." },
];

function Index() {
  return (
    <div className="min-h-screen bg-sidebar text-sidebar-foreground">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <p className="font-display text-lg font-bold">Fieldline<span className="text-sidebar-primary">.</span></p>
        <h1 className="mt-10 max-w-2xl font-display text-5xl font-bold leading-tight tracking-tight">
          Customers, billing, field teams and complaints — in one place.
        </h1>
        <p className="mt-4 max-w-xl text-sidebar-foreground/70">
          Preview mode: sign-in and data are simulated. Choose a role to explore its workspace.
        </p>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {roles.map((r) => (
            <Link key={r.to} to={r.to} className="group rounded-xl border border-sidebar-border bg-sidebar-accent p-6 transition hover:border-sidebar-primary">
              <h2 className="font-display text-xl font-semibold">{r.name}</h2>
              <p className="mt-2 text-sm text-sidebar-foreground/70">{r.desc}</p>
              <span className="mt-6 inline-block text-sm font-semibold text-sidebar-primary">Enter as demo →</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
