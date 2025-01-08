import React, { useRef, useState } from 'react';
import FieldEdit from '@/app/edit-form/_components/FieldEdit'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { db } from '@/configs';
import { toast } from 'sonner';
import { userResponse } from '@/configs/schema';
import moment from 'moment';

function FormUI({ jsonForm = {},selectedTheme,onFieldUpdate,deleteField,editable=true, formId=0 }) {
  const { formTitle, formSubheading, formFields = [] } = jsonForm;
  const [formData,setFormData]=useState();
  let formRef=useRef();
  
  const handleInputChange=(event)=>{
    
    const {name,value}=event.target;
    setFormData({
    ...formData,
    [name]:value
    })
  }

  const handleSelectChange=(name,value)=>{
    setFormData({
      ...formData,
      [name]:value
      })
  }

  const onFormSubmit=async(event)=>{
    event.preventDefault()
    console.log(formData);

    const result=await db.insert(userResponse)
    .values({
      jsonResponse:formData,
      createdAt:moment().format('DD/MM/yyyy'),
      formRef:formId
    })

    if(result)
    {
      formRef.reset();
      toast('Response Submitted Successfully!!')
    }
    else {
      toast('Error While Saving Your Form')
    }
  }
  const handleCheckboxChange=(fieldName,itemName, value)=>{
    const list=formData?.[fieldName]?formData?.[fieldName]:[];
    if(value)
    {
      list.push({
        label:itemName,
        value:value
      })
      setFormData({
        ...formData,
        [fieldName]:list
      })

    } else {
      const result= list.filter((item)=>item.label==itemName);
      setFormData({
        ...formData,
        [fieldName]:result
      })

    }

  }
  return (
    <form
    ref={(e)=>formRef=e}
    onSubmit={onFormSubmit}
    
    className='border p-5 md:w-[600px] rounded-lg' data-theme={selectedTheme}>
      <h2 className='font-bold text-center text-2xl'>{formTitle}</h2>
      <h2 className='text-sm text-gray-400 text-center'>{formSubheading}</h2>
      {Array.isArray(formFields) &&
        formFields.map((field, index) => (
          <div key={index} className='flex items-center gap-2 '>
            {field.fieldType === 'select' ? (
              <div className='my-2 w-full'>
                <label className='text-xs text-gray-500'>{field.formLabel}</label> 
                <Select required={field?.fieldRequired} onValueChange={(v)=>handleSelectChange(field.formLabel,v)}>
                  <SelectTrigger className="w-full bg-transparent">
                    <SelectValue placeholder={field.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {field?.options?.map((item, idx) => (
                      <SelectItem key={idx} value={item}>{item}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : field.fieldType === 'radio' ? (
              <div className='my-2 w-full'>
                <label className='text-xs text-gray-500'>{field.formLabel}</label> 
                <RadioGroup required={field?.fieldRequired}>
                  {field.options.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <RadioGroupItem value={item} id={`${field.formName}-${idx}`}
                      onClick={()=>handleSelectChange(field.formLabel,item.label)}
                      />
                      <Label htmlFor={`${field.formName}-${idx}`}>{item}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ) : field.fieldType === 'checkbox' ? (
              <div className='my-2 w-full'>
                <label className='text-xs text-gray-500'>{field.formLabel}</label>
                {Array.isArray(field.options) && field.options.length > 0 ? (
                  field.options.map((item, idx) => (
                    <div key={idx} className='flex gap-2 items-center w-full'>
                      <Checkbox onCheckedChange={(v)=>handleCheckboxChange(field?.formLabel, item,v)}
                      id={`${field.formName}-${idx}`} />
                      <Label htmlFor={`${field.formName}-${idx}`}>{item}</Label>
                    </div>
                  ))
                ) : (
                  <div className='flex gap-2 items-center w-full'>
                    <Checkbox required={field?.fieldRequired} id={field.formName} />
                    <Label htmlFor={field.formName}>{field.formLabel}</Label>
                  </div>
                )}
              </div>
            ) : (
              <div className='my-2 w-full'>
                <label className='text-xs text-gray-500'>{field.formLabel}</label>
                <Input
                  type={field.fieldType}
                  placeholder={field.placeholder}
                  name={field.formName}
                  required={field?.fieldRequired}
                  onChange={(e)=>handleInputChange(e)}
                />
              </div>
            )}
          {editable&&<div>
          <FieldEdit defaultValue={{ label: field.formLabel, placeholder: field.placeholder }}
          onUpdate={(value)=>onFieldUpdate(value,index)}
          deleteField={()=>deleteField(index)}
          />
          </div>}
          </div>
         
        ))}
       <button type='submit' className='btn btn-primary'>Submit</button> 
    </form>
  );
}

export default FormUI;
