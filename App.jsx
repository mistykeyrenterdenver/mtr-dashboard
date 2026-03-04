import { useState, useEffect } from "react";

const STORAGE_KEY = "mtr-weekly-snapshots";
const PROPERTIES_KEY = "mtr-properties";

const defaultProperties = [
  { id: 1, address: "2445 Lawrence (Unit A)", owner: "Alan", status: "Occupied", rent: 1790, platform: "FF/AF", renewal: "11/5/2026", fee: "14%", dates: "Feb 22 – May 31" },
  { id: 2, address: "403 Washington Ave Unit A", owner: "Josh", status: "Occupied", rent: 3100, platform: "FF/AF", renewal: "Not renewed", fee: "13%", dates: "Jul 2 – Nov 30, 2026" },
  { id: 3, address: "5260 W 24th Ave (Unit 1)", owner: "John & Linda", status: "Occupied", rent: 2000, platform: "FF/AF", renewal: "12/9/2026", fee: "15%", dates: "Mar 1 – May 31" },
  { id: 4, address: "5270 W 24th Ave (Unit 2)", owner: "John & Linda", status: "Occupied", rent: 2000, platform: "FF/AF", renewal: "Not renewed", fee: "15%", dates: "Nov 2 – Apr 5" },
  { id: 5, address: "5280 W 24th Ave (Unit 3)", owner: "John & Linda", status: "Vacant", rent: null, platform: "FF/AF", renewal: "12/9/2026", fee: "15%", dates: null },
  { id: 6, address: "5290 W 24th Ave (Unit 4)", owner: "John & Linda", status: "Occupied", rent: 2000, platform: "FF/AF", renewal: "Not renewed", fee: "15%", dates: "Jul 14 – Apr 30, 2026" },
  { id: 7, address: "10605 W 48th Ave Unit A", owner: "John & Linda", status: "Occupied", rent: 1900, platform: "FF/AF", renewal: "3/19/2026", fee: "15%", dates: "Feb 21 – May 21" },
  { id: 8, address: "10605 W 48th Ave Unit B", owner: "John & Linda", status: "Occupied", rent: 1720, platform: "Airbnb", renewal: "3/19/2026", fee: "15%", dates: "Aug 26 – May 31" },
  { id: 9, address: "10609 W 48th Ave Unit C", owner: "John & Linda", status: "Occupied", rent: 2000, platform: "FF/AF", renewal: "3/19/2026", fee: "15%", dates: "Sep 30 – May 30, 2026" },
  { id: 10, address: "10609 W 48th Ave Unit D", owner: "John & Linda", status: "Vacant", rent: null, platform: "Vacant", renewal: "3/19/2026", fee: "15%", dates: null },
  { id: 11, address: "5327 Independence St Unit A", owner: "John & Linda", status: "Occupied", rent: 2100, platform: "FF/AF", renewal: "4/3/2026", fee: "15%", dates: "May 1, 2025 – Apr 29, 2026" },
  { id: 12, address: "5327 Independence St Unit B", owner: "John & Linda", status: "Occupied", rent: 1600, platform: "Airbnb", renewal: "4/3/2026", fee: "15%", dates: "Sep 27 – May 31, 2026" },
  { id: 13, address: "2065 Iris St", owner: "John & Linda", status: "Occupied", rent: 2100, platform: "FF/AF", renewal: "TBD", fee: "15%", dates: "Ends May 31, 2026" },
  { id: 14, address: "2075 Iris St", owner: "John & Linda", status: "Occupied", rent: 2200, platform: "FF/AF", renewal: "4/18/2026", fee: "15%", dates: "Jun 1 – May 31, 2026" },
  { id: 15, address: "891 14th (Unit 1112)", owner: "April & Tamara", status: "Occupied", rent: 2370, platform: "Airbnb", renewal: "12/20/2025", fee: "15%", dates: "Mar 28 – Jun 1, 2026" },
  { id: 16, address: "2482 W Caithness (Unit 11)", owner: "Joe", status: "Vacant", rent: null, platform: "Vacant", renewal: "3/2/2027", fee: "15%", dates: null },
  { id: 17, address: "2482 W Caithness (Unit 14)", owner: "Joe", status: "Vacant", rent: null, platform: "Vacant", renewal: "Non renewal", fee: "15%", dates: null },
  { id: 18, address: "227 Logan (Unit 1)", owner: "John Hotchkiss", status: "Occupied", rent: 1756, platform: "FF/AF", renewal: "11/29/2025", fee: "15%", dates: "Feb 28 – Mar 31 | Apr 19 – Jul 4" },
  { id: 19, address: "4770 Vine St", owner: "John Hotchkiss", status: "Not Active", rent: null, platform: "—", renewal: "Not listed", fee: "15%", dates: null },
  { id: 20, address: "682 Clarkson", owner: "Brandon", status: "Occupied", rent: 1900, platform: "FF/AF", renewal: "2/7/2026", fee: "0%", dates: "Sep 23 – Apr 6" },
  { id: 21, address: "2500 Walnut St #204", owner: "Cyrus", status: "Occupied", rent: 2600, platform: "FF/AF", renewal: "4/14/2026", fee: "15%", dates: "Jun 1 – May 1, 2026" },
  { id: 22, address: "1212 Perry St", owner: "Jamal Ahmed", status: "Occupied", rent: 3100, platform: "Airbnb", renewal: "6/9/2026", fee: "20%", dates: "Jan 1 – May 1" },
  { id: 23, address: "12295 Crabapple St", owner: "Kyle Mickey", status: "Vacant", rent: null, platform: "Vacant", renewal: "8/15/2026", fee: "20%", booked: true, dates: "Mar 5 – Apr 6" },
  { id: 24, address: "1327 Steele St #203", owner: "Noelle Punessen", status: "Occupied", rent: 2000, platform: "FF/AF", renewal: "8/22/2026", fee: "20%", dates: "Jan 1 – May 31" },
  { id: 25, address: "2796 S Quay Way", owner: "Marcelle Irvine", status: "Occupied", rent: 3250, platform: "Airbnb", renewal: "9/8/2026", fee: "17%", dates: "Sep 28 – Mar 31" },
  { id: 26, address: "5300 E Cherry Creek Dr #1227", owner: "Francis Povall", status: "Occupied", rent: 1500, platform: "FF/AF", renewal: "9/23/2026", fee: "20%", dates: "Jan 30 – May 1" },
  { id: 27, address: "17781 Fox St", owner: "Laura Jansen", status: "Occupied", rent: 2844, platform: "Airbnb", renewal: "10/17/2026", fee: "20%", dates: "Nov 30 – Aug 17" },
  { id: 28, address: "4200 W 17th Ave #617", owner: "Dylan Gorman", status: "Occupied", rent: 2300, platform: "Airbnb", renewal: "10/14/2026", fee: "20%", dates: "Mar 3 – Jun 3" },
  { id: 29, address: "1452 Ivy St (lower S)", owner: "Alex Kistler", status: "Occupied", rent: 1754, platform: "Airbnb", renewal: "11/14/2026", fee: "18%", dates: "Feb 15 – Jul 15" },
  { id: 30, address: "1454 Ivy St (upper S)", owner: "Alex Kistler", status: "Occupied", rent: 1800, platform: "FF/AF", renewal: "11/14/2026", fee: "18%", dates: "Feb 1 – Jun 1" },
  { id: 31, address: "1456 Ivy St (upper N)", owner: "Alex Kistler", status: "Occupied", rent: 1717, platform: "Airbnb", renewal: "11/14/2026", fee: "18%", dates: "Nov 30 – Mar 31" },
  { id: 32, address: "1458 Ivy St (lower N)", owner: "Alex Kistler", status: "Vacant", rent: null, platform: "Vacant", renewal: "11/14/2026", fee: "18%", dates: null },
  { id: 33, address: "2928 Milwaukee St", owner: "Le'Toya Garland", status: "Occupied", rent: null, platform: "FF/AF", renewal: "1/12/2027", fee: "20%", dates: "Mar 1 – May 2" },
  { id: 34, address: "1111 Osage St #23", owner: "William/Emilia Peace", status: "Occupied", rent: 2000, platform: "FF/AF", renewal: "1/22/2027", fee: "20%", dates: "Feb 14 – May 30" },
  { id: 35, address: "12304 W Cross Dr #302", owner: "Taylor Brant", status: "Occupied", rent: 2218, platform: "Airbnb", renewal: "2/1/2027", fee: "20%", dates: "Feb 17 – Sep 1" },
  { id: 36, address: "4481 E Bails Pl", owner: "Abigail Stevenson", status: "Not Active", rent: null, platform: "—", renewal: "—", fee: "—", dates: null },
  { id: 37, address: "2880 S Locust St unit S301", owner: "Cameron Bristol", status: "Not Active", rent: null, platform: "—", renewal: "TBD", fee: "20%", dates: null },
  { id: 38, address: "2062 Glenarm", owner: "Gavin", status: "Not Active", rent: null, platform: "—", renewal: "Non renewal", fee: "15%", dates: null },
];

