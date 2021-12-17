/* eslint-disable no-undef */
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
const options = {
    providers: [
        Providers.Google({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_ID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET,
        })
        // Providers.GitHub({
        //     clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
        //     clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET
        // }),
    ],
    callbacks: {
        session: async (session, user) => {
            session.user.id = user.id;
            return Promise.resolve(session);
        },
    }
}
const auth = (req, res) => NextAuth(req, res, options)
export default auth