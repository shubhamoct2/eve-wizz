"use client"

import {useState} from "react"
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import {useRouter} from 'next/navigation';
import {useForm} from "react-hook-form";
import Error from "@/components/notifications/error"
import {AuthService} from "@/services/auth/auth.service";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {cn} from "@/lib/utils";
import { Loader2 } from 'lucide-react';

export default function RegisterForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const {register, handleSubmit, formState} = useForm({
        mode: "onChange"
    });
    const {errors, isDirty} = formState;

    // handle form submission
    const handleRegistrationForm = async (data) => {
        setLoading(true)
        try {
            const registerQuery = await AuthService.register(data)
            if (registerQuery?.data?.user) {
                router.push('/auth/login');
                setLoading(false)
            } else{
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
        }
    }


    return (
        <section className="section section-registration">
            <form
                onSubmit={handleSubmit(handleRegistrationForm)}
                className="group">
                <section className="grid gap-4">
                    <article className="grid gap-2 my-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            {...register("name", {required: true})}
                        />
                        {errors.name && <Error error={"Please enter a valid name"}/>}
                    </article>
                    <article className="grid gap-2 my-2">
                        <Label htmlFor="email">Your Email</Label>
                        <Input
                            id="email"
                            type="email"
                            className={errors?.email ? "border-red-500" : ""}
                            placeholder="mail@example.com"
                            {...register("email", {required: true})}

                        />
                        {errors.email && <Error error={"Email is required"}/>}
                    </article>
                    <article className="grid gap-2 my-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Your Password</Label>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            placeholder="******"
                            className={errors?.password ? "border-red-500" : ""}
                            {...register("password", {required: true})}

                        />
                        {errors.password && <Error error={"Password is required"}/>}
                    </article>
                    <Button
                        disabled={loading}
                        className={'w-full'}
                    >
                        {loading && <Loader2 className={cn('h-4 w-4 animate-spin mr-2')}/>}
                        Register
                    </Button>
                </section>
                <article className={"flex justify-between gap-2 my-6"}>
                    <Button type={"button"}
                        //                            onClick={() => signIn('google')}
                            variant="outline"
                            className="w-full"
                    >
                        Login with Google
                    </Button>
                    <Button
                        //                        onClick={() => signIn('facebook')}
                        type={"button"}
                        variant="outline"
                        className="w-full">
                        Login with Facebook
                    </Button>
                </article>

                <article className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link href="/auth/login" className="underline">
                        Login
                    </Link>
                </article>
            </form>
        </section>
    )
}
