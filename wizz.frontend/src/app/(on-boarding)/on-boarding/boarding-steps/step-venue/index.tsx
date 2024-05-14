"use client"
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

const defaultErrors = {
    name: '',
    email: '',
    phone: '',
    address: ''
}

interface StepProps{
    activeStep:number|string
    onClickHandler:()=>void
    template:boolean
    templateData?:[]|{}
}

export default function StepOneVenue({activeStep,onClickHandler,template,templateData}:StepProps) {

    const onBoardContext = useContext(OnBoardingContext)
    const {methods, values,next}: OnBoardingContextProps = onBoardContext;
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState(defaultErrors)

    const onVenueSubmit = async (venueInfo: any) => {
        const payload = {
            step: 1,
            name: venueInfo.name,
            phone: venueInfo.phone,
            email: venueInfo.email,
            address:venueInfo?.address,
            description:venueInfo?.description
        }
        onClickHandler(payload)
        console.log(venueInfo, ' payload')
//        methods?.addVenue(event)
    }
    const clearErrors = () => {
        setLoading(false)
        setErrors((errors: unknown) => {
            Object.assign(defaultErrors, {})
        })
    }
    // ** Hooks
    const {
        reset: venueReset,
        control: venueControl,
        handleSubmit: handleVenueSubmit,
        formState: {errors: venueErrors}
    } = useForm({
        defaultValues: defaultVenueValues,
        resolver: zodResolver(venueSchema)
    })
    
    
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
//                              onSubmit={(onVenueSubmit)}
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
                                            rules={{required: true}}
                                            render={({field: {value, onChange}}) => (
                                                <Input
                                                    className={venueErrors.name?'text-red-500 border-red-500':''}
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
                                                    className={venueErrors.phone?'text-red-500 border-red-500':''}
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
                                                    className={venueErrors.email?'text-red-500 border-red-500':''}
                                                    type='email'
                                                    value={value}
                                                    onChange={onChange}
                                                    error={Boolean(venueErrors.email)}
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
                                                    className={venueErrors.address?'text-red-500 border-red-500':''}
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
                                                error={Boolean(venueErrors.description)}
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
                                        <Input className={"h-28 pt-12"} name={"logo"} id="logo" placeholder={"Upload"}
                                               type="file"/>
                                        {/*<Controller*/}
                                        {/*    name='logo'*/}
                                        {/*    control={venueControl}*/}
                                        {/*    render={({field: {value, onChange, ...field}}) => (*/}
                                        {/*        <>*/}
                                        {/*            <UploadLogo/>*/}
                                        {/*        </>*/}
                                        {/*    )}*/}
                                        {/*/>*/}
                                    </div>
                                </article>

                                <article className="title mt-8 mb-4">
                                    <h4 className="form-label">Landing Page Image</h4>
                                </article>
                                <article className={"flex w-full px-4"}>
                                    <div className="grid w-full items-center  gap-1.5">
                                        	<Input className={"h-28 pt-12"} name={"landingPage"} id="landingPage" placeholder={"Upload"}
                                             type="file"/>
                                        {/*<Controller*/}
                                        {/*    name='landingPage'*/}
                                        {/*    control={venueControl}*/}
                                        {/*    render={({field: {value, onChange, ...field}}) => (*/}
                                        {/*        <>*/}
                                        {/*            <UploadLandingPage/>*/}
                                        {/*        </>*/}
                                        {/*    )}*/}
                                        {/*/>*/}
                                    </div>
                                </article>

                                <article className={"flex w-full px-4 my-4 space-x-4 justify-end"}>
                                    <section className={"w-1/2 space-x-4 flex justify-end"}>
                                        <Button>Save</Button>
                                        <Button type={"submit"}>Next</Button>
                                    </section>
                                </article>
                            </section>
                        </form>
                    </section>
                </aside>
                <section className="w-8/12 px-8">
                    <TemplatePreview/>
                </section>
            </section>
        </section>
    )
}
