import {Controller, useForm} from "react-hook-form";
import defaultValues from "./defaultValues";
import {zodResolver} from "@hookform/resolvers/zod";
import tableSchema from "@/app/(on-boarding)/on-boarding/boarding-steps/step-table/schema";
import {Input} from "@/components/ui/input";
import Error from "@/components/notifications/error";
import * as React from "react";

export default function StepFourTable({onClickHandler}) {
    // ** Hooks
    const {
        reset: tableReset,
        control: tableControl,
        handleSubmit: handleTableSubmit,
        formState: {errors: tableErrors},
        watch
    } = useForm({
        defaultValues: defaultValues,
        resolver: zodResolver(tableSchema)
    })


    const onSubmit = (data) => {
        console.log(data, 'TABLE SUBMITTED')
    }

    return (
        <>
            <section className="steps-counter h-screen w-full">
                <section className="step-table flex w-full justify-between">
                    <section className="w-8/12 mx-auto px-8">
                        <section className={"table bg-white w-full p-8"}>
                            <article className={"row w-full"}>
                                <h4 className={"text-3xl text-center"}>Tell Us About your Table</h4>
                            </article>
                            <form
                                key={0}
                                onSubmit={handleTableSubmit(onSubmit)}
                            >
                                <article className={"flex w-full px-4 my-6 space-x-4"}>
                                    <section className={"w-1/2"}>
                                        <Controller
                                            name='category'
                                            control={tableControl}
                                            rules={{required: true, maxLength: 30}}
                                            render={({field: {value, onChange}}) => (
                                                <Input
                                                    className={tableErrors.category ? 'text-red-500 border-red-500' : ''}
                                                    value={value}
                                                    onChange={onChange}
                                                    placeholder='e.g. Stock Brook'
                                                    aria-describedby='venue-base-info-name'
                                                />
                                            )}
                                        />
                                        {tableErrors.category && (
                                            <Error message={tableErrors?.category.message}/>
                                        )}
                                    </section>
                                    <section className={"w-1/2"}>
                                        <Controller
                                            name='title'
                                            control={tableControl}
                                            rules={{required: true}}
                                            render={({field: {value, onChange}}) => (
                                                <Input
                                                    className={tableErrors.title ? 'text-red-500 border-red-500' : ''}
                                                    type='phone'
                                                    value={value}
                                                    onChange={onChange}
                                                    placeholder='123 456 7890'
                                                    aria-describedby='venue-base-info-phone'
                                                />
                                            )}
                                        />
                                        {tableErrors.title && (
                                            <Error message={tableErrors?.title.message}/>
                                        )}
                                    </section>
                                </article>
                            </form>

                        </section>

                    </section>
                </section>
            </section>
        </>
    )
}
