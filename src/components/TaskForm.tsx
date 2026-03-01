import { taskZodSchema, type TaskZodSchemaType } from "@/lib/zodSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTaskActions } from "@/hooks/useTaskActions"
import { toast } from "sonner"
import { useTransition } from "react"

function TaskForm() {
    const [ isPending, startTransition ] = useTransition()
    const { createTask } = useTaskActions()
    const form = useForm<TaskZodSchemaType>({
        resolver: zodResolver(taskZodSchema),
        defaultValues: {
            title: "",
            description: "",
        }
    })

    const handleSubmit = (values: TaskZodSchemaType) => {
        startTransition(async () => {
            try {
                await createTask(values)
                toast.success("Tarea creada exitosamente.")
                form.reset()
            }
            catch (e) {
                console.error(e)
                toast.error(":(")
            }
        })
    }

    return (
        <Card className="mb-8">
            <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                    Nueva tarea
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Título</FieldLabel>
                        <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="Nombre de la tarea"
                            autoComplete="off"
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />

            <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Descripción</FieldLabel>
                        <Textarea
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="Descripción de la tarea"
                            className="min-h-[120px] resize-none"
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />

            <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Guardando…" : "Guardar tarea"}
            </Button>
        </form>
            </CardContent>
        </Card>
    )
}

export default TaskForm