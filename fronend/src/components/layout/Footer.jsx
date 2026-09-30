export default function Footer({ className = "", align = "center" }) {
  return (
    <footer className={`${align === "left" ? "text-left" : "text-center"} text-xs font-semibold tracking-[0.08em] text-[#B7796B] ${className}`}>
      made with love - by Anushka Vyas
    </footer>
  );
}
