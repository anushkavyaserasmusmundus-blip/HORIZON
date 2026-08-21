import { useEffect, useState } from "react";
import { getProfile } from "../../services/profileService";

export default function WelcomeCard() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getProfile()
      .then((data) => setProfile(data))
      .catch((error) => console.error("Failed to load profile:", error));
  }, []);

  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold">
        Welcome back, {profile?.username || "User"} 👋
      </h1>

      <p className="mt-2 text-gray-600">
        Your personal growth operating system.
      </p>
    </div>
  );
}