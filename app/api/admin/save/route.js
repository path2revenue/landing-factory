import { verifySession } from "@/lib/auth";
import { saveConfig } from "@/lib/config";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request) {
    try {
        const isAuth = await verifySession();
        if (!isAuth) {
            return NextResponse.json(
                { error: "Non autorisé" },
                { status: 401 }
            );
        }

        const { config, isOnboarded } = await request.json();
        await saveConfig(config, isOnboarded ?? true);

        // Revalidate the homepage so ISR picks up changes
        revalidatePath("/");

        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json(
            { error: err.message || "Erreur serveur" },
            { status: 500 }
        );
    }
}
