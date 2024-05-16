"use client";

import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react"
import {Loader} from '@/components/ui/loader'
//============STEPS=========//
import StepOneVenue from './boarding-steps/step-venue'
import StepTwoEvent from './boarding-steps/step-event'
import StepThreeEventType from './boarding-steps/step-event-type'
import StepFourTicket from './boarding-steps/step-ticket'
import StepFourTable from './boarding-steps/step-table'
import StepFiveEventPackage from './boarding-steps/step-event-package'
import StepSixFaqs from "@/app/(on-boarding)/on-boarding/boarding-steps/step-faq";
import StepSevenExtraLandingPage from './boarding-steps/step-extra-landing-page';
import StepEightExtraInfo from "./boarding-steps/step-extra-info"
import StepNineReminderEmail from './boarding-steps/step-extra-info'
import StepTenReminderEmail from './boarding-steps/step-email-reminder'
//============DEFAULT VALUES=========//
import defaultValues from './boarding-steps/defaultValues'
import VenueService from "@/services/venue/venue.service";

export default function OnBoardingPage() {
    // ** Router
    const router = useRouter()
    const [activeStep, setActiveStep] = useState(1)
    const [loading, setLoading] = useState(true)
    const {data: session} = useSession()
    const [eventType, setEventType] = useState('table')
    const [isEventTypeBoth, setIsEventTypeBoth] = useState(false);


    //default venue
    const [venueID, setVenueID] = useState(null);
    const [venue, setVenue] = useState([])


    if (null === session) {
        router.push('/auth/login');
    }

    const fetchVenue = VenueService.getDraftVenues();


    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000)

        VenueService
            .getDraftVenues()
            .then((venue) => {
                if (venue?.data) {
                    setVenue(venue)
                }
            })
    }, [])

    if (loading) {
        return (
            <section className="h-screen -mt-48">
                <Loader/>
            </section>
        )
    }

    //stepOneHandler
    const stepOneHandler = (data: any) => {
        console.log(data, 'step-1');
        setActiveStep(2)
    }
    //stepTwoHandler
    const stepTwoHandler = (data: any) => {
        console.log(data, 'step-2');
        setActiveStep(3)
    }
    //stepThreeHandler
    const stepThreeHandler = (data: any) => {
        console.log(data, 'step-3');
        setEventType(data?.eventType)
        setActiveStep(4)
    }
    //stepFourHandler
    const stepFourHandler = (data: any) => {
        console.log(data, 'step-4');
        setActiveStep(5)
    }
    // stepFiveHandler
    const stepFiveHandler = (data: any) => {
        console.log(data, 'step-5');
        setActiveStep(6)
    }
    // stepSixHandler
    const stepSixHandler = (data: any) => {
        console.log(data, 'step-6');
        setActiveStep(7)
    }

    // stepSevenHandler
    const stepSevenHandler = (data: any) => {
        console.log(data, 'step-7');
        setActiveStep(8)
    }
    // stepEightHandler
    const stepEightHandler = (data: any) => {
        console.log(data, 'step-8');
        setActiveStep(9)
    }
    //stepNineHandler
    const stepNineHandler = (data: any) => {
        console.log(data, 'step-8');
        setActiveStep(10)

    }
    //stepTenHandler
    const stepTenHandler = (data: any) => {
        console.log(data, 'step-8');
        setActiveStep(1)

    }
    const OnBoardingForm = () => {
        switch (activeStep) {
            case (1):
                return (
                    <StepOneVenue onClickHandler={stepOneHandler} template={true}/>
                )
            case (2):
                return (
                    <StepTwoEvent onClickHandler={stepTwoHandler}/>
                )
            case (3):
                return (
                    <StepThreeEventType onClickHandler={stepThreeHandler}/>
                )
            case (4):
                return (
                    <>
                        {eventType == 'table' ? (
                            <StepFourTable onClickHandler={stepFourHandler}/>
                        ) : (
                            <StepFourTicket onClickHandler={stepFourHandler}/>

                        )}
                    </>
                )
            case (5):
                return (
                    <StepFiveEventPackage onClickHandler={stepFourHandler}/>
                )
            case (6):
                return (
                    <StepSixFaqs onClickHandler={stepSixHandler}/>
                )
            case (7):
                return (
                    <StepSevenExtraLandingPage onClickHandler={stepSevenHandler}/>
                )
            case (8):
                return (
                    <StepEightExtraInfo onClickHandler={stepEightHandler}/>
                )
            case (9):
                return (
                    <StepNineReminderEmail onClickHandler={stepNineHandler}/>
                )
            case (10):
                return (
                    <StepTenReminderEmail onClickHandler={stepTenHandler}/>
                )
        }
    }

    return (
        <section className="steps-counter w-full relative">
            <OnBoardingForm/>
        </section>
    )
}
