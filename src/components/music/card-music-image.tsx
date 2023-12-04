import { IMAGE_EMPTY } from '@/assets/image-link'
import FormFieldInput from '@/components/form-field-input'
import Tabs from '@/components/tabs'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import UploadFile from '@/components/upload-file'
import { handleToastError } from '@/lib'
import mediaService from '@/services/media.service'
import { Media, MediaCreate } from '@/types/music'
import { zodResolver } from '@hookform/resolvers/zod'
import { Copy, Loader2, PenLine } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useQueryClient, useMutation } from 'react-query'
import { z } from 'zod'

interface Props {
  music: Media
}

const formSchema = z.object({
  image: z.string().min(1)
})

const CardMusicImage = ({ music }: Props) => {
  const [edit, setEdit] = useState(false)

  const queryClient = useQueryClient()

  const { status, mutate } = useMutation({
    mutationFn: ({ id, body }: { id: string; body: Partial<MediaCreate> }) => mediaService.updateMedia(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['music-details'] })
      toast.success('update music success')
    },
    onError: (e) => {
      handleToastError(e)
    }
  })
  const toggleEdit = () => setEdit(!edit)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: music.image || ''
    }
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate({
      id: music.id,
      body: { ...values }
    })
  }

  return (
    <Card className=''>
      <CardHeader className='p-2 flex flex-row items-center justify-between'></CardHeader>
      <CardContent className='overflow-hidden'>
        <img
          src={music.image}
          className='my-4 w-full rounded-sm'
          alt=''
          onError={({ currentTarget }) => {
            currentTarget.onerror = null // prevents looping
            currentTarget.src = IMAGE_EMPTY
          }}
        />
        <div className='flex gap-2 items-center'>
          <Button onClick={toggleEdit} variant={'outline'} size={'icon'}>
            <PenLine className='w-4' />
          </Button>
          <div className='rounded-sm p-2 flex   bg-gray-200 items-center justify-between flex-1 truncate text-sm text-gray-700'>
            <p className='truncate'>{music.image || 'no update'}</p>
            <Button size={'icon'} variant={'outline'} className='px-3'>
              <Copy className='w-4' />
            </Button>
          </div>
        </div>

        {edit && (
          <div className='w-full my-2'>
            <Tabs
              tabs={[
                {
                  value: 'form-text',
                  label: 'Form Input',
                  component: (
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className='my-4'>
                          <FormFieldInput
                            form={form}
                            name={'image'}
                            desc='please add link to my music...'
                            label='Music Image'
                          />
                        </div>

                        <Button type='submit'>Save</Button>
                      </form>
                    </Form>
                  )
                },
                {
                  value: 'form-upload',
                  label: 'Form Upload',
                  component: (
                    <>
                      <UploadFile />
                      <div className='flex justify-end'>
                        <Button className='mt-4' type='submit' disabled={status === 'loading'}>
                          {status === 'loading' && <Loader2 className=' animate-spin p-1' />}
                          Save Changes
                        </Button>{' '}
                      </div>
                    </>
                  )
                }
              ]}
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default CardMusicImage
