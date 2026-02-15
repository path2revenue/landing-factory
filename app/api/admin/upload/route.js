import { verifySession } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const isAuth = await verifySession();
        if (!isAuth) {
            return NextResponse.json(
                { error: "Non autorisé" },
                { status: 401 }
            );
        }

        if (!supabase) {
            return NextResponse.json(
                { error: "Supabase non configuré" },
                { status: 500 }
            );
        }

        const formData = await request.formData();
        const file = formData.get("file");
        const folder = formData.get("folder") || process.env.SITE_ID || "default";

        if (!file) {
            return NextResponse.json(
                { error: "Pas de fichier" },
                { status: 400 }
            );
        }

        const ext = file.name.split(".").pop();
        const fileName = `${folder}/${Date.now()}.${ext}`;

        const { data, error } = await supabase.storage
            .from("site-images")
            .upload(fileName, file, {
                contentType: file.type,
                upsert: false,
            });

        if (error) throw error;

        const {
            data: { publicUrl },
        } = supabase.storage.from("site-images").getPublicUrl(data.path);

        return NextResponse.json({ url: publicUrl, path: data.path });
    } catch (err) {
        return NextResponse.json(
            { error: err.message || "Erreur upload" },
            { status: 500 }
        );
    }
}
