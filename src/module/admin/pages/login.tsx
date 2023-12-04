import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import FormFieldInput from '@/components/form-field-input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { handleToastError } from '@/lib'
import authService from '@/services/auth.service'
import { useMutation } from 'react-query'
import toast from 'react-hot-toast'
import useAuth from '@/hooks/useAuth'
import { useNavigate } from 'react-router-dom'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { loginSuccess, token } = useAuth()
  const navigate = useNavigate()

  const { status, mutate } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => authService.login(email, password),
    onError: (error) => {
      handleToastError(error)
    },
    onSuccess: (data) => {
      loginSuccess(data.element.accessToken)
      navigate('/admin/dashboard')
      toast.success('login success')
    }
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = ({ email, password }: z.infer<typeof formSchema>) => {
    mutate({ email, password })
  }

  useEffect(() => {
    if (token) navigate('/')
  }, [navigate, token])

  return (
    <div className={cn('grid gap-6 items-center justify-center h-screen', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className='w-[500px]'>
            <CardHeader>
              <CardTitle>Login </CardTitle>
              <CardDescription>Deploy your new project in one-click.</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className='grid w-full items-center gap-8'>
                  <div className='flex flex-col space-y-1.5'>
                    <FormFieldInput
                      label='Email'
                      name='email'
                      form={form}
                      desc='please login with role admin or singer'
                    />
                  </div>

                  <div className='flex flex-col space-y-1.5'>
                    <FormFieldInput label='Password' name='password' form={form} inputType='password' desc='' />{' '}
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className='flex justify-between'>
              <Button type='submit' disabled={status === 'loading'} className='w-full'>
                Login
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  )
}

const formSchema = z.object({
  email: z.string().min(1, { message: 'This field has to be filled.' }).email('This is not a valid email.'),
  password: z.string().min(4)
})
