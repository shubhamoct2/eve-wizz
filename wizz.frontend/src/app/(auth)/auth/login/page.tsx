"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import LoginForm from "@/app/(auth)/auth/login/login-form";
import {useState, useEffect} from "react"
import {useRouter} from 'next/navigation';
//const {AuthContext} from "@/context/auth-context"
import {useSession} from "next-auth/react"

const Page = () => {
    const [loading, setLoading] = useState(true);
    const {data: session} = useSession()
    const router = useRouter()


    // redirect if logged in

    if (null !== session) {
        router.push('/dashboard')
    }
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) {
        return (
            <section className="w-full h-screen relative">
                <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-200"></div>
                </div>
            </section>

        );
    }


    return (
        <Card className="mx-auto my-auto max-w-lg min-w-96">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Please fill your details to create an account.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <LoginForm/>
            </CardContent>
        </Card>
    )
}

export default Page
