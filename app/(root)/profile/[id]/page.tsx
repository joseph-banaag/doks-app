import React from 'react'
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import ProfileHeader from "@/components/shared/ProfileHeader";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs"
import { profileTabs } from "@/constants/index"
import Image from "next/image";


export default async function Page() {

  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id) // this line will get the userInformation for the database from fetchUser function

  if (!userInfo?.onboarded) redirect('/onboarding')  // this line will redirect the user to onboarding if there is no user information in the database 

  return (
    <div>
      <ProfileHeader
        accountId={userInfo.id}
        authUserId={userInfo.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
      />

      <div className="mt-9">
        <Tabs defaultValue="threads" className="w-full flex flex-1 flex-col ">
          <TabsList className="tab">
            {profileTabs.map((tabs) => {
              return (
                <>

                  <TabsTrigger key={tabs.label} value={tabs.value} className="tab group relative">
                    <Image
                      src={tabs.icon}
                      alt={tabs.label}
                      width={28}
                      height={28}
                      className="object-contain"
                    />
                    <p className="max-sm:hidden">{tabs.label}</p>


                    <span className="absolute top-10 scale-0 rounded bg-primary-500 p-1 text-[11px] transition-all ease-in-out duration-300 text-white group-hover:scale-100">
                      <p className="max-sm:flex hidden">{tabs.label}</p>
                    </span>
                  </TabsTrigger>

                </>
              )
            })}

          </TabsList>
          <TabsContent value="thread" className="text-light-1">This is your threads tab content.</TabsContent>
          <TabsContent value="something1" className="text-light-1">this is where your something 1 tab content will be displayed.</TabsContent>
          <TabsContent value="something2" className="text-light-1">this is where your something 2 tab content will be displayed.</TabsContent>
        </Tabs>

      </div>

    </div>
  )
}
