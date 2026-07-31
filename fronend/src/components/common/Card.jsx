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
      {title && <h2 className="mb-4 text-xl font-semibold">{title}</h2>}

      {children}
    </div>
  );
}