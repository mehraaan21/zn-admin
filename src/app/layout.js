import "./globals.css";
import AuthProvider from "../context/AuthProvider";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Admin Panel",
  description: "Next.js Admin Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="flex">
            <main className="flex-1">
              {children}
              <Toaster position="top-center" />
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
