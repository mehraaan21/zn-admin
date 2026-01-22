import "./globals.css";
import AuthProvider from "../context/AuthProvider";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";

export const metadata = {
  title: "Admin Panel",
  description: "Next.js Admin Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <div className="flex">
            <main className="flex-1">
              {children}
              <Toaster position="top-center" />
            </main>
          </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
    
  );
}
