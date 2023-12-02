import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

const HeadFilter = () => {
  return (
    <div className='flex justify-between'>
      <div className='flex flex-col gap-2'>
        <Badge variant={'secondary'} className='w-max text-lg text-sky-700'>
          Access Times
        </Badge>
        <span className='text-sm text-gray-500'>Overview of Latest Month</span>
      </div>
      <Select>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Date filter' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Filter Date</SelectLabel>
            <SelectItem value='Monthly'>Monthly</SelectItem>
            <SelectItem value='3 Months'>3 Months</SelectItem>
            <SelectItem value='6 Months'>Monthly</SelectItem>
            <SelectItem value='1 years'>1 Years</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default HeadFilter
