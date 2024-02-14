import Link from "next/link";
import React from "react";

interface TagProps {
  tag: {
    _id: string;
    createdOn: Date;
    followers: [];
    name: string;
    questions: [];
  };
}
const TagCard = ({ tag }: TagProps) => {
  return (
    <Link
      href={`tag/:${tag._id}`}
      className="shadow-light100_darknone flex-center flex w-full flex-col max-xs:min-w-full sm:w-[260px]"
    >
      <article className="background-light900_dark200 light-border flex-center flex w-full flex-col rounded-2xl border px-8 py-10">
        <h1 className="paragraph-semibold text-dark300_light900 background-light800_dark400 mb-3 rounded-sm px-5 py-1.5">
          {tag.name}
        </h1>
        <p>tag description</p>
        <p className="small-medium text-dark400_light500 mt-3.5">
          <span className=" body-semibold mr-2.5 text-primary-500">
            {tag.questions.length}+{" "}
          </span>
          <span>Questions</span>
        </p>
      </article>
    </Link>
  );
};

export default TagCard;
