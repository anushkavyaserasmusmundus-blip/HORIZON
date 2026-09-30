import { createContext, useState, useEffect } from "react";
import { getProfile, updateProfile } from "../services/profileService";

function readStoredToken() {
    try {
        return localStorage.getItem("token") || null;
    } catch {
        return null;
    }
}

// The context is intentionally exported alongside its provider for consumers.
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(readStoredToken);

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(() => Boolean(readStoredToken()));

    useEffect(() => {
        if (!token) return undefined;
        let isActive = true;

        getProfile()
            .then((data) => {
                if (isActive) setUser(data);
            })
            .catch((error) => {
                if (!isActive) return;
                console.error("Failed to fetch user profile:", error);
                setUser(null);
            })
            .finally(() => {
                if (isActive) setLoading(false);
            });

        return () => {
            isActive = false;
        };
    }, [token]);

    function login(newToken) {
        localStorage.setItem("token", newToken);
        setUser(null);
        setLoading(true);
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
        setLoading(false);
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