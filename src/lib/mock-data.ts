// DEMO DATA ONLY — replaced by Lovable Cloud once enabled.
export type Role = "admin" | "staff" | "customer";

export const kpis = [
  { label: "Active customers", value: "1,284", delta: "+4.2%" },
  { label: "Revenue (month)", value: "₹8.42L", delta: "+11.8%" },
  { label: "Outstanding dues", value: "₹1.17L", delta: "-3.1%" },
  { label: "Open complaints", value: "37", delta: "+5" },
];

export const customers = [
  { id: "CU-1042", name: "Asha Verma", area: "Sector 12", plan: "Premium Monthly", due: 1200, status: "Overdue" },
  { id: "CU-1043", name: "Rahul Mehta", area: "Civil Lines", plan: "Basic Monthly", due: 0, status: "Paid" },
  { id: "CU-1044", name: "Sana Qureshi", area: "MG Road", plan: "Quarterly", due: 3400, status: "Pending" },
  { id: "CU-1045", name: "Vikram Joshi", area: "Sector 7", plan: "Premium Monthly", due: 0, status: "Paid" },
  { id: "CU-1046", name: "Neha Iyer", area: "Old Town", plan: "Basic Monthly", due: 650, status: "Pending" },
];

export const complaints = [
  { id: "CMP-311", customer: "Asha Verma", issue: "Service interruption", priority: "High", status: "Assigned", staff: "Imran K." },
  { id: "CMP-312", customer: "Neha Iyer", issue: "Billing mismatch", priority: "Medium", status: "Open", staff: "—" },
  { id: "CMP-313", customer: "Rahul Mehta", issue: "Device replacement", priority: "Low", status: "In progress", staff: "Priya S." },
  { id: "CMP-314", customer: "Sana Qureshi", issue: "Relocation request", priority: "Medium", status: "Resolved", staff: "Imran K." },
];

export const staffTasks = [
  { id: "T-88", customer: "Asha Verma", address: "14 Sector 12", type: "Complaint visit", time: "10:30", status: "Next" },
  { id: "T-89", customer: "Vikram Joshi", address: "3 Sector 7", type: "Collection ₹1,800", time: "12:00", status: "Scheduled" },
  { id: "T-90", customer: "Neha Iyer", address: "88 Old Town", type: "GPS verification", time: "15:15", status: "Scheduled" },
];

export const invoices = [
  { id: "INV-2026-10", period: "Oct 2026", amount: 1200, status: "Due 25 Oct" },
  { id: "INV-2026-09", period: "Sep 2026", amount: 1200, status: "Paid" },
  { id: "INV-2026-08", period: "Aug 2026", amount: 1200, status: "Paid" },
];
