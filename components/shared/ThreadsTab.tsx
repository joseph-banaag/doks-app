import React from 'react'

interface Props {
    currentUser: string,
    accountId: string,
    accountType: string,
}
export default function ThreadsTab({
    currentUser,
    accountId,
    accountType
}: Props) {

    // TODO: Fetch profile threads
    
    return (
        <div>
            <h1>ThreadsTab</h1>
        </div>
    )
}
