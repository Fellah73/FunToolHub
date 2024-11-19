import Link from 'next/link'
import React from 'react'

export default function SocialMedia({
    url , socialMediaLogo,socialMediaName
}:{
    url : string,
    socialMediaLogo : React.ReactNode,
    socialMediaName : string
}) {
  return (
    <div className='flex justify-start items-center gap-x-16 px-10'>
       {socialMediaLogo}
       <Link href={url} target="_blank" className='text-xl text-white'>
         {socialMediaName}
       </Link>

    </div>
  )
}
