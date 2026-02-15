import { verifySession } from "@/lib/auth";
import { getConfig } from "@/lib/config";
import { redirect } from "next/navigation";
import AdminEditor from "./AdminEditor";

export const metadata = {
    title: "Édition — Landing Factory",
    robots: "noindex, nofollow",
};

export default async function EditPage() {
    const isAuth = await verifySession();
    if (!isAuth) redirect("/admin");

    const { config, isOnboarded } = await getConfig();

    return <AdminEditor initialConfig={config} initialOnboarded={isOnboarded} />;
}
