import React from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import SocialMedia from './SocialMedia'
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { SiFiverr } from 'react-icons/si'
import { MdEmail } from 'react-icons/md'

export default function Footer() {
    return (

        <footer className='flex flex-col items-center mt-2 justify-center px-5 mx-auto'>
            <MaxWidthWrapper className=''>
               
                <div className='flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 gap-y-8'>
                    <SocialMedia url='https://github.com/Fellah73' socialMediaName='Github' socialMediaLogo={<FaGithub size={30} className='text-white' />} />
                    <SocialMedia url='https://github.com/Fellah73' socialMediaName='Instagram' socialMediaLogo={<FaInstagram size={30} className='text-rose-500' />} />
                    <SocialMedia url='https://github.com/Fellah73' socialMediaName='Fiver' socialMediaLogo={<SiFiverr size={41} className='text-green-500' />} />
                    <SocialMedia url='https://github.com/Fellah73' socialMediaName='Linkedin' socialMediaLogo={<FaLinkedin size={30} className='text-white' />} />
                    <SocialMedia url='https://github.com/Fellah73' socialMediaName='Email' socialMediaLogo={<MdEmail size={30} className='text-white' />} />
                    <SocialMedia url='https://github.com/Fellah73' socialMediaName='Twitter' socialMediaLogo={<FaTwitter size={30} className='text-blue-500' />} />

                </div>
            </MaxWidthWrapper>
            <div className='w-full h-0.5 bg-primary my-10 mx-auto' />
            <div className='w-full flex mb-3 items-center justify-center'>
                <p className=' text-primary-foreground text-xl'>Copyright &copy; {new Date().getFullYear()} Moh dev</p>
            </div>
        </footer >
    )
}
