import { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { ReactNode } from 'react'

interface Props<T extends FieldValues> {
  form: UseFormReturn<T, unknown, undefined>
  name: Path<T>
  label: string
  desc?: ReactNode
  inputType?: 'text' | 'password' | 'number'
}

const FormFieldInput = <T extends FieldValues>({ form, name, label, desc, inputType }: Props<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className='flex flex-col'>
            <FormLabel className='font-normal'>{label}</FormLabel>
            <FormControl>
              <Input type={inputType || 'text'} placeholder={`please enter  ${label}`} {...field} value={field.value} />
            </FormControl>
            <FormDescription>{desc}</FormDescription>

            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}

export default FormFieldInput
