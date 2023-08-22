import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Props {
    id: string
    currentUserId: string
    parentId: string | null
    content: string
    author: {
        name: string
        image: string
        id: string
    }
    community: {
        id: string
        name: string
        image: string
    } | null
    createdAt: string
    comments: {
        author: {
            image: string
        }
    }[]
    isComment?: boolean
}

export default function ThreadCard({
    id,
    currentUserId,
    parentId,
    content,
    author,
    community,
    createdAt,
    comments,
    isComment,
}: Props) {



    // TODO: implement the button functionalities: buttons start at line 80 

    return (
        <article className={`flex w-full flex-col rounded-xl  ${isComment ? "p-2 xs:px-7" : "bg-dark-2/80 p-7"}`}>
            <div className="flex items-start justify-between">
                <div className="flex flex-1 w-full gap-4">

                    <div className="flex flex-col items-center justify-center">
                        <Link href={`/profile/${author.id}`}
                            className='relative h-11 w-11'
                        >
                            <Image
                                src={author.image}
                                alt="profile image"
                                fill
                                style={{
                                    objectFit: "cover"
                                }}
                                className="cursor-pointer rounded-full "
                            />
                        </Link>
                        <div className='thread-card_bar' />
                    </div>

                    <div className="flex flex-col w-full">
                        <Link href={`/profile/${author.id}`}
                            className='w-fit '
                        >
                            <h4 className='cursor-pointer text-base-semibold text-light-1'>
                                {author.name}
                            </h4>
                        </Link>

                        <p className="mt-2 ps-4 text-small-regular text-light-2">
                            {content}
                        </p>

                        {/* Button functions below this line */}
                        <div className="mt-5 flex-flex-col gap-">
                            <div className='flex gap-3.5'>

                                {/* like/heart button */}
                                <div className="group relative flex justify-center">
                                    <Image
                                        src="/assets/heart-gray.svg"
                                        alt="heart"
                                        width={24}
                                        height={24}
                                        className='cursor-pointer object-contain'
                                    />
                                    <span className="absolute top-7 scale-0 rounded bg-gray-800 p-1 text-[11px] transition-all ease-in-out duration-300 text-white group-hover:scale-100">
                                        like
                                    </span>
                                </div>


                                {/* comment/reply button */}
                                <div className="group relative flex justify-center">
                                    <Link href={`/thread/${id}`}>
                                        <Image
                                            src="/assets/reply.svg"
                                            alt="reply"
                                            width={24}
                                            height={24}
                                            className='cursor-pointer object-contain'
                                        />
                                    </Link>

                                    <span className="absolute top-7 scale-0 rounded bg-gray-800 p-1 text-[11px]  transition-all ease-in-out duration-300 text-white group-hover:scale-100">
                                        reply
                                    </span>
                                </div>


                                {/* repost button */}
                                <div className="group relative flex justify-center">
                                    <Image
                                        src="/assets/repost.svg"
                                        alt="report"
                                        width={24}
                                        height={24}
                                        className='cursor-pointer object-contain'
                                    />

                                    <span className="absolute top-7 scale-0 rounded bg-gray-800 p-1 text-[11px]  transition-all ease-in-out duration-300 text-white group-hover:scale-100">
                                        repost
                                    </span>
                                </div>


                                {/* share button */}
                                <div className="group relative flex justify-center">
                                    <Image
                                        src="/assets/share.svg"
                                        alt="share"
                                        width={24}
                                        height={24}
                                        className='cursor-pointer object-contain'
                                    />

                                    <span className="absolute top-7 scale-0 rounded bg-gray-800 p-1 text-[11px]  transition-all ease-in-out duration-300 text-white group-hover:scale-100">
                                        share
                                    </span>
                                </div>

                            </div>
                            {isComment && comments.length > 0 && (
                                <Link href={`/thread/${id}`}>
                                    <p className="mt-1 text-subtle-medium text-gray-1">
                                        {comments.length} replies
                                    </p>
                                </Link>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </article>
    )

}
