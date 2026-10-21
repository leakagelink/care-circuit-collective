import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Badge, Card } from "@/components/AppShell";
import { CustomerLookup, ComplaintManager } from "@/components/Interactive";
import { customers, kpis } from "@/lib/mock-data";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Fieldline" },
      { name: "description", content: "Overview of customers, revenue, dues and complaints." },
      { property: "og:title", content: "Admin Dashboard — Fieldline" },
      { property: "og:description", content: "Overview of customers, revenue, dues and complaints." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Admin,
});

const revenue = [42, 48, 45, 56, 61, 58, 66, 72, 69, 78, 81, 84];

function Admin() {
  return (
    <AppShell role="admin" title="Overview">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) => (
          <Card key={k.label}>
            <p className="text-sm text-muted-foreground">{k.label}</p>
            <p className="mt-1 font-display text-2xl font-bold">{k.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{k.delta} vs last month</p>
          </Card>
        ))}
      </div>
      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <Card title="Monthly revenue (₹K)" className="xl:col-span-2">
          <div className="flex h-48 items-end gap-2">
            {revenue.map((v, i) => (
              <div key={i} className="flex-1 rounded-t bg-primary/80" style={{ height: `${v}%` }} />
            ))}
          </div>
        </Card>
        <Card title="Complaints">
          <ComplaintManager />
        </Card>
      </div>
      <CustomerLookup />
      <Card title="Customers" className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-muted-foreground">
            <tr><th className="pb-2">ID</th><th>Name</th><th>Area</th><th>Plan</th><th>Due</th><th>Status</th></tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-t border-border">
                <td className="py-2.5 font-mono text-xs">{c.id}</td><td>{c.name}</td><td>{c.area}</td><td>{c.plan}</td>
                <td>₹{c.due.toLocaleString("en-IN")}</td><td><Badge>{c.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </AppShell>
  );
}
