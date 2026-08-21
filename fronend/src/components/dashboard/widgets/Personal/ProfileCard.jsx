import { useContext } from "react";
import { Link } from "react-router-dom";
import { Code2, ExternalLink } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { AuthContext } from "../../../../context/AuthContext";

export default function ProfileCard() {
  const { user, loading } = useContext(AuthContext);
  const profileData = user || {};

  // Map backend field names to component field names
  const displayName = profileData.fullName || profileData.name || profileData.username;
  const displayImage = profileData.profilePhoto || profileData.image;
  const displayDesignation = profileData.designation;
  const displayBio = profileData.bio;
  const displayCompany = profileData.currentCompany;
  const displayLocation = profileData.location;
  const displayExperience = profileData.yearsOfExperience;
  const displaySkills = Array.isArray(profileData.skills) ? profileData.skills.slice(0, 6) : [];

  const links = [
    { label: "GitHub", value: profileData.githubUsername, icon: FaGithub, url: profileData.githubUsername ? `https://github.com/${profileData.githubUsername}` : "" },
    { label: "LinkedIn", value: profileData.linkedin, icon: FaLinkedin, url: profileData.linkedin?.startsWith("http") ? profileData.linkedin : profileData.linkedin ? `https://linkedin.com/in/${profileData.linkedin}` : "" },
    { label: "LeetCode", value: profileData.leetcodeUsername, icon: Code2, url: profileData.leetcodeUsername ? `https://leetcode.com/${profileData.leetcodeUsername}` : "" },
  ].filter((link) => link.value);

  if (loading) {
    return (
      <div className="rounded-3xl border border-[#F2D5A5] bg-[#FFFDF8] p-4 shadow-sm">
        <p className="text-sm text-[#5E6F78]">Loading...</p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-[#F2D5A5] bg-[#FFFDF8] p-4 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-[#F4B643] bg-[#FFF8EF] text-2xl font-semibold text-[#C84D38]">
          {displayImage ? (
            <img src={displayImage} alt={displayName} className="h-full w-full object-cover" />
          ) : (
            <span>{displayName?.charAt(0).toUpperCase()}</span>
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#2D4C59]">{displayName || "User"}</h3>
          <p className="text-sm text-[#C84D38]">{displayDesignation || "Developer"}</p>
          {displayCompany && <p className="text-xs text-[#5E6F78]">{displayCompany}</p>}
          {displayLocation && <p className="text-xs text-[#7B8790]">{displayLocation}</p>}
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs text-[#5E6F78]">
        <span className="h-2 w-2 rounded-full bg-[#35A56B]" />
        <span>{profileData.availabilityStatus || "Availability not set"}</span>
        {displayExperience !== undefined && <span className="ml-auto">{displayExperience} years experience</span>}
      </div>
      <p className="mt-3 text-sm leading-6 text-[#5E6F78]">{displayBio || "No professional bio added yet."}</p>
      {displaySkills.length > 0 && <div className="mt-3 flex flex-wrap gap-1.5">{displaySkills.map((skill, index) => <span key={skill.name || skill || index} className="rounded-full border border-[#F2D5A5] px-2.5 py-1 text-[11px] text-[#5E6F78]">{skill.name || skill}</span>)}</div>}
      {links.length > 0 && <div className="mt-4 flex items-center gap-3">{links.map(({ label, icon: Icon, url }) => <a key={label} href={url} target="_blank" rel="noreferrer" aria-label={label} className="text-[#9E2F1C] transition hover:text-[#F4512A]"><Icon size={16} /></a>)}</div>}
      <Link to="/profile" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#C84D38] hover:underline">View Profile <ExternalLink size={13} /></Link>
    </div>
  );
}
