"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from "@/components/ui/textarea"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  
function CreateForm() {
    const [openDialog,setOpenDialog]=useState(false)
    const [userInput, setUserInput]=useState();

    const onCreateForm=()=>{
        console.log(userInput);
    }
  return <div>
       <Button onClick={()=>setOpenDialog(true)}>Create Form</Button>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Form</DialogTitle>
            <DialogDescription>
            Write a description for your form below.
            </DialogDescription>
          </DialogHeader>
          <Textarea className='my-2'
            onChange={(event)=>setUserInput(event.target.value)} placeholder="Write description of your form..."/>

          <div className='flex gap-2 my-3 justify-end'>
                <Button onClick={()=>setOpenDialog(false)} varient='destructive'>Cancel</Button>
                <Button onClick={()=>onCreateForm()}>Create</Button>
            </div>
        </DialogContent>
      </Dialog>
    </div>;
}

export default CreateForm