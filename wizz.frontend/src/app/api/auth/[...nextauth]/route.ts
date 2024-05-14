// imports
import NextAuth from "next-auth"
import Cookies from 'js-cookie'

// importing providers
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials"
import {AuthService} from "@/services/auth/auth.service"
import axios from "@/lib/axios";
import ENDPOINTS from "@/lib/core/endpoints";
import {
    toast
} from "@/components/ui/use-toast"
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { cookies } from 'next/headers'

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        FacebookProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {label: "email", type: "email", placeholder: "example@e.cc"},
                password: {label: "Password", type: "password"}
            },

            async authorize(credentials: any, type: any) {
                if (credentials == null) return null;
                const authCredentials ={
                    email:credentials.email,
                    password:credentials.password
                }
                try {
                        const userResponse= await axios.post(ENDPOINTS.LOGIN,authCredentials)
                        if (typeof userResponse !== "undefined" && userResponse?.data?.status==200) {
		                        const {data}=userResponse?.data;
	                            const responseData ={ ...data.user, apiToken: data.token };
                                cookies().set('apiToken', data?.token)
	                            return responseData
                        } else {
                            return null
                        }

                } catch (error) {
                    const errors = JSON.stringify({ errors: error?.response?.data?.errors,message:error?.response?.data?.message, status: 401 });
                    throw new Error(errors)
                    toast({
                        title:"Error",
                        description:error?.response?.data?.message || 'Something went wrong, please try again.',	
                        variant:"error"
                        })
                    return null
                }
                return null
            },
        })
    ],
    session: {
        strategy: 'jwt',
        maxAge:
            1 * 24 * 60 * 60, // 1 day
    }
    ,
    jwt: {
        // JWT encoding and decoding configurations
    }
    ,
    callbacks: {
        async session ({ session, token, user }) {
//            console.log(session,'SESSION')
//            console.log(token,'token')
//            console.log(user,'user')
            const sanitizedTokens = Object.keys(token).reduce((p, c) => {
                // strip unnecessary properties
                if (
                    c !== "iat" &&
                    c !== "exp" &&
                    c !== "jti" &&
                    c !== "apiToken"
                ) {
                    return { ...p, [c]: token[c] }
                } else {
                    return p
                }
            }, {})
            const senitizedToken = {
                    user_id:token?.id,
                    name	:token?.name,
                email:token?.email,
                status:token?.status
            }
            const tokenWithUser ={ ...session, user: senitizedToken, apiToken: token.apiToken }
            return tokenWithUser
        },
        async jwt ({ token, user, account, profile }) {


            if (typeof user !== "undefined") {
                // user has just signed in so the user object is populated
                return user as JWT
            }
            return token
        }	
    },
    pages: {
        signIn: '/auth/login', // Custom sign-in page
    },
    debug: true,
    secret:	    process.env.SECRET
}


const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}
