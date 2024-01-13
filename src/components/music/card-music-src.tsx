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
import { Loader2, PenLine, PlayCircle, TimerResetIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'
import * as z from 'zod'
import { Badge } from '../ui/badge'
import { formatMMSS } from '@/lib/utils'

interface Props {
  music: Media
}

const formSchema = z.object({
  src: z.string().min(1),
  duration: z.number()
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
      src: music.src || '',
      duration: music.duration || 0
    }
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate({
      id: music.id,
      body: { ...values }
    })
  }

  const handleResetDuration = () => {
    const audio = new Audio(music.src)
    audio.onloadedmetadata = () => {
      const duration = Number(audio.duration.toFixed())
      mutate({
        id: music.id,
        body: { duration }
      })
      form.setValue('duration', duration)
    }

    audio.onerror = () => {
      toast.error('error')
    }
  }

  const handleUploadFile = async () => {
    if (!file) return toast.error('please choice file ?')
    mutateUpload({ file })
  }

  const duration = form.getValues('duration')

  return (
    <Card className=''>
      <CardHeader className='my-2'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center'>
            <Button size={'icon'}>
              <PlayCircle />
            </Button>
            <div className='ml-2  text-gray-500'>
              <h3 className=' font-medium'>{music.name || 'no update'}</h3>
              <span className='text-sm'>duration: {formatMMSS(duration)}</span>
            </div>
          </div>
          <div className='flex gap-2'>
            <Button onClick={toggleEdit} type='button' variant={'outline'} size={'icon'}>
              <PenLine />
            </Button>
            <Button onClick={handleResetDuration} type='button' variant={'secondary'} size={'icon'}>
              <TimerResetIcon />
            </Button>
          </div>
        </div>
        <audio className='h-8 w-full' controls>
          <source src={music.src} className='w-full' />
        </audio>
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
                        <UploadFile
                          onChangeFile={(file) => {
                            if (file) {
                              const reader = new FileReader()
                              reader.readAsDataURL(file)
                              reader.onload = function () {
                                const audio = new Audio(reader.result?.toString())
                                audio.onloadedmetadata = () => {
                                  form.setValue('duration', Number(audio.duration.toFixed()))
                                }
                              }
                            }

                            setFile(file)
                          }}
                        />
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
