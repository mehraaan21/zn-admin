import "./globals.css";
import LoginPage from "./(auth)/log-in/page";

export const metadata = {
  title: "Admin Panel",
  description: "Next.js Admin Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LoginPage />
      </body>
    </html>
  );
}
