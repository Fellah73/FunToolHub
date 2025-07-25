import { cn } from '@/lib/utils'
import React from 'react'

export default function MaxWidthWrapper({
    className , children
}:{
    className :string,
    children : React.ReactNode
}) {
  return (
    <div className={cn('size-full px-2 md:px-20',className)}>
         {children}
    </div>
  )
}
