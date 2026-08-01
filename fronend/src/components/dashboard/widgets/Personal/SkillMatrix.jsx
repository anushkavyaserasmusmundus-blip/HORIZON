import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { mockSkills } from "./mockProfile";
import SkillProgress from "./SkillProgress";

export default function SkillMatrix({ showAll = false, allowEdit = false }) {
  const [skills, setSkills] = useState(() => {
    try {
      const saved = localStorage.getItem("profileSkills");
      return saved ? JSON.parse(saved) : mockSkills;
    } catch (e) {
      return mockSkills;
    }
  });
  const [newSkill, setNewSkill] = useState("");
  const [newLevel, setNewLevel] = useState(60);

  useEffect(() => {
    try {
      localStorage.setItem("profileSkills", JSON.stringify(skills));
    } catch (e) {}
  }, [skills]);

  const starredSkills = useMemo(() => skills.filter((skill) => skill.starred), [skills]);
  const displayedSkills = showAll
    ? skills
    : starredSkills.length >= 5
    ? starredSkills
    : [...starredSkills, ...skills.filter((skill) => !skill.starred).slice(0, 5 - starredSkills.length)];

  function addSkill() {
    if (!newSkill.trim()) return;
    setSkills([{ name: newSkill.trim(), level: Number(newLevel), starred: false }, ...skills]);
    setNewSkill("");
    setNewLevel(60);
  }

  return (
    <div className="rounded-3xl border border-[#F2D5A5] bg-[#FFF8EF] p-4 text-sm">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#C84D38]">Technical Skills</p>

      <div className="mt-4 space-y-3">
        {displayedSkills.length > 0 ? (
          displayedSkills.map((skill) => (
            <SkillProgress key={skill.name} name={skill.name} level={skill.level} />
          ))
        ) : (
          <p className="text-sm text-[#5E6F78]">Only starred skills appear here.</p>
        )}
      </div>

      {allowEdit && (
        <div className="mt-4 rounded-2xl border border-[#E8DCCF] bg-white p-3">
          <div className="grid gap-2 sm:grid-cols-[1.5fr_0.8fr]">
            <input value={newSkill} onChange={(e) => setNewSkill(e.target.value)} placeholder="New skill name" className="rounded-md border border-[#E8DCCF] p-2 text-sm" />
            <input value={newLevel} onChange={(e) => setNewLevel(e.target.value)} type="number" min={10} max={100} className="rounded-md border border-[#E8DCCF] p-2 text-sm" />
          </div>
          <button onClick={addSkill} className="mt-3 w-full rounded-full bg-[#F4B643] px-3 py-2 text-sm font-semibold text-[#2D4C59] hover:bg-[#F3C84E]">
            Add new skill
          </button>
        </div>
      )}

      {!showAll && (
        <div className="mt-4 border-t border-[#F2D5A5] pt-4">
          <Link to="/skills" className="text-[11px] font-semibold text-[#5E6F78] transition hover:text-[#2D4C59]">
            View full skill matrix →
          </Link>
        </div>
      )}
    </div>
  );
}
