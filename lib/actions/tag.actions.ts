"use server";

import Tag from "@/database/tag.model";
import { connectToDatabase } from "../mongoose";
import { GetTopInteractedTagsParams } from "./shared.types";
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
