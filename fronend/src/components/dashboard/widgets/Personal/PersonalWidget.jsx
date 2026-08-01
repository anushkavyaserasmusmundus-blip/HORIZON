import ProfileCard from "./ProfileCard";
import SkillMatrix from "./SkillMatrix";
import SocialLinks from "./SocialLinks";

export default function PersonalWidget() {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-[#E8DCCF] bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#C84D38]">Personal Module</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
        <div className="space-y-4">
          <ProfileCard />
          <SocialLinks />
        </div>

        <SkillMatrix />
      </div>
    </div>
  );
}
