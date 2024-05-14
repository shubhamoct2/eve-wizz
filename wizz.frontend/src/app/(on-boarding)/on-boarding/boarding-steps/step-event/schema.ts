import {
    z,
    ZodType
} from "zod"; // Add new import
const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];
const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png", "webp"];

const eventMainSchema = z
    .object({
        eventCategory: z
            .string({
                required_error: "Event Category is required",
                invalid_type_error: "Event Category is required",
            }),
        title: z
            .string({
                required_error: "Title is required",
                invalid_type_error: "Title is required",
            })
        .min(3, 'Minimum length is 3')
        .max(50, 'Maximum length is 50'),
        subTitle: z
            .string({
                required_error: "Sub Title is required",
                invalid_type_error: "Sub Title is required",
            })
        .min(5, 'Minimum length is 5')
        .max(50, 'Maximum length is 50'),
        bannerHeading: z
            .string({
                required_error: "Banner Heading is required",
                invalid_type_error: "Banner Heading is required",
            })
        .min(5, 'Minimum length is 5')
        .max(100, 'Maximum length is 100'),
        description: z
            .string({
                required_error: "Description is required",
                invalid_type_error: "Description is required",
            })
        .min(20, 'Minimum length is 20')
        .max(300, 'Maximum length is 300'),
        banner: z
            .any()
//            .refine((files) => files?.length == 1, "Image is required.")
           .refine((files) => {
               console.log(undefined !== files,' filesfiles')
                return (undefined != files);
            },"Banner is required")
            .refine((files) => {
                console.log(files,'files')
                return files?.[0]?.size <= MAX_FILE_SIZE;
            }, `Max image size is 5MB.`)
            .refine(
                (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
                "Only .jpg, .jpeg, .png and .webp formats are supported."
        ),
    })
export default eventMainSchema
