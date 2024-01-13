import { Button } from '@/components/ui/button'
import { Card, CardHeader } from '@/components/ui/card'
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
import userService from '@/services/user.service'
import { Loader2, PenSquare, UserCheck2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import * as z from 'zod'

interface Props {
  music: Media
}

const formSchema = z.object({
  authorId: z.string().optional()
})

const MediaAuthor = ({ music }: Props) => {
  const queryClient = useQueryClient()

  const { status, mutate } = useMutation({
    mutationFn: ({ id, body }: { id: string; body: Partial<MediaCreate> }) => mediaService.updateMedia(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['music-details'] })
      toast.success('update  success')
    }
  })

  const { data } = useQuery('singers', {
    queryFn: userService.getSingers,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    refetchInterval: false
  })
  const singers = data?.element

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      authorId: music.authorId
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
      <CardHeader>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-2'>
            <Button size={'icon'}>
              <UserCheck2 />
            </Button>
            <div className='text-sm text-gray-500'>
              <h3 className=' font-semibold'>
                {music.author?.firstName + ' ' + music.author?.lastName || 'no update'}
              </h3>
              <span>{music.author?.email}</span>
            </div>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button size={'sm'} variant={'secondary'}>
                <PenSquare className='mr-2' />
                Update
              </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <DialogHeader>
                    <DialogTitle>Add To Author</DialogTitle>
                    <DialogDescription>music will be add to Singer.</DialogDescription>
                  </DialogHeader>

                  <div className='my-4'>
                    <FormFieldSelect
                      form={form}
                      name={'authorId'}
                      desc='select Singer'
                      label='Choice Singer'
                      selects={singers ? singers.map((singer) => ({ _id: singer.id, value: singer.email })) : []}
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
      </CardHeader>
    </Card>
  )
}

export default MediaAuthor
