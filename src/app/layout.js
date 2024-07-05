import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/utils/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "RealTime Chat App",
  description:
    "Full stack chat app with authentication and real-time capabilities with Appwrite",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
