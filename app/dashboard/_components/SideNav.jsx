import { LibraryBig, LineChart, MessageSquare, Shield } from 'lucide-react'
import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation';
import { Button } from '../../../components/ui/button';
import { Progress } from '@/components/ui/progress';
function SideNav() {
    const menuList=[
        {
            id:1,
            name:'My Forms',
            icon:LibraryBig,
            path:'/dashboard'
        },
        {
            id:1,
            name:'Responses',
            icon:MessageSquare,
            path:'/dashboard/responses'
        },
        {
            id:1,
            name:'Analytics',
            icon:LineChart,
            path:'/dashboard/analytics'
        },
        {
            id:1,
            name:'Upgrade',
            icon:Shield,
            path:'/dashboard/upgrade'
        }
    ]

    const path=usePathname();
    useEffect(()=>{
        console.log(path)
    },[path])
  return (
    <div className='h-screen shadow-md border'>
        <div className='p-5'>
            {menuList.map((menu,index)=>(
                <h2 key={index} className={`flex items-center gap-3 p-4 mb-3
                hover:bg-primary hover:text-white rounded-lg
                cursor-pointer text-gray-500
                ${path==menu.path&&'bg-primary text-white'}
                `}>
                    <menu.icon/>
                    {menu.name}
                </h2>
            ))}
        </div>
        <div className='fixed buttom-7 p-6 w-64'>
            <Button className='w-full'>Create Form</Button>
            <div className='my-7'>
                <Progress value={33}/>
                <h2 className='text-sm mt-2 text-gray-600'><strong>2</strong> Out of <strong>3 </strong>Files Created</h2>
                <h2 className='text-sm mt-3 text-gray-600'> Upgrade Your Plan for Unlimited AI Forms</h2>
            </div>
        </div>
    </div>
  )
}

export default SideNav