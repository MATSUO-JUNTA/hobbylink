import axios from 'axios'
import NextAuth, { User, Account, Session, NextAuthOptions } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import GoogleProvider from 'next-auth/providers/google'
import { signInUrl } from '@/utils/urls'

declare module 'next-auth' {
  // Sessionの型を拡張(bioを追加)
  interface Session {
    user: {
      id: string
      name: string
      email: string
      image: string
      bio: string
    }
  }

  // Userの型を拡張(bioを追加)
  interface User {
    id: string
    name: string
    email: string
    image: string
    bio: string
  }
}

declare module 'next-auth/jwt' {
  // JWTの型を拡張(bioを追加)
  interface JWT {
    id: string
    name: string
    email: string
    image: string
    bio: string
  }
}

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account }: { user: User; account: Account | null }) {
      if (!account) return false

      try {
        const res = await axios.post(signInUrl(account.provider), {
          name: user.name,
          email: user.email,
          image: user.image,
          provider: account.provider,
        })

        if (res.status === 200) {
          // APIから取得したデータでユーザー情報を更新
          user.id = res.data.id
          user.name = res.data.name
          user.email = res.data.email
          user.image = res.data.image
          user.bio = res.data.bio
          return true
        } else {
          return false
        }
      } catch (err) {
        console.log(err)
        return false
      }
    },
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        token = {
          ...token,
          ...user,
        }
      }
      return token
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = {
        ...session.user,
        ...token,
      }
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
