import {useState} from "react";
import TemplatePreview from "@/app/(on-boarding)/on-boarding/boarding-steps/template-preview";
import {useForm,useFieldArray, Controller} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod';
import defaultPackageValues from "@/app/(on-boarding)/on-boarding/boarding-steps/step-event-package/defaultValues";
import packageSchema from "@/app/(on-boarding)/on-boarding/boarding-steps/step-event-package/schema";
import {Input} from "@/components/ui/input"
import Error from "@/components/notifications/error"

export default function StepFiveEventPackage({onClickHandler}){
    const [selectedFlyer, setSelectedFlyer] = useState(null);
    const [preview, setPreview] = useState(null);


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


    const onSubmit=(data:any)=>{
        console.log(data,' --------------')
    }

    const UPLOAD_IMAGE_STYLE =
        "flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600";


    const setFlyerImage=(e)=>{
        const newUrl = URL.createObjectURL(e.target.files?.[0]);
        if (newUrl !== preview) {
             setPreview(newUrl)
            }
            setSelectedFlyer(
                e.target.files?.[0] || null
            );
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
                                        <label htmlFor="eventPackageFlyerImage" className="form-label">Flyer</label>
                                    </article>
                                    <article className={"flex w-full px-4"}>
                                        <div className="grid w-full items-center  gap-1.5">
                                            <Controller
                                                name="eventPackageFlyer"
                                                control={packageControl}
                                                rules={{ required: true }}
                                                render={({ field }) => (
                                                    <>
                                                        <div className="flex items-center justify-center w-full">
                                                            <label
                                                                htmlFor="eventPackageFlyerImage"
                                                                className={
                                                                    packageErrors?.eventPackageFlyer
                                                                        ? `${UPLOAD_IMAGE_STYLE} border-red-500`
                                                                        : UPLOAD_IMAGE_STYLE
                                                                }
                                                            >
                                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
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
                                                                    id="eventPackageFlyerImage"
                                                                    onBlur={field.onBlur}
                                                                    name={field.name}
                                                                    onChange={(e) => {
                                                                        field.onChange(e.target.files);
                                                                        setFlyerImage(e)
                                                                    }}
                                                                    ref={field.ref}
                                                                />
                                                            </label>
                                                        </div>
                                                    </>
                                                )}
                                            />

                                            {preview ? (
                                                    <section className="h-40 w-full p-4 border-2 border-gray-300 border-dashed rounded-lg">
                                                            <img className="object-cover object-center h-full w-full max-w-full rounded-lg" src={preview} alt="preview" />
                                                    </section>
                                            ) : null}

                                            {packageErrors?.eventPackageFlyer && (
                                                <Error message={packageErrors?.eventPackageFlyer.message} />
                                            )}
                                        </div>
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
