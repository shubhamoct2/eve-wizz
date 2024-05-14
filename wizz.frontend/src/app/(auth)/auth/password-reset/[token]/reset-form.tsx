'use client'

import {useAuth} from '@/hooks/auth'
import {useEffect, useState} from 'react'
import {useSearchParams} from 'next/navigation'
import AuthSessionStatus from '@/app/(auth)/AuthSessionStatus'
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import Error from "@/components/notifications/error";
import {toast} from "@/components/ui/use-toast";

const PasswordResetForm = () => {
    const searchParams = useSearchParams()

    const {resetPassword} = useAuth({middleware: 'guest'})

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
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

        resetPassword({
            email,
            password,
            password_confirmation: passwordConfirmation,
            setErrors,
            setStatus,
        })
    }

    useEffect(() => {
        setEmail(searchParams.get('email'))
    }, [searchParams.get('email')])

    return (
        <>
            {/* Session Status */}
            <AuthSessionStatus className="mb-4" status={status}/>

            <form onSubmit={submitForm}>
                {/* Email Address */}
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        className="block mt-1 w-full"
                        onChange={event => setEmail(event.target.value)}
                        required
                        autoFocus
                    />

                    <Error error={errors.email} className="mt-2"/>
                </div>

                {/* Password */}
                <div className="mt-4">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        className="block mt-1 w-full"
                        onChange={event => setPassword(event.target.value)}
                        required
                    />

                    <Error
                        error={errors.password}
                        className="mt-2"
                    />
                </div>

                {/* Confirm Password */}
                <div className="mt-4">
                    <Label htmlFor="passwordConfirmation">
                        Confirm Password
                    </Label>

                    <Input
                        id="passwordConfirmation"
                        type="password"
                        value={passwordConfirmation}
                        className="block mt-1 w-full"
                        onChange={event =>
                            setPasswordConfirmation(event.target.value)
                        }
                        required
                    />

                    <Error
                        error={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Button type="submit"
                            disabled={loading}
                            className={`w-full group-invalid:pointer-events-none group-invalid:opacity-30`}>
                        {loading ? 'Resetting Password...' : 'Reset Password'}
                    </Button>
                </div>
            </form>
        </>
    )
}

export default PasswordResetForm
