// import { apiFetch } from "./apiFetch";

// export async function fetchWithAuth(endpoint, token, method = "GET", body) {
//   const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;  

//   const res = await apiFetch(`${API_BASE_URL}/${endpoint}`, {
//     method,
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: body ? JSON.stringify(body) : undefined,
//     cache: "no-store",
//   });

//   return res.json();
// }
