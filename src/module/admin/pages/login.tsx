import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import React from 'react'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  return (
    <div className={cn('grid gap-6 items-center justify-center h-screen', className)} {...props}>
      <form className=''>
        <Card className='w-[500px]'>
          <CardHeader>
            <CardTitle>Login </CardTitle>
            <CardDescription>Deploy your new project in one-click.</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className='grid w-full items-center gap-8'>
                <div className='flex flex-col space-y-1.5'>
                  <Label htmlFor='name'>email</Label>
                  <Input id='name' placeholder='email of your system' />
                </div>

                <div className='flex flex-col space-y-1.5'>
                  <Label htmlFor='password'>password</Label>
                  <Input id='password' type='password' placeholder='password of your system' />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className='flex justify-between'>
            <Button className='w-full'>Login</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
