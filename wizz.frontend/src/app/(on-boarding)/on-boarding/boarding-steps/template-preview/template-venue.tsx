"use client"
import {useEffect, useState} from "react";
import Image from "next/image";
import Icons from "@/components/icons";
import EventWizzLogo from './../../../../../../public/logo/events-logo.png'
import {Button} from "@/components/ui/button";
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

const URL_PAGE = "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
const DEFAULT_DESCRIPTION = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum"

interface VenueProps {
    logo?: string | null,
    phone?: string
    landingPage?: string | null
    venueName?: string
    description?: string | null
    address?: string | null
}

export default function TemplateVenue({logo, phone, landingPage, venueName, address, description}: VenueProps) {

    return (
        <>
            <section className={"w-full p-2"}>
                <header className="app-header">
                    <section className="flex items-center my-6 w-full justify-between">
                        <section className="event">
                            <span className="lo">Browse Events</span>
                        </section>
                        <section className="logo">
                            <Image
                                src={(null !== logo) ? logo : EventWizzLogo}
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
                                {phone || ''}
                        </span>
                                </li>
                            </ul>
                        </section>
                    </section>
                </header>
                <section
                    style={{
                        backgroundImage: `url(${landingPage})`
                    }}
                    className="brand- bg-contain flex flex-col justify-center w-full min-h-[500px] bg-gray-200 rounded-sm p-2">
                    <section className="w-full p-8"

                    >
                        <h3 className="w-full my-6 text-center text-xl">
                            {venueName || 'Event Main Heading'}
                        </h3>
                        <figure className="flex items-center justify-center">
                            <section className={"opacity-[.8]"}>
                                {(null == landingPage) ? (
                                    <Image
                                        className={'rounded-sm'}
                                        src={URL_PAGE}
                                        alt={"logo"}
                                        height={150} width={150}
                                    />
                                ) : (
                                    <></>
                                )}

                            </section>
                        </figure>
                    </section>
                    <section className="w-full flex justify-center items-center px-8">
                        <form className="flex pointer-events-none">
                            <SearchBox/><Button className={"rounded-none rounded-tr-md rounded-br-md"}>Button</Button>
                        </form>
                    </section>
                    <section className="w-full flex justify-center items-center px-8">
                        <h4 className="w-full my-6 text-center">Header Image</h4>
                    </section>

                </section>


                <section className="mt-24 mx-auto max-w-screen-xl pb-12 px-4 items-center lg:flex md:px-8">
                    <div className="space-y-4 flex-1 sm:text-center lg:text-left">
                        <h1 className="text-gray-400 text-center font-bold text-2xl xl:text-3xl px-12">
                            {address || "e.g Experience more Stock Brook Events"}
                        </h1>
                    </div>
                    <div className="flex-1 text-left mt-7 lg:mt-0 lg:ml-3">
                        <p className="text-gray-400 max-w-xl leading-relaxed sm:mx-auto lg:ml-0 mb-6">
                            {description || DEFAULT_DESCRIPTION}
                        </p>
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
