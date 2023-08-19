"use server"

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose"

interface Params {
    userId: string,
    username: string,
    name: string,
    bio: string,
    image: string,
    path: string
}

export async function UpdateUser({
    userId,
    username,
    name,
    bio,
    image,
    path

} : Params): Promise<void>{
    connectToDB(); //this line will call the connect to data base function from ../mongoose

    try {
       
    // action below will update the user using the findOneAndUpdate() function in mongoose.
    //  source: https://mongoosejs.com/docs/tutorials/findoneandupdate.html
    await User.findOneAndUpdate(
        { id: userId },
        {
            username: username.toLowerCase(),
            name,
            bio,
            image,
            onboarded: true
        },
        { upsert: true },
        
    );
    
    // action below wil revalidate the path as per requested
    // further details about revalidation using revalidatePath() method through this link: https://nextjs.org/docs/app/api-reference/functions/revalidatePath
    if (path === '/profile/edit')
        revalidatePath(path)
       
   } catch (error: any ) {
     throw new Error(`Failed to create/update user: ${error.message}`)
   }
}


// this code snippet is explained thoroughly by GPT on this link: https://www.youtube.com/watch?v=O5cmLDVTgAs&t=4478s