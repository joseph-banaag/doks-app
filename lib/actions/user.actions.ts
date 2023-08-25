"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import Thread from "../models/thread.model";

interface Params {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}

export async function updateUser({
  userId,
  username,
  name,
  bio,
  image,
  path,
}: Params): Promise<void> {
  try {
    connectToDB(); //this line will call the connect to data base function from ../mongoose

    // action below will update the user using the findOneAndUpdate() function in mongoose.
    //  source: https://mongoosejs.com/docs/tutorials/findoneandupdate.html
    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      { upsert: true }
    );

    // action below wil revalidate the path as per requested
    // further details about revalidation using revalidatePath() method through this link: https://nextjs.org/docs/app/api-reference/functions/revalidatePath
    if (path === "/profile/edit") revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}
// this code snippet is explained thoroughly by GPT on this link: https://www.youtube.com/watch?v=O5cmLDVTgAs&t=4478s

export async function fetchUser(userId: string) {
  try {
    connectToDB();

    return await User.findOne({ id: userId });
    // .populate({
    //     path: "communities",
    //     model: "Community",
    // })
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

export async function fetchUserPosts(userId: string) {
  try {
    connectToDB();

    //TODO: populate community


    // Find all thread created by the user with the given userId
    const threads = await User.findOne({ id: userId }).populate({
      path: "threads",
      model: Thread,
      populate: {
        path: "children",
        model: Thread,
        populate: {
          path: "author",
          model: User,
          select: "name image  id"
        },
      },
    });

    return threads;
  } catch (error: any) {
    throw new Error(`Failed to get user's post ${error.message}`);
  }
}
