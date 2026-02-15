import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE_NAME = "lf_admin_session";
const SECRET = process.env.ADMIN_PASSWORD || "";
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

/**
 * Create HMAC signature from password + timestamp.
 */
function sign(timestamp) {
    return crypto
        .createHmac("sha256", SECRET)
        .update(`${SECRET}:${timestamp}`)
        .digest("hex");
}

/**
 * Verify password against ADMIN_PASSWORD env var.
 */
export function verifyPassword(password) {
    if (!SECRET) return false;
    return password === SECRET;
}

/**
 * Create a session cookie after successful login.
 */
export async function createSession() {
    const timestamp = Date.now().toString();
    const signature = sign(timestamp);
    const token = `${timestamp}.${signature}`;

    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: SESSION_DURATION / 1000,
        path: "/",
    });

    return true;
}

/**
 * Verify session cookie. Returns true if valid.
 */
export async function verifySession() {
    if (!SECRET) return false;

    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return false;

    const [timestamp, signature] = token.split(".");
    if (!timestamp || !signature) return false;

    // Check expiry
    const age = Date.now() - parseInt(timestamp, 10);
    if (age > SESSION_DURATION) return false;

    // Verify HMAC
    const expected = sign(timestamp);
    return crypto.timingSafeEqual(
        Buffer.from(signature, "hex"),
        Buffer.from(expected, "hex")
    );
}

/**
 * Destroy session (logout).
 */
export async function destroySession() {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
}
