import FormFieldInput from '@/components/form-field-input'
import Tabs from '@/components/tabs'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import UploadFile from '@/components/upload-file'
import { handleToastError } from '@/lib'
import mediaService from '@/services/media.service'
import uploadService from '@/services/upload.service'
import { Media, MediaCreate } from '@/types/music'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, PenLine, Radio } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'
import * as z from 'zod'
import { Badge } from '../ui/badge'

interface Props {
  music: Media
}

const formSchema = z.object({
  src: z.string().min(1)
})

const CardMusicSrc = ({ music }: Props) => {
  const [edit, setEdit] = useState(false)
  const [file, setFile] = useState<File>()
  const [valueTab, setValueTab] = useState('form-text')

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

  const { status: statusUpload, mutate: mutateUpload } = useMutation({
    mutationFn: ({ file }: { file: File }) => uploadService.upload(file),
    onSuccess: (data) => {
      mutate({
        id: music.id,
        body: { src: data.data.url }
      })
    },
    onError: (e) => {
      handleToastError(e)
    }
  })

  const toggleEdit = () => setEdit(!edit)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      src: music.src || ''
    }
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate({
      id: music.id,
      body: { ...values }
    })
  }

  const handleUploadFile = async () => {
    if (!file) return toast.error('please choice file ?')

    mutateUpload({ file })
  }

  return (
    <Card className=''>
      <CardHeader className='pb-2 flex flex-row items-center justify-between text-gray-500'>
        <div className='flex items-center justify-between w-full'>
          <div className='  text-sm font-semibold flex gap-1 items-center'>
            <Radio />
            Music Link
            <div className=''>
              <audio className='h-8' controls>
                <source src={music.src} />
              </audio>
            </div>
          </div>

          <Button onClick={toggleEdit} type='button' variant={'outline'} size={'icon'}>
            <PenLine />
          </Button>
        </div>
      </CardHeader>
      <CardContent className='pb-4'>
        <div className='flex gap-2 items-center w-full'>
          {edit ? (
            <div className='w-full'>
              <Tabs
                value={valueTab}
                onValueChange={setValueTab}
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
                              name={'src'}
                              desc='please add link to my music...'
                              label='Music src'
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
                        <UploadFile onChangeFile={setFile} />
                        <div className='flex justify-end mt-4 gap-4'>
                          {file && <Badge variant={'outline'}>{file?.name}</Badge>}
                          <Button onClick={handleUploadFile} type='button'>
                            {status === 'loading' ||
                              (statusUpload === 'loading' && <Loader2 className=' animate-spin p-1' />)}
                            Save Changes
                          </Button>
                        </div>
                      </>
                    )
                  }
                ]}
              />
            </div>
          ) : (
            <>
              <div className='rounded-sm p-2 flex bg-gray-200 items-center flex-1 truncate text-sm text-gray-700'>
                <p className='truncate'>{music.src || 'no update'}</p>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default CardMusicSrc
