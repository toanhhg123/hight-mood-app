import FormFieldInput from '@/components/form-field-input'
import Tabs from '@/components/tabs'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import UploadFile from '@/components/upload-file'
import { Music } from '@/types/music'
import { zodResolver } from '@hookform/resolvers/zod'
import { PenLine, Radio } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import toast from 'react-hot-toast'
import * as z from 'zod'

interface Props {
  music: Music
}

const formSchema = z.object({
  src: z.string().min(1)
})

const CardMusicSrc = ({ music }: Props) => {
  const [edit, setEdit] = useState(false)

  const toggleEdit = () => setEdit(!edit)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      src: music.src || ''
    }
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
    toast.success('create music success')
  }

  return (
    <Card className=''>
      <CardHeader className='pb-2 flex flex-row items-center justify-between text-gray-500'>
        <div className='flex items-center justify-between w-full'>
          <div className='  text-sm font-semibold flex gap-1 items-center'>
            <Radio />
            Music Link
          </div>

          <Button onClick={toggleEdit} variant={'outline'} size={'icon'}>
            <PenLine />
          </Button>
        </div>
      </CardHeader>
      <CardContent className='pb-4'>
        <div className='flex gap-2 items-center w-full'>
          {edit ? (
            <div className='w-full'>
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
                        <UploadFile />
                        <div className='flex justify-end'>
                          <Button className='mt-2 ml-auto'>Save change</Button>
                        </div>
                      </>
                    )
                  }
                ]}
              />
            </div>
          ) : (
            <div className='rounded-sm p-2 flex  bg-gray-200 items-center flex-1 truncate text-sm text-gray-700'>
              <p className='truncate'>{music.src || 'no update'}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default CardMusicSrc
