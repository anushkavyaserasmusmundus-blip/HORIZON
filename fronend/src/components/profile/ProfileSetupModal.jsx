import { useState } from "react";

export default function ProfileSetupModal({ onSave }) {
    const [fullName, setFullName] = useState("");
    const [githubUsername, setGithubUsername] = useState("");
    const [codeforcesUsername, setCodeforcesUsername] = useState(""); 
    const [leetcodeUsername, setLeetcodeUsername] = useState(""); const [saving, setSaving] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!fullName.trim()) return;

        setSaving(true);

        try {
            await onSave({
                fullName: fullName.trim(),
                githubUsername: githubUsername.trim(),
                codeforcesUsername: codeforcesUsername.trim(), 
                leetcodeUsername: leetcodeUsername.trim(),
            });
        } catch (error) {
            console.error("Failed to save profile:", error);
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">

            <div className="w-full max-w-md rounded-[28px] bg-white p-8 shadow-2xl">

                <div className="mb-6 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF3D6] text-2xl">
                        👋
                    </div>

                    <h2 className="text-2xl font-bold text-[#2C3E50]">
                        Let's set up your profile
                    </h2>

                    <p className="mt-2 text-sm text-[#6B7280]">
                        These details will personalize your Horizon dashboard.
                    </p>
                </div>

                <form onSubmit={handleSubmit}>

                    {/* Name */}
                    <label className="mb-2 block text-sm font-medium text-[#2C3E50]">
                        Your name
                    </label>

                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Anushka"
                        className="w-full rounded-full border border-[#E5DED4] px-5 py-3 outline-none transition focus:border-[#F4B643] focus:ring-2 focus:ring-[#F4B643]/20"
                        autoFocus
                    />

                    {/* GitHub */}
                    <label className="mb-2 mt-4 block text-sm font-medium text-[#2C3E50]">
                        GitHub username
                    </label>

                    <input
                        type="text"
                        value={githubUsername}
                        onChange={(e) => setGithubUsername(e.target.value)}
                        placeholder="e.g. anushkavyas"
                        className="w-full rounded-full border border-[#E5DED4] px-5 py-3 outline-none transition focus:border-[#F4B643] focus:ring-2 focus:ring-[#F4B643]/20"
                    />

                    <p className="mt-2 text-xs text-[#8A8D95]">
                        Used to show your GitHub activity on Horizon.
                    </p>

                    {/* Codeforces */}
                    <label className="mb-2 mt-4 block text-sm font-medium text-[#2C3E50]">
                        Codeforces username
                    </label>

                    <input
                        type="text"
                        value={codeforcesUsername}
                        onChange={(e) => setCodeforcesUsername(e.target.value)}
                        placeholder="e.g. tourist"
                        className="w-full rounded-full border border-[#E5DED4] px-5 py-3 outline-none transition focus:border-[#F4B643] focus:ring-2 focus:ring-[#F4B643]/20"
                    />

                    <p className="mt-2 text-xs text-[#8A8D95]">
                        Used to show your Codeforces activity on Horizon.
                    </p>

                    {/* LeetCode */}
                    <label className="mb-2 mt-4 block text-sm font-medium text-[#2C3E50]">
                        LeetCode username
                    </label>

                    <input
                        type="text"
                        value={leetcodeUsername}
                        onChange={(e) => setLeetcodeUsername(e.target.value)}
                        placeholder="e.g. anushkavyas"
                        className="w-full rounded-full border border-[#E5DED4] px-5 py-3 outline-none transition focus:border-[#F4B643] focus:ring-2 focus:ring-[#F4B643]/20"
                    />

                    <p className="mt-2 text-xs text-[#8A8D95]">
                        Used to show your LeetCode activity on Horizon.
                    </p>

                    <button
                        type="submit"
                        disabled={!fullName.trim() || saving}
                        className="mt-5 w-full rounded-full bg-[#F4B643] py-3 font-semibold text-[#2C3E50] transition hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {saving ? "Saving..." : "Continue"}
                    </button>

                </form>
            </div>
        </div>
    );
}