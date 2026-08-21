import { useContext, useState } from "react";
import { Pencil } from "lucide-react";
import { AuthContext } from "../../../../context/AuthContext";
import { mockProfile } from "./mockProfile";

export default function ProfileForm({ onSave }) {
  const { user } = useContext(AuthContext);
  
  // Map backend fields to form fields
  const initialData = user ? {
    name: user.fullName || user.username || "",
    username: user.username || "",
    designation: user.designation || "",
    bio: user.bio || "",
    image: user.profilePhoto || "",
    location: user.location || "",
    currentCompany: user.currentCompany || "",
    yearsOfExperience: user.yearsOfExperience ?? "",
    availabilityStatus: user.availabilityStatus || "",
    primaryFocus: user.primaryFocus || "",
  } : mockProfile;

  const [profile, setProfile] = useState(initialData);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(profile.image || "");

  function updateField(field, value) {
    setProfile((p) => ({ ...p, [field]: value }));
  }

  function handleSave(e) {
    e.preventDefault();
    if (onSave) onSave({
      fullName: profile.name,
      designation: profile.designation,
      bio: profile.bio,
      profilePhoto: profile.image,
      location: profile.location,
      currentCompany: profile.currentCompany,
      yearsOfExperience: profile.yearsOfExperience === "" ? null : Number(profile.yearsOfExperience),
      availabilityStatus: profile.availabilityStatus,
      primaryFocus: profile.primaryFocus,
      githubUsername: profile.githubUsername,
      leetcodeUsername: profile.leetcodeUsername,
      codeforcesUsername: profile.codeforcesUsername,
    });
  }

  function handleFileInput(file) {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setProfile((p) => ({ ...p, image: url }));
  }

  function handleCloudUrl(url) {
    setPreviewUrl(url);
    setProfile((p) => ({ ...p, image: url }));
  }

  return (
    <>
    <form onSubmit={handleSave} className="rounded-3xl border border-[#E8DCCF] bg-white p-6 shadow-sm">
      <div className="flex items-start gap-6">
        <div className="relative flex h-20 w-20 items-center">
          <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-[#F4B643] bg-[#FFF8EF]">
            {previewUrl ? (
              <img src={previewUrl} alt={profile.name} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center bg-[#F4B643] text-2xl font-semibold text-[#2D4C59]">{profile.name?.charAt(0).toUpperCase()}</div>
            )}
          </div>

          <button type="button" onClick={() => setShowPhotoModal(true)} className="absolute right-0 bottom-0 flex h-8 w-8 items-center justify-center rounded-full bg-white border border-[#E8DCCF] shadow-sm">
            <Pencil size={14} />
          </button>
        </div>

        <div className="flex-1">
          <label className="text-sm font-semibold text-[#2D4C59]">Name</label>
          <input value={profile.name || ""} onChange={(e) => updateField("name", e.target.value)} className="mt-1 w-full rounded-md border border-[#E8DCCF] p-2" />

          <label className="mt-3 text-sm font-semibold text-[#2D4C59]">Designation</label>
          <input value={profile.designation || ""} onChange={(e) => updateField("designation", e.target.value)} className="mt-1 w-full rounded-md border border-[#E8DCCF] p-2" />

          <label className="mt-3 text-sm font-semibold text-[#2D4C59]">Bio</label>
          <textarea value={profile.bio || ""} onChange={(e) => updateField("bio", e.target.value)} className="mt-1 w-full rounded-md border border-[#E8DCCF] p-2" />

          <label className="mt-3 text-sm font-semibold text-[#2D4C59]">Location</label>
          <input value={profile.location || ""} onChange={(e) => updateField("location", e.target.value)} className="mt-1 w-full rounded-md border border-[#E8DCCF] p-2" />

          <label className="mt-3 text-sm font-semibold text-[#2D4C59]">Current company</label>
          <input value={profile.currentCompany || ""} onChange={(e) => updateField("currentCompany", e.target.value)} className="mt-1 w-full rounded-md border border-[#E8DCCF] p-2" />

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <label className="text-sm font-semibold text-[#2D4C59]">Years of experience<input type="number" min="0" value={profile.yearsOfExperience} onChange={(e) => updateField("yearsOfExperience", e.target.value)} className="mt-1 w-full rounded-md border border-[#E8DCCF] p-2" /></label>
            <label className="text-sm font-semibold text-[#2D4C59]">Availability<input value={profile.availabilityStatus || ""} onChange={(e) => updateField("availabilityStatus", e.target.value)} className="mt-1 w-full rounded-md border border-[#E8DCCF] p-2" /></label>
          </div>

          <label className="mt-3 text-sm font-semibold text-[#2D4C59]">Primary technical focus</label>
          <input value={profile.primaryFocus || ""} onChange={(e) => updateField("primaryFocus", e.target.value)} className="mt-1 w-full rounded-md border border-[#E8DCCF] p-2" />

          {/* hide direct path input in favor of photo modal */}

          <div className="mt-4 text-right">
            <button type="submit" className="rounded-full bg-[#F4B643] px-4 py-2 font-semibold text-[#2D4C59]">Save</button>
          </div>
        </div>
      </div>
    </form>

    {showPhotoModal ? (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40" onClick={() => setShowPhotoModal(false)} />
        <div className="z-10 w-[560px] rounded-2xl bg-white p-6">
          <h3 className="text-lg font-semibold">Add profile photo</h3>
          <p className="mt-2 text-sm text-[#5E6F78]">Upload from your device or provide a cloud URL.</p>

          <div className="mt-4 flex gap-4">
            <div className="flex-1">
              <label className="text-sm font-semibold text-[#2D4C59]">From your device</label>
              <input type="file" accept="image/*" onChange={(e) => handleFileInput(e.target.files?.[0])} className="mt-2 w-full" />
            </div>
            <div className="flex-1">
              <label className="text-sm font-semibold text-[#2D4C59]">Cloud URL</label>
              <input type="text" onBlur={(e) => handleCloudUrl(e.target.value)} placeholder="https://..." className="mt-2 w-full rounded-md border border-[#E8DCCF] p-2" />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <button onClick={() => setShowPhotoModal(false)} className="rounded-md border border-[#E8DCCF] px-3 py-2">Cancel</button>
            <button onClick={() => { setShowPhotoModal(false); }} className="rounded-md bg-[#F4B643] px-3 py-2 font-semibold text-[#2D4C59]">Done</button>
          </div>
        </div>
      </div>
    ) : null}
    </>
  );
}
