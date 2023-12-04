import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Media } from '@/types/music'
import ListMusic from './list-music'

interface Props {
  medias: Media[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function SheetCardMusic({ open, onOpenChange, medias }: Props) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side={'bottom'} style={{ minWidth: 600 }}>
        <SheetHeader>
          <SheetTitle>List Music</SheetTitle>
          <SheetDescription>Make changes to your profile here. Click save when you're done.</SheetDescription>
        </SheetHeader>
        <div className='my-8'></div>
        <ListMusic musics={medias} />
      </SheetContent>
    </Sheet>
  )
}
