import { verifySession } from "@/lib/auth";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";

export const metadata = {
    title: "Admin — Landing Factory",
    robots: "noindex, nofollow",
};

export default async function AdminPage() {
    const isAuth = await verifySession();
    if (isAuth) redirect("/admin/edit");

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "1rem",
            }}
        >
            <LoginForm />
        </div>
    );
}
