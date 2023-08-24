import NextAuth, { NextAuthOptions } from 'next-auth'
import FacebookProvider from 'next-auth/providers/facebook'

export const authOptions: NextAuthOptions = {
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID || '',
      clientSecret: process.env.FACEBOOK_SECRET || '',
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      token.userRole = 'admin'
      return token
    },
  },
}

export default NextAuth(authOptions)
