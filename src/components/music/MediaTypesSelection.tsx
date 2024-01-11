import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Media, MediaCreate } from '@/types/music'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import FormFieldSelect from '@/components/form-field-select'
import { Form } from '@/components/ui/form'
import mediaService from '@/services/media.service'
import mediaTypeService from '@/services/mediaType.service'
import { Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import * as z from 'zod'

interface Props {
  music: Media
}

const formSchema = z.object({
  mediaTypeId: z.string().optional()
})

const MediaTypeSelection = ({ music }: Props) => {
  const queryClient = useQueryClient()

  const { status, mutate } = useMutation({
    mutationFn: ({ id, body }: { id: string; body: Partial<MediaCreate> }) => mediaService.updateMedia(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['music-details'] })
      toast.success('update  success')
    }
  })

  const { data } = useQuery('mediaTypes', {
    queryFn: mediaTypeService.getMediaTypes,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    refetchInterval: false
  })
  const mediaTypes = data?.element.rows

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mediaTypeId: music.mediaTypeId
    }
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate({
      id: music.id,
      body: { ...values }
    })
  }

  return (
    <Card>
      <div className='p-4 flex justify-between items-center'>
        <p className='text-sm font-medium leading-none'>
          <span className='mr-2 rounded-lg bg-secondary px-2 py-1 text-xs '>Media Types</span>
          <span className='text-muted-foreground'>{music.album?.name || 'non update album'}</span>
        </p>

        <Dialog>
          <DialogTrigger asChild>
            <Button size={'sm'}>Update Now</Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <DialogHeader>
                  <DialogTitle>Add To Media Types</DialogTitle>
                  <DialogDescription>music will be add to Media Types.</DialogDescription>
                </DialogHeader>

                <div className='my-4'>
                  <FormFieldSelect
                    form={form}
                    name={'mediaTypeId'}
                    desc='select album now'
                    label='Choice album'
                    selects={mediaTypes ? mediaTypes.map((album) => ({ _id: album.id, value: album.name })) : []}
                  />
                </div>

                <DialogFooter>
                  <DialogClose>
                    <Button type='submit' disabled={status === 'loading'}>
                      {status === 'loading' && <Loader2 className=' animate-spin p-1' />}
                      Save Changes
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </Card>
  )
}

export default MediaTypeSelection
