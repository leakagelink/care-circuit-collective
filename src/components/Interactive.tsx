import { useState } from "react";
import { Badge, Card } from "@/components/AppShell";
import { complaints as seed, customers } from "@/lib/mock-data";

const gps: Record<string, { lat: number; lng: number; status: string; at: string }> = {
  "CU-1042": { lat: 23.2599, lng: 77.4126, status: "Verified", at: "12 Oct" },
  "CU-1043": { lat: 23.2332, lng: 77.4343, status: "Verified", at: "02 Oct" },
  "CU-1044": { lat: 23.2156, lng: 77.4304, status: "Pending check", at: "—" },
  "CU-1045": { lat: 23.2687, lng: 77.4011, status: "Verified", at: "28 Sep" },
  "CU-1046": { lat: 23.2401, lng: 77.3912, status: "Mismatch", at: "19 Oct" },
};

const history = (due: number) => [
  { period: "Oct 2026", amount: 1200, status: due > 0 ? "Pending" : "Paid" },
  { period: "Sep 2026", amount: 1200, status: "Paid" },
  { period: "Aug 2026", amount: 1200, status: "Paid" },
];

export function GpsStatus({ id }: { id: string }) {
  const [g, setG] = useState(gps[id]);
  return (
    <div className="text-sm">
      <div className="flex items-center justify-between"><span className="font-medium">GPS status</span><Badge>{g.status}</Badge></div>
      <p className="mt-1 font-mono text-xs text-muted-foreground">{g.lat.toFixed(4)}, {g.lng.toFixed(4)} · checked {g.at}</p>
      <button onClick={() => setG({ ...g, status: "Verified", at: "Today" })} className="mt-3 rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted">
        Mark verified (demo)
      </button>
    </div>
  );
}

export function CustomerLookup() {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(customers[0].id);
  const list = customers.filter((c) => `${c.id} ${c.name} ${c.area}`.toLowerCase().includes(q.toLowerCase()));
  const c = customers.find((x) => x.id === sel)!;
  return (
    <Card title="Customer lookup" className="mt-4">
      <div className="grid gap-5 lg:grid-cols-3">
        <div>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, ID or area" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
          <ul className="mt-2 max-h-64 overflow-y-auto">
            {list.map((x) => (
              <li key={x.id}>
                <button onClick={() => setSel(x.id)} className={`w-full rounded-md px-3 py-2 text-left text-sm ${x.id === sel ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
                  {x.name} <span className="opacity-70">· {x.id}</span>
                </button>
              </li>
            ))}
            {list.length === 0 && <li className="px-3 py-2 text-sm text-muted-foreground">No matches</li>}
          </ul>
        </div>
        <div>
          <p className="font-display text-lg font-semibold">{c.name}</p>
          <p className="text-sm text-muted-foreground">{c.id} · {c.area} · {c.plan}</p>
          <p className="mb-2 mt-4 text-sm font-medium">Billing history</p>
          <ul className="divide-y divide-border text-sm">
            {history(c.due).map((h) => (
              <li key={h.period} className="flex justify-between py-2">{h.period}<span className="flex gap-2">₹{h.amount} <Badge>{h.status}</Badge></span></li>
            ))}
          </ul>
        </div>
        <GpsStatus key={c.id} id={c.id} />
      </div>
    </Card>
  );
}

const statuses = ["Open", "Assigned", "In progress", "Resolved"];

export function ComplaintManager({ filter, canAssign = true }: { filter?: (c: (typeof seed)[number]) => boolean; canAssign?: boolean }) {
  const [items, setItems] = useState(seed);
  const update = (id: string, patch: Partial<(typeof seed)[number]>) => setItems((xs) => xs.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  return (
    <ul className="space-y-3">
      {items.filter(filter ?? (() => true)).map((c) => (
        <li key={c.id} className="rounded-lg border border-border p-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="font-medium">{c.issue}</span><Badge>{c.priority}</Badge>
          </div>
          <p className="text-muted-foreground">{c.id} · {c.customer}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <select value={c.status} onChange={(e) => update(c.id, { status: e.target.value })} className="rounded-md border border-input bg-background px-2 py-1 text-xs">
              {statuses.map((s) => <option key={s}>{s}</option>)}
            </select>
            {canAssign && (
              <select value={c.staff} onChange={(e) => update(c.id, { staff: e.target.value, status: c.status === "Open" ? "Assigned" : c.status })} className="rounded-md border border-input bg-background px-2 py-1 text-xs">
                {["—", "Imran K.", "Priya S."].map((s) => <option key={s}>{s}</option>)}
              </select>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

export function RaiseComplaint() {
  const [issue, setIssue] = useState("");
  const [mine, setMine] = useState<{ id: string; issue: string; status: string }[]>([
    { id: "CMP-311", issue: "Service interruption", status: "Assigned" },
  ]);
  return (
    <div>
      <ul className="space-y-2">
        {mine.map((m) => (
          <li key={m.id} className="flex items-center justify-between text-sm">
            <span><span className="font-medium">{m.issue}</span><br /><span className="text-muted-foreground">{m.id}</span></span><Badge>{m.status}</Badge>
          </li>
        ))}
      </ul>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!issue.trim()) return;
          setMine((m) => [{ id: `CMP-${315 + m.length}`, issue: issue.trim(), status: "Open" }, ...m]);
          setIssue("");
        }}
        className="mt-4 flex gap-2"
      >
        <input value={issue} onChange={(e) => setIssue(e.target.value)} placeholder="Describe the issue" className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm" />
        <button className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Raise</button>
      </form>
    </div>
  );
}
