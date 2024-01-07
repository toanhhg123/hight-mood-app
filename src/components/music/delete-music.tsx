import { Media } from '@/types/music'
import { Loader, Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { handleToastError } from '@/lib'
import mediaService from '@/services/media.service'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'

interface Props {
  media: Media
}

const DeleteMusic = ({ media }: Props) => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const { mutate, status } = useMutation({
    mutationFn: async () => {
      return mediaService.deleteMusic(media.id)
    },
    onSuccess: () => {
      toast.success('update password success')
      navigate('/admin/music')
    },
    onError: (e) => {
      handleToastError(e)
    }
  })

  return (
    <Card>
      <CardHeader>
        <div className='flex item-start justify-between'>
          <div className='flex gap-2 items-center'>
            <Button size={'icon'}>
              <Trash2 />
            </Button>
            <div className='text-gray-700'>
              <h3 className='font-semibold'>Delete Music</h3>
              <p className='text-sm'>Delete Music will be delete playlist, comment,...</p>
            </div>
          </div>
        </div>
        <CardContent className='p-2'>
          <div className='bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 w-full' role='alert'>
            <p className='font-bold'>Be Warned</p>
            <p>Something not ideal might be happening.</p>
          </div>
        </CardContent>

        <CardFooter className='justify-end'>
          <AlertDialog onOpenChange={setOpen} open={open}>
            <AlertDialogTrigger asChild>
              <Button variant={'destructive'}>
                <Trash2 className='w-4 mr-2' />
                Force Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account and remove your data from our
                  servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button disabled={status === 'loading'} onClick={() => mutate()}>
                  {status === 'loading' && <Loader className='mr-2 w-4 animate-spin' />}
                  Continue
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </CardHeader>
    </Card>
  )
}

export default DeleteMusic
