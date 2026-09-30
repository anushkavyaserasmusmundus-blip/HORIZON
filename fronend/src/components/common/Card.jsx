import Scribble from "../ui/Scribble.tsx";

export default function Card({ title, children, className = "" }) {
  return (
    <div
      className={`
        bg-[#FFF8EF]
        rounded-[24px]
        border
        border-[#F2D5A5]
        shadow-sm
        hover:shadow-md
        transition-all
        duration-300
        p-4
        ${className}
      `.trim()}
    >
      {title && <h2 className="mb-4 text-xl font-semibold"><Scribble type="underline" hover className="scribble-inline">{title}</Scribble></h2>}

      {children}
    </div>
  );
}