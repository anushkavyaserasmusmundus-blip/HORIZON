import { Link } from "react-router-dom";

export default function HealthSummaryButton() {
  return (
    <div className="mt-4 flex justify-end">
      <Link
        to="/health-analysis"
        className="text-[11px] font-semibold text-[#5E6F78] transition hover:text-[#2D4C59]"
      >
        View detailed health analysis →
      </Link>
    </div>
  );
}
