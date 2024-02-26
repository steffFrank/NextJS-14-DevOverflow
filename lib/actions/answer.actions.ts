"use server";

import Answer from "@/database/answer.model";
import { connectToDatabase } from "../mongoose";
import { CreateAnswerParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";

export const createAnswer = async (params: CreateAnswerParams) => {
  try {
    await connectToDatabase();

    const { content, author, question, path } = params;
    const answer = await Answer.create({
      content,
      author,
      question,
    });

    await Question.findByIdAndUpdate(question, {
      $push: { answers: answer._id },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
