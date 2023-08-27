
import AccountProfile from '@/components/forms/AccountProfile'
import React from 'react'
import { currentUser } from '@clerk/nextjs'
import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.actions";

export default async function Page() {
    // this function will get the user data from clerk for currently logged in user
    const user = await currentUser();
    if (!user) return null; // to avoid typescript warnings


    // this function will get the data from mongoDb database 
    const userInfo = await fetchUser(user.id);
    if (userInfo?.onboarded) redirect("/");

    const userData = {
        id: user.id,
        objectId: userInfo?._id,
        username: userInfo ? userInfo?.username : user.username,
        name: userInfo ? userInfo?.name : user.firstName ?? "",
        bio: userInfo ? userInfo?.bio : "",
        image: userInfo ? userInfo?.image : user.imageUrl,
    };

    return (
        <main className='mx-auto flex max-w-3xl flex-col justify-start px-10 py-20'>
            <h1 className="head-text">Onboarding</h1>
            <p className="mt-3 text-base-regular text-light-2">
                Complete your profile below:
            </p>

            <section className="mt-9 bg-dark-2 p-10 rounded-2xl">
                {/* reusable component */}
                <AccountProfile
                    user={userData}
                    btnTitle="Continue" />
            </section>

        </main>
    )
}
