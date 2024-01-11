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

import FormFieldInput from '@/components/form-field-input'
import FormFieldText from '@/components/form-field-text'
import { Form } from '@/components/ui/form'
import { handleToastError } from '@/lib'
import mediaTypeService from '@/services/mediaType.service'
import { MediaType } from '@/types/music'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'
import * as z from 'zod'

const formSchema = z.object({
  name: z.string().min(1).max(50),
  image: z.string(),
  note: z.string()
})

interface Props {
  media: MediaType
  open: boolean
  onOpenChange: (open: boolean) => void
}

const CardModalUpdate = ({ media: { name, image, note, id }, open, onOpenChange }: Props) => {
  const queryClient = useQueryClient()
  const { status, mutateAsync } = useMutation({
    mutationFn: ({ id, media }: { id: string; media: Partial<MediaType> }) => mediaTypeService.update(id, media)
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name,
      image,
      note
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await mutateAsync({ id, media: values })
      toast.success('update   success')
      onOpenChange(false)
      queryClient.invalidateQueries({ queryKey: ['mediaTypes'] })
    } catch (error) {
      handleToastError(error)
    }
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader className='mb-4'>
              <DialogTitle>Update Media Type</DialogTitle>
              <DialogDescription>Click save when you're done.</DialogDescription>
            </DialogHeader>

            <div className='flex flex-col gap-4'>
              <FormFieldInput name='name' label='Name' desc='please enter album name, this is required' form={form} />
              <FormFieldInput name='image' label='Image' desc='please upload link image...' form={form} />
              <FormFieldText
                desc={'You can enter description for this music.'}
                name='note'
                form={form}
                label='Description'
              />
            </div>

            <DialogFooter className='mt-4'>
              <Button disabled={status === 'loading'} type='submit'>
                {status === 'loading' && <Loader2 className=' animate-spin p-1' />}
                Update Now
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CardModalUpdate
