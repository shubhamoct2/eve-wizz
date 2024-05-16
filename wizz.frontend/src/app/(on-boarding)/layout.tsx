import {Inter} from "next/font/google";
import Header from "@/layouts/on-boarding/header";
import Footer from "@/layouts/on-boarding/footer";
import "@/assets/scss/app.scss"
import ThemeProvider from "@/components/providers/theme-provider";
import {TailwindIndicator} from "@/components/tailwind-indicator";

export const metadata = {
    title: 'On Boarding',
    description: 'Next js onboarding process',
}
import OnBoardingContextProvider from "@/app/(on-boarding)/context/context-provider"

const inter = Inter({subsets: ["latin"]});
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route"
import SessionProvider from "@/components/providers/session-provider"

export default async function OnBoardingLayout({
                                                   children,
                                               }: Readonly<{
    children: React.ReactNode;
}>) {
    const containerStyle = {
        width: "1600px"
    }
    const bodyStyle = {
        backgroundColor: "#f3f4f6"
    }

    const session = await getServerSession(authOptions)

    return (
        <html lang="en">
        <body className={inter.className} style={bodyStyle}>
        <SessionProvider session={session}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <Header/>
                <main className="section mx-auto relative py-8" style={containerStyle}>
                    <OnBoardingContextProvider>
                        {children}
                    </OnBoardingContextProvider>
                </main>
                {/*<Footer/>*/}
            </ThemeProvider>
        </SessionProvider>
        <TailwindIndicator/>
        </body>
        </html>
    );
}
