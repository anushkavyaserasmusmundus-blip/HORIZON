import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, ChevronDown, Download, Link2, Share2, Star } from "lucide-react";
import { FaFileDownload, FaGithub, FaGlobe, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { toPng } from "html-to-image";
import Scribble from "./ui/Scribble.tsx";
import safeExternalUrl from "../utils/safeExternalUrl";

export type ShareLinks = {
  linkedin?: string;
  github?: string;
  twitter?: string;
  instagram?: string;
  website?: string;
  resumeUrl?: string;
};

type ShareButtonFloatingProps = {
  username: string;
  links: ShareLinks;
};

const copyParticles = [
  { x: -22, y: -24, color: "#E07A5F" },
  { x: 0, y: -31, color: "#F2B76B" },
  { x: 22, y: -23, color: "#7FA98A" },
  { x: -28, y: 4, color: "#8C83B5" },
  { x: 28, y: 5, color: "#D98A9B" },
];

const downloadParticles = [
  { x: -38, y: -36, color: "#E07A5F", shape: "star" },
  { x: -20, y: -46, color: "#F2B76B", shape: "triangle" },
  { x: 0, y: -52, color: "#7FA98A", shape: "star" },
  { x: 20, y: -44, color: "#8C83B5", shape: "triangle" },
  { x: 38, y: -34, color: "#D98A9B", shape: "star" },
  { x: -42, y: -10, color: "#D98A9B", shape: "triangle" },
  { x: -22, y: -18, color: "#8C83B5", shape: "star" },
  { x: 22, y: -18, color: "#E07A5F", shape: "triangle" },
  { x: 42, y: -8, color: "#F2B76B", shape: "star" },
  { x: 0, y: -34, color: "#7FA98A", shape: "triangle" },
];

function profileHref(value: string | undefined, base: string, prefix = "") {
  const cleanValue = value?.trim();
  if (!cleanValue) return base;
  if (/^https?:\/\//i.test(cleanValue)) return safeExternalUrl(cleanValue, base);
  if (base === "https://horizon.me") return safeExternalUrl(`https://${cleanValue.replace(/^www\./i, "")}`, base);
  return safeExternalUrl(`${base}${prefix}${encodeURIComponent(cleanValue.replace(/^@/, ""))}`, base);
}

export function SnapshotPersonalLinks({ links }: { links: ShareLinks }) {
  const socialLinks = [
    { label: "LinkedIn", href: profileHref(links.linkedin, "https://linkedin.com", "/in/"), Icon: FaLinkedin },
    { label: "GitHub", href: profileHref(links.github, "https://github.com", "/"), Icon: FaGithub },
    { label: "Twitter / X", href: profileHref(links.twitter, "https://x.com", "/"), Icon: FaTwitter },
    { label: "Instagram", href: profileHref(links.instagram, "https://instagram.com", "/"), Icon: FaInstagram },
    { label: "Personal website", href: profileHref(links.website, "https://horizon.me"), Icon: FaGlobe },
    { label: "Download resume", href: safeExternalUrl(links.resumeUrl || "/resume.pdf", "/resume.pdf"), Icon: FaFileDownload, download: true },
  ];

  return (
    <div aria-label="Personal profile links" className="flex flex-wrap items-center gap-3 py-1">
      {socialLinks.map(({ label, href, Icon, download }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          title={label}
          download={download || undefined}
          target={download ? undefined : "_blank"}
          rel={download ? undefined : "noreferrer"}
          data-snapshot-link={label}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#9E2B25] transition-transform hover:-translate-y-0.5"
        >
          <Icon size={20} />
        </a>
      ))}
    </div>
  );
}

async function fitSnapshotToCanvas(source: string) {
  const image = new Image();
  image.src = source;
  await image.decode();

  const canvas = document.createElement("canvas");
  canvas.width = 1600;
  canvas.height = 900;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Could not prepare the snapshot canvas");

  context.fillStyle = "#FDF6E9";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";

  const scale = Math.min(canvas.width / image.width, canvas.height / image.height);
  const width = image.width * scale;
  const height = image.height * scale;
  context.drawImage(image, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
  return canvas.toDataURL("image/png");
}

export default function ShareButtonFloating({ username, links }: ShareButtonFloatingProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const safeUsername = username.trim() || "developer";
  const liveLink = `https://horizon.me/${encodeURIComponent(safeUsername)}`;
  const profileLinkCount = Object.values(links).filter(Boolean).length;

  const [isOpen, setIsOpen] = useState(false);
  const [showLinkCircle, setShowLinkCircle] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState("");
  const [isCapturing, setIsCapturing] = useState(false);
  const [captureError, setCaptureError] = useState("");
  const [snapshot, setSnapshot] = useState<string | null>(null);
  const [showDownloadConfetti, setShowDownloadConfetti] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setShowLinkCircle(false);
      return undefined;
    }
    const timer = setTimeout(() => setShowLinkCircle(true), 300);
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    function closeOnOutsideClick(event: PointerEvent) {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) setIsOpen(false);
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  useEffect(() => () => {
    if (copyTimer.current) clearTimeout(copyTimer.current);
  }, []);

  async function copyLiveLink() {
    setCopyError("");
    try {
      await navigator.clipboard.writeText(liveLink);
      setCopied(true);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopyError("Clipboard access is unavailable in this browser.");
    }
  }

  async function captureDashboard() {
    if (isCapturing) return;
    setIsCapturing(true);
    setCaptureError("");
    let snapshotHeader: HTMLElement | null = null;
    let previousHeaderDisplay = "";

    try {
      const node = document.getElementById("snapshot-root");
      if (!node) throw new Error("Dashboard snapshot is unavailable");
      snapshotHeader = node.querySelector<HTMLElement>("[data-snapshot-branding]");
      if (snapshotHeader) {
        previousHeaderDisplay = snapshotHeader.style.display;
        snapshotHeader.style.display = "flex";
        await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      }
      const dataUrl = await toPng(node, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#FDF6E9",
        filter: (element: HTMLElement) => (
          !element.hasAttribute?.("data-snapshot-ignore")
          && !element.classList?.contains("no-snapshot")
        ),
        width: 1200,
        style: { transform: "scale(1)" },
      });
      setSnapshot(await fitSnapshotToCanvas(dataUrl));
    } catch {
      setCaptureError("Could not capture the dashboard. Please try again.");
    } finally {
      if (snapshotHeader) snapshotHeader.style.display = previousHeaderDisplay;
      setIsCapturing(false);
    }
  }

  function downloadSnapshot() {
    if (!snapshot) return;
    const date = new Date().toISOString().split("T")[0];
    const fileUsername = safeUsername.replace(/[^a-z0-9_-]/gi, "-");
    const link = document.createElement("a");
    link.download = `horizon-${fileUsername}-${date}.png`;
    link.href = snapshot;
    link.click();
    setShowDownloadConfetti(true);
    setTimeout(() => setShowDownloadConfetti(false), 1100);
  }

  return (
    <motion.div
      ref={rootRef}
      initial={{ opacity: 0, y: 20, rotate: 5 }}
      animate={{ opacity: 1, y: 0, rotate: 2 }}
      transition={{ type: "spring", damping: 20 }}
      data-html2canvas-ignore="true"
      data-snapshot-ignore="true"
      className="fixed bottom-24 right-6 z-50"
    >
      <Scribble type="box" hover color="#E07A5F" iterations={1} padding={4} className="scribble-hover-target">
        <motion.button
          type="button"
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          aria-label={`Share dashboard; ${profileLinkCount} profile links available`}
          data-html2canvas-ignore="true"
          data-snapshot-ignore="true"
          onClick={() => setIsOpen((open) => !open)}
          whileHover={{ scale: 1.05, rotate: 0 }}
          whileTap={{ scale: 0.98 }}
          className="share-sticky-note relative inline-flex h-10 items-center gap-2 rounded-xl border-[1.5px] border-[#E07A5F] bg-[#FDF6E9] px-5 py-3 font-sans text-sm font-medium text-[#9E2B25] shadow-lg"
        >
          <Share2 size={16} />
          Share
          <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ type: "spring", stiffness: 260, damping: 18 }}>
            <ChevronDown size={14} />
          </motion.span>
        </motion.button>
      </Scribble>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-label="Share your Horizon dashboard"
            data-html2canvas-ignore="true"
            data-snapshot-ignore="true"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ type: "spring", damping: 20 }}
            className="absolute bottom-full right-0 mb-3 w-[min(92vw,28rem)] overflow-hidden rounded-2xl border border-[#E9DCCB] bg-[#FDF6E9]/95 shadow-xl backdrop-blur-md"
          >
            <motion.span aria-hidden="true" className="pointer-events-none absolute right-5 top-4 text-[#E07A5F]" animate={{ rotate: [0, 14, 0], scale: [0.85, 1.12, 0.85] }} transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}>
              <Star size={15} />
            </motion.span>
            <motion.span aria-hidden="true" className="pointer-events-none absolute right-10 top-8 text-[#F2B76B]" animate={{ rotate: [0, -12, 0], y: [0, -3, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
              <Star size={9} />
            </motion.span>

            <div className="border-b border-[#E9DCCB] px-5 py-4 pr-14">
              <h2 className="text-base font-bold text-[#1A1E32]">Share your journey</h2>
              <p className="mt-1 text-xs text-[#75675B]">Choose how you want to share today&apos;s progress.</p>
            </div>

            <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }} className="mx-3 mt-3 rounded-xl px-3 py-3 transition-colors duration-200 hover:bg-[#FFF3E0]">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#1A1E32]"><Link2 size={17} /></span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-[#1A1E32]">Share Live Link</h3>
                  <p className="mt-1 text-xs leading-5 text-[#75675B]">Updates automatically as you code ·</p>
                  <Scribble type="circle" color="#E07A5F" show={showLinkCircle} iterations={1} padding={3} multiline={false} className="share-live-link mt-1">
                    <a href={liveLink} target="_blank" rel="noreferrer" className="break-all text-xs font-medium text-[#1A1E32] underline decoration-[#E07A5F]/60 underline-offset-2">{liveLink}</a>
                  </Scribble>
                  {copyError && <p role="alert" className="mt-1 text-xs text-[#9E2B25]">{copyError}</p>}
                </div>
                <div className="relative shrink-0 pt-1">
                  <motion.button type="button" onClick={copyLiveLink} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="min-w-[5.5rem] rounded-full bg-[#1A1E32] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#272D48]">
                    <Scribble type="underline" color="#E07A5F" show={copied} iterations={1} padding={2} multiline={false}>
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.span key={copied ? "copied" : "copy"} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.18 }}>
                          {copied ? "Copied! ✓" : "Copy link"}
                        </motion.span>
                      </AnimatePresence>
                    </Scribble>
                  </motion.button>
                  <AnimatePresence>
                    {copied && copyParticles.map((particle, index) => (
                      <motion.span key={index} aria-hidden="true" initial={{ opacity: 1, x: 0, y: 0, scale: 0.4 }} animate={{ opacity: 0, x: particle.x, y: particle.y, scale: 1, rotate: index % 2 ? 24 : -24 }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} className="pointer-events-none absolute left-1/2 top-1/2 z-10" style={{ color: particle.color }}>
                        <Star size={12} fill="currentColor" />
                      </motion.span>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
              <motion.svg className="share-wobbly-arrow pointer-events-none ml-auto mr-16 mt-1 h-7 w-20 text-[#E07A5F]" viewBox="0 0 80 28" fill="none" aria-hidden="true" initial="hidden" animate={isOpen ? "visible" : "hidden"}>
                <motion.path d="M2 5C26 4 39 10 61 19M61 19L49 18M61 19L55 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="80" variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1 } }} transition={{ delay: 0.35, duration: 0.8, ease: "easeInOut" }} />
              </motion.svg>
            </motion.div>

            <motion.button type="button" aria-label={`Capture dashboard snapshot with ${profileLinkCount} profile links`} disabled={isCapturing} onClick={captureDashboard} whileHover={{ x: 4 }} transition={{ duration: 0.2 }} className="mx-3 mt-1 flex w-[calc(100%-1.5rem)] items-start gap-3 rounded-xl px-3 py-3 text-left transition-colors duration-200 hover:bg-[#FFF3E0] disabled:cursor-wait disabled:opacity-70">
              <motion.span animate={isCapturing ? { scale: [1, 1.18, 1] } : { scale: 1 }} transition={{ duration: 0.8, repeat: isCapturing ? Infinity : 0, ease: "easeInOut" }} className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#1A1E32]">
                <Camera size={17} />
              </motion.span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-[#1A1E32]">Share Snapshot</span>
                <span className="mt-1 block text-xs leading-5 text-[#75675B]">Saves today&apos;s view as an image you can download</span>
                {isCapturing && <span className="mt-2 block text-xs font-medium text-[#9E2B25]">Capturing...</span>}
              </span>
            </motion.button>

            {captureError && <p role="alert" className="mx-6 mt-1 text-xs text-[#9E2B25]">{captureError}</p>}

            <AnimatePresence initial={false}>
              {snapshot && (
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.45, ease: "easeInOut" }} className="relative mx-5 mb-3 mt-2 rounded-lg bg-white p-2 shadow-md">
                  <motion.span aria-hidden="true" initial={{ opacity: 0, y: -8, rotate: -12 }} animate={{ opacity: 0.85, y: 0, rotate: -5 }} transition={{ type: "spring", damping: 16, delay: 0.2 }} className="absolute -top-2 left-1/2 z-20 h-5 w-16 -translate-x-1/2 rotate-[-5deg] bg-[#E9B9A6]/75 shadow-sm" />
                  <img src={snapshot} alt="Preview of the dashboard snapshot" className="block max-h-44 w-full rounded-md border border-[#E9DCCB] object-contain" />
                  <span aria-hidden="true" className="snapshot-corner-fold absolute right-2 top-2" />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between gap-2 border-t border-[#E9DCCB] px-5 py-3">
              <p className="text-[10px] leading-4 text-[#75675B] sm:text-xs">Snapshot will be saved as PNG • 1600x900</p>
              <div className="relative shrink-0">
                <Scribble type="box" hover show={Boolean(snapshot)} color="#E07A5F" iterations={1} padding={4} className="scribble-hover-target">
                  <motion.button type="button" disabled={!snapshot} onClick={downloadSnapshot} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-1.5 rounded-full bg-[#1A1E32] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#272D48] disabled:cursor-not-allowed disabled:opacity-45">
                    <Download size={14} /> Download PNG
                  </motion.button>
                </Scribble>
                <AnimatePresence>
                  {showDownloadConfetti && downloadParticles.map((particle, index) => (
                    <motion.span key={index} aria-hidden="true" initial={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 0.3 }} animate={{ opacity: 0, x: particle.x, y: particle.y, rotate: index % 2 ? 80 : -80, scale: 1.15 }} exit={{ opacity: 0 }} transition={{ duration: 0.9, ease: "easeOut" }} className="pointer-events-none absolute left-1/2 top-1/2 z-20 text-sm" style={{ color: particle.color }}>
                      {particle.shape === "triangle" ? "▲" : "✦"}
                    </motion.span>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}