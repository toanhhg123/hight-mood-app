import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { User } from '@/types/user'
import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columnUser: ColumnDef<User>[] = [
  {
    accessorKey: 'firstName',
    header: 'First Name',
    cell: ({ row }) => {
      const { firstName } = row.original

      return !firstName ? <span className='p-2 rounded-sm bg-secondary'>none update</span> : firstName
    }
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'phone',
    header: 'phone',
    cell: ({ row }) => {
      const { phone } = row.original

      return !phone ? <span className='p-2 rounded-sm bg-secondary'>none update</span> : phone
    }
  },
  {
    accessorKey: 'premium',
    header: 'isPremium',
    cell: ({ row }) => {
      const { isPremium } = row.original

      return isPremium ? <Badge>premium</Badge> : <Badge variant={'outline'}>normal</Badge>
    }
  },
  {
    id: 'actions',
    enableHiding: false,
    header: 'actions',
    cell: ({ row }) => {
      const user = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.id)}>Copy user ID</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
