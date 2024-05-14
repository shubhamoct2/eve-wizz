import TemplatePreview from "@/app/(on-boarding)/on-boarding/boarding-steps/template-preview";
import {useForm,useFieldArray, Controller} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod';
import defaultPackageValues from "@/app/(on-boarding)/on-boarding/boarding-steps/step-event-package/defaultValues";
import packageSchema from "@/app/(on-boarding)/on-boarding/boarding-steps/step-event-package/schema";
import {Input} from "@/components/ui/input"

export default function StepFiveEventPackage(){
    // ** Hooks
    const {
        reset: packageReset,
        control: packageControl,
        handleSubmit: handleSubmit,
        formState: {errors: packageErrors}
    } = useForm({
        defaultValues: defaultPackageValues,
        resolver: zodResolver(packageSchema)
    })
    
    
    const onSubmit=(data)=>{
        console.log(data,' --------------')
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
                                onSubmit={handleSubmit(onSubmit)}
                                >
                                    <article className="title">
                                        <h4 className="form-label">Event Package</h4>
                                    </article>
                                    <section className="w-full py-4">
                                            <article className="title my-4">
                                                <label htmlFor="eventMainHeading" className="form-label">Event Main Heading</label>
                                            </article>
                                            <article className={"w-full px-4"}>
                                                <Controller
                                                    name="eventMainHeading"
                                                    control={packageControl}
                                                    rules={{ required: true }}
                                                    render={({ field: { value, onChange } }) => (
                                                        <>
                                                            <Input
                                                                id={"eventMainHeading"}
                                                                className={
                                                                    packageErrors.name
                                                                        ? "text-red-500 border-red-500"
                                                                        : ""
                                                                }
                                                                value={value}
                                                                onChange={onChange}
                                                                placeholder="e.g. Christmas Party"
                                                                aria-describedby="venue-package-heading"
                                                            />
                                                        </>
                                                    )}
                                                />
                                                {packageErrors?.eventMainHeading && (
                                                    <Error message={packageErrors?.eventMainHeading.message} />
                                                )}
                                            </article>
                                    </section>
                                    
                                    <section className="w-full py-4">
                                        <article className="title my-4">
                                            <label htmlFor="eventSubHeading" className="form-label">Sub Heading</label>
                                        </article>
                                        <article className={"w-full px-4"}>
                                            <Controller
                                                name="eventSubHeading"
                                                control={packageControl}
                                                rules={{ required: true }}
                                                render={({ field: { value, onChange } }) => (
                                                    <>
                                                        <Input
                                                            id={"eventSubHeading"}
                                                            className={
                                                                packageErrors.eventSubHeading
                                                                    ? "text-red-500 border-red-500"
                                                                    : ""
                                                            }
                                                            value={value}
                                                            onChange={onChange}
                                                            placeholder="e.g. Prices from $400-$500"
                                                            aria-describedby="venue-package-sub-heading"
                                                        />
                                                    </>
                                                )}
                                            />
                                            {packageErrors?.eventSubHeading && (
                                                <Error message={packageErrors?.eventSubHeading.message} />
                                            )}
                                        </article>
                                </section>
                                
                                
                                
                                
                                <section className="w-full py-4">
                                    <article className="title my-4">
                                        <label htmlFor="" className="form-label">Sub Heading</label>
                                    </article>
                                    <article className={"w-full px-4"}>
                                        <Controller
                                            name="eventSubHeading"
                                            control={packageControl}
                                            rules={{ required: true }}
                                            render={({ field: { value, onChange } }) => (
                                                <>
                                                    <Input
                                                        className={
                                                            packageErrors.name
                                                                ? "text-red-500 border-red-500"
                                                                : ""
                                                        }
                                                        value={value}
                                                        onChange={onChange}
                                                        placeholder="e.g. Prices from $400-$500"
                                                        aria-describedby="venue-package-sub-heading"
                                                    />
                                                </>
                                            )}
                                        />
                                        {packageErrors?.eventSubHeading && (
                                            <Error message={packageErrors?.eventSubHeading.message} />
                                        )}
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
