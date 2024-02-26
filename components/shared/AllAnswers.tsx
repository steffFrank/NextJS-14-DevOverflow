import { AnswerFilters } from "@/constants/filters";

import React from "react";
import Filter from "./Filter";
import { getAllAnswers } from "@/lib/actions/answer.actions";
import Link from "next/link";
import Image from "next/image";
import { getTimestamp } from "@/lib/utils";
import ParseHtml from "./ParseHtml";

interface AllAnswersProps {
  questionId: string;
  userId: string;
  totalAnswers: number;
  page?: number;
  filter?: number;
}
const AllAnswers = async ({
  questionId,
  userId,
  totalAnswers,
  page,
  filter,
}: AllAnswersProps) => {
  const result = await getAllAnswers({ questionId });
  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">{totalAnswers} Answer(s)</h3>

        <Filter filters={AnswerFilters} />
      </div>
      <div>
        {result.answers.map((answer) => {
          return (
            <article key={answer._id} className="light-border border-b py-10">
              <div className="flex items-center justify-between">
                <div className="mb-8 flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                  <Link
                    href={`/profile/${answer.author.clerkId}`}
                    className="flex flex-1 items-start gap-1 sm:items-center"
                  >
                    <Image
                      src={answer.author.picture}
                      width={18}
                      height={18}
                      alt="profile"
                      className="rounded-full object-cover max-sm:mt-0.5"
                    />
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <p className="body-semibold text-dark300_light700">
                        {answer.author.name}{" "}
                      </p>
                      <p className="small-regular text-light400_light500 ml-0.5 mt-0.5 line-clamp-1">
                        <span className="max-sm:hidden">
                          {"   "} - answered {getTimestamp(answer.createdAt)}
                        </span>
                      </p>
                    </div>
                  </Link>
                  <div className="flex justify-end">VOTING</div>
                </div>
              </div>
              <ParseHtml content={answer.content} />
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default AllAnswers;
