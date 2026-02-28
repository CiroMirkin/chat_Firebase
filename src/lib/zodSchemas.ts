import z from "zod";

export const loginZodSchemas = z.object({
    email: z.string().trim().pipe(z.email("Invalid email format.")),
    password: z.string().min(6, "Password must be ar least 6 characters long."),
})

export type LoginZodSchemaType = z.infer<typeof loginZodSchemas>

export const profileSchema = z.object({
    name: z
        .string()
        .min(4, "El nombre es requerido")
        .max(20),
    photoURL: z.url("La URL no es válida").optional()
})

export type ProfileFormValues = z.infer<typeof profileSchema>
