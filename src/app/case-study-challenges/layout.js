import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Breadcrumb from "@/components/Breadcrumb";

export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/log-in");

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        <Header />
        <Breadcrumb />
        {children}
      </main>
    </div>
  );
}
