import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BriefcaseBusiness, ExternalLink, MapPin, Pencil, Sparkles } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiCodeforces, SiLeetcode } from "react-icons/si";
import DashboardLayout from "../components/layout/DashboardLayout";
import EditProfileModal from "../components/profile/EditProfileModal";
import { AuthContext } from "../context/AuthContext";

const skillCategories = ["Programming", "Frameworks", "Platforms", "Tools", "AI/ML"];

function Section({ eyebrow, title, children, className = "", onEdit }) {
  return <section className={`rounded-3xl border border-[#F7B39B] bg-[#FFFDF8] p-5 shadow-sm ${className}`}><div className="flex items-start justify-between gap-3"><div><p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#F4512A]">{eyebrow}</p><h2 className="mt-2 text-xl font-semibold text-[#9E2F1C]">{title}</h2></div>{onEdit && <button type="button" onClick={onEdit} className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#F7B39B] px-3 py-1.5 text-xs font-semibold text-[#9E2F1C] hover:border-[#F4512A] hover:text-[#F4512A]"><Pencil size={13} /> Edit</button>}</div><div className="mt-4">{children}</div></section>;
}

function EmptyState({ children }) {
  return <p className="rounded-2xl border border-dashed border-[#F7B39B] bg-[#FFF4E6] p-4 text-sm text-[#B7796B]">{children}</p>;
}

function ProfileImage({ user, large = false }) {
  const name = user.fullName || user.username || "";
  return <div className={`${large ? "h-28 w-28 text-4xl" : "h-16 w-16 text-2xl"} flex shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-[#FF7A3D] bg-[#FFE0C2] font-bold text-[#9E2F1C]`}>{user.profilePhoto ? <img src={user.profilePhoto} alt={name} className="h-full w-full object-cover" /> : name.charAt(0).toUpperCase()}</div>;
}

