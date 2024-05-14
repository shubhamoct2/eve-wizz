import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import * as React from "react";
import PasswordResetForm from "@/app/(auth)/auth/password-reset/[token]/reset-form";

const PasswordReset = () => {
    return (
        <>
            <Card className="mx-auto my-auto max-w-lg min-w-96">
                <CardHeader>
                    <CardTitle className="text-2xl">Register</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <PasswordResetForm/>
                </CardContent>
            </Card>
        </>
    )
}

export default PasswordReset
