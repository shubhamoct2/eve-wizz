"use client"
import * as React from "react";
import {useState, useRef, useEffect} from "react"
import {Input} from '@/components/ui/input'
import TemplatePreview from "@/app/(on-boarding)/on-boarding/boarding-steps/template-preview";
import {Textarea} from "@/components/ui/textarea"
import {useContext} from "react";
import {OnBoardingContext, OnBoardingContextProps} from "@/app/(on-boarding)/context/on-boarding-context";
import {Button} from "@/components/ui/button";
import validateVenue from "@/app/(on-boarding)/on-boarding/boarding-steps/step-venue/methods";
import Error from "@/components/notifications/error"
import {useForm, Controller} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod';
import defaultVenueValues from "@/app/(on-boarding)/on-boarding/boarding-steps/step-venue/defaultValues";
import venueSchema from "@/app/(on-boarding)/on-boarding/boarding-steps/step-venue/schema";
import UploadLogo from "@/app/(on-boarding)/on-boarding/boarding-steps/upload-logo";
import UploadLandingPage from "@/app/(on-boarding)/on-boarding/boarding-steps/upload-landing-page";
import Image from "next/image";
import TemplateVenue from "@/app/(on-boarding)/on-boarding/boarding-steps/template-preview/template-venue";

const defaultErrors = defaultVenueValues
const UPLOAD_IMAGE_STYLE =
    "flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600";

interface StepProps {
    activeStep?: number | string
    onClickHandler: (payload: any) => any
    template?: boolean
    templateData?: [] | {}
}

