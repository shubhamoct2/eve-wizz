import {Button} from "@/components/ui/button"
import Image from 'next/image'

interface PackageTemplateProps {
    flyer?: null | string
    items?: [] | {}
    heading?: string
    subHeading?: string
}

export default function TemplatePackage({flyer, items, heading, subHeading}: PackageTemplateProps) {
    return (
        <>

            <section className="w-full section">
                <section className="mt-24 mx-auto max-w-screen-xl pb-12 px-4 items-center lg:flex md:px-8">
                    <div className="space-y-4 flex-1 sm:text-center lg:text-left">
                        <Image
                            src={flyer}
                            width={100}
                            height={60}
                            alt="EventWizz Logo"
                        />
                    </div>
                    <div className="flex-1 text-left mt-7 lg:mt-0 lg:ml-3">
                        <p className="text-gray-400 max-w-xl leading-relaxed sm:mx-auto lg:ml-0 mb-6">
                            It is a long established fact that a reader will be distracted by the readable content of a
                            page when looking at its layout. The point of using Lorem Ipsum
                        </p>
                        <Button className={"bg-transparent"} variant="outline">Hello Button</Button>
                    </div>
                </section>
            </section>

        </>
    )
}
