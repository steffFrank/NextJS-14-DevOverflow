import Filter from "@/components/shared/Filter";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HomePageFilters } from "@/constants/filters";
import HomeFilters from "@/components/shared/home/HomeFilters";
import NoResult from "@/components/shared/NoResult";

const questions = [
  // {
  //   _id: 1,
  //   title: "question1",
  //   tags: [
  //     { _id: 1, name: "tag1" },
  //     { _id: 2, name: "tag2" },
  //   ],
  //   author: "author one",
  //   upvotes: 12,
  //   views: 75,
  //   answers: 3,
  //   createdAt: "2021-09-01T12:00:00:000Z",
  // },
  // {
  //   _id: 2,
  //   title: "question2",
  //   tags: [
  //     { _id: 1, name: "tag1" },
  //     { _id: 2, name: "tag2" },
  //   ],
  //   author: "author two",
  //   upvotes: 13,
  //   views: 60,
  //   answers: 2,
  //   createdAt: "2021-10-01T12:00:00:000Z",
  // },
];
export default function Home() {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Link href="/ask-questions" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions..."
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question) => {
            return "QuestionCArd";
          })
        ) : (
          <NoResult
            title="There's no question to show"
            description=" Be the first to break the silence! Ask a Question and kickstart the
            discussion. your query could be the next big thing others learn from."
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
}
