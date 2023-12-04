import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ChevronDown, Music4Icon, Settings, Trash } from 'lucide-react'
import { Button } from '../ui/button'
import toast from 'react-hot-toast'
import CardModalUpdateAlbum from './card-modal-update-album'
import { Album } from '@/types/music'
import { useState } from 'react'
import SheetCardMusic from '../music/sheet-list-music'

interface Props {
  album: Album
}

const AlbumActions = ({ album }: Props) => {
  const [show, setShow] = useState(false)
  const handleToggleShow = () => setShow(!show)

  const [showSheetListMusic, setShowListSheetMusic] = useState(false)
  const handleToggleShowMusic = () => setShowListSheetMusic(!showSheetListMusic)
  return (
    <>
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
          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => toast('Sorry, a feature updating!!')}>
            <Trash className='mr-2 h-4 w-4' />
            <span>Delete</span>
            <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default AlbumActions
