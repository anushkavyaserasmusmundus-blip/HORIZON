export default function HealthCard({ icon, title, value, unit, status }) {
  return (
    <div className="rounded-3xl border border-[#F2D5A5] bg-white p-2.5 text-center shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-3xl bg-[#FFF8EF] text-xl">
        {icon}
      </div>
      <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#C84D38]">{title}</p>
      <p className="mt-1 text-xl font-semibold text-[#2D4C59]">{value}{unit}</p>
      <p className="mt-1 text-[11px] text-[#5E6F78]">{status}</p>
    </div>
  );
}
