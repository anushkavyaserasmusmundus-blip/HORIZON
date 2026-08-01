import DashboardLayout from "../components/layout/DashboardLayout";
import SkillMatrix from "../components/dashboard/widgets/Personal/SkillMatrix";

export default function Skills() {
  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-[1200px] py-6">
        <div className="rounded-3xl border border-[#E8DCCF] bg-white p-6 shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#C84D38]">Skill Matrix</p>
          <h1 className="mt-3 text-2xl font-semibold text-[#2D4C59]">Detailed Skill Matrix</h1>
          <p className="mt-2 max-w-2xl text-sm text-[#5E6F78]">
            A full view of all your skills and progress. Starred skills remain visible on the dashboard.
          </p>
          <div className="mt-5">
            <SkillMatrix showAll={true} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
