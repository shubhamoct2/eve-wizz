"use client";

import {useContext, useState, useEffect} from "react";
import StepperForm from "@/app/(on-boarding)/steps/stepper-form";
import {useRouter} from "next/navigation";
import {useForm, Controller, Form} from 'react-hook-form'
import { useSession } from "next-auth/react"
import {Loader} from '@/components/ui/loader'


//============STEPS=========//
import StepOneVenue from './boarding-steps/step-venue'
import StepTwoEvent from './boarding-steps/step-event'
import StepThreeEventType from './boarding-steps/step-event-type'
import StepFourTicket from './boarding-steps/step-ticket'
import StepFiveEventPackage from './boarding-steps/step-event-package'
//============DEFAULT VALUES=========//
import defaultValues from './boarding-steps/defaultValues'

export default function OnBoardingPage() {
    // ** Router

    const router = useRouter()
    const [steps, setSteps] = useState();
    const [activeStep, setActiveStep] = useState(4)
    const [loading, setLoading] = useState(true)
    const { data: session } = useSession()
    
    
    
    if(null === session ){
        router.push('/auth/login');
    }
    
    
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000)
    }, [])


    if (loading) {
        return (
            <section className="h-screen -mt-48">
                <Loader/>
            </section>
        )
    }
    
    //stepOneHandler
    const stepOneHandler=(data)=>{
        console.log(data,'stepOneHandler');
        setActiveStep(2)
    }

    const OnBoardingForm = () => {
        switch (activeStep) {
            case (0):
                return (
                    <StepOneVenue activeStep={activeStep} onClickHandler={stepOneHandler} template={true}/>
                )
            case (1):
                return (
                    <StepTwoEvent/>
                )
            case (2):
                return(
                  <StepThreeEventType template={true}/>
               )
             case (3):
                return(
                  <StepFourTicket />
                )
             case (4):
                 return(
                    <StepFiveEventPackage />
                 )             
        }
    }

    return (
        <section className="steps-counter w-full relative">
            <OnBoardingForm/>
        </section>
    )
}
