import {z, ZodType} from "zod"; // Add new import

const packageSchema = z
    .object({
        eventMainHeading: z
            .string(),
        eventSubHeading: z
            .string(),
        eventPackageInfo: z
            .string(),
            eventPackageFlyer:z.
                any()
            .refine((file)=> file?.length,'Flyer required')
    })
export default packageSchema
