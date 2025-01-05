"use client"
import { db } from '@/configs'
import { JsonForms } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import FormUI from '@/app/edit-form/_components/FormUI'
import { toast } from 'sonner'
function EditForm({ params }) {
  const { user } = useUser();
  const [jsonForm, setJsonForm] = useState({
    fields: []
  });
  const [formID, setFormID] = useState(null);
  const router=useRouter();
  const [updateTrigger,setUpdateTrigger]=useState();
  const [record, setRecord]=useState([]);

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
        setRecord(result[0])
        setJsonForm(parsedForm);
      } else {
        console.warn("No form data found or invalid format.");
      }
    } catch (error) {
      console.error("Error fetching form data:", error);
    }
  };

  useEffect(()=>{
    if(updateTrigger)
    {
      setJsonForm(jsonForm);
      updateJsonFormInDb();
    }
    
  },[updateTrigger])

  const onFieldUpdate = (value, index) => {
    if (jsonForm?.formFields && Array.isArray(jsonForm.formFields) && index >= 0 && index < jsonForm.formFields.length) {
      const updatedJsonForm = {
        ...jsonForm,
        formFields: jsonForm.formFields.map((field, idx) =>
          idx === index ? { ...field, formLabel: value.label, placeholder: value.placeholder } : field
        ),
      };
      setJsonForm(updatedJsonForm);
      console.log("Updated jsonForm:", updatedJsonForm);
    } else {
      console.warn("Invalid index or formFields array is not valid.");
    }
    setUpdateTrigger(Date.now())
  };
  
  const updateJsonFormInDb=async ()=>{
    const result=await db.update(JsonForms)
    .set({
      jsonform:jsonForm
    }).where(eq(JsonForms.id,record.id),
    eq(JsonForms.createdBy,user?.primaryEmailAddress?.emailAddress))
    toast('Updated')
  }
  const deleteField = (indexToRemove)=>{
    const result=jsonForm.formFields.filter((Item,index)=>index!=indexToRemove);
    console.log(result)
    jsonForm.formFields=result;
    setUpdateTrigger(Date.now())
  }

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
        <FormUI jsonForm={jsonForm}
        onFieldUpdate={onFieldUpdate}
        deleteField={(index)=>deleteField(index)}
        />
      </div>
      </div>
     
    </div>
  );
}

export default EditForm;
