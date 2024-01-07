import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { handleToastError } from '@/lib'
import albumService from '@/services/album.service'
import { Album } from '@/types/music'
import { ChevronDown, Loader2, Music4Icon, Settings, Trash } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import SheetCardMusic from '../music/sheet-list-music'
import { Button } from '../ui/button'
import CardModalUpdateAlbum from './card-modal-update-album'

interface Props {
  album: Album
}

const AlbumActions = ({ album }: Props) => {
  const [show, setShow] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const handleToggleShow = () => setShow(!show)

  const [showSheetListMusic, setShowListSheetMusic] = useState(false)
  const handleToggleShowMusic = () => setShowListSheetMusic(!showSheetListMusic)
  return (
    <>
      <DeleteAlbum id={album.id} open={openDelete} onOpenChange={setOpenDelete} />

      <CardModalUpdateAlbum album={album} onOpenChange={handleToggleShow} open={show} />
      <SheetCardMusic medias={album.medias || []} onOpenChange={handleToggleShowMusic} open={showSheetListMusic} />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'outline'} size={'sm'} className='w-full flex gap-2 items-center'>
            Show More
            <ChevronDown className='w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56'>
          <DropdownMenuLabel>More Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleToggleShow}>
            <Settings className='mr-2 h-4 w-4' />
            <span>Update</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={handleToggleShowMusic}>
            <Music4Icon className='mr-2 h-4 w-4' />
            <span>Musics</span>
            <DropdownMenuShortcut>⌘M</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenDelete(true)}>
            <Trash className='mr-2 h-4 w-4' />
            <span>Delete</span>
            <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

interface PropsDelete {
  id: string
  open: boolean
  onOpenChange: (isOpen: boolean) => void
}

const DeleteAlbum = ({ id, open, onOpenChange }: PropsDelete) => {
  const navigate = useNavigate()

  const client = useQueryClient()

  const { mutate, status } = useMutation({
    mutationFn: async () => {
      return albumService.delete(id)
    },
    onSuccess: () => {
      toast.success('update password success')
      client.invalidateQueries(['album'])
      navigate('/admin/album')
    },
    onError: (e) => {
      handleToastError(e)
    }
  })
  return (
    <AlertDialog onOpenChange={onOpenChange} open={open}>
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
            {status === 'loading' && <Loader2 className='mr-2 w-4 animate-spin' />}
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AlbumActions
