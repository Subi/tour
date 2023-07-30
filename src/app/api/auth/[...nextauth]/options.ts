import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import DiscordProvider from 'next-auth/providers/discord'

export const options: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_ID as string,
            clientSecret: process.env.DISCORD_SECRET as string,            
        }),
    ]
}