'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import RegisterForm from "@/app/(auth)/auth/register/register-form";
import { useSession } from "next-auth/react"

const Page = () => {
    const { data: session } = useSession()
    console.log(session,' IN REGISTER')
    return (
        <Card className="mx-auto my-auto max-w-lg min-w-96">
            <CardHeader>
                <CardTitle className="text-2xl">Register</CardTitle>
                <CardDescription>
                    Please fill your details to create an account.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <RegisterForm/>
            </CardContent>
        </Card>

    )
}

export default Page
