import {Button} from "@/components/ui/button"

export default function TemplateFeature(){
    return (
        <section className="mt-24 mx-auto max-w-screen-xl pb-12 px-4 items-center lg:flex md:px-8">
            <div className="space-y-4 flex-1 sm:text-center lg:text-left">
                <h1 className="text-gray-400 font-bold text-2xl xl:text-3xl px-12">
                    e.g Experience more Stock Brook Events
                </h1>
            </div>
            <div className="flex-1 text-left mt-7 lg:mt-0 lg:ml-3">
                <p className="text-gray-400 max-w-xl leading-relaxed sm:mx-auto lg:ml-0 mb-6">
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum
                </p>
                <Button className={"bg-transparent"} variant="outline">Hello Button</Button>
            </div>
        </section>
    )
}
