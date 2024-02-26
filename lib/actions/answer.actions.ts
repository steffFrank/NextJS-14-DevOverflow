"use server";

import Answer from "@/database/answer.model";
import { connectToDatabase } from "../mongoose";
import { CreateAnswerParams, GetAnswersParams } from "./shared.types";
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

export const getAllAnswers = async (params: GetAnswersParams) => {
  try {
    await connectToDatabase();

    const { questionId } = params;
    const answers = await Answer.find({ question: questionId })
      .populate({
        path: "author",
        model: "User",
      })
      .sort({ createdAt: -1 });
    return { answers };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
