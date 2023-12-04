import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Dialog,
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
import * as z from 'zod'
import { Form } from '@/components/ui/form'
import toast from 'react-hot-toast'
import mediaService from '@/services/media.service'
import { useQueryClient, useMutation, useQuery } from 'react-query'
import { Loader2 } from 'lucide-react'
import albumService from '@/services/album.service'

interface Props {
  music: Media
}

const formSchema = z.object({
  albumId: z.string().optional()
})

const CardAlbumMusic = ({ music }: Props) => {
  const queryClient = useQueryClient()

  const { status, mutate } = useMutation({
    mutationFn: ({ id, body }: { id: string; body: Partial<MediaCreate> }) => mediaService.updateMedia(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['music-details'] })
      toast.success('update music success')
    }
  })

  const { data } = useQuery('my-album', albumService.getMyAlbum)
  const album = data?.element

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      albumId: music.albumId || undefined
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
          <span className='mr-2 rounded-lg bg-secondary px-2 py-1 text-xs '>Album</span>
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
                  <DialogTitle>Add To Album</DialogTitle>
                  <DialogDescription>music will be add to album.</DialogDescription>
                </DialogHeader>

                <div className='my-4'>
                  <FormFieldSelect
                    form={form}
                    name={'albumId'}
                    desc='select album now'
                    label='Choice album'
                    selects={album ? album.map((album) => ({ _id: album.id, value: album.name })) : []}
                  />
                </div>

                <DialogFooter>
                  <Button type='submit' disabled={status === 'loading'}>
                    {status === 'loading' && <Loader2 className=' animate-spin p-1' />}
                    Save Changes
                  </Button>{' '}
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </Card>
  )
}

export default CardAlbumMusic
