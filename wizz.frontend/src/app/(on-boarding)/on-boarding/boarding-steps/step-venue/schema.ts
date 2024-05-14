import {z, ZodType} from "zod"; // Add new import
const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
    );

const venueSchema = z
    .object({
        name: z
            .string({
                required_error: "Venue name is required",
                invalid_type_error: "Venue must be a string",
            })
            .min(3, {message: "Min length is 3."})
            .max(50, {message: "Maximum length is 50"}),
        email: z
            .string({
                required_error: "Email address is required",
                invalid_type_error: "",
            })
            .email("Email is not valid")
            .min(1, {message: "Email address is required"})
            .max(50, {message: "Maximum length is 50"}),

        phone: z
            .string({
                required_error: "Phone number is required.",
                invalid_type_error: "",
            })
            .min(1, {message: "Phone number is required."})
            .regex(phoneRegex, 'Phone number is not valid'),
        address: z
            .string({
                required_error: "Address is required.",
                invalid_type_error: "",
            })
            .min(10, {message: "Address is required."}),
            description: z
                .string({
                    required_error: "Description is required.",
                    invalid_type_error: "",
                })

    })

export default venueSchema
