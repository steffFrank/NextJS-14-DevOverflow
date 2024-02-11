"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";

export const getUserById = async (params: any) => {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createUser = async (userData: CreateUserParams) => {
  try {
    await connectToDatabase();

    const newUser = await User.create(userData);

    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateUser = async (userData: UpdateUserParams) => {
  try {
    await connectToDatabase();
    const { clerkId, updatedData, path } = userData;
    await User.findOneAndUpdate(
      { clerkId },
      { update: updatedData },
      { new: true }
    );
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteUser = async (params: DeleteUserParams) => {
  try {
    await connectToDatabase();

    const { clerkId } = params;

    const deletedUser = await User.findOneAndDelete({ clerkId });

    if (!deletedUser) {
      throw new Error("User not found");
    }

    // const userQuestionIds = await Question.find({
    //   author: deletedUser,
    // }).distinct("_id");

    await Question.deleteMany({ author: deletedUser._id });

    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
