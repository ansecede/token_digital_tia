import { Metadata } from "next";
import Navbar from "../components/navbar/Navbar";
import "./globals.css";

export const metadata: Metadata = {
    title: "Token Digital Tia",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="bg-zinc-900 text-gray-200 min-h-screen">
                <Navbar />
                <main className="h-screen pt-20">{children}</main>
            </body>
        </html>
    );
}
