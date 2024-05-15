import {Button} from "@/components/ui/button"
import Image from "next/image";

const defaultGallery = [
    {
        title: "gallery-photo",
        url: "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80"
    }, {
        title: "gallery-photo",
        url: "https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80"
    }, {
        title: "gallery-photo",
        url: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2560&amp;q=80"
    }, {
        title: "",
        url: "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2762&amp;q=80"
    }
]

export default function TemplateEvent() {
    return (
        <>
            <section>
                <div className="max-w-screen-xl mx-auto px-4 py-28 gap-12 text-gray-600 md:px-8">
                    <div className="space-y-5 max-w-4xl mx-auto text-center">
                        <h1 className="text-sm font-medium">
                            Small Heading e.g. Fantastic Nights Of Fun For The Girls
                        </h1>
                        <h2 className="text-4xl text-gray-800 font-extrabold mx-auto md:text-4xl">
                            Heading e.g. Lipstick, Powder & Paint
                        </h2>
                        <p className="max-w-2xl mx-auto">
                            Sed ut perspiciatis unde omnis iste natus voluptatem accusantium doloremque laudantium,
                            totam rem aperiam, eaque ipsa quae.
                        </p>
                    </div>
                    <section className="gallery w-full py-4">

                        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                            {defaultGallery?.map((gallery) => {
                                return (
                                    <div>
                                        <Image className={'rounded-pill'} width={200} height={200} src={gallery?.url} alt={gallery?.title}/>
                                    </div>
                                )
                            })}
                        </section>
                    </section>

                </div>
            </section>
        </>
    )
}
