"use client"

import {useContext} from "react"
import {OnBoardingContext} from "@/app/(on-boarding)/context/on-boarding-context";

export default function OnBoardingContextProvider({
                                                      children,
                                                  }: Readonly<{
    children: React.ReactNode;
}>) {
    const onBoardingContext = useContext(OnBoardingContext);
    return (
        <OnBoardingContext.Provider value={onBoardingContext}>
            {children}
        </OnBoardingContext.Provider>
    )
}