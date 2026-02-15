"use client";

import { useState, useCallback } from "react";
import OnboardingWizard from "./OnboardingWizard";
import VisualEditor from "./VisualEditor";

export default function AdminEditor({ initialConfig, initialOnboarded }) {
    const [config, setConfig] = useState(initialConfig);
    const [isOnboarded, setIsOnboarded] = useState(initialOnboarded);
    const [saving, setSaving] = useState(false);
    const [saveMsg, setSaveMsg] = useState("");

    const saveToServer = useCallback(
        async (newConfig, onboarded = true) => {
            setSaving(true);
            setSaveMsg("");
            try {
                const res = await fetch("/api/admin/save", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        config: newConfig,
                        isOnboarded: onboarded,
                    }),
                });
                if (!res.ok) throw new Error("Erreur sauvegarde");
                setConfig(newConfig);
                setIsOnboarded(onboarded);
                setSaveMsg("✅ Sauvegardé");
                setTimeout(() => setSaveMsg(""), 2500);
            } catch (err) {
                setSaveMsg("❌ " + err.message);
            } finally {
                setSaving(false);
            }
        },
        []
    );

    if (!isOnboarded) {
        return (
            <OnboardingWizard
                config={config}
                onComplete={(finalConfig) => saveToServer(finalConfig, true)}
                saving={saving}
            />
        );
    }

    return (
        <VisualEditor
            config={config}
            onSave={saveToServer}
            saving={saving}
            saveMsg={saveMsg}
        />
    );
}
