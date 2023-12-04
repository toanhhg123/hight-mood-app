import { Skeleton } from './ui/skeleton'

const SkeletonLoading = () => {
  return (
    <div className='flex items-center space-x-4 mb-2'>
      <Skeleton className='h-12 w-12 rounded-full' />
      <div className='space-y-2 flex-1'>
        <Skeleton className='h-4' />
        <Skeleton className='h-4' />
        <Skeleton className='h-4' />
        <Skeleton className='h-4' />
      </div>
    </div>
  )
}

export default SkeletonLoading
