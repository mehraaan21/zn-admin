// import { signOut } from "next-auth/react";
// import { redirect } from "next/navigation";

// export async function apiFetch(url, options = {}) {
//   const response = await fetch(url, options);

//   if (response.status === 401) {
//     if (typeof window !== "undefined") {
//       await signOut({ callbackUrl: "/auth/sign-in" });
//     } else {
//       redirect("/auth/logout");
//     }
//   }

//   return response;
// }



// export async function apiFetch(url, options = {}) {
//   const res = await fetch(url, {
//     ...options,
//     credentials: "include",
//   });

//   if (!res.ok) {
//     throw new Error("API error");
//   }

//   return res.json();
// }
