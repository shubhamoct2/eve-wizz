'use client'

import * as React from 'react'
import {useEffect, useState} from 'react'
import {useSearchParams} from "next/navigation";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {useAuth} from "@/hooks/auth";
import {useRouter} from 'next/router';
import {usePathname} from 'next/navigation'

const Page = () => {
    const {logout, resendEmailVerification} = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: '/dashboard',
    })
    const searchParams = useSearchParams()
    const pathname = usePathname();

    const urlParams = {
        id: pathname.split('/')[3],
        signature: pathname.split('/')[4],
    }
    console.log(urlParams, 'pathname')

    const [status, setStatus] = useState(null)

    useEffect(() => {
        setTimeout(async () => {
            const emailVerified = await AuthService.verifyEmail(urlParams);
            console.log(emailVerified, ' emailVerified')
        }, 1200)
    }, []);

    return (
        <>
            <Card className="mx-auto my-auto max-w-lg min-w-96">
                <CardHeader>
                    <CardTitle className="text-2xl">Register</CardTitle>
                    <CardDescription className="mb-4 text-sm text-gray-600">
                        Thanks for signing up! Before getting started, could you verify
                        your email address by clicking on the link we just
                        emailed to you? If you didn't receive the email, we will gladly
                        send you another.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {status === 'verification-link-sent' && (
                        <div className="mb-4 font-medium text-sm text-green-600">
                            A new verification link has been sent to the email address
                            you provided during registration.
                        </div>
                    )}

                    <div className="mt-4 flex items-center justify-between">
                        {/*<Button onClick={() => resendEmailVerification({setStatus})}>*/}
                        {/*    Resend Verification Email*/}
                        {/*</Button>*/}

                        <Button
                            type="button"
                            // onClick={logout}>
                        >
                            Logout
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default Page