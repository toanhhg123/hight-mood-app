import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'

import FormFieldBoolean from '@/components/form-field-boolean'
import FormFieldInput from '@/components/form-field-input'
import FormFieldSelect from '@/components/form-field-select'
import { Form } from '@/components/ui/form'
import { handleToastError } from '@/lib'
import userService from '@/services/user.service'
import { ERole, User, UserCreate } from '@/types/user'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'
import * as z from 'zod'

interface Props {
  initUser?: User
  open: boolean
  onOpenChange: (open: boolean) => void
  type: 'create' | 'update'
}

const formSchema = z.object({
  email: z.string().email().min(1),
  isPremium: z.boolean().optional(),
  roleCode: z.nativeEnum(ERole),
  firstName: z.string().optional(),
  phone: z.string().optional()
})

const FormUser = ({ initUser, open, onOpenChange, type }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      isPremium: false,
      roleCode: ERole.USER,
      firstName: '',
      phone: '',
      ...initUser
    }
  })

  const client = useQueryClient()

  const { mutate, status } = useMutation({
    mutationFn: async () => {
      if (type === 'create') return userService.createUser(form.getValues() as UserCreate)
      if (initUser) return userService.updateUser(initUser.id, form.getValues() as UserCreate)
      return
    },
    onSuccess: () => {
      toast.success(type === 'create' ? 'create music success' : 'update user success')
      client.invalidateQueries('users')
      onOpenChange(false)
    },
    onError: (e) => {
      handleToastError(e)
    }
  })

  const onSubmit = () => {
    mutate()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader className='mb-4'>
              <DialogTitle>Create new user</DialogTitle>
              <DialogDescription>Click save when you're done.</DialogDescription>
            </DialogHeader>

            <div className='flex flex-col gap-2'>
              <FormFieldInput name='firstName' label='FirstName' form={form} />
              <FormFieldInput name='phone' label='Phone' form={form} />

              <FormFieldInput name='email' label='Email' form={form} />
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
              <Button type='submit' disabled={status === 'loading'}>
                {status === 'loading' && <Loader2 className='mr-2 w-4 animate-spin' />}
                Create new
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default FormUser
