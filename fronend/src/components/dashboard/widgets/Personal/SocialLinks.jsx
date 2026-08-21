import { useContext, useMemo } from "react";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter, FaGlobe, FaFileDownload } from "react-icons/fa";
import { AuthContext } from "../../../../context/AuthContext";
import { mockSocialLinks } from "./mockProfile";

const iconMap = {
  Linkedin: FaLinkedin,
  Github: FaGithub,
  Twitter: FaTwitter,
  Instagram: FaInstagram,
  Portfolio: FaGlobe,
};

export default function SocialLinks() {
  const { user } = useContext(AuthContext);

  // Build social links from user data or use mock
  const socialLinks = useMemo(() => {
    if (!user) return mockSocialLinks;

    const links = [];
    
    if (user.linkedin) {
      links.push({
        platform: "LinkedIn",
        url: user.linkedin.startsWith("http") ? user.linkedin : `https://linkedin.com/in/${user.linkedin}`,
        icon: "Linkedin"
      });
    }
    
    if (user.githubUsername) {
      links.push({
        platform: "GitHub",
        url: `https://github.com/${user.githubUsername}`,
        icon: "Github"
      });
    }

    return links.length > 0 ? links : mockSocialLinks;
  }, [user]);

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
