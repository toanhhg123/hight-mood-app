import { ReactNode } from 'react'
import { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Label } from './ui/label'
import { Switch } from './ui/switch'

interface Props<T extends FieldValues> {
  form: UseFormReturn<T, unknown, undefined>
  name: Path<T>
  label: string
  desc?: ReactNode
}

const FormFieldBoolean = <T extends FieldValues>({ form, name, label, desc }: Props<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const value = Boolean(field.value)
        return (
          <FormItem className='flex flex-col'>
            <FormLabel className='font-normal'>{label}</FormLabel>
            <FormControl>
              <div className='flex items-center space-x-2'>
                <Switch
                  id='toggle-boolean'
                  {...field}
                  checked={value}
                  onCheckedChange={(check) => {
                    form.setValue(name, check as PathValue<T, Path<T>>)
                  }}
                />
                <Label htmlFor='toggle-boolean'>{value ? 'on' : 'off'}</Label>
              </div>
            </FormControl>
            <FormDescription>{desc}</FormDescription>

            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}

export default FormFieldBoolean
