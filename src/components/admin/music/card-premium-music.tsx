import AlertDialogConfirm from '@/components/alert-dialog-confirm'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import mediaService from '@/services/media.service'
import { Media, MediaCreate } from '@/types/music'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useQueryClient, useMutation } from 'react-query'

interface Props {
  music: Media
}

const CardPremiumMusic = ({ music }: Props) => {
  const queryClient = useQueryClient()

  const { status, mutate } = useMutation({
    mutationFn: ({ id, body }: { id: string; body: Partial<MediaCreate> }) => mediaService.updateMedia(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['music-details'] })
      toast.success('update music success')
    }
  })

  const [dialogConfirm, setDialogConfirm] = useState({ isOpen: false, title: '' })

  const handleToggleDialog = (title: string = '') => {
    setDialogConfirm({ isOpen: !dialogConfirm.isOpen, title })
  }

  const handlePremium = () => {
    mutate({
      id: music.id,
      body: { isPremium: !music.isPremium }
    })
  }

  return (
    <Card>
      <div className='p-4 flex justify-between items-center'>
        <p className='text-sm font-medium leading-none flex items-center gap-1'>
          <span className='mr-2 rounded-lg bg-secondary px-2 py-1 text-xs '>Status</span>
          <span className='text-muted-foreground text-sm'>{music.isPremium ? 'active' : 'normal'}</span>
          <span
            className={cn('w-2 h-2 rounded-full  block', music.isPremium ? 'bg-green-400' : 'bg-yellow-400')}
          ></span>
        </p>

        <AlertDialogConfirm
          isOpen={dialogConfirm.isOpen}
          title={dialogConfirm.title}
          desc='you will definitely change the status of the song '
          onContinue={handlePremium}
          type='default'
          loading={status === 'loading'}
          onOpenChange={(open) => setDialogConfirm({ isOpen: open, title: '' })}
        />

        <div className='flex items-center space-x-2'>
          <Switch
            id='premium'
            onCheckedChange={() => {
              handleToggleDialog(
                music.isPremium ? 'Do you want turn off active premium ?' : 'Do you want turn on active premium ?'
              )
            }}
            checked={music.isPremium}
          />
          <Label htmlFor='premium'>Active Premium</Label>
        </div>
      </div>
    </Card>
  )
}

export default CardPremiumMusic
