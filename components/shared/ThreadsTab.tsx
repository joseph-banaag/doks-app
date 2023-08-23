import { fetchUserPosts } from "@/lib/actions/user.actions"
import { redirect } from "next/navigation"
import React from 'react'
import ThreadCard from "../cards/ThreadCard"

interface Props {
    currentUserId: string,
    accountId: string,
    accountType: string,
}
export default async function ThreadsTab({
    currentUserId,
    accountId,
    accountType
}: Props) {

    let result = await fetchUserPosts(accountId)
    if (!result) redirect('/')

    return (
        <div className="mt-9 flex flex-col gap-10">
            {result.threads.map((threadUserPost: any) => {
                return (
                    <ThreadCard
                        key={threadUserPost._id}
                        id={threadUserPost._id}
                        currentUserId={currentUserId}
                        parentId={threadUserPost.parentId}
                        content={threadUserPost.text}
                        author={
                            accountType === "User"
                                ? {
                                    name: result.name, image: result.image, id: result.id
                                }
                                : {
                                    name: threadUserPost.author.name, image: threadUserPost.author.image, id: threadUserPost.author.id
                                }
                        }
                        community={threadUserPost.community}
                        createdAt={threadUserPost.createdAt}
                        comments={threadUserPost.children}

                    />
                )
            })}

        </div>

    )
}
