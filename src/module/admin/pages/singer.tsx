import { columnUser } from '@/components/admin/user/column-user'
import CreateUser from '@/components/admin/user/create-user'
import DataTableUser from '@/components/admin/user/data-table-user'
import FormUser from '@/components/admin/user/dialog-form-user'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import userService from '@/services/user.service'
import { User } from '@/types/user'
import { MoreHorizontal } from 'lucide-react'
import { useState } from 'react'
import { useQuery } from 'react-query'

const Singers = () => {
  const { data } = useQuery('singers', {
    queryFn: userService.getSingers,
    staleTime: 100000
  })

  const [dialog, setDialog] = useState<{ userSelected?: User; type?: 'create' | 'update' }>({})

  const isShowUpdate = dialog.type && dialog.userSelected ? true : false
  const handleOpenChange = (open: boolean, user?: User) => {
    if (!open) setDialog({})
    if (open && user) {
      setDialog({ type: 'update', userSelected: user })
    }
  }

  return (
    <div>
      <div className='flex justify-between my-2'>
        <div>
          <h3 className='font-semibold text-lg'>User List</h3>
          <span className='text-gray-400 text-sm'>Top picks for you. Updated daily</span>
        </div>
        <CreateUser />
        {isShowUpdate && (
          <FormUser
            type={dialog.type!}
            open={isShowUpdate}
            onOpenChange={handleOpenChange}
            initUser={dialog.userSelected}
          />
        )}
      </div>

      <Separator className='my-2' />
      {data && (
        <DataTableUser
          data={data.element}
          columns={[
            ...columnUser,
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
                      <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.id)}>
                        Copy user ID
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleOpenChange(true, user)}>Update</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )
              }
            }
          ]}
        />
      )}
    </div>
  )
}

export default Singers
