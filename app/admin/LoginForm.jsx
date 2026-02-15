"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                router.push("/admin/edit");
            } else {
                setError("Mot de passe incorrect");
            }
        } catch {
            setError("Erreur de connexion");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "400px" }}>
            <div
                style={{
                    background: "#1E293B",
                    border: "1px solid #334155",
                    borderRadius: "0.75rem",
                    padding: "2rem",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                }}
            >
                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                    <div
                        style={{
                            fontSize: "2rem",
                            marginBottom: "0.5rem",
                        }}
                    >
                        🏭
                    </div>
                    <h1
                        style={{
                            fontSize: "1.25rem",
                            fontWeight: 600,
                            margin: 0,
                            color: "#F8FAFC",
                        }}
                    >
                        Landing Factory
                    </h1>
                    <p
                        style={{
                            fontSize: "0.875rem",
                            color: "#94A3B8",
                            marginTop: "0.25rem",
                        }}
                    >
                        Accès administration
                    </p>
                </div>

                {/* Password input */}
                <div style={{ marginBottom: "1rem" }}>
                    <label
                        htmlFor="password"
                        style={{
                            display: "block",
                            fontSize: "0.875rem",
                            fontWeight: 500,
                            color: "#E2E8F0",
                            marginBottom: "0.5rem",
                        }}
                    >
                        Mot de passe
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Entrer le mot de passe"
                        required
                        style={{
                            width: "100%",
                            padding: "0.625rem 0.875rem",
                            background: "#0F172A",
                            border: "1px solid #334155",
                            borderRadius: "0.5rem",
                            color: "#F8FAFC",
                            fontSize: "0.875rem",
                            outline: "none",
                            boxSizing: "border-box",
                            transition: "border-color 200ms",
                        }}
                        onFocus={(e) =>
                            (e.target.style.borderColor = "#3B82F6")
                        }
                        onBlur={(e) =>
                            (e.target.style.borderColor = "#334155")
                        }
                    />
                </div>

                {/* Error message */}
                {error && (
                    <p
                        style={{
                            fontSize: "0.875rem",
                            color: "#EF4444",
                            marginBottom: "1rem",
                            textAlign: "center",
                        }}
                    >
                        {error}
                    </p>
                )}

                {/* Submit button */}
                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "0.625rem",
                        background: loading ? "#1E40AF" : "#3B82F6",
                        color: "#FFFFFF",
                        border: "none",
                        borderRadius: "0.5rem",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        cursor: loading ? "not-allowed" : "pointer",
                        transition: "background 200ms",
                    }}
                    onMouseEnter={(e) => {
                        if (!loading) e.target.style.background = "#2563EB";
                    }}
                    onMouseLeave={(e) => {
                        if (!loading) e.target.style.background = "#3B82F6";
                    }}
                >
                    {loading ? "Connexion..." : "Se connecter"}
                </button>
            </div>
        </form>
    );
}
