import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Badge, Card } from "@/components/AppShell";
import { ComplaintManager, GpsStatus } from "@/components/Interactive";
import { staffTasks } from "@/lib/mock-data";

export const Route = createFileRoute("/staff")({
  head: () => ({
    meta: [
      { title: "Staff Portal — Fieldline" },
      { name: "description", content: "Today's visits, collections and assigned complaints for field staff." },
      { property: "og:title", content: "Staff Portal — Fieldline" },
      { property: "og:description", content: "Today's visits, collections and assigned complaints." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Staff,
});

function Staff() {
  return (
    <AppShell role="staff" title="Good morning, Imran">
      <div className="grid gap-4 sm:grid-cols-3">
        <Card><p className="text-sm text-muted-foreground">Visits today</p><p className="font-display text-2xl font-bold">3</p></Card>
        <Card><p className="text-sm text-muted-foreground">To collect</p><p className="font-display text-2xl font-bold">₹1,800</p></Card>
        <Card><p className="text-sm text-muted-foreground">Open complaints</p><p className="font-display text-2xl font-bold">2</p></Card>
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card title="Today's route">
          <ol className="space-y-3">
            {staffTasks.map((t) => (
              <li key={t.id} className="flex items-center gap-4 rounded-lg border border-border p-3">
                <span className="font-mono text-sm font-semibold text-primary">{t.time}</span>
                <div className="flex-1 text-sm"><p className="font-medium">{t.customer} · {t.type}</p><p className="text-muted-foreground">{t.address}</p></div>
                <Badge>{t.status}</Badge>
              </li>
            ))}
          </ol>
        </Card>
        <Card title="Assigned complaints">
          <ComplaintManager canAssign={false} filter={(c) => c.staff === "Imran K."} />
          <div className="mt-6 border-t border-border pt-4"><p className="mb-2 text-xs text-muted-foreground">Next visit: Asha Verma</p><GpsStatus id="CU-1042" /></div>
        </Card>
      </div>
    </AppShell>
  );
}
