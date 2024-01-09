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
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, PlusCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'

import FormFieldInput from '@/components/form-field-input'
import { Form } from '@/components/ui/form'
import { handleToastError } from '@/lib'
import mediaTypeService from '@/services/mediaType.service'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'
import * as z from 'zod'

const formSchema = z.object({
  name: z.string().min(1).max(50)
})

const CreateMediaType = () => {
  const [show, setShow] = useState(false)
  const handleToggleShow = () => setShow(!show)

  const queryClient = useQueryClient()
  const { status, mutateAsync } = useMutation({ mutationFn: mediaTypeService.create })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ''
    }
  })

  const onSubmit = async ({ name }: z.infer<typeof formSchema>) => {
    try {
      await mutateAsync({
        name,
        image: '',
        note: ''
      })
      toast.success('create media types success')
      handleToggleShow()
      queryClient.invalidateQueries({ queryKey: ['mediaTypes'] })
    } catch (error) {
      handleToastError(error)
    }
  }
  return (
    <Dialog
      open={show}
      onOpenChange={() => {
        handleToggleShow()
        form.reset()
      }}
    >
      <DialogTrigger asChild>
        <Button className='flex gap-2'>
          <PlusCircle className='w-[14px]' />
          New Media Type
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader className='mb-4'>
              <DialogTitle>Create New Media Type</DialogTitle>
              <DialogDescription>Click save when you're done.</DialogDescription>
            </DialogHeader>

            <FormFieldInput name='name' label='Name' form={form} />

            <DialogFooter className='mt-4'>
              <Button disabled={status === 'loading'} type='submit'>
                {status === 'loading' && <Loader2 className=' animate-spin p-1' />}
                Create new
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateMediaType
