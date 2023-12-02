import { columnUser } from '@/components/admin/user/column-user'
import CreateUser from '@/components/admin/user/create-user'
import DataTableUser from '@/components/admin/user/data-table-user'
import { Separator } from '@/components/ui/separator'
import userService from '@/services/user.service'
import { useQuery } from 'react-query'

const Users = () => {
  const { data } = useQuery('users', {
    queryFn: userService.getUser
  })

  return (
    <div>
      <div className='flex justify-between my-2'>
        <div>
          <h3 className='font-semibold text-lg'>User List</h3>
          <span className='text-gray-400 text-sm'>Top picks for you. Updated daily</span>
        </div>
        <CreateUser />
      </div>

      <Separator className='my-2' />
      {data && <DataTableUser data={data.element} columns={columnUser} />}
    </div>
  )
}

export default Users
