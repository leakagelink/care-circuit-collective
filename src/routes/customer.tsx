import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Badge, Card } from "@/components/AppShell";
import { complaints, invoices } from "@/lib/mock-data";

export const Route = createFileRoute("/customer")({
  head: () => ({
    meta: [
      { title: "Customer Portal — Fieldline" },
      { name: "description", content: "View your bills, pay dues, manage your plan and raise complaints." },
      { property: "og:title", content: "Customer Portal — Fieldline" },
      { property: "og:description", content: "Bills, payments, plan details and support." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Customer,
});

function Customer() {
  return (
    <AppShell role="customer" title="Hello, Asha">
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="bg-primary text-primary-foreground lg:col-span-2">
          <p className="text-sm opacity-80">Amount due</p>
          <p className="mt-1 font-display text-4xl font-bold">₹1,200</p>
          <p className="mt-1 text-sm opacity-80">Due 25 Oct 2026 · Premium Monthly</p>
          <button disabled className="mt-5 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground opacity-90">Pay now (coming soon)</button>
        </Card>
        <Card title="My plan">
          <p className="font-medium">Premium Monthly</p>
          <p className="text-sm text-muted-foreground">₹1,200 / month · renews 1 Nov</p>
          <p className="mt-3 text-sm text-muted-foreground">Account CU-1042 · Sector 12</p>
        </Card>
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card title="Invoices">
          <ul className="divide-y divide-border">
            {invoices.map((i) => (
              <li key={i.id} className="flex items-center justify-between py-2.5 text-sm">
                <span>{i.period}<br /><span className="font-mono text-xs text-muted-foreground">{i.id}</span></span>
                <span className="flex items-center gap-3">₹{i.amount.toLocaleString("en-IN")} <Badge>{i.status}</Badge></span>
              </li>
            ))}
          </ul>
        </Card>
        <Card title="My complaints">
          {complaints.filter((c) => c.customer === "Asha Verma").map((c) => (
            <div key={c.id} className="flex items-center justify-between text-sm">
              <span><span className="font-medium">{c.issue}</span><br /><span className="text-muted-foreground">{c.id} · {c.staff}</span></span>
              <Badge>{c.status}</Badge>
            </div>
          ))}
          <button disabled className="mt-5 w-full rounded-md border border-border py-2 text-sm font-medium">Raise a complaint (coming soon)</button>
        </Card>
      </div>
    </AppShell>
  );
}
