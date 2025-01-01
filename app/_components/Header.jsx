import React from 'react'
import Image from "next/image";
import { Button } from '../../components/ui/button';

function Header() {
  return (
    <div className='p-1 border-b shadow-sm'>
      <div className='flex items-center justify-between'>
        <Image src={'/logo1.svg'} width={180} height={50} alt='logo'/>
        <Button>Get Started</Button>
      </div>
    </div>
  )
}

export default Header