import FormFieldInput from '@/components/form-field-input'
import FormFieldText from '@/components/form-field-text'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import mediaService from '@/services/media.service'
import { Media, MediaCreate } from '@/types/music'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'

import * as z from 'zod'

interface Props {
  music: Media
}

const formSchema = z.object({
  name: z.string().min(1).max(50),
  desc: z.string().min(1).max(500).optional()
})

const FormMusicDetails = ({ music }: Props) => {
  const queryClient = useQueryClient()
  const { status, mutate } = useMutation({
    mutationFn: ({ id, body }: { id: string; body: Partial<MediaCreate> }) => mediaService.updateMedia(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['music-details'] })
      toast.success('update music success')
    }
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...music
    }
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate({
      id: music.id,
      body: { ...values }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader className=''>
            <CardTitle>Music Details</CardTitle>
            <CardDescription>Make changes to your account here. Click save when you're done.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='flex flex-col gap-4'>
              <FormFieldInput name='name' form={form} label='Name' desc='You can enter name for this music. ' />
              <FormFieldText
                desc={'You can enter description for this music.'}
                name='desc'
                form={form}
                label='Description'
              />
            </div>
          </CardContent>
          <CardFooter className='flex justify-end'>
            <Button type='submit' disabled={status === 'loading'}>
              {status === 'loading' && <Loader2 className=' animate-spin p-1' />}
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

export default FormMusicDetails
