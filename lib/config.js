import { supabase } from "./supabase";
import { siteConfig as fileConfig } from "@/site.config";

const SITE_ID = process.env.SITE_ID || "default";

/**
 * Get config for current site.
 * Priority: Supabase DB → file fallback (site.config.js)
 */
export async function getConfig() {
    if (!supabase) return { config: fileConfig, isOnboarded: false };

    const { data, error } = await supabase
        .from("site_configs")
        .select("config, is_onboarded")
        .eq("site_id", SITE_ID)
        .single();

    if (error || !data) {
        return { config: fileConfig, isOnboarded: false };
    }

    return {
        config: data.config,
        isOnboarded: data.is_onboarded,
    };
}

/**
 * Save config for current site (upsert).
 */
export async function saveConfig(config, isOnboarded = true) {
    if (!supabase) throw new Error("Supabase not configured");

    const { error } = await supabase.from("site_configs").upsert(
        {
            site_id: SITE_ID,
            config,
            is_onboarded: isOnboarded,
        },
        { onConflict: "site_id" }
    );

    if (error) throw error;
    return { success: true };
}

/**
 * Check if site has completed onboarding.
 */
export async function isOnboarded() {
    if (!supabase) return false;

    const { data } = await supabase
        .from("site_configs")
        .select("is_onboarded")
        .eq("site_id", SITE_ID)
        .single();

    return data?.is_onboarded ?? false;
}
