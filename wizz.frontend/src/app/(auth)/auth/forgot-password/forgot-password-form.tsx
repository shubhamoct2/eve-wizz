"use client"

import {useEffect, useState} from "react";
import {useAuth} from "@/hooks/auth";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import Error from "@/components/notifications/error";
import {Button} from "@/components/ui/button";
import {toast} from "@/components/ui/use-toast";

export default function ForgotPasswordForm() {

    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (null !== status) {
            toast({
                title: "Success",
                description: status,
                variant: "success"
            })
            setLoading(false);
        }
    }, [status]);

    const submitForm = async (event) => {
        event.preventDefault()
        setLoading(true);
        const response = await forgotPassword({email, setErrors, setStatus})
        console.log(response, ' {}{}')
    }
    return (

        <>
            <form onSubmit={submitForm}>
                {/* Email Address */}
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={email}
                        className="block mt-1 w-full"
                        onChange={event => setEmail(event.target.value)}
                        required
                        autoFocus
                    />
                    <Error error={errors?.email}/>
                </div>
                <div className="flex items-center justify-end mt-4">
                    <Button type="submit"
                            disabled={loading}
                            className={`w-full group-invalid:pointer-events-none group-invalid:opacity-30`}>
                        {loading ? 'Sending Link...' : 'Email Password Reset Link'}
                    </Button>
                </div>
            </form>
        </>
    )
}
