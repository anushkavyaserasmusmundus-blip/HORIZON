import { useEffect, useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import toast from "react-hot-toast";

const TABS = [
  { key: "basic", label: "Basic info" },
  { key: "skills", label: "Skills" },
  { key: "experience", label: "Experience" },
  { key: "education", label: "Education" },
  { key: "certifications", label: "Certifications" },
  { key: "projects", label: "Projects" },
];

function techArrayToText(technologies) {
  return Array.isArray(technologies) ? technologies.join(", ") : "";
}

function techTextToArray(text) {
  return text
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function Field({ label, children }) {
  return (
    <label className="block text-sm font-semibold text-[#2D4C59]">
      {label}
      <div className="mt-1 font-normal">{children}</div>
    </label>
  );
}

const inputClass =
  "w-full rounded-md border border-[#E8DCCF] p-2 text-sm";

function RowCard({ children, onRemove }) {
  return (
    <div className="relative rounded-2xl border border-[#F7B39B] bg-[#FFF8F1] p-4">
      <button
        type="button"
        onClick={onRemove}
        className="absolute right-3 top-3 rounded-full p-1 text-[#B7796B] hover:text-[#F4512A]"
        title="Remove entry"
      >
        <Trash2 size={16} />
      </button>

      <div className="grid gap-3 pr-8 sm:grid-cols-2">
        {children}
      </div>
    </div>
  );
}

function AddButton({ onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-[#F7B39B] py-3 text-sm font-semibold text-[#F4512A] hover:bg-[#FFF4E6]"
    >
      <Plus size={16} /> {label}
    </button>
  );
}

export default function EditProfileModal({
  open,
  onClose,
  user,
  onSave,
  initialTab = "basic",
}) {
  const [tab, setTab] = useState(initialTab);
  const [saving, setSaving] = useState(false);

  const [basic, setBasic] = useState({});
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (!open || !user) return;

    setTab(initialTab);

    setBasic({
      fullName: user.fullName || "",
      designation: user.designation || "",
      bio: user.bio || "",
      location: user.location || "",
      currentCompany: user.currentCompany || "",
      yearsOfExperience: user.yearsOfExperience ?? "",
      availabilityStatus: user.availabilityStatus || "",
      primaryFocus: user.primaryFocus || "",

      // Coding platform usernames
      githubUsername: user.githubUsername || "",
      leetcodeUsername: user.leetcodeUsername || "",
      codeforcesUsername: user.codeforcesUsername || "",
    });

    setSkills(
      Array.isArray(user.skills)
        ? user.skills.map((s) => ({ ...s }))
        : []
    );

    setExperience(
      Array.isArray(user.experience)
        ? user.experience.map((e) => ({ ...e }))
        : []
    );

    setEducation(
      Array.isArray(user.education)
        ? user.education.map((e) => ({ ...e }))
        : []
    );

    setCertifications(
      Array.isArray(user.certifications)
        ? user.certifications.map((c) => ({ ...c }))
        : []
    );

    setProjects(
      Array.isArray(user.projects)
        ? user.projects.map((p) => ({ ...p }))
        : []
    );
  }, [open, user, initialTab]);

  if (!open) return null;

  function updateListItem(list, setList, index, field, value) {
    setList(
      list.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  }

  async function handleSave() {
    setSaving(true);

    try {
      await onSave({
        // Basic profile
        fullName: basic.fullName,
        designation: basic.designation,
        bio: basic.bio,
        location: basic.location,
        currentCompany: basic.currentCompany,

        yearsOfExperience:
          basic.yearsOfExperience === ""
            ? null
            : Number(basic.yearsOfExperience),

        availabilityStatus: basic.availabilityStatus,
        primaryFocus: basic.primaryFocus,

        // Coding platform usernames
        githubUsername: basic.githubUsername,
        leetcodeUsername: basic.leetcodeUsername,
        codeforcesUsername: basic.codeforcesUsername,

        // Profile sections
        skills,
        experience,
        education,
        certifications,
        projects,
      });

      toast.success("Profile updated");
      onClose();
    } catch (error) {
      console.error("Failed to save profile:", error);
      toast.error("Failed to save profile");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 p-4">
      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-[28px] bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#F2D5A5] px-6 py-4">
          <h2 className="text-lg font-bold text-[#9E2F1C]">
            Edit profile
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-[#B7796B] hover:text-[#F4512A]"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto border-b border-[#F2D5A5] px-6 pt-3">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`whitespace-nowrap rounded-t-xl px-3 py-2 text-sm font-semibold transition ${
                tab === t.key
                  ? "bg-[#FFF4E6] text-[#F4512A]"
                  : "text-[#B7796B] hover:text-[#F4512A]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">

          {/* BASIC INFO */}
          {tab === "basic" && (
            <div className="grid gap-3 sm:grid-cols-2">

              <Field label="Full name">
                <input
                  className={inputClass}
                  value={basic.fullName || ""}
                  onChange={(e) =>
                    setBasic((b) => ({
                      ...b,
                      fullName: e.target.value,
                    }))
                  }
                />
              </Field>

              <Field label="Designation">
                <input
                  className={inputClass}
                  value={basic.designation || ""}
                  onChange={(e) =>
                    setBasic((b) => ({
                      ...b,
                      designation: e.target.value,
                    }))
                  }
                />
              </Field>

              <Field label="Location">
                <input
                  className={inputClass}
                  value={basic.location || ""}
                  onChange={(e) =>
                    setBasic((b) => ({
                      ...b,
                      location: e.target.value,
                    }))
                  }
                />
              </Field>

              <Field label="Current company">
                <input
                  className={inputClass}
                  value={basic.currentCompany || ""}
                  onChange={(e) =>
                    setBasic((b) => ({
                      ...b,
                      currentCompany: e.target.value,
                    }))
                  }
                />
              </Field>

              <Field label="Years of experience">
                <input
                  type="number"
                  min="0"
                  className={inputClass}
                  value={basic.yearsOfExperience}
                  onChange={(e) =>
                    setBasic((b) => ({
                      ...b,
                      yearsOfExperience: e.target.value,
                    }))
                  }
                />
              </Field>

              <Field label="Availability status">
                <input
                  className={inputClass}
                  value={basic.availabilityStatus || ""}
                  onChange={(e) =>
                    setBasic((b) => ({
                      ...b,
                      availabilityStatus: e.target.value,
                    }))
                  }
                />
              </Field>

              <Field label="Primary technical focus">
                <input
                  className={inputClass}
                  value={basic.primaryFocus || ""}
                  onChange={(e) =>
                    setBasic((b) => ({
                      ...b,
                      primaryFocus: e.target.value,
                    }))
                  }
                />
              </Field>

              <div className="sm:col-span-2">
                <Field label="Bio">
                  <textarea
                    rows={3}
                    className={inputClass}
                    value={basic.bio || ""}
                    onChange={(e) =>
                      setBasic((b) => ({
                        ...b,
                        bio: e.target.value,
                      }))
                    }
                  />
                </Field>
              </div>

              {/* CODING PLATFORMS */}
              <div className="sm:col-span-2 mt-3">
                <div className="mb-3 border-t border-[#F2D5A5] pt-4">
                  <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-[#9E2F1C]">
                    Coding platforms
                  </h3>
                  <p className="mt-1 text-xs text-[#5E6F78]">
                    These usernames are used to fetch your coding activity.
                  </p>
                </div>
              </div>

              <Field label="GitHub username">
                <input
                  className={inputClass}
                  placeholder="e.g. anushkavyas"
                  value={basic.githubUsername || ""}
                  onChange={(e) =>
                    setBasic((b) => ({
                      ...b,
                      githubUsername: e.target.value,
                    }))
                  }
                />
              </Field>

              <Field label="LeetCode username">
                <input
                  className={inputClass}
                  placeholder="e.g. anushkavyas"
                  value={basic.leetcodeUsername || ""}
                  onChange={(e) =>
                    setBasic((b) => ({
                      ...b,
                      leetcodeUsername: e.target.value,
                    }))
                  }
                />
              </Field>

              <Field label="Codeforces username">
                <input
                  className={inputClass}
                  placeholder="e.g. anushkavyas"
                  value={basic.codeforcesUsername || ""}
                  onChange={(e) =>
                    setBasic((b) => ({
                      ...b,
                      codeforcesUsername: e.target.value,
                    }))
                  }
                />
              </Field>
            </div>
          )}

          {/* SKILLS */}
          {tab === "skills" && (
            <div className="space-y-3">
              {skills.map((skill, index) => (
                <RowCard
                  key={index}
                  onRemove={() =>
                    setSkills(
                      skills.filter((_, i) => i !== index)
                    )
                  }
                >
                  <Field label="Skill name">
                    <input
                      className={inputClass}
                      value={skill.name || ""}
                      onChange={(e) =>
                        updateListItem(
                          skills,
                          setSkills,
                          index,
                          "name",
                          e.target.value
                        )
                      }
                    />
                  </Field>

                  <Field label="Category">
                    <input
                      className={inputClass}
                      value={skill.category || ""}
                      onChange={(e) =>
                        updateListItem(
                          skills,
                          setSkills,
                          index,
                          "category",
                          e.target.value
                        )
                      }
                    />
                  </Field>

                  <div className="sm:col-span-2">
                    <label className="text-sm font-semibold text-[#2D4C59]">
                      Proficiency

                      <div className="mt-1 flex items-center gap-3">
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={skill.level ?? 0}
                          onChange={(e) =>
                            updateListItem(
                              skills,
                              setSkills,
                              index,
                              "level",
                              Number(e.target.value)
                            )
                          }
                          className="h-2 flex-1 cursor-pointer accent-[#F4512A]"
                        />

                        <span className="w-10 text-right text-xs font-semibold text-[#F4512A]">
                          {skill.level ?? 0}%
                        </span>
                      </div>
                    </label>
                  </div>

                  <label className="flex items-center gap-2 text-sm font-semibold text-[#2D4C59] sm:col-span-2">
                    <input
                      type="checkbox"
                      checked={!!skill.starred}
                      onChange={(e) =>
                        updateListItem(
                          skills,
                          setSkills,
                          index,
                          "starred",
                          e.target.checked
                        )
                      }
                    />

                    Star this skill (show on home dashboard)
                  </label>
                </RowCard>
              ))}

              <AddButton
                label="Add skill"
                onClick={() =>
                  setSkills([
                    ...skills,
                    {
                      name: "",
                      level: 60,
                      starred: false,
                      category: "",
                    },
                  ])
                }
              />
            </div>
          )}

          {/* EXPERIENCE */}
          {tab === "experience" && (
            <div className="space-y-3">
              {experience.map((entry, index) => (
                <RowCard
                  key={index}
                  onRemove={() =>
                    setExperience(
                      experience.filter((_, i) => i !== index)
                    )
                  }
                >
                  <Field label="Job title">
                    <input
                      className={inputClass}
                      value={entry.jobTitle || ""}
                      onChange={(e) =>
                        updateListItem(
                          experience,
                          setExperience,
                          index,
                          "jobTitle",
                          e.target.value
                        )
                      }
                    />
                  </Field>

                  <Field label="Company">
                    <input
                      className={inputClass}
                      value={entry.company || ""}
                      onChange={(e) =>
                        updateListItem(
                          experience,
                          setExperience,
                          index,
                          "company",
                          e.target.value
                        )
                      }
                    />
                  </Field>

                  <Field label="Start date">
                    <input
                      className={inputClass}
                      value={entry.startDate || ""}
                      onChange={(e) =>
                        updateListItem(
                          experience,
                          setExperience,
                          index,
                          "startDate",
                          e.target.value
                        )
                      }
                    />
                  </Field>

                  <Field label="End date">
                    <input
                      className={inputClass}
                      placeholder="Present"
                      value={entry.endDate || ""}
                      onChange={(e) =>
                        updateListItem(
                          experience,
                          setExperience,
                          index,
                          "endDate",
                          e.target.value
                        )
                      }
                    />
                  </Field>

                  <div className="sm:col-span-2">
                    <Field label="Description">
                      <textarea
                        rows={2}
                        className={inputClass}
                        value={entry.description || ""}
                        onChange={(e) =>
                          updateListItem(
                            experience,
                            setExperience,
                            index,
                            "description",
                            e.target.value
                          )
                        }
                      />
                    </Field>
                  </div>

                  <div className="sm:col-span-2">
                    <Field label="Technologies (comma separated)">
                      <input
                        className={inputClass}
                        value={techArrayToText(
                          entry.technologies
                        )}
                        onChange={(e) =>
                          updateListItem(
                            experience,
                            setExperience,
                            index,
                            "technologies",
                            techTextToArray(e.target.value)
                          )
                        }
                      />
                    </Field>
                  </div>
                </RowCard>
              ))}

              <AddButton
                label="Add experience"
                onClick={() =>
                  setExperience([
                    ...experience,
                    {
                      jobTitle: "",
                      company: "",
                      startDate: "",
                      endDate: "",
                      description: "",
                      technologies: [],
                    },
                  ])
                }
              />
            </div>
          )}

          {/* EDUCATION */}
          {tab === "education" && (
            <div className="space-y-3">
              {education.map((entry, index) => (
                <RowCard
                  key={index}
                  onRemove={() =>
                    setEducation(
                      education.filter((_, i) => i !== index)
                    )
                  }
                >
                  <Field label="Degree">
                    <input
                      className={inputClass}
                      value={entry.degree || ""}
                      onChange={(e) =>
                        updateListItem(
                          education,
                          setEducation,
                          index,
                          "degree",
                          e.target.value
                        )
                      }
                    />
                  </Field>

                  <Field label="Institution">
                    <input
                      className={inputClass}
                      value={entry.institution || ""}
                      onChange={(e) =>
                        updateListItem(
                          education,
                          setEducation,
                          index,
                          "institution",
                          e.target.value
                        )
                      }
                    />
                  </Field>

                  <Field label="Start year">
                    <input
                      className={inputClass}
                      value={entry.startYear || ""}
                      onChange={(e) =>
                        updateListItem(
                          education,
                          setEducation,
                          index,
                          "startYear",
                          e.target.value
                        )
                      }
                    />
                  </Field>

                  <Field label="End year">
                    <input
                      className={inputClass}
                      placeholder="Present"
                      value={entry.endYear || ""}
                      onChange={(e) =>
                        updateListItem(
                          education,
                          setEducation,
                          index,
                          "endYear",
                          e.target.value
                        )
                      }
                    />
                  </Field>

                  <div className="sm:col-span-2">
                    <Field label="Achievement">
                      <input
                        className={inputClass}
                        value={entry.achievement || ""}
                        onChange={(e) =>
                          updateListItem(
                            education,
                            setEducation,
                            index,
                            "achievement",
                            e.target.value
                          )
                        }
                      />
                    </Field>
                  </div>
                </RowCard>
              ))}

              <AddButton
                label="Add education"
                onClick={() =>
                  setEducation([
                    ...education,
                    {
                      degree: "",
                      institution: "",
                      startYear: "",
                      endYear: "",
                      achievement: "",
                    },
                  ])
                }
              />
            </div>
          )}

          {/* CERTIFICATIONS */}
          {tab === "certifications" && (
            <div className="space-y-3">
              {certifications.map((entry, index) => (
                <RowCard
                  key={index}
                  onRemove={() =>
                    setCertifications(
                      certifications.filter(
                        (_, i) => i !== index
                      )
                    )
                  }
                >
                  <Field label="Certification name">
                    <input
                      className={inputClass}
                      value={entry.name || ""}
                      onChange={(e) =>
                        updateListItem(
                          certifications,
                          setCertifications,
                          index,
                          "name",
                          e.target.value
                        )
                      }
                    />
                  </Field>

                  <Field label="Organization">
                    <input
                      className={inputClass}
                      value={entry.organization || ""}
                      onChange={(e) =>
                        updateListItem(
                          certifications,
                          setCertifications,
                          index,
                          "organization",
                          e.target.value
                        )
                      }
                    />
                  </Field>

                  <Field label="Year">
                    <input
                      className={inputClass}
                      value={entry.year || ""}
                      onChange={(e) =>
                        updateListItem(
                          certifications,
                          setCertifications,
                          index,
                          "year",
                          e.target.value
                        )
                      }
                    />
                  </Field>

                  <Field label="Credential URL">
                    <input
                      className={inputClass}
                      value={entry.credential || ""}
                      onChange={(e) =>
                        updateListItem(
                          certifications,
                          setCertifications,
                          index,
                          "credential",
                          e.target.value
                        )
                      }
                    />
                  </Field>
                </RowCard>
              ))}

              <AddButton
                label="Add certification"
                onClick={() =>
                  setCertifications([
                    ...certifications,
                    {
                      name: "",
                      organization: "",
                      year: "",
                      credential: "",
                    },
                  ])
                }
              />
            </div>
          )}

          {/* PROJECTS */}
          {tab === "projects" && (
            <div className="space-y-3">
              {projects.map((entry, index) => (
                <RowCard
                  key={index}
                  onRemove={() =>
                    setProjects(
                      projects.filter((_, i) => i !== index)
                    )
                  }
                >
                  <Field label="Project name">
                    <input
                      className={inputClass}
                      value={entry.name || ""}
                      onChange={(e) =>
                        updateListItem(
                          projects,
                          setProjects,
                          index,
                          "name",
                          e.target.value
                        )
                      }
                    />
                  </Field>

                  <Field label="Repository URL">
                    <input
                      className={inputClass}
                      value={entry.repositoryUrl || ""}
                      onChange={(e) =>
                        updateListItem(
                          projects,
                          setProjects,
                          index,
                          "repositoryUrl",
                          e.target.value
                        )
                      }
                    />
                  </Field>

                  <Field label="Live demo URL">
                    <input
                      className={inputClass}
                      value={entry.liveUrl || ""}
                      onChange={(e) =>
                        updateListItem(
                          projects,
                          setProjects,
                          index,
                          "liveUrl",
                          e.target.value
                        )
                      }
                    />
                  </Field>

                  <Field label="Technologies (comma separated)">
                    <input
                      className={inputClass}
                      value={techArrayToText(
                        entry.technologies
                      )}
                      onChange={(e) =>
                        updateListItem(
                          projects,
                          setProjects,
                          index,
                          "technologies",
                          techTextToArray(e.target.value)
                        )
                      }
                    />
                  </Field>

                  <div className="sm:col-span-2">
                    <Field label="Description">
                      <textarea
                        rows={2}
                        className={inputClass}
                        value={entry.description || ""}
                        onChange={(e) =>
                          updateListItem(
                            projects,
                            setProjects,
                            index,
                            "description",
                            e.target.value
                          )
                        }
                      />
                    </Field>
                  </div>
                </RowCard>
              ))}

              <AddButton
                label="Add project"
                onClick={() =>
                  setProjects([
                    ...projects,
                    {
                      name: "",
                      description: "",
                      technologies: [],
                      repositoryUrl: "",
                      liveUrl: "",
                    },
                  ])
                }
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t border-[#F2D5A5] px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[#F7B39B] px-4 py-2 text-sm font-semibold text-[#9E2F1C]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="rounded-full bg-[#F4512A] px-5 py-2 text-sm font-semibold text-white disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
}