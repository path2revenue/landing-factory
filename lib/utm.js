/**
 * UTM Attribution Tracking Utility
 * 
 * Captures UTM parameters from URL, persists them in cookies (30 days),
 * and provides a function to inject them into GHL calendar iframe URLs.
 * 
 * Supported params: utm_source, utm_medium, utm_campaign, utm_content, utm_term, ref, fbclid, gclid
 */

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "ref", "fbclid", "gclid"];
const COOKIE_NAME = "utm_data";
const COOKIE_DAYS = 30;

/** Set a cookie with expiry in days */
function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires};path=/;SameSite=Lax`;
}

/** Get a cookie value by name */
function getCookie(name) {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? decodeURIComponent(match[2]) : null;
}

/**
 * Capture UTM params from the current URL and store in cookie.
 * Only overwrites if new UTMs are present (first-touch attribution preserved).
 * Call this once on page load.
 */
export function captureUTMs() {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const utms = {};
    let hasAny = false;

    for (const key of UTM_KEYS) {
        const val = params.get(key);
        if (val) {
            utms[key] = val;
            hasAny = true;
        }
    }

    // Only overwrite cookie if new UTMs are present in URL
    if (hasAny) {
        setCookie(COOKIE_NAME, JSON.stringify(utms), COOKIE_DAYS);
    }
}

/**
 * Get stored UTM data from cookie.
 * @returns {Object|null} UTM params object or null
 */
export function getUTMs() {
    if (typeof window === "undefined") return null;

    const raw = getCookie(COOKIE_NAME);
    if (!raw) return null;

    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

/**
 * Append stored UTM params to a GHL calendar URL.
 * @param {string} baseUrl - The GHL calendar embed URL
 * @returns {string} URL with UTM params appended
 */
export function appendUTMsToUrl(baseUrl) {
    const utms = getUTMs();
    if (!utms || Object.keys(utms).length === 0) return baseUrl;

    try {
        const url = new URL(baseUrl);
        for (const [key, value] of Object.entries(utms)) {
            url.searchParams.set(key, value);
        }
        return url.toString();
    } catch {
        // Fallback: append as query string
        const separator = baseUrl.includes("?") ? "&" : "?";
        const qs = Object.entries(utms)
            .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
            .join("&");
        return `${baseUrl}${separator}${qs}`;
    }
}
