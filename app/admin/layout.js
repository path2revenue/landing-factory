import { verifySession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
    title: "Admin — Landing Factory",
    robots: {
        index: false,
        follow: false,
        googleBot: {
            index: false,
            follow: false,
        },
    },
};

export default async function AdminLayout({ children }) {
    return (
        <div
            style={{
                fontFamily: "'Inter', sans-serif",
                minHeight: "100vh",
            }}
        >
            {children}
        </div>
    );
}
