import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import ProfileForm from "../components/dashboard/widgets/Personal/ProfileForm";
import SkillMatrix from "../components/dashboard/widgets/Personal/SkillMatrix";
import JournalWidget from "../components/dashboard/widgets/JournalWidget";

export default function Profile() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#skill-matrix") {
      const element = document.getElementById("skill-matrix");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location]);

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-[1000px] py-6 space-y-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#C84D38]">Profile</p>
          <h1 className="mt-3 text-2xl font-semibold text-[#2D4C59]">Detailed Profile</h1>
          <p className="mt-2 max-w-2xl text-sm text-[#5E6F78]">Deep dive into your profile, experience, and personal progress.</p>
        </div>

        <ProfileForm />

        <div id="skill-matrix">
          <h2 className="text-lg font-semibold text-[#2D4C59]">Skill Matrix</h2>
          <div className="mt-3 max-w-xl">
            <SkillMatrix showAll={true} allowEdit={true} />
          </div>
        </div>

        <JournalWidget />
      </div>
    </DashboardLayout>
  );
}
