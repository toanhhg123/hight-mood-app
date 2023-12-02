import { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Textarea } from './ui/textarea'
import { ReactNode } from 'react'

interface Props<T extends FieldValues> {
  form: UseFormReturn<T, unknown, undefined>
  name: Path<T>
  label: string
  desc?: ReactNode
}

const FormFieldText = <T extends FieldValues>({ form, name, label, desc }: Props<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className='flex flex-col'>
            <FormLabel className='font-normal'>{label}</FormLabel>
            <FormControl>
              <Textarea placeholder='Tell us a little bit about yourself' className='resize-none' {...field} />
            </FormControl>
            <FormDescription>{desc}</FormDescription>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}

export default FormFieldText
