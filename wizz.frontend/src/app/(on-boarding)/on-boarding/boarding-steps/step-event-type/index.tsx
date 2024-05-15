"use client"

import Link from "next/link"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"

import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {toast} from "@/components/ui/use-toast"

const FormSchema = z.object({
    eventType: z
        .string({
            required_error: "Please select event type",
        })
})

export default function StepThreeEventType({onClickHandler}) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        onClickHandler(data)
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    return (
        <section className="steps-counter h-screen w-full">
            <section className="step-3 flex w-6/12 flex-col mx-auto justify-center">
                <section className="w-full border rounded-sm p-12 bg-white">
                    <h3>Now tell us about your Event</h3>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                            <FormField
                                control={form.control}
                                name="eventType"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="uppercase ">is it a ticked or seated event</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Option"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="table">Table</SelectItem>
                                                <SelectItem value="ticket">Tickets</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Next</Button>
                        </form>
                    </Form>
                </section>

            </section>
        </section>
    )
}
