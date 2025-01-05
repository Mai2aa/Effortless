import React from 'react';
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

function FormUI({ jsonForm = {}, onFieldUpdate,deleteField }) {
  const { formTitle, formSubheading, formFields = [] } = jsonForm;


  return (
    <div className='border p-5 md:w-[600px] rounded-lg'>
      <h2 className='font-bold text-center text-2xl'>{formTitle}</h2>
      <h2 className='text-sm text-gray-400 text-center'>{formSubheading}</h2>
      {Array.isArray(formFields) &&
        formFields.map((field, index) => (
          <div key={index} className='flex items-center gap-2'>
            {field.fieldType === 'select' ? (
              <div className='my-2 w-full'>
                <label className='text-xs text-gray-500'>{field.formLabel}</label> 
                <Select>
                  <SelectTrigger className="w-full">
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
                <RadioGroup>
                  {field.options.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <RadioGroupItem value={item} id={`${field.formName}-${idx}`} />
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
                      <Checkbox id={`${field.formName}-${idx}`} />
                      <Label htmlFor={`${field.formName}-${idx}`}>{item}</Label>
                    </div>
                  ))
                ) : (
                  <div className='flex gap-2 items-center w-full'>
                    <Checkbox id={field.formName} />
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
                />
              </div>
            )}
           <div>
          <FieldEdit defaultValue={{ label: field.formLabel, placeholder: field.placeholder }}
          onUpdate={(value)=>onFieldUpdate(value,index)}
          deleteField={()=>deleteField(index)}
          />
          </div> 
          </div>
         
        ))}
        
    </div>
  );
}

export default FormUI;
