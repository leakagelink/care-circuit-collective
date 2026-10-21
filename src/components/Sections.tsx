// DEMO DATA ONLY — mock screens for every menu section.
import { useState } from "react";
import { toast } from "sonner";
import { Card, Badge } from "@/components/AppShell";
import { CustomerLookup, ComplaintManager, RaiseComplaint, GpsStatus } from "@/components/Interactive";
import { customers, invoices, staffTasks } from "@/lib/mock-data";

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const staffList = [
  { name: "Imran K.", zone: "Sector 7–12", visits: 6, collected: 5400, status: "On field" },
  { name: "Priya S.", zone: "Civil Lines", visits: 4, collected: 3200, status: "On field" },
  { name: "Arjun P.", zone: "Old Town", visits: 2, collected: 900, status: "Break" },
  { name: "Meena R.", zone: "MG Road", visits: 0, collected: 0, status: "Off duty" },
];
const btn = "rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:opacity-90";
const btn2 = "rounded-md border border-border px-3 py-1.5 text-xs font-semibold hover:bg-muted";

function Table({ head, rows }: { head: string[]; rows: (string | number | React.ReactNode)[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[520px] text-sm">
        <thead><tr className="text-left text-xs uppercase text-muted-foreground">{head.map((h) => <th key={h} className="py-2 pr-3">{h}</th>)}</tr></thead>
        <tbody>{rows.map((r, i) => <tr key={i} className="border-t border-border">{r.map((c, j) => <td key={j} className="py-2.5 pr-3">{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

function Stats({ items }: { items: [string, string][] }) {
  return (
    <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
      {items.map(([l, v]) => <Card key={l}><p className="text-xs text-muted-foreground">{l}</p><p className="mt-1 font-display text-xl font-bold">{v}</p></Card>)}
    </div>
  );
}

function MapMock({ pins }: { pins: { label: string; x: number; y: number }[] }) {
  return (
    <div className="relative h-72 overflow-hidden rounded-lg border border-border bg-muted fl-shine">
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] [background-size:32px_32px]" />
      {pins.map((p) => (
        <div key={p.label} className="absolute -translate-x-1/2 -translate-y-full text-center" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
          <span className="block rounded bg-card px-1.5 py-0.5 text-[10px] font-semibold shadow">{p.label}</span>
          <span className="mx-auto mt-0.5 block h-3 w-3 animate-pulse rounded-full bg-primary ring-4 ring-primary/25" />
        </div>
      ))}
      <p className="absolute bottom-2 right-2 rounded bg-card px-2 py-0.5 text-[10px] text-muted-foreground">Map preview (demo)</p>
    </div>
  );
}
const pins = customers.map((c, i) => ({ label: c.name.split(" ")[0] ?? c.name, x: 15 + i * 17, y: 30 + ((i * 23) % 50) }));

function Settings() {
  const [s, setS] = useState({ name: "Fieldline Services", currency: "INR", dueDay: "25", late: "50", reminders: true });
  return (
    <Card title="Business settings">
      <div className="grid gap-4 sm:grid-cols-2">
        {([["Business name", "name"], ["Currency", "currency"], ["Bill due day", "dueDay"], ["Late fee (₹)", "late"]] as const).map(([l, k]) => (
          <label key={k} className="text-sm">{l}<input value={s[k]} onChange={(e) => setS({ ...s, [k]: e.target.value })} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2" /></label>
        ))}
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={s.reminders} onChange={(e) => setS({ ...s, reminders: e.target.checked })} /> Send payment reminders</label>
      </div>
      <button className={`${btn} mt-4`} onClick={() => toast.success("Settings saved (demo)")}>Save settings</button>
    </Card>
  );
}

function Profile({ name, role, extra }: { name: string; role: string; extra: [string, string][] }) {
  return (
    <Card>
      <div className="flex items-center gap-4">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-primary font-display text-xl font-bold text-primary-foreground">{name.split(" ").map((w) => w[0]).join("")}</div>
        <div><p className="font-display text-lg font-semibold">{name}</p><p className="text-sm text-muted-foreground">{role}</p></div>
      </div>
      <dl className="mt-5 grid gap-3 sm:grid-cols-2">{extra.map(([k, v]) => <div key={k}><dt className="text-xs text-muted-foreground">{k}</dt><dd className="text-sm font-medium">{v}</dd></div>)}</dl>
      <div className="mt-5 flex gap-2"><button className={btn} onClick={() => toast.success("Profile updated (demo)")}>Edit profile</button><button className={btn2} onClick={() => toast("Logged out (demo)")}>Log out</button></div>
    </Card>
  );
}

function Collections() {
  const [paid, setPaid] = useState<string[]>([]);
  const due = customers.filter((c) => c.due > 0);
  return (
    <>
      <Stats items={[["Collected today", inr(5400)], ["Pending", inr(due.reduce((a, c) => a + c.due, 0))], ["Receipts", String(3 + paid.length)], ["Cash in hand", inr(5400)]]} />
      <Card title="Due collections">
        <div className="space-y-3">{due.map((c) => (
          <div key={c.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border p-3">
            <div><p className="font-medium">{c.name}</p><p className="text-xs text-muted-foreground">{c.id} · {c.area}</p></div>
            <div className="flex items-center gap-2"><span className="font-semibold">{inr(c.due)}</span>
              {paid.includes(c.id) ? <Badge>Paid</Badge> : <button className={btn} onClick={() => { setPaid([...paid, c.id]); toast.success(`Cash ${inr(c.due)} recorded · receipt RC-${c.id.slice(3)}`); }}>Collect cash</button>}
            </div>
          </div>))}</div>
      </Card>
    </>
  );
}

function Bills() {
  const [list, setList] = useState(invoices);
  return (
    <>
      <Stats items={[["Amount due", inr(1200)], ["Due date", "25 Oct"], ["Paid this year", inr(10800)], ["Plan", "Premium"]]} />
      <Card title="Invoices & receipts">
        <Table head={["Invoice", "Period", "Amount", "Status", ""]} rows={list.map((v) => [v.id, v.period, inr(v.amount), <Badge>{v.status}</Badge>,
          v.status === "Paid" ? <button className={btn2} onClick={() => toast("Receipt downloaded (demo)")}>Receipt</button>
            : <button className={btn} onClick={() => { setList(list.map((x) => x.id === v.id ? { ...x, status: "Paid" } : x)); toast.success("Payment successful (sandbox)"); }}>Pay now</button>])} />
      </Card>
    </>
  );
}

function Tasks() {
  const [done, setDone] = useState<string[]>([]);
  return (
    <Card title="My tasks">
      <div className="space-y-3">{staffTasks.map((t) => (
        <div key={t.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border p-3">
          <div><p className="font-medium">{t.type}</p><p className="text-xs text-muted-foreground">{t.time} · {t.customer} · {t.address}</p></div>
          <div className="flex gap-2">
            <a className={btn2} target="_blank" rel="noreferrer" href={`https://www.google.com/maps/search/${encodeURIComponent(t.address)}`}>Navigate</a>
            {done.includes(t.id) ? <Badge>Resolved</Badge> : <button className={btn} onClick={() => { setDone([...done, t.id]); toast.success(`${t.id} marked done`); }}>Mark done</button>}
          </div>
        </div>))}</div>
    </Card>
  );
}

export function SectionContent({ item }: { item: string }) {
  switch (item) {
    case "Customers": return <><div className="mb-4 flex justify-end"><button className={btn} onClick={() => toast.success("Customer added (demo)")}>+ Add customer</button></div><CustomerLookup /></>;
    case "Billing": return <><Stats items={[["Billed (Oct)", "₹8.42L"], ["Collected", "₹7.25L"], ["Outstanding", "₹1.17L"], ["Overdue accounts", "48"]]} />
      <Card title="Customer dues"><Table head={["Customer", "Plan", "Due", "Status", ""]} rows={customers.map((c) => [c.name, c.plan, inr(c.due), <Badge>{c.status}</Badge>, c.due > 0 ? <button className={btn2} onClick={() => toast.success(`Reminder sent to ${c.name}`)}>Remind</button> : "—"])} /></Card></>;
    case "Complaints": return <ComplaintManager />;
    case "Staff": return <Card title="Field staff"><Table head={["Name", "Zone", "Visits", "Collected", "Status"]} rows={staffList.map((s) => [s.name, s.zone, s.visits, inr(s.collected), <Badge>{s.status}</Badge>])} /></Card>;
    case "GPS Map": case "Route Map": return <><Card title={item}><MapMock pins={pins} /></Card><div className="mt-6 grid gap-4 lg:grid-cols-2">{customers.slice(0, 2).map((c) => <Card key={c.id} title={c.name}><GpsStatus id={c.id} /></Card>)}</div></>;
    case "Reports": return <><Stats items={[["Revenue YTD", "₹78.6L"], ["Collection rate", "86%"], ["Avg. resolution", "1.8 days"], ["New customers", "142"]]} />
      <Card title="Export reports"><div className="flex flex-wrap gap-2">{["Revenue CSV", "Dues Excel", "Complaints PDF", "Staff performance CSV"].map((r) => <button key={r} className={btn2} onClick={() => toast.success(`${r} downloaded (demo)`)}>{r}</button>)}</div></Card></>;
    case "Settings": return <Settings />;
    case "My Tasks": return <Tasks />;
    case "Collections": return <Collections />;
    case "Bills & Payments": return <Bills />;
    case "My Plan": return <Card title="Premium Monthly"><p className="font-display text-3xl font-bold">₹1,200<span className="text-sm font-normal text-muted-foreground"> / month</span></p>
      <ul className="mt-4 space-y-1 text-sm">{["Priority support", "Free monthly service visit", "Device replacement cover"].map((f) => <li key={f}>✓ {f}</li>)}</ul>
      <div className="mt-4 flex gap-2"><button className={btn} onClick={() => toast.success("Upgrade request sent (demo)")}>Upgrade</button><button className={btn2} onClick={() => toast("Plan change request sent (demo)")}>Change plan</button></div></Card>;
    case "Location": return <><Card title="Your registered location"><MapMock pins={[{ label: "Home", x: 50, y: 55 }]} /></Card><Card title="GPS status" className="mt-6"><GpsStatus id="CU-1042" /></Card></>;
    case "Profile": return <Profile name="Asha Verma" role="Demo user" extra={[["Phone", "+91 98765 43210"], ["Email", "asha@example.com"], ["Address", "14 Sector 12"], ["Member since", "Jan 2024"]]} />;
    default: return <Card><p className="text-sm text-muted-foreground">Demo content</p></Card>;
  }
}

export { RaiseComplaint };
