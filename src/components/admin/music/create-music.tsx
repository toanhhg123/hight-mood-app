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

const formSchema = z.object({
  name: z.string().min(1).max(50)
})

const CreateMusic = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ''
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
              <Button type='submit'>Create new</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateMusic
