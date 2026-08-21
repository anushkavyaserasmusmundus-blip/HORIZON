const API_BASE = "http://127.0.0.1:8081/api/v1/profile";

export async function getProfile() {
    const token = localStorage.getItem("token");

    const response = await fetch(API_BASE, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch profile");
    }

    return response.json();
}

export async function updateProfile(profileData) {
    const token = localStorage.getItem("token");

    const response = await fetch(API_BASE, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(profileData)
    });

    if (!response.ok) {
        throw new Error("Failed to update profile");
    }

    return response.json();
}