const offboardedProperties = [
  { id: "o1", address: "2323 N Marion", owner: "Maggie", reason: "Owner moved back in", dates: "Sept 2024 – Jun 18, 2025" },
  { id: "o2", address: "2075 1/2 Iris (Bungalow)", owner: "John & Linda", reason: "Zoning issue", dates: "Apr 2025 – Aug 18, 2025" },
  { id: "o3", address: "890 Depew", owner: "Sean Smith", reason: "Owner moving back in", dates: "May 2025 – Aug 31, 2025" },
  { id: "o4", address: "4090 S Monaco", owner: "Amanda", reason: "Self-managing as STR", dates: "May 2025 – Sep 5, 2025" },
  { id: "o5", address: "8867 Norwhich St", owner: "John & Linda", reason: "Canceling all LTR", dates: "Dec 2024 – Oct 1, 2025" },
  { id: "o6", address: "11144 W 27th Ave", owner: "Kris & Jessica", reason: "Owners sold home", dates: "Jun 2025 – Jan 2026" },
  { id: "o7", address: "3601 Arapahoe Ave #316 Boulder", owner: "Cyrus", reason: "Owners took back over", dates: "Mar 2025 – Jan 2026" },
  { id: "o8", address: "2441 Broadway #203", owner: "Cyrus", reason: "Owners took back over", dates: "Mar 2025 – Jan 2026" },
  { id: "o9", address: "683 Dawson St", owner: "Josie Torres", reason: "Bills due", dates: "Jun 2025" },
];

const defaultSnapshot = {
  date: "3/4/2026",
  totalMidterms: 38,
  occupied: 28,
  activeVacant: 6,
  notActive: 4,
  upcomingMoveIns: 1,
  weeklyOccupancy: 82.35,
  monthlyAvgOccupancy: null,
  avgRent: 2134.04,
  notes: "",
};

const historicalSnapshot = {
  date: "2/25/2026",
  totalMidterms: 37,
  occupied: 25,
  activeVacant: null,
  notActive: 3,
  upcomingMoveIns: 3,
  weeklyOccupancy: 73.50,
  monthlyAvgOccupancy: 69.22,
  avgRent: null,
  notes: "",
};

const TABS = ["Overview", "Properties", "Benchmarks", "History"];

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const benchmarkData = {
  revenue: {
    2024: [null,null,null,null,null,null,null,null,1000,603.53,1653,2504],
    2025: [2803.11,4166,5062.95,10108.75,9650.67,9100.75,19665.67,12206.85,11490.83,12608,10212.96,14994.85],
    2026: [10214.61,14311.31,null,null,null,null,null,null,null,null,null,null],
  },
  revenuePerUnit: {
    2024: [null,null,null,null,null,null,null,null,500,301.77,826.50,227.64],
    2025: [233.59,277.73,220.13,326.09,332.78,275.78,614.55,381.46,359.09,394,340.43,428.42],
    2026: [300.43,596.30,null,null,null,null,null,null,null,null,null,null],
    goal: 400,
  },
  occupancy: {
    2025: [78,80,91.30,89.97,89,86.90,90.34,82.29,87.45,85.66,73,74.81],
    2026: [71.03,69.22,null,null,null,null,null,null,null,null,null,null],
  },
  portfolio: {
    2024: [null,null,null,null,null,null,null,null,2,2,2,11],
    2025: [12,15,23,31,29,33,32,32,32,34,37,38],
    2026: [37,37,null,null,null,null,null,null,null,null,null,null],
  },
  avgRent: {
    2025: [2200,2188,2180,2187.42,2257.19,2380,2530,2430,2461,2189.21,2168,2116.43],
    2026: [2138,2134,null,null,null,null,null,null,null,null,null,null],
  },
};

const statusColor = (s) => {
  if (s === "Occupied") return "#22c55e";
  if (s === "Vacant") return "#f59e0b";
  if (s === "Not Active") return "#6b7280";
  if (s === "Owner Occupied") return "#818cf8";
  return "#94a3b8";
};

