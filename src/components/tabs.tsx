import { TabsContent, Tabs as TabsDefault, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ReactNode } from 'react'

interface Props {
  tabs: { value: string; component: ReactNode; label: string }[]
}

export default function Tabs({ tabs }: Props) {
  return (
    <TabsDefault defaultValue={tabs.at(0)?.value} className=''>
      <TabsList className='grid w-full grid-cols-2'>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent className='w-full' key={tab.value} value={tab.value}>
          {tab.component}
        </TabsContent>
      ))}
    </TabsDefault>
  )
}
