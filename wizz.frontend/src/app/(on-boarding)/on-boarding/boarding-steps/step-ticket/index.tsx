import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import venueSchema from "@/app/(on-boarding)/on-boarding/boarding-steps/step-venue/schema";
import defaultValues from './defaultValues'
import tableSchema from './'

export default function StepFourTicket({onClickHandler}) {
    // ** Hooks
    const {
        reset: tableReset,
        control: tableControl,
        handleSubmit: handleTableSubmit,
        formState: {errors: tableErrors},
        watch
    } = useForm({
        defaultValues: defaultValues,
        resolver: zodResolver(venueSchema)
    })
    return (
        <>
            <section className="steps-counter h-screen w-full">
                <section className="step-table flex w-full justify-between">
                    <section className="w-8/12 mx-auto px-8">


                    </section>
                </section>
            </section>

        </>
    )
}
