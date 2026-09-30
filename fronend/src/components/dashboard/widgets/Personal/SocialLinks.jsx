import { useContext, useMemo } from "react";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter, FaGlobe, FaFileDownload } from "react-icons/fa";
import { AuthContext } from "../../../../context/AuthContext";
import { mockSocialLinks } from "./mockProfile";
import safeExternalUrl from "../../../../utils/safeExternalUrl";

function snapshotHref(value, fallback, prefix = "") {
  const clean = value?.trim();
  if (!clean) return fallback;
  if (/^https?:\/\//i.test(clean)) return safeExternalUrl(clean, fallback);
  if (fallback === "https://horizon.me") return safeExternalUrl(`https://${clean.replace(/^www\./i, "")}`, fallback);
  return safeExternalUrl(`${fallback}${prefix}${encodeURIComponent(clean.replace(/^@/, ""))}`, fallback);
}

const iconMap = {
  Linkedin: FaLinkedin,
  Github: FaGithub,
  Twitter: FaTwitter,
  Instagram: FaInstagram,
  Portfolio: FaGlobe,
};

export default function SocialLinks({ snapshotLinks }) {
  const { user } = useContext(AuthContext);
  const socialLinks = useMemo(() => {
    if (!user) return mockSocialLinks;

    const links = [];
    if (user.linkedin) {
      links.push({
        platform: "LinkedIn",
        url: /^https?:\/\//i.test(user.linkedin)
          ? user.linkedin
          : `https://linkedin.com/in/${encodeURIComponent(user.linkedin.replace(/^@/, ""))}`,
        icon: "Linkedin",
      });
    }
    if (user.githubUsername) {
      links.push({ platform: "GitHub", url: `https://github.com/${encodeURIComponent(user.githubUsername)}`, icon: "Github" });
    }
    const safeLinks = links.map((link) => ({ ...link, url: safeExternalUrl(link.url) })).filter((link) => link.url);
    return safeLinks.length > 0 ? safeLinks : mockSocialLinks;
  }, [user]);

  if (snapshotLinks) {
    const links = [
      { platform: "LinkedIn", value: snapshotLinks.linkedin, icon: FaLinkedin, fallback: "https://linkedin.com" },
      { platform: "GitHub", value: snapshotLinks.github, icon: FaGithub, fallback: "https://github.com" },
      { platform: "Twitter / X", value: snapshotLinks.twitter, icon: FaTwitter, fallback: "https://x.com" },
      { platform: "Instagram", value: snapshotLinks.instagram, icon: FaInstagram, fallback: "https://instagram.com" },
      { platform: "Personal website", value: snapshotLinks.website, icon: FaGlobe, fallback: "https://horizon.me" },
      { platform: "Download resume", value: snapshotLinks.resumeUrl, icon: FaFileDownload, fallback: "/resume.pdf", download: true },
    ];

    return (
      <div aria-label="Personal profile links" className="flex flex-wrap items-center gap-3 rounded-2xl border border-[#E9DCCB] bg-white px-4 py-3">
        {links.map(({ platform, value, icon: Icon, fallback, download }) => {
          const href = download
            ? safeExternalUrl(value || fallback, fallback)
            : snapshotHref(value, fallback, platform === "LinkedIn" ? "/in/" : "/");
          return (
            <a key={platform} href={href} aria-label={platform} title={platform} download={download || undefined} target={download ? undefined : "_blank"} rel={download ? undefined : "noreferrer"} className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#9E2B25] transition-transform hover:-translate-y-0.5">
              <Icon size={20} />
            </a>
          );
        })}
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-[#F2D5A5] bg-[#FFFDF8] p-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#C84D38]">Connect</p>
      <div className="mt-4 grid grid-cols-5 gap-3">
        {socialLinks.map((link) => {
          const Icon = iconMap[link.icon] || FaGlobe;

          return (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#F2D5A5] bg-white text-[#2D4C59] transition hover:border-[#C84D38] hover:text-[#C84D38]"
              aria-label={link.platform}
            >
              <Icon size={18} />
            </a>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <a
          href="/resume.pdf"
          download
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#F4B643] px-4 py-2 text-sm font-semibold text-[#2D4C59] transition hover:bg-[#E7AC30]"
        >
          <FaFileDownload size={16} />
          Download Resume
        </a>
      </div>
    </div>
  );
}
