"use client";

import { downVoteAnswer, upVoteAnswer } from "@/lib/actions/answer.actions";
import {
  downVoteQuestion,
  upVoteQuestion,
} from "@/lib/actions/question.actions";
import { formatBigNumber } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface VotesProps {
  type: string;
  itemId: string;
  userId: string;
  upvotes: number;
  hasUpVoted: boolean;
  downvotes: number;
  hasDownVoted: boolean;
  hasSaved?: boolean;
}
const Votes = ({
  type,
  itemId,
  userId,
  upvotes,
  hasUpVoted,
  downvotes,
  hasDownVoted,
  hasSaved,
}: VotesProps) => {
  const path = usePathname();
  const handleSave = () => {};

  const handleVote = async (voteType: string) => {
    if (!userId) {
      return;
    }
    if (voteType === "upvote") {
      if (type === "Question") {
        await upVoteQuestion({
          userId: JSON.parse(userId),
          questionId: JSON.parse(itemId),
          hasDownVoted,
          hasUpVoted,
          path,
        });
      } else if (type === "Answer") {
        await upVoteAnswer({
          userId: JSON.parse(userId),
          answerId: JSON.parse(itemId),
          hasDownVoted,
          hasUpVoted,
          path,
        });
      }
    }
    if (voteType === "downvote") {
      if (type === "Question") {
        downVoteQuestion({
          userId: JSON.parse(userId),
          questionId: JSON.parse(itemId),
          hasDownVoted,
          hasUpVoted,
          path,
        });
      } else if (type === "Answer") {
        await downVoteAnswer({
          userId: JSON.parse(userId),
          answerId: JSON.parse(itemId),
          hasDownVoted,
          hasUpVoted,
          path,
        });
      }
    }
  };

  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1.5">
          <Image
            src={
              hasUpVoted
                ? "/assets/icons/upvoted.svg"
                : "/assets/icons/upvote.svg"
            }
            width={18}
            height={18}
            alt="upvote"
            className="cursor-pointer"
            onClick={() => handleVote("upvote")}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatBigNumber(upvotes)}
            </p>
          </div>
        </div>

        <div className="flex-center gap-1.5">
          <Image
            src={
              hasDownVoted
                ? "/assets/icons/downvoted.svg"
                : "/assets/icons/downvote.svg"
            }
            width={18}
            height={18}
            alt="downvote"
            className="cursor-pointer"
            onClick={() => handleVote("downvote")}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatBigNumber(downvotes)}
            </p>
          </div>
        </div>

        {type === "Question" && (
          <Image
            src={
              hasSaved
                ? "/assets/icons/star-filled.svg"
                : "/assets/icons/star-red.svg"
            }
            width={18}
            height={18}
            alt="upvote"
            className="cursor-pointer"
            onClick={() => handleSave()}
          />
        )}
      </div>
    </div>
  );
};

export default Votes;
