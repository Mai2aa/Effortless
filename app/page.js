"use client"
import Hero from "./_components/Hero";
import Testimonial from "@/app/_components/Testimonial"
import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function Home() {
  return (
    <div>
    <Hero/> 
    <Testimonial/>
    </div>
  );
}