export default function StepOneVenue({activeStep, onClickHandler, template, templateData}: StepProps) {

    const onBoardContext = useContext(OnBoardingContext)
    const {methods, values, next}: OnBoardingContextProps = onBoardContext;

    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState(defaultErrors)
    const [logoUrl, setLogoUrl] = useState(null);
    const [selectedLogoImage, setSelectedLogoImage] = useState(null);

    const [landingPageUrl, setLandingPageUrl] = useState(null);
    const [selectedLandingPageImage, setSelectedLandingPageImage] = useState(null);


    const onVenueSubmit = async (venueInfo: any) => {
        const payload = {
            name: venueInfo.name,
            phone: venueInfo.phone,
            email: venueInfo.email,
            address: venueInfo?.address,
            description: venueInfo?.description,
            logo: selectedLogoImage,
            landingPage: selectedLandingPageImage
        }
        let formData = new FormData()
        for (var key in payload) {
            formData.append(key, payload[key])
        }
        methods?.registerVenue(payload);
        return
        onClickHandler(payload)
    }

    //update default values
    const defaultValuesOfVenue = Object.assign(values?.venue, {
        phone: "4539583945",
        email: "example@gmail.com",
        name: "Venue Name",
        address: "Venue Address",
        description: "Venue description",
    })
    // ** Hooks
    const {
        reset: venueReset,
        control: venueControl,
        handleSubmit: handleVenueSubmit,
        formState: {errors: venueErrors},
        watch
    } = useForm({
        defaultValues: defaultValuesOfVenue,
        resolver: zodResolver(venueSchema)
    })
    const watchAllFields = watch() // when pass nothing as argument, you are watching everything
    const logoChangeHandler = (e: any) => {
        const newUrl = URL.createObjectURL(e.target.files?.[0]);
        if (newUrl !== logoUrl) {
            setLogoUrl(newUrl);
        }
        setSelectedLogoImage(
            e.target.files?.[0] || null
        );
    }
    const landingPageImageHandler = (e: any) => {
        const newUrl = URL.createObjectURL(e.target.files?.[0]);
        if (newUrl !== landingPageUrl) {
            setLandingPageUrl(newUrl);
        }
        setSelectedLandingPageImage(
            e.target.files?.[0] || null
        );
    }
    const saveVenue = () => {
        const values = Object.assign(watchAllFields, {
            logo: selectedLogoImage,
            landingPage: selectedLandingPageImage
        })
        methods?.registerVenue(values);
    }

    return (
        <section className="steps-counter h-screen w-full">
            <section className="step-1 flex w-full justify-between">
                <aside className="w-4/12">
                    <section className="w-full form-wrapper bg-white rounded">
                        <section className="w-full p-4">
                            <h2 className="text-4xl my-4">Okay Tell Us about your business</h2>
                        </section>
                        <form
                            key={0}
                            onSubmit={handleVenueSubmit(onVenueSubmit)}
                        >
                            <article className="title">
                                <h4 className="form-label">Venue Information</h4>
                            </article>
                            <section className="w-full py-4">
                                <article className={"flex w-full px-4 my-6 space-x-4"}>
                                    <section className={"w-1/2"}>
                                        <Controller
                                            name='name'
                                            control={venueControl}
                                            rules={{required: true, maxLength: 30}}
                                            render={({field: {value, onChange}}) => (
                                                <Input
                                                    className={venueErrors.name ? 'text-red-500 border-red-500' : ''}
                                                    value={value}
                                                    onChange={onChange}
                                                    placeholder='e.g. Stock Brook'
                                                    aria-describedby='venue-base-info-name'
                                                />
                                            )}
                                        />
                                        {venueErrors.name && (
                                            <Error message={venueErrors?.name.message}/>
                                        )}
                                    </section>
                                    <section className={"w-1/2"}>
                                        <Controller
                                            name='phone'
                                            control={venueControl}
                                            rules={{required: true}}
                                            render={({field: {value, onChange}}) => (
                                                <Input
                                                    className={venueErrors.phone ? 'text-red-500 border-red-500' : ''}
                                                    type='phone'
                                                    value={value}
                                                    onChange={onChange}
                                                    placeholder='123 456 7890'
                                                    aria-describedby='venue-base-info-phone'
                                                />
                                            )}
                                        />
                                        {venueErrors.phone && (
                                            <Error message={venueErrors?.phone.message}/>
                                        )}
                                    </section>
                                </article>
                                <article className={"flex w-full px-4 my-6 space-x-4"}>
                                    <section className={"w-1/2"}>
                                        <Controller
                                            name='email'
                                            control={venueControl}
                                            rules={{required: true}}
                                            render={({field: {value, onChange}}) => (
                                                <Input
                                                    className={venueErrors.email ? 'text-red-500 border-red-500' : ''}
                                                    type='email'
                                                    value={value}
                                                    onChange={onChange}
                                                    placeholder='xyz@gmail.com'
                                                    aria-describedby='venue-base-info-email'
                                                />
                                            )}
                                        />
                                        {venueErrors.email && (
                                            <Error message={venueErrors?.email.message}/>
                                        )}
                                    </section>
                                    <section className={"w-1/2"}>
                                        <Controller
                                            name='address'
                                            control={venueControl}
                                            rules={{required: true}}
                                            render={({field: {value, onChange}}) => (
                                                <Input
                                                    className={venueErrors.address ? 'text-red-500 border-red-500' : ''}
                                                    value={value}
                                                    onChange={onChange}
                                                    placeholder='e.g. Stock Brook Country Club ...'
                                                    aria-describedby='venue-base-info-address'
                                                />
                                            )}
                                        />
                                        {venueErrors.address && (
                                            <Error message={venueErrors?.address.message}/>
                                        )}
                                    </section>
                                </article>
                                <article className={"flex w-full flex-col px-4"}>
                                    <Controller
                                        name='description'
                                        control={venueControl}
                                        rules={{required: true}}
                                        render={({field: {value, onChange}}) => (
                                            <Textarea
                                                value={value}
                                                onChange={onChange}
                                                placeholder='Venue Description...'
                                                aria-describedby='venue-base-info-description'
                                            />
                                        )}
                                    />
                                    <section className="w-full">
                                        {venueErrors.description && (
                                            <Error message={venueErrors?.description.message}/>
                                        )}
                                    </section>

                                </article>
                                <article className="title mt-8 mb-4">
                                    <h4 className="form-label">Add Logo</h4>
                                </article>
                                <article className={"flex w-full px-4"}>
                                    <div className="grid w-full items-center  gap-1.5">
                                        <Controller
                                            name="logo"
                                            control={venueControl}
                                            rules={{required: true}}
                                            render={({field}) => (
                                                <>
                                                    <div className="flex items-center justify-center w-full">
                                                        <label
                                                            htmlFor="bannerFile"
                                                            className={
                                                                venueErrors?.logo
                                                                    ? `${UPLOAD_IMAGE_STYLE} border-red-500`
                                                                    : UPLOAD_IMAGE_STYLE
                                                            }
                                                        >
                                                            <div
                                                                className="flex flex-col items-center justify-center pt-5 pb-6">
                                                                <svg
                                                                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                                                    aria-hidden="true"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 20 16"
                                                                >
                                                                    <path
                                                                        stroke="currentColor"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="2"
                                                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                                    />
                                                                </svg>
                                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">
                                      Click to upload
                                    </span>{" "}
                                                                    or drag and drop
                                                                </p>
                                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                                                                </p>
                                                            </div>
                                                            <Input
                                                                type="file"
                                                                className="hidden"
                                                                id="bannerFile"
                                                                onBlur={field.onBlur}
                                                                name={field.name}
                                                                onChange={(e) => {
                                                                    field.onChange(e.target.files);
                                                                    logoChangeHandler(e)
                                                                }}
                                                                ref={field.ref}
                                                            />
                                                        </label>
                                                    </div>
                                                </>
                                            )}
                                        />

                                        {logoUrl ? (
                                            <section
                                                className="h-40 w-full p-4 border-2 border-gray-300 border-dashed rounded-lg">
                                                <Image
                                                    src={logoUrl}
                                                    height={100}
                                                    width={200}
                                                    className="object-cover object-center h-full w-full max-w-full rounded-lg"
                                                    alt="preview"/>
                                            </section>
                                        ) : null}

                                        {venueErrors?.logo && (
                                            <Error message={venueErrors?.logo.message}/>
                                        )}
                                    </div>
                                </article>

                                <article className="title mt-8 mb-4">
                                    <h4 className="form-label">Landing Page Image</h4>
                                </article>
                                <article className={"flex w-full px-4"}>
                                    <div className="grid w-full items-center  gap-1.5">
                                        <div className="grid w-full items-center  gap-1.5">
                                            <Controller
                                                name="landingPage"
                                                control={venueControl}
                                                rules={{required: true}}
                                                render={({field}) => (
                                                    <>
                                                        <div className="flex items-center justify-center w-full">
                                                            <label
                                                                htmlFor="landingPageFile"
                                                                className={
                                                                    venueErrors?.landingPage
                                                                        ? `${UPLOAD_IMAGE_STYLE} border-red-500`
                                                                        : UPLOAD_IMAGE_STYLE
                                                                }
                                                            >
                                                                <div
                                                                    className="flex flex-col items-center justify-center pt-5 pb-6">
                                                                    <svg
                                                                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                                                        aria-hidden="true"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        fill="none"
                                                                        viewBox="0 0 20 16"
                                                                    >
                                                                        <path
                                                                            stroke="currentColor"
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth="2"
                                                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                                        />
                                                                    </svg>
                                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">
                                      Click to upload
                                    </span>{" "}
                                                                        or drag and drop
                                                                    </p>
                                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                                                                    </p>
                                                                </div>
                                                                <Input
                                                                    type="file"
                                                                    className="hidden"
                                                                    id="landingPageFile"
                                                                    onBlur={field.onBlur}
                                                                    name={field.name}
                                                                    onChange={(e) => {
                                                                        field.onChange(e.target.files);
                                                                        landingPageImageHandler(e)
                                                                    }}
                                                                    ref={field.ref}
                                                                />
                                                            </label>
                                                        </div>
                                                    </>
                                                )}
                                            />

                                            {landingPageUrl ? (
                                                <section
                                                    className="h-40 w-full p-4 border-2 border-gray-300 border-dashed rounded-lg">
                                                    <Image
                                                        src={landingPageUrl}
                                                        height={100}
                                                        width={200}
                                                        className="object-cover object-center h-full w-full max-w-full rounded-lg"
                                                        alt="preview"/>
                                                </section>
                                            ) : null}

                                            {venueErrors?.landingPage && (
                                                <Error message={venueErrors?.landingPage.message}/>
                                            )}
                                        </div>
                                    </div>
                                </article>

                                <article className={"flex w-full px-4 my-4 space-x-4 justify-end"}>
                                    <section className={"w-1/2 space-x-4 flex justify-end"}>
                                        <Button type="button" onClick={saveVenue}>Save</Button>
                                        <Button type={"submit"}>Next</Button>
                                    </section>
                                </article>
                            </section>
                        </form>
                    </section>
                </aside>
                <section className="w-8/12 px-8">
                    <TemplateVenue
                        logo={logoUrl}
                        phone={watchAllFields?.phone}
                        landingPage={landingPageUrl}
                        venueName={watchAllFields?.name}
                        address={watchAllFields?.address}
                        description={watchAllFields?.description}
                    />
                </section>
            </section>
        </section>
    )
}
