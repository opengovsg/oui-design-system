"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Select, SelectItem, TagField, TextField } from "@opengovsg/oui"
import type { Key } from "react-aria-components"
import { Form } from "react-aria-components"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  country: z.string().min(1, "Pick a country"),
  interests: z.array(z.string()).min(1, "Pick at least one interest"),
})

type FormValues = z.infer<typeof schema>

const COUNTRY_OPTIONS = [
  { id: "sg", textValue: "Singapore" },
  { id: "my", textValue: "Malaysia" },
  { id: "id", textValue: "Indonesia" },
]

const INTEREST_OPTIONS = [
  { id: "tech", textValue: "Technology" },
  { id: "design", textValue: "Design" },
  { id: "policy", textValue: "Policy" },
]

export default function FormsReactHookForm() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", country: "", interests: [] },
  })

  const onSubmit = async (values: FormValues) => {
    await new Promise((r) => setTimeout(r, 500))
    console.log(values)
  }

  return (
    <Form
      className="flex flex-col gap-6"
      onSubmit={handleSubmit(onSubmit)}
      validationBehavior="aria"
    >
      <Controller
        control={control}
        name="name"
        render={({ field, fieldState }) => (
          <TextField
            label="Name"
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            isInvalid={fieldState.invalid}
            errorMessage={errors.name?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="country"
        render={({ field, fieldState }) => (
          <Select
            label="Country"
            value={field.value || null}
            onChange={(k: Key | null) => field.onChange(k ?? "")}
            isInvalid={fieldState.invalid}
            errorMessage={errors.country?.message}
          >
            {COUNTRY_OPTIONS.map((option) => (
              <SelectItem key={option.id} id={option.id}>
                {option.textValue}
              </SelectItem>
            ))}
          </Select>
        )}
      />
      <Controller
        control={control}
        name="interests"
        render={({ field, fieldState }) => (
          <TagField
            label="Interests"
            defaultItems={INTEREST_OPTIONS}
            selectedKeys={new Set<Key>(field.value)}
            onSelectionChange={(keys: Set<Key>) =>
              field.onChange([...keys] as string[])
            }
            isInvalid={fieldState.invalid}
            errorMessage={errors.interests?.message}
          />
        )}
      />
      <Button type="submit" isDisabled={isSubmitting}>
        Submit
      </Button>
    </Form>
  )
}
