const API_BASE = "http://127.0.0.1:8081/api/v1/auth";

export async function loginUser(credentials) {
    const response = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        throw new Error("Login failed");
    }

    const data = await response.json();

    return data;
}

export async function registerUser(userData) {
    const response = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error("Registration failed");
    }

    return response.json();
}