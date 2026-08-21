import { createContext, useState, useEffect } from "react";
import { getProfile, updateProfile } from "../services/profileService";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(
        localStorage.getItem("token") || null
    );

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (token) {
            setLoading(true);

            getProfile()
                .then((data) => {
                    console.log("AUTH CONTEXT PROFILE:", data);
                    setUser(data);
                })
                .catch((err) => {
                    console.error("Failed to fetch user profile:", err);
                    setUser(null);
                })
                .finally(() => setLoading(false));
        } else {
            setUser(null);
        }
    }, [token]);

    function login(newToken) {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    }

    async function updateUserProfile(profileData) {
    const updatedUser = await updateProfile(profileData);

    setUser(updatedUser);

    return updatedUser;
}

    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("profileSkills");

        setToken(null);
        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                login,
                logout,
                updateUserProfile,
                isAuthenticated: !!token,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}