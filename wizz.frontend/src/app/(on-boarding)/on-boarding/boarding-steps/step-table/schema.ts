import {z} from "zod";


const tableSchema = z.object({
    enabled: z
        .number({
            required_error: "Enabled is required"
        }),
    data: z
        .array(
            z.object({
                category: z
                    .string({
                        required_error: "Category is required"
                    }),
                tableCount: z
                    .number({
                        required_error: "This field is required"
                    }),
                title: z
                    .string({
                        required_error: "Title is required"
                    })
                    .min(3, 'Minimum length is 3')
                    .max(50, 'Maximum length is 50'),
                date: z.date({
                    required_error: 'Date is required',
                    invalid_type_error: "This field must be date"
                }),
                list: z.object({
                    min: z
                        .number({
                            required_error: "Please enter the min number"
                        }).positive({
                            message: "Number must be positive value"
                        }),
                    max: z
                        .number({
                            required_error: "Please enter the max number"
                        }).positive({
                            message: "Number must be positive value"
                        }),
                    total: z
                        .number({
                            required_error: "Total is required",
                            invalid_type_error: "Total must be a number"
                        }).positive({
                            message: "Number must be positive value"
                        }),
                    price: z
                        .number({
                            required_error: "Total is required",
                            invalid_type_error: "Total must be a number"
                        }).positive({
                            message: "Number must be positive value"
                        }),
                }),
                deposit: z
                    .object({
                        isFullPayment: z
                            .boolean(),
                        dueDate: z
                            .date({
                                required_error: "Due date is required"
                            }),
                        amount: z
                            .number({
                                required_error: "Please enter the amount"
                            })
                    })
            })
        )
})

export default tableSchema
