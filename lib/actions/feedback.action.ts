'use server'

import { CreateFeedback } from "./general.action";

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

export const handleGenerateFeedback = async ({
  messages,
  interviewId,
  userId,
  feedbackId,
}: {
  messages: SavedMessage[];
  interviewId: string;
  userId: string;
  feedbackId: string;
}): Promise<{ success: boolean; id: string | null }> => {
  const { success, feedbackId: id } = await CreateFeedback({
    interviewId,
    userId,
    transcript: messages,
    feedbackId,
  });

  return { success, id: id ?? null };
};
