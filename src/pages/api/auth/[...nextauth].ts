import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    pages: {
        signIn: '/',
    },
    callbacks: {
        async session({ session, token, user }: any) {
            return session;
        },
        async jwt({ token, user, account, profile }: any) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
    },
};

export default NextAuth(authOptions); 