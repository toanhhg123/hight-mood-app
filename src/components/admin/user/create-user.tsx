import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { PlusCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import * as z from 'zod'
import { Form } from '@/components/ui/form'
import FormFieldInput from '@/components/form-field-input'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { ERole } from '@/types/user'
import FormFieldSelect from '@/components/form-field-select'
import FormFieldBoolean from '@/components/form-field-boolean'

const formSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(6),
  isPremium: z.boolean().optional(),
  roleCode: z.nativeEnum(ERole)
})

const CreateUser = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isPremium: false
    }
  })

  const navigate = useNavigate()

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
    toast.success('create music success')

    navigate(`/admin/music/details/001`)
  }

  return (
    <Dialog onOpenChange={(open) => open && form.reset()}>
      <DialogTrigger asChild>
        <Button className='flex gap-2'>
          <PlusCircle className='w-[14px]' />
          New User
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader className='mb-4'>
              <DialogTitle>Create new user</DialogTitle>
              <DialogDescription>Click save when you're done.</DialogDescription>
            </DialogHeader>

            <div className='flex flex-col gap-2'>
              <FormFieldInput name='email' label='Email' form={form} />
              <FormFieldInput name='password' inputType='password' label='Password' form={form} />
              <FormFieldSelect
                name='roleCode'
                label='Role'
                form={form}
                selects={[
                  { _id: ERole.ADMIN, value: 'ADMIN' },
                  { _id: ERole.SINGER, value: 'SINGER' },
                  { _id: ERole.USER, value: 'USER' }
                ]}
              />
              <FormFieldBoolean name='isPremium' label='Premium' form={form} />
            </div>

            <DialogFooter className='mt-4'>
              <Button type='submit'>Create new</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateUser
