"use client";
import React, { useEffect } from 'react';
import Image from "next/image";
import { Button } from '../../components/ui/button';
import { UserButton, useUser, SignInButton } from '@clerk/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function Header() {
  const { user, isSignedIn } = useUser();

  return (
    <div className='p-1 border-b shadow-sm'>
      <div className='flex items-center justify-between'>
        <Image src={'/logo1.svg'} width={180} height={50} alt='logo' />
        {isSignedIn ? (
          <div className='flex items-center gap-5'>
            <Link href={'/dashboard'}>
              <Button variant="outline">Dashboard</Button>
            </Link>
            <UserButton />
          </div>
        ) : (
          <SignInButton>
            <Button>Get Started</Button>
          </SignInButton>
        )}
      </div>
    </div>
  );
}

export default Header;