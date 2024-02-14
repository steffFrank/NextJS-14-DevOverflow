"use server";

import Tag from "@/database/tag.model";
import { connectToDatabase } from "../mongoose";
import { GetAllTagsParams, GetTopInteractedTagsParams } from "./shared.types";
import User from "@/database/user.model";

export const getTopInteractedTags = async (
  params: GetTopInteractedTagsParams
) => {
  const { userId } = params;
  try {
    await connectToDatabase();

    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    // many stuff to do here...

    return [
      { _id: "1", name: "tag1" },
      { _id: "2", name: "tag2" },
      { _id: "3", name: "tag3" },
    ];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllTags = async (params: GetAllTagsParams) => {
  try {
    await connectToDatabase();

    const tags = await Tag.find({}).sort({ createdAt: -1 });

    return { tags };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
