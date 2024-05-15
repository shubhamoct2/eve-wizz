import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Button} from "@/components/ui/button"
import Image from "next/image";

const URL = "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
export default function TemplateBrand() {
    return (
        <section className="brand- flex flex-col justify-center w-full min-h-[500px] bg-gray-200 rounded-sm">
            <section className="w-full p-8">
                <h3 className="w-full my-6 text-center text-xl">Event Main Heading</h3>
                <figure className="flex items-center justify-center">
                    <section className={"opacity-[.8]"}>
                        <Image className={'rounded-sm'} src={URL} alt={"logo"} height={150} width={150}/>
                    </section>
                </figure>
            </section>
            <section className="w-full flex justify-center items-center px-8">
                <form className="flex">
                    <SearchBox/><Button className={"rounded-none rounded-tr-md rounded-br-md"}>Button</Button>
                </form>
            </section>
            <section className="w-full flex justify-center items-center px-8">
                <h4 className="w-full my-6 text-center">Header Image</h4>
            </section>

        </section>
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
