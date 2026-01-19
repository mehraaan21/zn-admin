
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );
          //console.log(res);
          const data = await res.json();
          console.log(data);

          if (!res.ok || !data?.data) {
            return null;
          }

          // ✅ MUST return user object
          return {
            id: data.data.id,
            name: data.data.name,
            email: data.data.email,
            accessToken: data.token,
          };
        } catch (error) {
            console.log(data);
          console.error("LOGIN ERROR:", error);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.accessToken = token.accessToken;
      return session;
    },
  },

  pages: {
    signIn: "/log-in",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
