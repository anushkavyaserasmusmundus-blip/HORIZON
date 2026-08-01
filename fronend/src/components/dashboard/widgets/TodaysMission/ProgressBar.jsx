export default function ProgressBar({ progress }) {
  return (
    <div className="mt-4">
      <div className="mb-1 flex items-center justify-between text-[12px] text-[#5E6F78]">
        <span>Daily completion</span>
        <span className="font-semibold text-[#2D4C59]">{Math.round(progress)}%</span>
      </div>
      <div className="h-2 rounded-full bg-[#FBE7CC]">
        <div className="h-2 rounded-full bg-[#F4B643] transition-all duration-300" style={{ width: `${Math.max(progress, 6)}%` }} />
      </div>
    </div>
  );
}
