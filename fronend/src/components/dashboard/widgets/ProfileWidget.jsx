import { useEffect, useState } from "react";
import { getProfile } from "../../../services/profileService";

function ProfileWidget() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProfile() {
            try {
                const data = await getProfile();
                setProfile(data);
            } catch (error) {
                console.error("Profile loading failed:", error);
            } finally {
                setLoading(false);
            }
        }

        loadProfile();
    }, []);

    if (loading) {
        return (
            <div className="p-6">
                Loading profile...
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="p-6">
                Unable to load profile.
            </div>
        );
    }

    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold">
                {profile.username}
            </h2>

            <p className="text-gray-500">
                {profile.email}
            </p>

            <p className="text-sm text-gray-400 mt-2">
                {profile.role}
            </p>
        </div>
    );
}

export default ProfileWidget;