import { useContext, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Star, Trash2 } from "lucide-react";
import { AuthContext } from "../../../../context/AuthContext";
import SkillProgress from "./SkillProgress";

export default function SkillMatrix({ showAll = false, allowEdit = false }) {
  const { user, updateUserProfile } = useContext(AuthContext);
  const skills = useMemo(() => (Array.isArray(user?.skills) ? user.skills : []), [user?.skills]);

  const [newSkill, setNewSkill] = useState("");
  const [newLevel, setNewLevel] = useState(60);
  const [saving, setSaving] = useState(false);

  const starredSkills = useMemo(() => skills.filter((skill) => skill.starred), [skills]);
  const displayedSkills = showAll ? skills : starredSkills.length > 0 ? starredSkills : skills.slice(0, 5);

  async function persist(updatedSkills) {
    setSaving(true);
    try {
      await updateUserProfile({ skills: updatedSkills });
    } catch (error) {
      console.error("Failed to save skills:", error);
    } finally {
      setSaving(false);
    }
  }

  function addSkill() {
    if (!newSkill.trim()) return;
    persist([{ name: newSkill.trim(), level: Number(newLevel), starred: false }, ...skills]);
    setNewSkill("");
    setNewLevel(60);
  }

  function updateLevel(index, level) {
    persist(skills.map((skill, i) => (i === index ? { ...skill, level: Number(level) } : skill)));
  }

  function toggleStar(index) {
    persist(skills.map((skill, i) => (i === index ? { ...skill, starred: !skill.starred } : skill)));
  }

  function removeSkill(index) {
    persist(skills.filter((_, i) => i !== index));
  }

  return (
    <div className="rounded-3xl border border-[#F2D5A5] bg-[#FFF8EF] p-4 text-sm">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#C84D38]">Technical Skills</p>

      <div className="mt-4 space-y-3">
        {displayedSkills.length > 0 ? (
          displayedSkills.map((skill) => {
            const skillIndex = skills.indexOf(skill);
            return (
              <div key={`${skill.name}-${skillIndex}`} className="flex items-center gap-2">
                <div className="flex-1">
                  {allowEdit ? (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm text-[#2D4C59]">
                        <span>{skill.name}</span>
                        <span className="font-semibold text-[#C84D38]">{skill.level ?? 0}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={skill.level ?? 0}
                        onChange={(e) => updateLevel(skillIndex, e.target.value)}
                        className="h-2 w-full cursor-pointer accent-[#F4512A]"
                      />
                    </div>
                  ) : (
                    <SkillProgress name={skill.name} level={skill.level ?? 0} />
                  )}
                </div>
                {allowEdit && (
                  <div className="flex shrink-0 items-center gap-1">
                    <button type="button" onClick={() => toggleStar(skillIndex)} title="Star skill" className={`rounded-full p-1.5 ${skill.starred ? "text-[#F4512A]" : "text-[#B7796B]"}`}>
                      <Star size={16} fill={skill.starred ? "currentColor" : "none"} />
                    </button>
                    <button type="button" onClick={() => removeSkill(skillIndex)} title="Remove skill" className="rounded-full p-1.5 text-[#B7796B] hover:text-[#F4512A]">
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-sm text-[#5E6F78]">{showAll ? "No skills added yet." : "Only starred skills appear here."}</p>
        )}
      </div>

      {allowEdit && (
        <div className="mt-4 rounded-2xl border border-[#E8DCCF] bg-white p-3">
          <div className="grid gap-2 sm:grid-cols-[1.5fr_1fr]">
            <input value={newSkill} onChange={(e) => setNewSkill(e.target.value)} placeholder="New skill name" className="rounded-md border border-[#E8DCCF] p-2 text-sm" />
            <div className="flex items-center gap-2">
              <input type="range" min={0} max={100} value={newLevel} onChange={(e) => setNewLevel(e.target.value)} className="h-2 flex-1 cursor-pointer accent-[#F4512A]" />
              <span className="w-10 text-right text-xs font-semibold text-[#C84D38]">{newLevel}%</span>
            </div>
          </div>
          <button onClick={addSkill} disabled={saving} className="mt-3 w-full rounded-full bg-[#F4B643] px-3 py-2 text-sm font-semibold text-[#2D4C59] hover:bg-[#F3C84E] disabled:opacity-60">
            {saving ? "Saving..." : "Add new skill"}
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
