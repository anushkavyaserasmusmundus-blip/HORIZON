import { mockProfile } from "./mockProfile";

export default function ProfileCard() {
  return (
    <div className="rounded-3xl border border-[#F2D5A5] bg-[#FFFDF8] p-4 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-[#F4B643] bg-[#FFF8EF] text-2xl font-semibold text-[#C84D38]">
          {mockProfile.image ? (
            <img src={mockProfile.image} alt={mockProfile.name} className="h-full w-full object-cover" />
          ) : (
            <span>{mockProfile.name.charAt(0)}</span>
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#2D4C59]">{mockProfile.name}</h3>
          <p className="text-sm text-[#C84D38]">{mockProfile.designation}</p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-[#5E6F78]">“{mockProfile.bio}”</p>
    </div>
  );
}
