import { FieldValues, Path, UseFormReturn } from 'react-hook-form'

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ReactNode } from 'react'

type TypeSelectItem = { _id: string; value: string }

interface Props<T extends FieldValues> {
  form: UseFormReturn<T, unknown, undefined>
  name: Path<T>
  label: string
  selects: TypeSelectItem[]
  desc?: ReactNode
}

const FormFieldSelect = <T extends FieldValues>({ form, name, label, selects, desc }: Props<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className='flex flex-col relative'>
            <FormLabel className='font-normal'>{label}</FormLabel>
            <FormControl>
              <Select {...field} value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='select fields...' />
                  </SelectTrigger>
                </FormControl>
                <FormDescription>{desc}</FormDescription>
                <SelectContent>
                  {selects.map((item) => (
                    <SelectItem value={item._id} key={item._id}>
                      {item.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}

export default FormFieldSelect
