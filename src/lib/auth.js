import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import clientPromise from "./db";

export const auth = betterAuth({
    database: mongodbAdapter(await clientPromise),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            // এখান থেকে '!' সরিয়ে ফেলা হয়েছে
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
    },
});