import Image from "next/image";
import EventWizzLogo from "../../../../../../public/logo/events-logo.png";
import Icons from "@/components/icons";
import * as React from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {useState, useEffect} from "react";

const defaultGallery = [
    {
        title: "gallery-photo",
        url: "https://placehold.co/200x150.png"
    }, {
        title: "gallery-photo",
        url: "https://placehold.co/200x150.png"
    }, {
        title: "gallery-photo",
        url: "https://placehold.co/200x150.png"
    }, {
        title: "",
        url: "https://placehold.co/200x150.png"
    }, {
        title: "Gallery Photo",
        url: "https://placehold.co/200x150.png"
    }, {
        title: "Gallery Photo",
        url: "https://placehold.co/200x150.png"
    }, {
        title: "Gallery Photo",
        url: "https://placehold.co/200x150.png"
    }, {
        title: "Gallery Photo",
        url: "https://placehold.co/200x150.png"
    }
]

const DEFAULT_PREVIEW = "https://placehold.co/600x400/000000/FFFFFF/png"
const DEFAULT_SUB_TITLE = "Small Heading e.g. Fantastic Nights Of Fun For The Girls"
const DEFAULT_TITLE = " Heading e.g. Lipstick, Powder & Paint"
const DEFAULT_DESCRIPTION = "Sed ut perspiciatis unde omnis iste natus voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae."
export default function TemplateEvent({event}) {
    const [banner, setBanner] = useState(null);
    const [images, setImages] = useState([]);

    console.log(event, '[[[[[[event')
    useEffect(() => {
        if (event?.previewUrl) {
            setBanner(event?.previewUrl);
        }
        if (event?.galleryImages) {
            setImages(event?.galleryImages)
        }
    }, [event])

    return (
        <>
            <section className={"w-full p-2"}>
                <header className="app-header px-2">
                    <section className="flex items-center my-6 w-full justify-between">
                        <section className="event">
                            <span className="lo">Browse Events</span>
                        </section>
                        <section className="logo">
                            <Image
                                src={EventWizzLogo}
                                width={80}
                                height={60}
                                alt="EventWizz Logo"
                            />
                        </section>
                        <section className={"list-items"}>
                            <ul className="flex items-center justify-between space-x-2">
                                <li className="flex items-center space-x-2 w-[7rem] overflow-hidden">
                                    <span>
                                        <Icons.phone height={16} width={16}/>
                                    </span>
                                    <span className="text-sm">
                                            {'000000'}
                                    </span>
                                </li>
                            </ul>
                        </section>
                    </section>
                </header>

                <section
                    style={{
                        backgroundImage: `url(${(null != banner ? banner : '')})`
                    }}
                    className="brand- bg-contain flex flex-col justify-center w-full min-h-[500px] bg-gray-200 rounded-sm p-2">
                    <section className="w-full p-8"

                    >
                        <h3 className="w-full my-6 text-center text-xl">
                            {event?.bannerHeading || 'Event Main Heading'}
                        </h3>
                        <figure className="flex items-center justify-center">
                            <section className={"opacity-[.8]"}>
                                {(null == banner) ? (
                                    <Image
                                        className={'rounded-sm'}
                                        src={DEFAULT_PREVIEW}
                                        alt={"logo"}
                                        height={150} width={150}
                                    />
                                ) : (
                                    <></>
                                )}

                            </section>
                        </figure>
                    </section>
                </section>

                <section>
                    <div className="max-w-screen-xl mx-auto px-4 py-28 gap-12 text-gray-600 md:px-8">
                        <div className="space-y-5 max-w-4xl mx-auto text-center">
                            <h1 className="text-sm font-medium">
                                {event?.subTitle || DEFAULT_SUB_TITLE}
                            </h1>
                            <h2 className="text-4xl text-gray-800 font-extrabold mx-auto md:text-4xl">
                                {event?.title || DEFAULT_TITLE}
                            </h2>
                            <p className="max-w-2xl mx-auto">
                                {event?.description || DEFAULT_DESCRIPTION}

                            </p>
                        </div>
                        <section className="gallery w-full py-4 mt-12">
                            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                                {(images)?.length ? (
                                    <>
                                        {(images).map((url, index: number) => {
                                            return (
                                                <div key={index}>
                                                    <Image
                                                        className={'rounded-pill p-1 h-36 border border-gray-300 rounded-sm w-full'}
                                                        width={200}
                                                        height={200}
                                                        src={url}
                                                        alt={url}/>
                                                </div>
                                            )
                                        })}
                                    </>
                                ) : (
                                    <>
                                        {defaultGallery?.map((gallery) => {
                                            return (
                                                <div>
                                                    <Image
                                                        className={'rounded-pill p-1 h-36 border border-gray-300 rounded-sm w-full'}
                                                        width={200}
                                                        height={200}
                                                        src={gallery?.url}
                                                        alt={gallery?.title}/>
                                                </div>
                                            )
                                        })}
                                    </>
                                )}


                            </section>
                        </section>

                    </div>
                </section>
            </section>
        </>
    )
}


const SearchBox = () => {
    return (
        <Select>
            <SelectTrigger className="w-[180px] rounded-none rounded-tl-md rounded-bl-md py-3">
                <SelectValue placeholder="Select Events"/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

