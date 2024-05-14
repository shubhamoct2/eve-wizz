import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import * as React from "react";
import ForgotPasswordForm from "@/app/(auth)/auth/forgot-password/forgot-password-form";
import {useState} from "react";

const Page = () => {


    return (
        <>
            <Card className="mx-auto my-auto max-w-lg min-w-96">
                <CardHeader>
                    <CardTitle className="text-2xl">Forgot Password</CardTitle>
                    <CardDescription>

                        <div className="mb-4 text-sm text-gray-600">
                            Forgot your password? No problem. Just let us know your email
                            email address and we will email you a password reset link that
                            that will allow you to choose a new one.
                        </div>
                        
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ForgotPasswordForm/>
                </CardContent>
            </Card>

        </>
    )
}

export default Page
