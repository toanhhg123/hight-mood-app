import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

interface Props {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onContinue: () => void
  title: string
  desc?: string
  type: 'default' | 'danger'
  loading?: boolean
}

export default function AlertDialogConfirm({ isOpen, onOpenChange, onContinue, title, desc, type, loading }: Props) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{desc}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <Button onClick={onContinue} disabled={loading} variant={type === 'danger' ? 'destructive' : 'default'}>
            {loading && <Loader2 className=' animate-spin p-1' />}
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
