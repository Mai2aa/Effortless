import React from 'react'
import Image from "next/image";

function Header() {
  return (
    <div>
      <div>
        <Image src={'/logo1.svg'} width={200} height={50} alt='logo'/>
      </div>
    </div>
  )
}

export default Header