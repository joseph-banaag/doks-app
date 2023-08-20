"use server"

import React from 'react'
import { connectToDB } from '../mongoose'
import { ThreadValidation } from '../validations/thread';
import Thread from '../models/thread.model';
import User from '../models/user.model';
import { revalidatePath } from 'next/cache';

interface Params {
    text: string,
    author: string,
    communityId: string | null,
    path: string
        
        
}

export async function createThread({ 
    text,
    author,
    communityId,
    path

}: Params) {
  
    try {
        connectToDB();

    const createThread = await Thread.create(
        {
            text,
            author,
            community: null
        }
    );

    // Updating the user model
    await User.findByIdAndUpdate(author,
        { $push: { threads: createThread._id } })

        revalidatePath(path)


    } catch (error: any) {
        throw new Error(`Error when creating your thread: ${error.message}`)
    }
}