"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from "@/components/ui/textarea";
import { AiChatSession } from "@/configs/AiModel";
import { db } from "@/configs/index";
import { JsonForms } from "@/configs/schema";
import moment from 'moment';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

const PROMPT = "on the basis of description please give form in json format with form title, form subheading, form field, form name, placeholder name and form label, fieldType, field required in json format";

function CreateForm() {
    const [openDialog, setOpenDialog] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(false);
    const { user } = useUser();
    const route = useRouter();
    const [formJson, setFormJson] = useState(null);

    const onCreateForm = async () => {
        setLoading(true);
        try {
            // Make the API call
            const result = await AiChatSession.sendMessage("Description:" + userInput + PROMPT);

            // Get the response text and log it for debugging
            const responseText = await result?.response.text();
            console.log("Raw response text:", responseText);

            // Try to parse the response as JSON
            let jsonResponse = null;
            try {
                jsonResponse = JSON.parse(responseText);
                console.log("Parsed JSON:", jsonResponse);
            } catch (e) {
                console.error("Error parsing response as JSON:", e);
                throw new Error("The response is not valid JSON");
            }

            // Log the response structure for debugging
            console.log("Response structure:", jsonResponse);

            // Check if the response is an array and take the first item if so
            let jsonForm = jsonResponse;
            if (Array.isArray(jsonResponse)) {
                jsonForm = jsonResponse[0]; // Use the first element of the array
            }

            // Log the extracted form for further debugging
            console.log("Extracted form structure:", jsonForm);

            // Ensure the form structure contains the necessary fields
            if (jsonForm && jsonForm.formTitle && jsonForm.formSubheading && Array.isArray(jsonForm.formFields)) {
                // Insert the form into the database
                const resp = await db.insert(JsonForms)
                    .values({
                        jsonform: JSON.stringify(jsonForm),
                        createdBy: user?.primaryEmailAddress?.emailAddress,
                        createdAt: moment().format("DD/MM/yyyy"),
                    }).returning({ id: JsonForms.id });

                console.log("New Form ID: ", resp[0].id);
                if (resp[0].id) {
                    route.push('/edit-form/' + resp[0].id);
                }

                // Save the formJson to state
                setFormJson(jsonForm);
            } else {
                console.error("Invalid form structure received:", jsonForm);
                throw new Error("Invalid form structure received");
            }
        } catch (error) {
            console.error("Error creating form:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Button onClick={() => setOpenDialog(true)}>Create Form</Button>
            <Dialog open={openDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Form</DialogTitle>
                        <DialogDescription>
                            Write a description for your form below.
                        </DialogDescription>
                    </DialogHeader>
                    <Textarea
                        className='my-2'
                        onChange={(event) => setUserInput(event.target.value)}
                        placeholder="Write description of your form..."
                    />
                    <div className='flex gap-2 my-3 justify-end'>
                        <Button onClick={() => setOpenDialog(false)} variant='destructive'>Cancel</Button>
                        <Button disabled={loading} onClick={onCreateForm}>
                            {loading ? <Loader2 className='animate-spin' /> : 'Create'}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {formJson && (
                <div className="form-preview">
                    <h2>{formJson?.formTitle}</h2>
                    <p>{formJson?.formSubheading}</p>
                    {formJson?.formFields?.map((field, index) => {
                        // Log each field for debugging
                        console.log("Rendering field:", field);

                        if (!field?.formName || !field?.fieldType) {
                            console.warn("Invalid field structure:", field);
                            return null;
                        }

                        return (
                            <div key={index}>
                                {field?.fieldType === 'select' ? (
                                    <select name={field?.formName}>
                                        {Array.isArray(field?.options) && field?.options.map((option, idx) => {
                                            if (option?.value && option?.label) {
                                                return (
                                                    <option key={idx} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                );
                                            } else {
                                                console.warn("Invalid option structure:", option);
                                                return null;
                                            }
                                        })}
                                    </select>
                                ) : (
                                    <input
                                        type={field?.fieldType}
                                        name={field?.formName}
                                        placeholder={field?.placeholder}
                                        required={field?.fieldRequired}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default CreateForm;
