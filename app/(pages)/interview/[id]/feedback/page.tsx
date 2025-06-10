import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.action";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Feedback = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await getCurrentUser();

  const interview = await getInterviewById(id);
  if (!interview) redirect("/");

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id!,
  });

  return (
    <section className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white">
          Feedback:{" "}
          <span className="capitalize text-primary-500">{interview.role}</span>{" "}
          Interview
        </h1>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {/* Overall Impression */}
        <div className="flex items-center gap-3 bg-zinc-900 p-4 rounded-2xl shadow-md">
          <Image src="/star.svg" width={22} height={22} alt="star" />
          <p className="text-sm text-zinc-300">
            Overall Score:{" "}
            <span className="text-primary-400 font-bold text-lg">
              {feedback?.totalScore}
            </span>{" "}
            /100
          </p>
        </div>

        {/* Date */}
        <div className="flex items-center gap-3 bg-zinc-900 p-4 rounded-2xl shadow-md">
          <Image src="/calendar.svg" width={22} height={22} alt="calendar" />
          <p className="text-sm text-zinc-300">
            {feedback?.createdAt
              ? dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A")
              : "N/A"}
          </p>
        </div>
      </div>

      <div className="bg-zinc-900 p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-2 text-primary-400">
          Final Assessment
        </h2>
        <p className="text-zinc-300">{feedback?.finalAssessment}</p>
      </div>

      {/* Breakdown */}
      <div className="bg-zinc-900 p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold text-primary-400 mb-4">
          Interview Breakdown
        </h2>
        <div className="space-y-4">
          {feedback?.categoryScores?.map((category, index) => (
            <div key={index} className="border-l-4 border-primary-500 pl-4">
              <p className="font-bold text-zinc-100">
                {index + 1}. {category.name}{" "}
                <span className="text-primary-300">({category.score}/100)</span>
              </p>
              <p className="text-zinc-400">{category.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths */}
      <div className="bg-green-900/30 p-6 rounded-2xl shadow-md">
        <h3 className="text-lg font-semibold text-green-400">Strengths</h3>
        <ul className="list-disc pl-6 text-zinc-200 space-y-1 mt-2">
          {feedback?.strengths?.map((strength, index) => (
            <li key={index}>{strength}</li>
          ))}
        </ul>
      </div>

      {/* Areas for Improvement */}
      <div className="bg-red-900/30 p-6 rounded-2xl shadow-md">
        <h3 className="text-lg font-semibold text-red-400">
          Areas for Improvement
        </h3>
        <ul className="list-disc pl-6 text-zinc-200 space-y-1 mt-2">
          {feedback?.areasForImprovement?.map((area, index) => (
            <li key={index}>{area}</li>
          ))}
        </ul>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button className="btn-secondary flex-1 py-3 text-base rounded-xl">
          <Link href="/" className="flex w-full justify-center">
            <p className="font-semibold text-primary-200">Back to Dashboard</p>
          </Link>
        </Button>

        <Button className="btn-primary flex-1 py-3 text-base rounded-xl">
          <Link href={`/interview/${id}`} className="flex w-full justify-center">
            <p className="font-semibold text-black">Retake Interview</p>
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default Feedback;
