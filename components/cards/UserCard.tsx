import React from "react";
import Link from "next/link";
import Image from "next/image";
import RenderTag from "../shared/RenderTag";
import { getTopInteractedTags } from "@/lib/actions/tag.actions";
import { Badge } from "../ui/badge";

interface UserCardProps {
  user: {
    _id: string;
    clerkId: string;
    name: string;
    username: string;
    picture: string;
  };
}
const UserCard = async ({ user }: UserCardProps) => {
  const userTags = await getTopInteractedTags({ userId: user._id });
  return (
    <Link
      href={`profile/:${user.clerkId}`}
      className="shadow-light100_darknone flex-center flex w-full flex-col max-xs:min-w-full xs:w-[260px]"
    >
      <article className="background-light900_dark200 light-border flex-center flex w-full flex-col rounded-2xl border p-8">
        <Image
          src={user.picture}
          width={100}
          height={100}
          alt="User profile picture"
          className="rounded-full"
        />
        <div className="flex-center mt-4 flex flex-col text-center">
          <h3 className="h3-bold text-dark200_light900 line-clamp-1">
            {user.name}
          </h3>
          <p className="body-regular text-dark500_light500 mt-2">
            @{user.username}
          </p>
        </div>
        <div className="mt-5 flex items-center gap-2 p-4">
          {userTags.length > 4 ? (
            userTags.map((tag) => {
              return <RenderTag key={tag._id} _id={tag._id} name={tag.name} />;
            })
          ) : (
            <Badge>No Tags Yet</Badge>
          )}
        </div>
      </article>
    </Link>
  );
};

export default UserCard;
