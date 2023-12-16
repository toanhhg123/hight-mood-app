import CardUpdatePassword from '@/components/admin/user/card-update-password'
import CardUserUpdate from '@/components/admin/user/card-update-user'
import SkeletonLoading from '@/components/skeleton-loading'
import { Separator } from '@/components/ui/separator'
import authService from '@/services/auth.service'
import { useQuery } from 'react-query'

const Profile = () => {
  const { isFetching, isLoading, data } = useQuery({
    queryKey: 'me',
    queryFn: authService.getMe,
    refetchOnWindowFocus: false
  })

  const user = data?.element

  return (
    <div>
      <div className='flex justify-between my-2'>
        <div>
          <h3 className='font-semibold text-lg'>Update Profile</h3>
          <span className='text-gray-400 text-sm'></span>
        </div>
      </div>

      <Separator className='my-2' />
      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 my-2'>
        {(isFetching || isLoading) && Array.from({ length: 20 }).map((_, index) => <SkeletonLoading key={index} />)}
      </div>
      <div className='flex flex-col gap-8'>
        {user ? <CardUserUpdate user={user} /> : <h3>Can not get User</h3>}
        {user ? <CardUpdatePassword /> : <h3>Can not get User</h3>}
      </div>
    </div>
  )
}

export default Profile
