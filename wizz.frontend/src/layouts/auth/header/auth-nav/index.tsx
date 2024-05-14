"use client"
import Link from "next/link";
import {appConfig} from "@/config/app";
import {cn} from "@/lib/utils";
import {Button, buttonVariants} from "@/components/ui/button";
import Icons from "@/components/icons";
import {redirect, usePathname} from 'next/navigation';
import {ThemeToggle} from "@/components/providers/theme-toggle";
import {useState} from "react";

export default function AuthNav() {
    const pathname = usePathname();
    const [loggedIn, setLoggedIn] = useState(false);
    return (
        <nav className="flex items-center gap-2">
            {(!loggedIn) ? (
                <>
                    <Button variant="outline" className="flex space-x-2 p-0">
                        <Link href={'/auth/register'} className="flex space-x-2 p-3 items-center">
                        <span className="login">
                            <Icons.register/>
                        </span>
                            <span>Register</span>
                        </Link>
                    </Button>
                    <Button className="p-3">
                        <Link href={'/auth/login'} className="flex space-x-2 p-3 items-center">
                            <span className="login">
                                <Icons.login/>
                            </span>
                            <span>Login</span>
                        </Link>

                    </Button>
                </>
            ) : (
                <Button variant="secondary" className="p-0">
                            <span className="login">
                                <Icons.login/>
                            </span>
                    <span>Login</span>
                </Button>
            )}
            <ThemeToggle/>
        </nav>
    )
}
