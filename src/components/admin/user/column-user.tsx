import { Badge } from '@/components/ui/badge'
import { User } from '@/types/user'
import { ColumnDef } from '@tanstack/react-table'

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
  }
]
