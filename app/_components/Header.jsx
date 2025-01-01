"use client"
import React from 'react'
import Image from "next/image";
import { Button } from '../../components/ui/button';
import { UserButton, useUser } from '@clerk/nextjs';

function Header() {
  const {user, isSignedIn}=useUser();
  return (
    <div className='p-1 border-b shadow-sm'>
      <div className='flex items-center justify-between'>
        <Image src={'/logo1.svg'} width={180} height={50} alt='logo'/>
        {isSignedIn?
        <div className='flex items-center gap-5'>
        <Button varient="outline">Dashboard</Button>
        <UserButton/>
        </div>:
        <Button>Get Started</Button>
      }
      </div>
    </div>
  )
}

export default Header