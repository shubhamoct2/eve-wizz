import {createContext} from 'react';

import defaultValues from "@/app/(on-boarding)/on-boarding/boarding-steps/defaultValues"
import EventService from "@/services/venue/event.service";
import VenueService from "@/services/venue/venue.service";

export interface OnBoardingContextProps {
    values: any
    methods: any,
    next: any,
    gotTo: any,
    previous: any,
    activeStep: any
}


class Stepper {
    venueStore(data) {
    }
}


const registerVenue = async (data: any) => {
    console.log(data, 'venueData')
    VenueService.storeVenue(data);
}
const registerEvents = async (data: any) => {
    console.log(data, 'venueData')
}
const nextStep = (step = null) => {
    console.log(step, 'nextStep')

}
const previousStep = (step) => {

}
const gotToStep = (step) => {

}
const activeStep = (step) => {

}


const stepperDefaultValues = Object.assign({}, defaultValues)

export const OnBoardingContext = createContext<OnBoardingContextProps | null>({
    values: stepperDefaultValues,
    methods: {
        registerVenue,
        registerEvents,
    },
    next: nextStep,
    previous: previousStep,
    gotTo: gotToStep,
    activeStep: activeStep
})
