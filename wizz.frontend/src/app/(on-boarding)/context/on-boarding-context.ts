import {createContext} from 'react';

import defaultValues from "@/app/(on-boarding)/on-boarding/boarding-steps/defaultValues"

export interface OnBoardingContextProps {
    values: any
    methods: any,
    next: any,
    gotTo: any,
    previous: any,
    activeStep: any
}


const registerVenue = async (data: any) => {
    console.log(data, 'venueData')
}
const registerEvents = async (data: any) => {
    console.log(data, 'venueData')
}
const nextStep = (step=null) => {
    console.log(step, 'nextStep')
    
}
const previousStep = (step) => {

}
const gotToStep = (step) => {

}
const activeStep = (step) => {

}
export const OnBoardingContext = createContext<OnBoardingContextProps | null>({
    values: defaultValues,
    methods: {
        registerVenue,
        registerEvents,
    },
    next: nextStep,
    previous: previousStep,
    gotTo: gotToStep,
    activeStep: activeStep
})