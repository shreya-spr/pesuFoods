/* // https://devdojo.com/avneesh/why-and-how-to-get-started-with-next-auth-61740558b45b

import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://usernew:pesuDB@cluster0.8ksmyt3.mongodb.net/";
const clientPromise = MongoClient.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

export default NextAuth({
  providers: [
    // Add your desired providers (e.g., Google, GitHub, Email)
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    // ...other providers
  ],
  adapter: MongoClient.connect(uri), // Adapt for your chosen database
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.user.id;
      return session;
    },
  },
});
 */



//  https://www.freecodecamp.org/news/how-to-setup-authentication-and-protected-route-in-next-js-13-with-next-auth-js/
// and dave grays



import NextAuth from 'next-auth'
import { options } from './options'

const handler = NextAuth(options)

export { handler as GET, handler as POST }



// Attempt 3
// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google"

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),
//     // Add other providers as needed
//   ],
//   // Add other configuration options as needed
// };