function DeveloperProfiles({ user }) {
  const profiles = [
    { label: "GitHub", value: user.githubUsername, icon: FaGithub, href: user.githubUsername ? `https://github.com/${user.githubUsername}` : "" },
    { label: "LeetCode", value: user.leetcodeUsername, icon: SiLeetcode, href: user.leetcodeUsername ? `https://leetcode.com/${user.leetcodeUsername}` : "" },
    { label: "Codeforces", value: user.codeforcesUsername, icon: SiCodeforces, href: user.codeforcesUsername ? `https://codeforces.com/profile/${user.codeforcesUsername}` : "" },
    { label: "LinkedIn", value: user.linkedin, icon: FaLinkedin, href: user.linkedin?.startsWith("http") ? user.linkedin : user.linkedin ? `https://linkedin.com/in/${user.linkedin}` : "" },
  ];
  return <div className="grid gap-3 sm:grid-cols-2">{profiles.map(({ label, value, icon: Icon, href }) => value ? <a key={label} href={href} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl border border-[#F7B39B] bg-white p-3 transition hover:-translate-y-0.5 hover:border-[#F4512A] hover:shadow-sm"><Icon size={20} className="text-[#F4512A]" /><span className="min-w-0"><span className="block text-xs font-bold uppercase tracking-[0.12em] text-[#9E2F1C]">{label}</span><span className="block truncate text-sm text-[#9E5B4D]">{value}</span></span><ExternalLink size={14} className="ml-auto text-[#B7796B]" /></a> : null)}</div>;
}

export default function Profile() {
  const location = useLocation();
  const { user, updateUserProfile } = useContext(AuthContext);
  const [editTab, setEditTab] = useState(null);
  const profile = user || {};
  const skills = Array.isArray(profile.skills) ? profile.skills : [];
  const experience = Array.isArray(profile.experience) ? profile.experience : [];
  const education = Array.isArray(profile.education) ? profile.education : [];
  const certifications = Array.isArray(profile.certifications) ? profile.certifications : [];
  const projects = Array.isArray(profile.projects) ? profile.projects : [];

  useEffect(() => {
    if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
  }, [location]);

  if (!user) {
    return <DashboardLayout><div className="mx-auto max-w-[1100px] py-10 text-sm text-[#B7796B]">Loading professional profile...</div></DashboardLayout>;
  }

  const groupedSkills = skillCategories.map((category) => ({ category, items: skills.filter((skill) => (skill.category || "Uncategorized") === category) })).filter((group) => group.items.length > 0);
  const ungroupedSkills = skills.filter((skill) => !skill.category || !skillCategories.includes(skill.category));

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-[1100px] space-y-5 py-3">
        <section className="relative overflow-hidden rounded-[2rem] border border-[#F7B39B] bg-[#FFFDF8] p-6 shadow-sm sm:p-8">
          <div className="profile-hero-shape" aria-hidden="true" />
          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start">
            <ProfileImage user={profile} large />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#F4512A]">Professional profile</p><h1 className="mt-2 text-3xl font-black text-[#9E2F1C]">{profile.fullName || profile.username}</h1><p className="mt-1 text-base font-semibold text-[#F4512A]">{profile.designation || "Designation not set"}{profile.currentCompany ? ` · ${profile.currentCompany}` : ""}</p></div><button type="button" onClick={() => setEditTab("basic")} className="inline-flex items-center gap-2 rounded-full bg-[#F4512A] px-4 py-2 text-sm font-semibold text-white"><Pencil size={15} /> Edit Profile</button></div>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-[#9E5B4D]"><span className="inline-flex items-center gap-1.5"><MapPin size={15} />{profile.location || "Location not set"}</span><span className="inline-flex items-center gap-1.5"><BriefcaseBusiness size={15} />{profile.yearsOfExperience ?? "Not set"} years experience</span><span className="inline-flex items-center gap-1.5 font-semibold text-[#35A56B]"><span className="h-2 w-2 rounded-full bg-[#35A56B]" />{profile.availabilityStatus || "Availability not set"}</span></div>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-[#9E5B4D]">{profile.bio || "Add a concise professional bio to introduce your work."}</p>
            </div>
          </div>
        </section>

        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <Section eyebrow="About the work" title="Professional summary"><p className="text-sm leading-7 text-[#9E5B4D]">{profile.bio || "No professional introduction has been added yet."}</p><div className="mt-5 grid gap-3 sm:grid-cols-3"><div className="rounded-2xl bg-[#FFF4E6] p-3"><p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#B7796B]">Experience</p><p className="mt-1 text-lg font-bold text-[#9E2F1C]">{profile.yearsOfExperience ?? "—"} <span className="text-xs font-medium">years</span></p></div><div className="rounded-2xl bg-[#FFF4E6] p-3"><p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#B7796B]">Company</p><p className="mt-1 truncate text-sm font-bold text-[#9E2F1C]">{profile.currentCompany || "Not set"}</p></div><div className="rounded-2xl bg-[#FFF4E6] p-3"><p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#B7796B]">Focus</p><p className="mt-1 truncate text-sm font-bold text-[#9E2F1C]">{profile.primaryFocus || "Not set"}</p></div></div></Section>
          <Section eyebrow="Developer presence" title="Profiles"><DeveloperProfiles user={profile} /></Section>
        </div>

        <Section eyebrow="Technical toolkit" title="Skills" onEdit={() => setEditTab("skills")}>{groupedSkills.length || ungroupedSkills.length ? <div className="space-y-4">{groupedSkills.map(({ category, items }) => <div key={category}><h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[#B7796B]">{category}</h3><div className="mt-2 flex flex-wrap gap-2">{items.map((skill, index) => <span key={`${skill.name}-${index}`} className="rounded-full border border-[#F7B39B] bg-[#FFF4E6] px-3 py-1.5 text-sm text-[#9E2F1C]">{skill.name || skill}<span className="ml-2 text-xs text-[#F4512A]">{skill.level ? `${skill.level}%` : ""}</span></span>)}</div></div>)}{ungroupedSkills.length > 0 && <div><h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[#B7796B]">Other</h3><div className="mt-2 flex flex-wrap gap-2">{ungroupedSkills.map((skill, index) => <span key={`${skill.name || skill}-${index}`} className="rounded-full border border-[#F7B39B] bg-[#FFF4E6] px-3 py-1.5 text-sm text-[#9E2F1C]">{skill.name || skill}</span>)}</div></div>}</div> : <EmptyState>No professional skills have been added yet.</EmptyState>}</Section>

        <Section eyebrow="Career path" title="Experience" onEdit={() => setEditTab("experience")}>{experience.length ? <div className="space-y-4">{experience.map((entry, index) => <article key={`${entry.company}-${index}`} className="relative border-l-2 border-[#F7B39B] pl-5"><span className="absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-[#F4512A]" /><h3 className="font-semibold text-[#9E2F1C]">{entry.jobTitle || entry.title || "Role not set"}</h3><p className="mt-1 text-sm font-medium text-[#F4512A]">{entry.company || "Company not set"}</p><p className="mt-1 text-xs text-[#B7796B]">{entry.startDate || "Start date not set"} - {entry.endDate || "Present"}</p><p className="mt-3 text-sm leading-6 text-[#9E5B4D]">{entry.description || "No role description added."}</p>{entry.technologies?.length ? <div className="mt-2 flex flex-wrap gap-1.5">{entry.technologies.map((technology) => <span key={technology} className="rounded-full bg-[#FFE0C2] px-2 py-1 text-xs text-[#9E2F1C]">{technology}</span>)}</div> : null}</article>)}</div> : <EmptyState>No experience entries have been added yet.</EmptyState>}</Section>

        <div className="grid gap-5 lg:grid-cols-2"><Section eyebrow="Academic foundation" title="Education" onEdit={() => setEditTab("education")}>{education.length ? <div className="space-y-4">{education.map((entry, index) => <article key={`${entry.institution}-${index}`}><h3 className="font-semibold text-[#9E2F1C]">{entry.degree || "Degree not set"}</h3><p className="mt-1 text-sm text-[#F4512A]">{entry.institution || "Institution not set"}</p><p className="mt-1 text-xs text-[#B7796B]">{entry.startYear || "—"} - {entry.endYear || "Present"}{entry.achievement ? ` · ${entry.achievement}` : ""}</p></article>)}</div> : <EmptyState>No education entries have been added yet.</EmptyState>}</Section><Section eyebrow="Continuous learning" title="Certifications" onEdit={() => setEditTab("certifications")}>{certifications.length ? <div className="space-y-3">{certifications.map((entry, index) => <a key={`${entry.name}-${index}`} href={entry.credential || "#"} target="_blank" rel="noreferrer" className="block rounded-2xl border border-[#F7B39B] p-3 hover:border-[#F4512A]"><p className="font-semibold text-[#9E2F1C]">{entry.name || "Certification not set"}</p><p className="mt-1 text-sm text-[#9E5B4D]">{entry.organization || "Organization not set"} · {entry.year || "Year not set"}</p></a>)}</div> : <EmptyState>No certifications have been added yet.</EmptyState>}</Section></div>

        <Section eyebrow="Selected work" title="Projects" onEdit={() => setEditTab("projects")}>{projects.length ? <div className="grid gap-3 md:grid-cols-2">{projects.map((project, index) => <article key={`${project.name}-${index}`} className="rounded-2xl border border-[#F7B39B] bg-white p-4"><div className="flex items-start justify-between gap-3"><h3 className="font-semibold text-[#9E2F1C]">{project.name || "Project not set"}</h3><Sparkles size={16} className="shrink-0 text-[#F4512A]" /></div><p className="mt-2 text-sm leading-6 text-[#9E5B4D]">{project.description || "No project description added."}</p>{project.technologies?.length ? <div className="mt-3 flex flex-wrap gap-1.5">{project.technologies.map((technology) => <span key={technology} className="rounded-full bg-[#FFE0C2] px-2 py-1 text-xs text-[#9E2F1C]">{technology}</span>)}</div> : null}<div className="mt-4 flex gap-3 text-xs font-semibold text-[#F4512A]">{project.repositoryUrl && <a href={project.repositoryUrl} target="_blank" rel="noreferrer">Repository</a>}{project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer">Live demo</a>}</div></article>)}</div> : <EmptyState>No projects have been added yet.</EmptyState>}</Section>

      </div>

      <EditProfileModal
        open={editTab !== null}
        initialTab={editTab || "basic"}
        user={profile}
        onClose={() => setEditTab(null)}
        onSave={updateUserProfile}
      />
    </DashboardLayout>
  );
}
