const API_BASE = "http://127.0.0.1:8081/api/v1/auth";

async function sendAuthRequest(path, data) {
    let response;
    try {
        response = await fetch(`${API_BASE}/${path}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
    } catch (error) {
        if (error instanceof TypeError) {
            throw Object.assign(new Error("Network request failed"), { kind: "network" });
        }
        throw Object.assign(new Error("Unexpected request failure"), { kind: "unexpected" });
    }

    let payload = null;
    try {
        payload = await response.json();
    } catch {
        // Some error responses intentionally have no body.
    }

    if (!response.ok) {
        const backendMessage = [payload?.message, payload?.detail, payload?.error]
            .find((value) => typeof value === "string") || "";
        const knownCredentialFailure = ["User not found", "Invalid password"].includes(backendMessage);
        throw Object.assign(new Error("Authentication request failed"), {
            status: response.status,
            knownCredentialFailure,
        });
    }

    return payload;
}

export async function loginUser(credentials) {
    const data = await sendAuthRequest("login", credentials);
    if (!data?.token) {
        throw Object.assign(new Error("Authentication response was incomplete"), { kind: "unexpected" });
    }
    return data;
}

export function getLoginErrorMessage(error) {
    if (error?.kind === "network") return "Unable to connect to the server. Please try again.";
    if (error?.knownCredentialFailure || error?.status === 401 || error?.status === 403) {
        return "Incorrect email or password.";
    }
    if (error?.status >= 500) return "We couldn't sign you in. Check your details or try again shortly.";
    if (error?.status === 429) return "Too many attempts. Please wait a moment and try again.";
    if (error?.status) return "We couldn't sign you in. Please check your details and try again.";
    return "Something went wrong while signing in. Please try again.";
}

export async function registerUser(userData) {
    return sendAuthRequest("register", userData);
}

export function getRegistrationErrorMessage(error) {
    if (error?.kind === "network") return "Unable to connect to the server. Please try again.";
    if (error?.status === 409) return "An account with these details already exists. Please log in or choose a different username.";
    if (error?.status === 429) return "Too many attempts. Please wait a moment and try again.";
    if (error?.status >= 500) return "We couldn't create your account. Check your details or try again shortly.";
    if (error?.status) return "We couldn't create your account. Please review your details and try again.";
    return "Something went wrong while creating your account. Please try again.";
}