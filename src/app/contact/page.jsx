import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import ContactsClient from "./ContactsClient";

export default async function ContactsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    redirect("/log-in");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/contacts`,
    {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch contacts");
  }

 const response = await res.json();

// correct extraction
const contacts = response?.data?.data || [];
    

  return <ContactsClient contacts={contacts} />;
}