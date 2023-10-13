import NextAuth, { NextAuthOptions } from 'next-auth'
import FacebookProvider from 'next-auth/providers/facebook'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      authorize(credentials) {
        const { email, password } = credentials as {
          email: string
          password: string
        }
        if (email !== 'vato@lingwing.com' && password !== 'adminadminadmin') {
          return null
        }

        return { id: '1234', name: 'Vato', email: 'vato@lingwing.com' }
      },
    }),

    FacebookProvider({
      clientId: process.env.FACEBOOK_ID || '',
      clientSecret: process.env.FACEBOOK_SECRET || '',
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token }) {
      token.userRole = 'admin'
      return token
    },
  },
}

export default NextAuth(authOptions)
