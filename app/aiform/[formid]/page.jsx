"use client"
import FormUI from '@/app/edit-form/_components/FormUI';
import { db } from '@/configs';
import { JsonForms } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

function LiveAiForm({params}) {
const [record, setRecord] = useState();
const [jsonForm, setJsonForm] = useState({
    fields: []
  });
const [resolvedParams, setResolvedParams] = useState(null);
    useEffect(()=>{
        const resolveParams = async () => {
            try {
                const result = await params;
                setResolvedParams(result);
                GetFormData(result)
            } catch (error) {
                console.error('Error resolving params: ', error);
            }
        };
        if (params) {
            resolveParams();
        }
    },[params]);
    const GetFormData=async(resolvedParams)=>{
        const result=await db.select().from(JsonForms)
        .where(eq(JsonForms.id,Number(resolvedParams?.formid)))
        setRecord(result[0]);
        setJsonForm(JSON.parse(result[0].jsonform))
        console.log(result);
    }
  return (
    <div className='p-10 flex justify-center items-center'
    style={{backgroundImage:record?.background}}
    >
        {record&& <FormUI
        jsonForm={jsonForm}
        onFieldUpdate={()=>console.log}
        deleteField={()=>console.log}
        selectedTheme={record?.theme}
        editable={false}
        />}
        <Link className='flex gap-2 items-center
        bg-black text-white px-3 py-1 rounded-full
        fixed bottom-5 left-5 cursor-pointer'
        href={'/'}
        >
            <Image src={'/e-logo.png'} width={50} height={50} alt='e-formless logo' />
            Build Your Own AI Form
        </Link>
    </div>
  )
}

export default LiveAiForm