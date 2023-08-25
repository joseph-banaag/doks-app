"use server";

import React from "react";
import { connectToDB } from "../mongoose";
import { ThreadValidation } from "../validations/thread";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";
import { connect } from "http2";

interface Params {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}


// Note: the parameter inside the () of a function is the data input of any kind that the function is expecting to receive when the parameter is called inside the function. 
export async function createThread({
  text,
  author,
  communityId,
  path,
}: Params) {
  try {
    connectToDB();

    const createThread = await Thread.create({
      text,
      author,
      community: null,
    });

    // Updating the user model
    await User.findByIdAndUpdate(author, {
      $push: { threads: createThread._id },
    });

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Error when creating your thread: ${error.message}`);
  }
}

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
  connectToDB();

  // Calculate the number of posts to skip
  const skipAmount = (pageNumber - 1) * pageSize;

  // Fetch the posts that have no parents (this is the top-level threads...)
  const postsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
    .sort({ createdAt: -1 }) // this will display the result in descending order means that new one will be shown first
    .skip(skipAmount)
    .limit(pageSize)
    .populate({ path: "author", model: User })
    .populate({
      path: "children",
      populate: {
        path: "author",
        model: User,
        select: "_id name parentId image",
      },
    });

  const totalPostsCount = await Thread.countDocuments({
    parentId: {
      $in: [null, undefined],
    },
  });

  const posts = await postsQuery.exec();

  // this code will implement the pagination as it will create the next page if the count is more than the skipAmount.
  const isNext = totalPostsCount > skipAmount + posts.length;
  return { posts, isNext };
}

export async function fetchThreadById(id: string) {
  connectToDB();

  // TODO: populate Community

  try {
    const thread = await Thread.findById(id)
      .populate({
        path: "author",
        model: User,
        select: "_id id name image",
      })
      .populate({
        path: "children",
        populate: [
          {
            path: "author",
            model: User,
            select: "_id id name parentId image",
          },
          {
            path: "children",
            model: Thread,
            populate: {
              path: "author",
              model: User,
              select: "_id id name parentId image",
            },
          },
        ],
      })
      .exec();

    return thread;
  } catch (error: any) {
    throw new Error(`There was an error fetching the thread: ${error.message}`);
  }
}

export async function addCommentToThread(
  threadId: string,
  commentText: string,
  userId: string,
  path: string
) {
  connectToDB();

  try {
    // find the original thread using the thread id
    const originalThread = await Thread.findById(threadId);
    if (!originalThread) {
      throw new Error("Thread not found!");
    }

    // create a new thread with the comment section
    const commentedThread = new Thread({
      text: commentText,
      author: userId,
      parentId: threadId,
    });

    // save the new created reply
    const savedCommentedThread = await commentedThread.save();

    // update the original thread to include the reply
    originalThread.children.push(savedCommentedThread._id);

    await originalThread.save();

    revalidatePath(path);
    
  } catch (error: any) {
    throw new Error(`Failed adding your reply: ${error.message}`);
  }
}
