import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { User } from '@/types/user'

import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'

import FormFieldInput from '@/components/form-field-input'
import { Form } from '@/components/ui/form'
import { handleToastError } from '@/lib'
import userService from '@/services/user.service'
import { UserCreate } from '@/types/user'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'
import * as z from 'zod'
import authService from '@/services/auth.service'

const formSchema = z.object({
  password: z.string().min(4)
})

const CardUpdatePassword = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: ''
    }
  })

  const client = useQueryClient()

  const { mutate, status } = useMutation({
    mutationFn: async () => {
      return authService.changePassword(form.getValues('password'))
    },
    onSuccess: () => {
      client.invalidateQueries('me')
      toast.success('update password success')
    },
    onError: (e) => {
      handleToastError(e)
    }
  })

  const onSubmit = () => {
    mutate()
  }
  return (
    <Card>
      <CardHeader className=' font-semibold text-gray-700'>Update User</CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-2'>
              <FormFieldInput inputType='password' name='password' label='Password' form={form} />
            </div>

            <DialogFooter className='mt-4'>
              <Button type='submit' disabled={status === 'loading'}>
                {status === 'loading' && <Loader2 className='mr-2 w-4 animate-spin' />}
                Update
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default CardUpdatePassword
