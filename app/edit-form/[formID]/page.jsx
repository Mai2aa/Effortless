"use client"
import { db } from '@/configs'
import { JsonForms } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import FormUI from '@/app/edit-form/_components/FormUI'
function EditForm({ params }) {
  const { user } = useUser();
  const [jsonForm, setJsonForm] = useState([]);
  const [formID, setFormID] = useState(null);
  const router=useRouter();

  useEffect(() => {
    // Unwrap params using React.use
    const resolveParams = async () => {
      const resolvedParams = await params; // Await the Promise
      setFormID(resolvedParams?.formID); // Extract formID and store it
    };

    resolveParams();
  }, [params]);

  useEffect(() => {
    if (user && formID) {
      GetFormData();
    }
  }, [user, formID]);

  const GetFormData = async () => {
    try {
      const result = await db
        .select()
        .from(JsonForms)
        .where(
          and(
            eq(JsonForms.id, formID),
            eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
          )
        );

      if (result?.[0]?.jsonform) {
        const parsedForm = JSON.parse(result[0].jsonform);
        console.log(parsedForm);
        setJsonForm(parsedForm);
      } else {
        console.warn("No form data found or invalid format.");
      }
    } catch (error) {
      console.error("Error fetching form data:", error);
    }
  };

  return (
    <div className='p-10'>
      <h2 className='flex gap-2 items-center my-5 cursor-pointer hover:font-bold'
      onClick={()=>router.back()}>
        <ArrowLeft/>Back
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
        <div className='p-5 border rounded-lg shadow-md'>
          Controller
        </div>
        <div className='md:col-span-2 border rounded-lg p-5 flex items-center justify-center'>
        <FormUI jsonForm={jsonForm}/>
      </div>
      </div>
     
    </div>
  );
}

export default EditForm;
