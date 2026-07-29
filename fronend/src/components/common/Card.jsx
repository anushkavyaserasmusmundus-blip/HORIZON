export default function Card({ title, children }) {
  return (
    <div
      className="
        bg-[#FFF8EF]
        rounded-2xl
        border
        border-[#F2D5A5]
        shadow-md
        p-6
      "
    >
      {title && (
        <h2 className="text-xl font-semibold mb-4">
          {title}
        </h2>
      )}

      {children}
    </div>
  );
}