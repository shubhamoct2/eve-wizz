import {Inter} from "next/font/google";
import Header from "@/layouts/global/header";
import Footer from "@/layouts/global/footer";
import "@/assets/scss/app.scss"
import {HomepageMetadata} from "@/config/metadata";
import ThemeProvider from "@/components/providers/theme-provider";
import {TailwindIndicator} from "@/components/tailwind-indicator";

const inter = Inter({subsets: ["latin"]});
export const metadata = HomepageMetadata;
import SessionProvider from "@/components/providers/session-provider"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export default async function DashboardLayout({
                                            children,
                                        }: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession(authOptions)
    return (
        <html lang="en">
        <body className={inter.className}>
        	<SessionProvider session={session}> 
        	     <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <Header/>
                    <main className="section">
                        {children}
                    </main>
                    <Footer/>
                 </ThemeProvider>
               </SessionProvider>
        <TailwindIndicator/>
        </body>
        </html>
    );
}
