import { socialLogin, login } from '@utils/auth'
import NextAuth, { NextAuthOptions } from 'next-auth'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string
          password: string
        }
        const response = await login({ email, password })
        if (response) {
          return response
        }

        return null
      },
    }),

    FacebookProvider({
      clientId: process.env.FACEBOOK_ID || '',
      clientSecret: process.env.FACEBOOK_SECRET || '',
      // profileUrl:
      //   'https://graph.facebook.com/v12.0/me?fields=id,name,email,first_name,last_name',
      // profile(profile) {
      //   return {
      //     id: profile.id,
      //     name: profile.name,
      //     email: profile.email,
      //     first_name: profile.first_name,
      //     last_name: profile.last_name,
      //   }
      // },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || '',
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, account, user, profile }) {
      if (account?.provider === 'facebook' || account?.provider === 'google') {
        const response = await socialLogin({
          provider: account.provider,
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        })
        token.accessToken = response.token
      }

      if (user && account?.type === 'credentials') {
        token.accessToken = user
      }
      return token
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.user = token as any
      return session
    },
  },
}

export default NextAuth(authOptions)
