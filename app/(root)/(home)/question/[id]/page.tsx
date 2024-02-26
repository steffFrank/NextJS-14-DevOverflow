import Answer from "@/components/forms/Answer";
import AllAnswers from "@/components/shared/AllAnswers";
import Metric from "@/components/shared/Metric";
import ParseHtml from "@/components/shared/ParseHtml";
import RenderTag from "@/components/shared/RenderTag";
import { getQuestion } from "@/lib/actions/question.actions";
import { getUserById } from "@/lib/actions/user.action";
import { formatBigNumber, getTimestamp } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface QuestionDetailsProps {
  params: {
    id: string;
  };
}
const QuestionDetails = async ({ params }: QuestionDetailsProps) => {
  const result = await getQuestion({ questionId: params.id });

  const { userId: clerkId } = auth();

  let mongoUser;
  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId });
  }

  return (
    <div>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            className="flex items-center justify-start gap-1"
            href={`/profile/${result.author.clerkId}`}
          >
            <Image
              src={result.author.picture}
              className="rounded-full"
              width={22}
              height={22}
              alt="profile"
            />
            <p className="paragraph-semibold text-dark300_light700">
              {result.author.name}
            </p>
          </Link>
          <div>VOTING</div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {result.title}
        </h2>
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          alt="clock"
          value={`Asked ${getTimestamp(result.createdAt)}`}
          title=""
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="Answers"
          value={result.answers.length}
          title={`${result.answers.length > 0 ? " Answers" : "Answer"}`}
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="Eye"
          value={`${formatBigNumber(result.views)}`}
          title={`${result.views > 0 ? " Views" : " View"}`}
          textStyles="small-medium text-dark400_light800"
        />
      </div>

      <ParseHtml content={result.content} />

      <div className="mt-6 flex flex-wrap gap-2">
        {result.tags.map((tag: any) => {
          return (
            <RenderTag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              showCount={false}
            />
          );
        })}
      </div>

      <AllAnswers
        questionId={result._id}
        userId={JSON.stringify(mongoUser._id)}
        totalAnswers={result.answers.length}
      />
      <Answer
        question={result.content}
        questionId={JSON.stringify(result._id)}
        authorId={JSON.stringify(mongoUser._id)}
      />
    </div>
  );
};

export default QuestionDetails;
