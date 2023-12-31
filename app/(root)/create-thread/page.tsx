import React from 'react'
import PostThread from '@/components/forms/PostThread';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default async function Page() {
    const user = await currentUser();

    if (!user) return null;

    const userInfo = await fetchUser(user.id) // this line will get the userInformation for the database from fetchUser function

    if (!userInfo?.onboarded) redirect('/onboarding')  // this line will redirect the user to onboarding if there is no user information in the database 

    return (

        <>
            <h1 className="head-text">Create doks</h1>

            <PostThread userId={userInfo._id}  />
        </>
    )
}