"use client"
import React, { ChangeEvent, useState } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { UserValidation } from '@/lib/validations/user';
import * as z from "zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from '../ui/button';
import Image from 'next/image';
import { Textarea } from '../ui/textarea';
import { isBase64Image } from '@/lib/utils';
import {useUploadThing} from "@/lib/uploadthing"

// this is the type declaration for the properties passed to the AccountProfile component
interface Props {
    user: {
        id: string,
        objectId: string,
        username: string,
        name: string,
        bio: string,
        image: string
    },
    btnTitle: string
}


export default function AccountProfile({ user, btnTitle }: Props) {

    const [files, setFiles] = useState<File[]>([])

    // What this block do: This function will handle the selection of the image and used the FileReader API to perform the intended operations.
    const handleImage = (e: ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) => {
        e.preventDefault();

        const fileReader = new FileReader();

        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]

            setFiles(Array.from(e.target.files));
            if (!file.type.includes('image')) return;

            fileReader.onload = async (event) => {
                const imageDataUrl = event.target?.result?.toString() || "";
                fieldChange(imageDataUrl)
            }

            fileReader.readAsDataURL(file)
        }

    }

    // what this block do: this is a form validation that will generate data based on user object which will come from currentUser from @clerk/nextjs and is using zodResolver for the correct type declaration in typescript 
    const form = useForm({
        resolver: zodResolver(UserValidation),
        defaultValues: {
            profile_photo: user?.image || "",
            name: user?.name || "",
            username: user?.username || "",
            bio: user?.bio || ""
        }
    });

    // what this block do: 
    function onSubmit(values: z.infer<typeof UserValidation>) {
        const blob = values.profile_photo;
        const hasImageChanged = isBase64Image(blob)

        if (hasImageChanged) {
            const imageResponse = 
        }
    }


    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col justify-start gap-5">

                <FormField
                    control={form.control}
                    name="profile_photo"
                    render={({ field }) => (
                        <FormItem className='flex items-center gap-4'>

                            <FormLabel className='account-form_form-label'>
                                {field.value ? (
                                    <Image
                                        src={field.value}
                                        alt="profile photo"
                                        width={96}
                                        height={96}
                                        priority
                                        className='rounded-full object-cover'
                                    />
                                ) : (
                                    <Image
                                        src='/assets/profile.svg'
                                        alt='profile photo'
                                        width={96}
                                        height={96}
                                        className='object-cover'
                                    />
                                )}
                            </FormLabel>

                            <FormControl className='flex-1 text-base-semibold text-gray-200'>
                                <Input
                                    type='file'
                                    accept='image/*'
                                    placeholder='Upload your profile photo'
                                    className='account-form_image-input'
                                    onChange={(e) => handleImage(e, field.onChange)}

                                />
                            </FormControl>

                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className='flex flex-col items-start gap-3 w-full'>

                            <FormLabel className='text-base-semibold text-light-2'>
                                Name:
                            </FormLabel>

                            <FormControl>
                                <Input
                                    type='text'
                                    className='account-form_input no-focus'
                                    {...field}
                                />
                            </FormControl>

                        </FormItem>
                    )}
                />


                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem className='flex flex-col items-start gap-3 w-full'>

                            <FormLabel className='text-base-semibold text-light-2'>
                                Username:
                            </FormLabel>

                            <FormControl>
                                <Input
                                    type='text'
                                    className='account-form_input no-focus'
                                    {...field}
                                />
                            </FormControl>

                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem className='flex flex-col items-start gap-3 w-full'>

                            <FormLabel className='text-base-semibold text-light-2'>
                                Bio:
                            </FormLabel>

                            <FormControl>
                                <Textarea
                                    rows={10}
                                    className='account-form_input no-focus'
                                />
                            </FormControl>

                        </FormItem>
                    )}
                />




                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
