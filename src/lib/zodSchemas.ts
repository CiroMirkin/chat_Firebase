import z from "zod";

export const loginZodSchemas = z.object({
    email: z.string().trim().pipe(z.email("Invalid email format.")),
    password: z.string().min(4, "Password must be ar least 4 characters long."),
})

export type LoginZodSchemaType = z.infer<typeof loginZodSchemas>