const statusBg = (s) => {
  if (s === "Occupied") return "rgba(34,197,94,0.12)";
  if (s === "Vacant") return "rgba(245,158,11,0.12)";
  if (s === "Not Active") return "rgba(107,114,128,0.12)";
  if (s === "Owner Occupied") return "rgba(129,140,248,0.12)";
  return "rgba(148,163,184,0.12)";
};

function StatCard({ label, value, sub, accent }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.04)",
      border: `1px solid rgba(255,255,255,0.08)`,
      borderTop: `3px solid ${accent || "#c8a96e"}`,
      borderRadius: 12,
      padding: "20px 24px",
      display: "flex",
      flexDirection: "column",
      gap: 4,
    }}>
      <div style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", letterSpacing: "0.12em", textTransform: "uppercase", color: "#94a3b8" }}>{label}</div>
      <div style={{ fontSize: 32, fontWeight: 700, fontFamily: "'Playfair Display', serif", color: "#f1f0ee", lineHeight: 1.1 }}>{value ?? "—"}</div>
      {sub && <div style={{ fontSize: 12, color: "#64748b", fontFamily: "'DM Mono', monospace" }}>{sub}</div>}
    </div>
  );
}

function EditableSnapshot({ snap, onSave }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...snap });

  const field = (key, label, type = "number") => (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <label style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#64748b", fontFamily: "'DM Mono', monospace" }}>{label}</label>
      <input
        type={type}
        value={form[key] ?? ""}
        onChange={e => setForm(f => ({ ...f, [key]: type === "number" ? (e.target.value === "" ? null : parseFloat(e.target.value)) : e.target.value }))}
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(200,169,110,0.3)",
          borderRadius: 6,
          padding: "8px 10px",
          color: "#f1f0ee",
          fontSize: 14,
          fontFamily: "'DM Mono', monospace",
          outline: "none",
          width: "100%",
          boxSizing: "border-box",
        }}
      />
    </div>
  );

  if (!editing) return (
    <button onClick={() => setEditing(true)} style={{
      background: "rgba(200,169,110,0.15)",
      border: "1px solid rgba(200,169,110,0.4)",
      borderRadius: 8,
      padding: "8px 18px",
      color: "#c8a96e",
      fontSize: 12,
      fontFamily: "'DM Mono', monospace",
      letterSpacing: "0.08em",
      cursor: "pointer",
    }}>+ Log This Week</button>
  );

  return (
    <div style={{
      background: "rgba(200,169,110,0.06)",
      border: "1px solid rgba(200,169,110,0.2)",
      borderRadius: 12,
      padding: 24,
      marginTop: 16,
    }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: "#c8a96e", marginBottom: 16 }}>Log Weekly Snapshot</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
        {field("date", "Week of", "text")}
        {field("totalMidterms", "Total Midterms")}
        {field("occupied", "Occupied Units")}
        {field("activeVacant", "Active Vacant")}
        {field("notActive", "Not Active")}
        {field("upcomingMoveIns", "Upcoming Move-ins")}
        {field("weeklyOccupancy", "Weekly Occupancy %")}
        {field("monthlyAvgOccupancy", "Monthly Avg Occ %")}
        {field("avgRent", "Avg Rent $")}
      </div>
      <div style={{ marginTop: 12 }}>
        <label style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#64748b", fontFamily: "'DM Mono', monospace" }}>Notes</label>
        <textarea
          value={form.notes ?? ""}
          onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
          rows={2}
          style={{ width: "100%", boxSizing: "border-box", marginTop: 4, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(200,169,110,0.3)", borderRadius: 6, padding: "8px 10px", color: "#f1f0ee", fontSize: 13, fontFamily: "'DM Mono', monospace", resize: "vertical", outline: "none" }}
        />
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
        <button onClick={() => { onSave(form); setEditing(false); }} style={{ background: "#c8a96e", border: "none", borderRadius: 8, padding: "9px 22px", color: "#1a1612", fontWeight: 700, fontSize: 13, fontFamily: "'DM Mono', monospace", cursor: "pointer" }}>Save Snapshot</button>
        <button onClick={() => setEditing(false)} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, padding: "9px 22px", color: "#94a3b8", fontSize: 13, fontFamily: "'DM Mono', monospace", cursor: "pointer" }}>Cancel</button>
      </div>
    </div>
  );
}

