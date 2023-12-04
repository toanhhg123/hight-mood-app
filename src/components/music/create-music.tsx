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
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import * as z from 'zod'
import mediaService from '@/services/media.service'
import { handleToastError } from '@/lib'
import toast from 'react-hot-toast'

const formSchema = z.object({
  name: z.string().min(1).max(50)
})

const CreateMusic = () => {
  const queryClient = useQueryClient()
  const { status, mutateAsync } = useMutation({ mutationFn: mediaService.createMedia })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ''
    }
  })

  const navigate = useNavigate()

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const data = await mutateAsync({
        name: values.name,
        src: '',
        image: '',
        desc: '',
        isPremium: false
      })
      toast.success('create music success')
      queryClient.invalidateQueries({ queryKey: ['music'] })
      navigate(`/admin/music/details/${data.element.id}`)
    } catch (error) {
      handleToastError(error)
    }
  }

  return (
    <Dialog onOpenChange={(open) => open && form.reset()}>
      <DialogTrigger asChild>
        <Button className='flex gap-2'>
          <PlusCircle className='w-[14px]' />
          New Music
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader className='mb-4'>
              <DialogTitle>Create new Music</DialogTitle>
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

export default CreateMusic
