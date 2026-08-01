export default function SkillProgress({ name, level }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm text-[#2D4C59]">
        <span>{name}</span>
        <span className="font-semibold text-[#C84D38]">{level}%</span>
      </div>
      <div className="h-2.5 rounded-full bg-[#FBE7CC]">
        <div className="h-2.5 rounded-full bg-[#F4B643]" style={{ width: `${level}%` }} />
      </div>
    </div>
  );
}