export default function MTRDashboard() {
  const [tab, setTab] = useState("Overview");
  const [snapshots, setSnapshots] = useState([defaultSnapshot, historicalSnapshot]);
  const [properties, setProperties] = useState(defaultProperties);
  const [filterStatus, setFilterStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [editingPropertyId, setEditingPropertyId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [benchmarks, setBenchmarks] = useState(benchmarkData);
  const [editingBenchmark, setEditingBenchmark] = useState(false);
  const [bmForm, setBmForm] = useState({ year: "2026", month: 2, revenue: "", revenuePerUnit: "", occupancy: "", portfolio: "", avgRent: "" });

  useEffect(() => {
    try {
      const stored = window.storage && window.storage.get ? null : null; // use state only
    } catch {}
  }, []);

  const latest = snapshots[0];
  const prev = snapshots[1];

  const delta = (key) => {
    if (prev?.[key] == null || latest?.[key] == null) return null;
    const d = latest[key] - prev[key];
    return d === 0 ? null : (d > 0 ? `+${d}` : `${d}`);
  };

  const saveSnapshot = (snap) => {
    setSnapshots(prev => [snap, ...prev]);
  };

  const statuses = ["All", "Occupied", "Vacant", "Not Active"];
  const filtered = properties.filter(p => {
    const matchStatus = filterStatus === "All" || p.status === filterStatus;
    const matchSearch = search === "" || p.address.toLowerCase().includes(search.toLowerCase()) || p.owner.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const occupiedCount = properties.filter(p => p.status === "Occupied").length;
  const vacantCount = properties.filter(p => p.status === "Vacant").length;
  const notActiveCount = properties.filter(p => p.status === "Not Active").length;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f0e0c",
      color: "#f1f0ee",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0f0e0c; }
        ::-webkit-scrollbar-thumb { background: #2a2620; border-radius: 3px; }
        input::placeholder { color: #4a4845; }
        select option { background: #1a1814; color: #f1f0ee; }
      `}</style>

      {/* Header */}
      <div style={{
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "20px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(200,169,110,0.03)",
      }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: "#c8a96e", letterSpacing: "-0.01em" }}>MTR Portfolio</div>
          <div style={{ fontSize: 11, color: "#4a4845", fontFamily: "'DM Mono', monospace", letterSpacing: "0.12em", marginTop: 2 }}>MIDTERM RENTAL MANAGEMENT DASHBOARD</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#64748b" }}>Week of</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: "#c8a96e" }}>{latest.date}</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ padding: "0 32px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: 0 }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            background: "none",
            border: "none",
            borderBottom: tab === t ? "2px solid #c8a96e" : "2px solid transparent",
            color: tab === t ? "#c8a96e" : "#64748b",
            padding: "14px 20px",
            fontSize: 13,
            fontFamily: "'DM Mono', monospace",
            letterSpacing: "0.08em",
            cursor: "pointer",
            transition: "all 0.2s",
          }}>{t.toUpperCase()}</button>
        ))}
      </div>

      <div style={{ padding: "28px 32px", maxWidth: 1300, margin: "0 auto" }}>

        {/* OVERVIEW TAB */}
        {tab === "Overview" && (
          <div>
            {/* KPI Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14, marginBottom: 28 }}>
              <StatCard label="Total Midterms" value={latest.totalMidterms} sub={delta("totalMidterms") ? `${delta("totalMidterms")} from last week` : "vs last week"} accent="#c8a96e" />
              <StatCard label="Occupied Units" value={latest.occupied} sub={delta("occupied") ? `${delta("occupied")} from last week` : ""} accent="#22c55e" />
              <StatCard label="Active Vacant" value={latest.activeVacant} sub="ready to fill" accent="#f59e0b" />
              <StatCard label="Not Active" value={latest.notActive} sub={delta("notActive") ? `${delta("notActive")} from last week` : ""} accent="#6b7280" />
              <StatCard label="Move-ins This Week" value={latest.upcomingMoveIns} sub={delta("upcomingMoveIns") ? `${delta("upcomingMoveIns")} from last week` : ""} accent="#818cf8" />
              <StatCard label="Weekly Occupancy" value={latest.weeklyOccupancy != null ? `${latest.weeklyOccupancy}%` : "—"} sub={prev?.weeklyOccupancy != null ? `prev: ${prev.weeklyOccupancy}%` : ""} accent="#c8a96e" />
              <StatCard label="Monthly Avg Occ." value={latest.monthlyAvgOccupancy != null ? `${latest.monthlyAvgOccupancy}%` : "—"} sub={prev?.monthlyAvgOccupancy != null ? `prev: ${prev.monthlyAvgOccupancy}%` : ""} accent="#c8a96e" />
              <StatCard label="Avg Rent / Month" value={latest.avgRent != null ? `$${latest.avgRent.toLocaleString()}` : "—"} accent="#22c55e" />
            </div>

            {/* Occupancy Bar */}
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "20px 24px", marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: "#c8a96e" }}>Portfolio Breakdown</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#4a4845" }}>{properties.length} TOTAL PROPERTIES</div>
              </div>
              <div style={{ display: "flex", height: 12, borderRadius: 6, overflow: "hidden", gap: 2 }}>
                <div style={{ flex: occupiedCount, background: "#22c55e", borderRadius: "6px 0 0 6px" }} title={`Occupied: ${occupiedCount}`} />
                <div style={{ flex: vacantCount, background: "#f59e0b" }} title={`Vacant: ${vacantCount}`} />
                <div style={{ flex: notActiveCount, background: "#4b5563", borderRadius: "0 6px 6px 0" }} title={`Not Active: ${notActiveCount}`} />
              </div>
              <div style={{ display: "flex", gap: 20, marginTop: 10 }}>
                {[["#22c55e", `Occupied (${occupiedCount})`], ["#f59e0b", `Vacant (${vacantCount})`], ["#4b5563", `Not Active / Other (${notActiveCount})`]].map(([c, l]) => (
                  <div key={l} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#64748b", fontFamily: "'DM Mono', monospace" }}>
                    <div style={{ width: 8, height: 8, borderRadius: 2, background: c }} />{l}
                  </div>
                ))}
              </div>
            </div>

            {/* Vacants Alert */}
            {vacantCount > 0 && (
              <div style={{ background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 12, padding: "16px 20px", marginBottom: 20 }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.1em", color: "#f59e0b", marginBottom: 8 }}>⚠ VACANTS TO FILL ({properties.filter(p => p.status === "Vacant" && !p.booked).length})</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {properties.filter(p => p.status === "Vacant" && !p.booked).map(p => (
                    <span key={p.id} style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.25)", borderRadius: 6, padding: "4px 10px", fontSize: 12, color: "#fbbf24", fontFamily: "'DM Mono', monospace" }}>
                      {p.address.split(" ").slice(0, 4).join(" ")}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Vacant but Booked */}
            {properties.filter(p => p.status === "Vacant" && p.booked).length > 0 && (
              <div style={{ background: "rgba(129,140,248,0.06)", border: "1px solid rgba(129,140,248,0.18)", borderRadius: 12, padding: "16px 20px", marginBottom: 20 }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.1em", color: "#818cf8", marginBottom: 8 }}>✓ VACANT BUT RENTED — MOVE-IN PENDING ({properties.filter(p => p.status === "Vacant" && p.booked).length})</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {properties.filter(p => p.status === "Vacant" && p.booked).map(p => (
                    <span key={p.id} style={{ background: "rgba(129,140,248,0.1)", border: "1px solid rgba(129,140,248,0.25)", borderRadius: 6, padding: "4px 10px", fontSize: 12, color: "#a5b4fc", fontFamily: "'DM Mono', monospace" }}>
                      {p.address.split(" ").slice(0, 4).join(" ")}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Log new week */}
            <EditableSnapshot snap={{ ...latest, date: "" }} onSave={saveSnapshot} />
          </div>
        )}

        {/* PROPERTIES TAB */}
        {tab === "Properties" && (
          <div>
            <div style={{ display: "flex", gap: 12, marginBottom: 18, flexWrap: "wrap", alignItems: "center" }}>
              <input
                placeholder="Search address or owner..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "9px 14px", color: "#f1f0ee", fontSize: 13, fontFamily: "'DM Mono', monospace", outline: "none", minWidth: 240 }}
              />
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {statuses.map(s => (
                  <button key={s} onClick={() => setFilterStatus(s)} style={{
                    background: filterStatus === s ? (s === "Occupied" ? "#22c55e" : s === "Vacant" ? "#f59e0b" : s === "Not Active" ? "#4b5563" : "#c8a96e") : "rgba(255,255,255,0.05)",
                    border: "none",
                    borderRadius: 6,
                    padding: "7px 14px",
                    color: filterStatus === s ? "#0f0e0c" : "#64748b",
                    fontSize: 11,
                    fontFamily: "'DM Mono', monospace",
                    letterSpacing: "0.07em",
                    cursor: "pointer",
                    fontWeight: filterStatus === s ? 700 : 400,
                  }}>{s.toUpperCase()} {s === "All" ? `(${properties.length})` : `(${properties.filter(p => p.status === s).length})`}</button>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {/* Column Headers */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "2fr 1.4fr 1fr 1fr 1.2fr 0.6fr 28px",
                gap: 8,
                padding: "6px 18px",
                marginBottom: 2,
              }}>
                {["Address / Owner", "Status / Dates", "Rent", "Platform", "FF Renewal", "Fee", ""].map(h => (
                  <div key={h} style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em", color: "#3a3836", textTransform: "uppercase" }}>{h}</div>
                ))}
              </div>
              {filtered.map(p => {
                const isEditing = editingPropertyId === p.id;
                return (
                  <div key={p.id}>
                    <div style={{
                      background: isEditing ? "rgba(200,169,110,0.07)" : "rgba(255,255,255,0.025)",
                      border: isEditing ? "1px solid rgba(200,169,110,0.3)" : "1px solid rgba(255,255,255,0.06)",
                      borderLeft: `3px solid ${statusColor(p.status)}`,
                      borderRadius: isEditing ? "8px 8px 0 0" : 8,
                      padding: "12px 18px",
                      display: "grid",
                      gridTemplateColumns: "2fr 1.4fr 1fr 1fr 1.2fr 0.6fr 28px",
                      gap: 8,
                      alignItems: "center",
                    }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 500, color: "#e2e0dc" }}>{p.address}</div>
                        <div style={{ fontSize: 11, color: "#4a4845", fontFamily: "'DM Mono', monospace" }}>{p.owner}</div>
                      </div>
                      <div>
                        <span style={{ background: statusBg(p.status), color: statusColor(p.status), fontSize: 10, fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em", padding: "3px 8px", borderRadius: 4, fontWeight: 600 }}>{p.status.toUpperCase()}</span>
                        {p.dates && <div style={{ fontSize: 11, color: "#64748b", fontFamily: "'DM Mono', monospace", marginTop: 4 }}>{p.dates}</div>}
                        {p.booked && <div style={{ fontSize: 10, color: "#a5b4fc", fontFamily: "'DM Mono', monospace", marginTop: 2 }}>move-in pending</div>}
                      </div>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: p.rent ? "#f1f0ee" : "#4a4845" }}>
                        {p.rent ? `$${p.rent.toLocaleString()}` : "—"}
                      </div>
                      <div style={{ fontSize: 11, color: "#64748b", fontFamily: "'DM Mono', monospace" }}>{p.platform}</div>
                      <div style={{ fontSize: 11, color: "#64748b", fontFamily: "'DM Mono', monospace" }}>{p.renewal}</div>
                      <div style={{ fontSize: 11, color: "#c8a96e", fontFamily: "'DM Mono', monospace" }}>{p.fee}</div>
                      <button
                        onClick={() => {
                          if (isEditing) { setEditingPropertyId(null); }
                          else {
                            setEditingPropertyId(p.id);
                            // Build stays array from existing data
                            const existingDates = (p.dates || "").split("|").map(s => s.trim()).filter(Boolean);
                            const stays = existingDates.length > 0
                              ? existingDates.map((d, i) => ({ dates: d, rent: i === 0 ? (p.rent || "") : "", platform: i === 0 ? (p.platform || "") : "" }))
                              : [{ dates: "", rent: p.rent || "", platform: p.platform || "" }];
                            setEditForm({ status: p.status, renewal: p.renewal, fee: p.fee, booked: p.booked || false, stays });
                          }
                        }}
                        title={isEditing ? "Close" : "Edit property"}
                        style={{ background: "none", border: "none", cursor: "pointer", color: isEditing ? "#c8a96e" : "#3a3836", fontSize: 14, padding: 2, lineHeight: 1, transition: "color 0.2s" }}
                      >{isEditing ? "✕" : "✎"}</button>
                    </div>

                    {isEditing && (
                      <div style={{
                        background: "rgba(200,169,110,0.05)",
                        border: "1px solid rgba(200,169,110,0.3)",
                        borderTop: "none",
                        borderRadius: "0 0 8px 8px",
                        padding: "16px 18px 18px",
                      }}>
                        {/* Property-level fields */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 10, marginBottom: 18 }}>
                          {[
                            ["status", "Status"],
                            ["renewal", "FF Renewal"],
                            ["fee", "Mgmt Fee"],
                          ].map(([key, label]) => (
                            <div key={key} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                              <label style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#64748b", fontFamily: "'DM Mono', monospace" }}>{label}</label>
                              <input
                                type="text"
                                value={editForm[key] ?? ""}
                                onChange={e => setEditForm(f => ({ ...f, [key]: e.target.value }))}
                                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(200,169,110,0.25)", borderRadius: 6, padding: "7px 10px", color: "#f1f0ee", fontSize: 13, fontFamily: "'DM Mono', monospace", outline: "none", width: "100%", boxSizing: "border-box" }}
                              />
                            </div>
                          ))}
                          <div style={{ display: "flex", flexDirection: "column", gap: 4, justifyContent: "flex-end" }}>
                            <label style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#64748b", fontFamily: "'DM Mono', monospace" }}>Move-in Pending</label>
                            <button
                              onClick={() => setEditForm(f => ({ ...f, booked: !f.booked }))}
                              style={{ background: editForm.booked ? "rgba(129,140,248,0.2)" : "rgba(255,255,255,0.05)", border: `1px solid ${editForm.booked ? "rgba(129,140,248,0.4)" : "rgba(255,255,255,0.1)"}`, borderRadius: 6, padding: "7px 10px", color: editForm.booked ? "#a5b4fc" : "#4a4845", fontSize: 12, fontFamily: "'DM Mono', monospace", cursor: "pointer", textAlign: "left" }}
                            >{editForm.booked ? "✓ Yes" : "No"}</button>
                          </div>
                        </div>

                        {/* Stays section */}
                        <div style={{ marginBottom: 14 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                            <div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#c8a96e", fontFamily: "'DM Mono', monospace" }}>Stays</div>
                            <button
                              onClick={() => setEditForm(f => ({ ...f, stays: [...(f.stays || []), { dates: "", rent: "", platform: "" }] }))}
                              style={{ background: "rgba(200,169,110,0.12)", border: "1px solid rgba(200,169,110,0.3)", borderRadius: 5, padding: "4px 10px", color: "#c8a96e", fontSize: 11, fontFamily: "'DM Mono', monospace", cursor: "pointer" }}
                            >+ Add Stay</button>
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            {/* Stay column headers */}
                            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 24px", gap: 8, padding: "0 4px" }}>
                              {["Dates", "Rent ($/mo)", "Platform", ""].map(h => (
                                <div key={h} style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "#3a3836", fontFamily: "'DM Mono', monospace" }}>{h}</div>
                              ))}
                            </div>
                            {(editForm.stays || []).map((stay, si) => (
                              <div key={si} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 24px", gap: 8, alignItems: "center", background: "rgba(255,255,255,0.03)", borderRadius: 6, padding: "8px" }}>
                                <input
                                  type="text"
                                  placeholder="e.g. Mar 1 – May 31"
                                  value={stay.dates}
                                  onChange={e => setEditForm(f => ({ ...f, stays: f.stays.map((s, i) => i === si ? { ...s, dates: e.target.value } : s) }))}
                                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(200,169,110,0.2)", borderRadius: 5, padding: "6px 8px", color: "#f1f0ee", fontSize: 12, fontFamily: "'DM Mono', monospace", outline: "none", width: "100%", boxSizing: "border-box" }}
                                />
                                <input
                                  type="number"
                                  placeholder="e.g. 2000"
                                  value={stay.rent}
                                  onChange={e => setEditForm(f => ({ ...f, stays: f.stays.map((s, i) => i === si ? { ...s, rent: e.target.value } : s) }))}
                                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(200,169,110,0.2)", borderRadius: 5, padding: "6px 8px", color: "#f1f0ee", fontSize: 12, fontFamily: "'DM Mono', monospace", outline: "none", width: "100%", boxSizing: "border-box" }}
                                />
                                <input
                                  type="text"
                                  placeholder="FF/AF, Airbnb…"
                                  value={stay.platform}
                                  onChange={e => setEditForm(f => ({ ...f, stays: f.stays.map((s, i) => i === si ? { ...s, platform: e.target.value } : s) }))}
                                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(200,169,110,0.2)", borderRadius: 5, padding: "6px 8px", color: "#f1f0ee", fontSize: 12, fontFamily: "'DM Mono', monospace", outline: "none", width: "100%", boxSizing: "border-box" }}
                                />
                                <button
                                  onClick={() => setEditForm(f => ({ ...f, stays: f.stays.filter((_, i) => i !== si) }))}
                                  disabled={editForm.stays.length === 1}
                                  style={{ background: "none", border: "none", color: editForm.stays.length === 1 ? "#2a2826" : "#6b7280", cursor: editForm.stays.length === 1 ? "default" : "pointer", fontSize: 13, padding: 0, lineHeight: 1 }}
                                >✕</button>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div style={{ display: "flex", gap: 8 }}>
                          <button
                            onClick={() => {
                              const stays = editForm.stays || [];
                              const primary = stays[0] || {};
                              const updatedProp = {
                                status: editForm.status,
                                renewal: editForm.renewal,
                                fee: editForm.fee,
                                booked: editForm.booked,
                                rent: primary.rent ? parseFloat(primary.rent) : null,
                                platform: stays.map(s => s.platform).filter(Boolean).join(" / ") || "—",
                                dates: stays.map(s => s.dates).filter(Boolean).join(" | ") || null,
                              };
                              setProperties(prev => prev.map(prop => prop.id === p.id ? { ...prop, ...updatedProp } : prop));
                              setEditingPropertyId(null);
                            }}
                            style={{ background: "#c8a96e", border: "none", borderRadius: 7, padding: "8px 20px", color: "#1a1612", fontWeight: 700, fontSize: 12, fontFamily: "'DM Mono', monospace", cursor: "pointer" }}
                          >Save Changes</button>
                          <button
                            onClick={() => setEditingPropertyId(null)}
                            style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 7, padding: "8px 16px", color: "#64748b", fontSize: 12, fontFamily: "'DM Mono', monospace", cursor: "pointer" }}
                          >Cancel</button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: 10, fontSize: 11, color: "#3a3836", fontFamily: "'DM Mono', monospace", textAlign: "right" }}>
              Showing {filtered.length} of {properties.length} active properties
            </div>

            {/* Offboarded Section */}
            <div style={{ marginTop: 36 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: "#4a4845" }}>Offboarded Properties</div>
                <div style={{ height: 1, flex: 1, background: "rgba(255,255,255,0.05)" }} />
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#3a3836", letterSpacing: "0.1em" }}>{offboardedProperties.length} TOTAL</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {/* Offboarded Column Headers */}
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 2fr 1fr", gap: 8, padding: "4px 16px" }}>
                  {["Address / Owner", "Managed", "Reason", ""].map(h => (
                    <div key={h} style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em", color: "#2e2c2a", textTransform: "uppercase" }}>{h}</div>
                  ))}
                </div>
                {offboardedProperties.map(p => (
                  <div key={p.id} style={{
                    background: "rgba(255,255,255,0.015)",
                    border: "1px solid rgba(255,255,255,0.04)",
                    borderLeft: "3px solid #2a2826",
                    borderRadius: 8,
                    padding: "10px 16px",
                    display: "grid",
                    gridTemplateColumns: "2fr 1.5fr 2fr 1fr",
                    gap: 8,
                    alignItems: "center",
                    opacity: 0.7,
                  }}>
                    <div>
                      <div style={{ fontSize: 13, color: "#6b6966", fontWeight: 500 }}>{p.address}</div>
                      <div style={{ fontSize: 11, color: "#3a3836", fontFamily: "'DM Mono', monospace" }}>{p.owner}</div>
                    </div>
                    <div style={{ fontSize: 11, color: "#4a4845", fontFamily: "'DM Mono', monospace" }}>{p.dates}</div>
                    <div style={{ fontSize: 11, color: "#4a4845", fontFamily: "'DM Mono', monospace" }}>{p.reason}</div>
                    <div>
                      <span style={{ background: "rgba(255,255,255,0.04)", color: "#3a3836", fontSize: 10, fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em", padding: "3px 8px", borderRadius: 4 }}>OFFBOARDED</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* BENCHMARKS TAB */}
        {tab === "Benchmarks" && (() => {
          const BAR_H = 120;
          const years = { 2024: "#3a3530", 2025: "#c8a96e", 2026: "#22c55e" };

          const BarChart = ({ data, label, format, goal }) => {
            const allVals = Object.values(data).flat().filter(v => v != null);
            const max = Math.max(...allVals, goal || 0) * 1.1;
            return (
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "20px 20px 12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, color: "#c8a96e" }}>{label}</div>
                  <div style={{ display: "flex", gap: 12 }}>
                    {Object.keys(data).filter(y => y !== "goal").map(y => (
                      <div key={y} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, color: "#64748b", fontFamily: "'DM Mono', monospace" }}>
                        <div style={{ width: 8, height: 8, borderRadius: 2, background: years[y] || "#818cf8" }} />{y}
                      </div>
                    ))}
                    {goal && <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, color: "#64748b", fontFamily: "'DM Mono', monospace" }}>
                      <div style={{ width: 14, height: 2, background: "#ef4444" }} />Goal
                    </div>}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 3, alignItems: "flex-end", height: BAR_H, position: "relative" }}>
                  {goal && <div style={{ position: "absolute", left: 0, right: 0, bottom: `${(goal/max)*BAR_H}px`, borderTop: "1px dashed rgba(239,68,68,0.4)", zIndex: 1 }} />}
                  {MONTHS.map((m, i) => (
                    <div key={m} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 1, height: "100%", justifyContent: "flex-end" }}>
                      <div style={{ display: "flex", gap: 1, alignItems: "flex-end", width: "100%" }}>
                        {Object.entries(data).filter(([y]) => y !== "goal").map(([y, vals]) => vals[i] != null && (
                          <div key={y} title={`${y} ${m}: ${format(vals[i])}`} style={{
                            flex: 1, borderRadius: "2px 2px 0 0",
                            height: `${(vals[i]/max)*BAR_H}px`,
                            background: years[y] || "#818cf8",
                            transition: "opacity 0.2s",
                            cursor: "default",
                            minWidth: 2,
                          }} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 3, marginTop: 4 }}>
                  {MONTHS.map(m => (
                    <div key={m} style={{ flex: 1, textAlign: "center", fontSize: 9, color: "#3a3836", fontFamily: "'DM Mono', monospace" }}>{m}</div>
                  ))}
                </div>
              </div>
            );
          };

          const rev25 = benchmarks.revenue[2025].filter(v => v != null);
          const totalRev25 = rev25.reduce((a,b) => a+b, 0);
          const rev26so = benchmarks.revenue[2026].filter(v => v != null);
          const totalRev26so = rev26so.reduce((a,b) => a+b, 0);
          const occ25 = benchmarks.occupancy[2025].filter(v => v != null);
          const avgOcc25 = occ25.reduce((a,b)=>a+b,0)/occ25.length;
          const occ26 = benchmarks.occupancy[2026].filter(v => v != null);
          const avgOcc26 = occ26.reduce((a,b)=>a+b,0)/occ26.length;
          const rpu25 = benchmarks.revenuePerUnit[2025].filter(v => v != null);
          const avgRpu25 = rpu25.reduce((a,b)=>a+b,0)/rpu25.length;
          const rpu26 = benchmarks.revenuePerUnit[2026].filter(v => v != null);
          const avgRpu26 = rpu26.reduce((a,b)=>a+b,0)/rpu26.length;
          const port26 = benchmarks.portfolio[2026].filter(v => v != null);
          const latestPortfolio = port26.length ? port26[port26.length-1] : benchmarks.portfolio[2025].filter(v=>v!=null).slice(-1)[0];

          const saveBenchmark = () => {
            const y = parseInt(bmForm.year);
            const mi = parseInt(bmForm.month);
            const parse = v => v === "" || v == null ? null : parseFloat(v);
            setBenchmarks(prev => {
              const next = JSON.parse(JSON.stringify(prev));
              const set = (metric, val) => {
                if (val == null) return;
                if (!next[metric][y]) next[metric][y] = Array(12).fill(null);
                next[metric][y][mi] = val;
              };
              set("revenue", parse(bmForm.revenue));
              set("revenuePerUnit", parse(bmForm.revenuePerUnit));
              set("occupancy", parse(bmForm.occupancy));
              set("portfolio", parse(bmForm.portfolio));
              set("avgRent", parse(bmForm.avgRent));
              return next;
            });
            setEditingBenchmark(false);
          };

          const inputStyle = { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(200,169,110,0.25)", borderRadius: 6, padding: "7px 10px", color: "#f1f0ee", fontSize: 13, fontFamily: "'DM Mono', monospace", outline: "none", width: "100%", boxSizing: "border-box" };

          return (
            <div>
              {/* Header row with pencil */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "#c8a96e" }}>Monthly Benchmarks</div>
                <button
                  onClick={() => setEditingBenchmark(v => !v)}
                  style={{ background: editingBenchmark ? "rgba(200,169,110,0.2)" : "none", border: "1px solid rgba(200,169,110,0.3)", borderRadius: 7, padding: "7px 14px", color: "#c8a96e", fontSize: 13, fontFamily: "'DM Mono', monospace", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
                >{editingBenchmark ? "✕ Close" : "✎ Log Month"}</button>
              </div>

              {/* Inline log form */}
              {editingBenchmark && (
                <div style={{ background: "rgba(200,169,110,0.05)", border: "1px solid rgba(200,169,110,0.25)", borderRadius: 12, padding: "20px", marginBottom: 22 }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: "#c8a96e", marginBottom: 14 }}>Log Monthly Data</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(155px, 1fr))", gap: 10, marginBottom: 14 }}>
                    {/* Year */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      <label style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#64748b", fontFamily: "'DM Mono', monospace" }}>Year</label>
                      <select value={bmForm.year} onChange={e => setBmForm(f=>({...f, year: e.target.value}))} style={{ ...inputStyle }}>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                      </select>
                    </div>
                    {/* Month */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      <label style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#64748b", fontFamily: "'DM Mono', monospace" }}>Month</label>
                      <select value={bmForm.month} onChange={e => setBmForm(f=>({...f, month: parseInt(e.target.value)}))} style={{ ...inputStyle }}>
                        {MONTHS.map((m,i) => <option key={m} value={i}>{m}</option>)}
                      </select>
                    </div>
                    {[
                      ["revenue", "Total Revenue ($)"],
                      ["revenuePerUnit", "Revenue / Unit ($)"],
                      ["occupancy", "Occupancy Rate (%)"],
                      ["portfolio", "Properties in Portfolio"],
                      ["avgRent", "Avg Market Rent ($)"],
                    ].map(([key, label]) => (
                      <div key={key} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        <label style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#64748b", fontFamily: "'DM Mono', monospace" }}>{label}</label>
                        <input
                          type="number"
                          placeholder="leave blank to skip"
                          value={bmForm[key]}
                          onChange={e => setBmForm(f => ({ ...f, [key]: e.target.value }))}
                          style={{ ...inputStyle }}
                        />
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={saveBenchmark} style={{ background: "#c8a96e", border: "none", borderRadius: 7, padding: "8px 22px", color: "#1a1612", fontWeight: 700, fontSize: 12, fontFamily: "'DM Mono', monospace", cursor: "pointer" }}>Save</button>
                    <button onClick={() => setEditingBenchmark(false)} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 7, padding: "8px 16px", color: "#64748b", fontSize: 12, fontFamily: "'DM Mono', monospace", cursor: "pointer" }}>Cancel</button>
                  </div>
                </div>
              )}

              {/* Summary KPIs */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: 12, marginBottom: 24 }}>
                {[
                  ["2025 Total Revenue", `$${totalRev25.toLocaleString(undefined,{maximumFractionDigits:0})}`, "full year"],
                  ["2026 Revenue (YTD)", `$${totalRev26so.toLocaleString(undefined,{maximumFractionDigits:0})}`, `${MONTHS[rev26so.length-1]} YTD`],
                  ["2025 Avg Occupancy", `${avgOcc25.toFixed(1)}%`, "monthly avg"],
                  ["2026 Avg Occupancy", `${avgOcc26.toFixed(1)}%`, `${MONTHS[occ26.length-1]} avg`],
                  ["2025 Avg Rev/Unit", `$${avgRpu25.toFixed(0)}`, "goal: $400"],
                  ["2026 Avg Rev/Unit", `$${avgRpu26.toFixed(0)}`, `${MONTHS[rpu26.length-1]} avg`],
                  ["Portfolio Peak", "38", "Dec 2025"],
                  ["Current Portfolio", `${latestPortfolio}`, "latest"],
                ].map(([l,v,s]) => (
                  <div key={l} style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderTop:"3px solid #c8a96e", borderRadius:10, padding:"16px 18px" }}>
                    <div style={{ fontSize:10, fontFamily:"'DM Mono', monospace", letterSpacing:"0.1em", textTransform:"uppercase", color:"#4a4845", marginBottom:4 }}>{l}</div>
                    <div style={{ fontSize:26, fontWeight:700, fontFamily:"'Playfair Display', serif", color:"#f1f0ee", lineHeight:1 }}>{v}</div>
                    <div style={{ fontSize:11, color:"#3a3836", fontFamily:"'DM Mono', monospace", marginTop:4 }}>{s}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                <BarChart data={benchmarks.revenue} label="Monthly Revenue" format={v => `$${v.toLocaleString(undefined,{maximumFractionDigits:0})}`} />
                <BarChart data={benchmarks.occupancy} label="Occupancy Rate (%)" format={v => `${v}%`} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <BarChart data={benchmarks.revenuePerUnit} label="Avg Revenue per Unit" format={v => `$${v.toFixed(0)}`} goal={400} />
                <BarChart data={benchmarks.portfolio} label="Properties in Portfolio" format={v => `${v}`} />
              </div>

              {/* Avg Market Rent Table */}
              <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:12, padding:"20px", marginTop:14 }}>
                <div style={{ fontFamily:"'Playfair Display', serif", fontSize:15, color:"#c8a96e", marginBottom:14 }}>Average Market Rents</div>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width:"100%", borderCollapse:"collapse", fontFamily:"'DM Mono', monospace", fontSize:11 }}>
                    <thead>
                      <tr>
                        <td style={{ color:"#3a3836", padding:"4px 8px", letterSpacing:"0.08em" }}>YEAR</td>
                        {MONTHS.map(m => <td key={m} style={{ color:"#3a3836", padding:"4px 6px", textAlign:"center", letterSpacing:"0.08em" }}>{m.toUpperCase()}</td>)}
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(benchmarks.avgRent).map(y => (
                        <tr key={y}>
                          <td style={{ color: years[y] || "#94a3b8", padding:"6px 8px", fontWeight:600 }}>{y}</td>
                          {benchmarks.avgRent[y].map((v,i) => (
                            <td key={i} style={{ color: v ? "#c8c5bf" : "#2a2826", padding:"6px 6px", textAlign:"center", background: v ? "rgba(255,255,255,0.02)" : "transparent" }}>
                              {v ? `$${v.toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        })()}

        {/* HISTORY TAB */}
        {tab === "History" && (
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "#c8a96e", marginBottom: 20 }}>Weekly Snapshot History</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {snapshots.map((s, i) => (
                <div key={i} style={{
                  background: i === 0 ? "rgba(200,169,110,0.07)" : "rgba(255,255,255,0.025)",
                  border: `1px solid ${i === 0 ? "rgba(200,169,110,0.25)" : "rgba(255,255,255,0.06)"}`,
                  borderRadius: 12,
                  padding: "18px 22px",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <div>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, color: i === 0 ? "#c8a96e" : "#94a3b8" }}>Week of {s.date}</div>
                      {i === 0 && <div style={{ fontSize: 10, color: "#c8a96e", fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em", marginTop: 2 }}>LATEST</div>}
                    </div>
                    {s.weeklyOccupancy != null && (
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: s.weeklyOccupancy >= 80 ? "#22c55e" : "#f59e0b" }}>{s.weeklyOccupancy}%</div>
                    )}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 10 }}>
                    {[
                      ["Total", s.totalMidterms],
                      ["Occupied", s.occupied],
                      ["Vacant", s.activeVacant],
                      ["Not Active", s.notActive],
                      ["Move-ins", s.upcomingMoveIns],
                      ["Monthly Avg", s.monthlyAvgOccupancy != null ? `${s.monthlyAvgOccupancy}%` : null],
                      ["Avg Rent", s.avgRent != null ? `$${s.avgRent.toLocaleString()}` : null],
                    ].map(([label, val]) => val != null && (
                      <div key={label} style={{ fontFamily: "'DM Mono', monospace" }}>
                        <div style={{ fontSize: 10, color: "#4a4845", letterSpacing: "0.1em" }}>{label.toUpperCase()}</div>
                        <div style={{ fontSize: 16, color: "#c8c5bf", marginTop: 2 }}>{val}</div>
                      </div>
                    ))}
                  </div>
                  {s.notes && <div style={{ marginTop: 10, fontSize: 12, color: "#64748b", fontFamily: "'DM Mono', monospace", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 10 }}>{s.notes}</div>}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 20 }}>
              <EditableSnapshot snap={{ date: "", totalMidterms: null, occupied: null, activeVacant: null, notActive: null, upcomingMoveIns: null, weeklyOccupancy: null, monthlyAvgOccupancy: null, avgRent: null, notes: "" }} onSave={saveSnapshot} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
