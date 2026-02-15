import { verifyPassword, createSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { password } = await request.json();

        if (!verifyPassword(password)) {
            return NextResponse.json(
                { error: "Mot de passe incorrect" },
                { status: 401 }
            );
        }

        await createSession();
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json(
            { error: "Erreur serveur" },
            { status: 500 }
        );
    }
}
