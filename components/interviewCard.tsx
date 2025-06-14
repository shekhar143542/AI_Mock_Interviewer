// import dayjs from "dayjs";
// import Link from "next/link";
// import Image from "next/image";

// import { Button } from "./ui/button";
// import DisplayTechIcons from "./DisplayTechIcons";

// import { cn, getRandomInterviewCover } from "@/lib/utils";
// import { getFeedbackByInterviewId } from "@/lib/actions/general.action";

// const InterviewCard = async ({
//   id,
//   userId,
//   role,
//   type,
//   techstack,
//   createdAt,
// }: InterviewCardProps) => {
//   const feedback =
//     userId && id
//       ? await getFeedbackByInterviewId({
//          interviewId: id, userId
//         })
//       : null;
//       console.log("Feedback data:", feedback);

//   const normalizedType = /mix/gi.test(type) ? "Mixed" : type;

//   const badgeColor =
//     {
//       Behavioral: "bg-light-400",
//       Mixed: "bg-light-600",
//       Technical: "bg-light-800",
//     }[normalizedType] || "bg-light-600";

//   const formattedDate = dayjs(
//     feedback?.createdAt || createdAt || Date.now()
//   ).format("MMM D, YYYY");

//   return (
//     <div className="card-border w-[360px] max-sm:w-full min-h-96">
//       <div className="card-interview">
//         <div>
//           {/* Type Badge */}
//           <div
//             className={cn(
//               "absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg",
//               badgeColor
//             )}
//           >
//             <p className="badge-text ">{normalizedType}</p>
//           </div>

//           {/* Cover Image */}
//           <Image
//             src={getRandomInterviewCover()}
//             alt="cover-image"
//             width={90}
//             height={90}
//             className="rounded-full object-fit size-[90px]"
//           />

//           {/* Interview Role */}
//           <h3 className="mt-5 capitalize">{role} Interview</h3>

//           {/* Date & Score */}
//           <div className="flex flex-row gap-5 mt-3">
//             <div className="flex flex-row gap-2">
//               <Image
//                 src="/calendar.svg"
//                 width={22}
//                 height={22}
//                 alt="calendar"
//               />
//               <p>{formattedDate}</p>
//             </div>

//             <div className="flex flex-row gap-2 items-center">
//               <Image src="/star.svg" width={22} height={22} alt="star" />
//               <p>{feedback?.totalScore || "---"}/100</p>
//             </div>
//           </div>

//           {/* Feedback or Placeholder Text */}
//           <p className="line-clamp-2 mt-5">
//             {feedback?.finalAssessment ||
//               "You haven't taken this interview yet. Take it now to improve your skills."}
//           </p>
//         </div>

//         <div className="flex flex-row justify-between">
//           <DisplayTechIcons techStack={techstack} />

//           <Button className="btn-primary">
//             <Link
//               href={
//                 feedback
//                   ? `/interview/${id}/feedback`
//                   : `/interview/${id}`
//               }
//             >
//               {feedback ? "Check Feedback" : "View Interview"}
//             </Link>
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InterviewCard;




import React from 'react';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { getRandomInterviewCover } from '@/lib/utils';
import { Button } from './ui/button';
import DisplayTechIcons from './DisplayTechIcons';
import { getFeedbackByInterviewId } from '@/lib/actions/general.action';

interface Feedback {
  id: string;
  interviewId: string;
  totalScore: number;
  categoryScores: Array<{
    name: string;
    score: number;
    comment: string;
  }>;
  strengths: string[];
  areasForImprovement: string[];
  finalAssessment: string;
  createdAt: string;
}



const InterviewCard = async ({id, userId, role, type, techstack,
    createdAt}:InterviewCardProps) => {
  const feedback = userId && id ?
  await getFeedbackByInterviewId({interviewId: id, userId}): null

  const normalizedType = /mix/gi.test(type) ? 'Mixed' : type;
  const formattedDate = dayjs(feedback?.createdAt || createdAt).format('MMM D, YYYY');

  console.log('Feedback:', feedback);


  return (
    <div className="w-[360px] max-sm:w-full rounded-3xl overflow-hidden shadow-lg bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] border border-[#3a3a3a] backdrop-blur-md hover:shadow-purple-500/20 transition-transform duration-300 hover:scale-[1.025] group">
      {/* Header Badge */}
      <div className="absolute top-0 right-0 px-4 py-1 bg-purple-600 rounded-bl-2xl text-sm font-semibold text-white z-10">
        {normalizedType}
      </div>

      {/* Profile Image */}
      <div className="flex justify-center pt-6">
        <Image
          src={getRandomInterviewCover()}
          alt="Interview cover"
          width={96}
          height={96}
          className="rounded-full border-4 border-purple-500 shadow-md group-hover:shadow-purple-400 transition-all duration-300"
        />
      </div>

      {/* Title */}
      <h3 className="mt-4 text-xl font-bold text-center capitalize text-white">
        {role} Interview
      </h3>

      {/* Details */}
      <div className="mt-4 px-6 space-y-3 text-sm text-gray-300">
        <div className="flex items-center gap-2">
          <Image src="/calendar.svg" alt="calendar" width={20} height={20} />
          <span>{formattedDate}</span>
        </div>

        <div className="flex items-center gap-2">
          <Image src="/star.svg" alt="score" width={20} height={20} />
          <span>{feedback?.totalScore ?? '---'}/100</span>
        </div>

        <p className="text-gray-400 italic line-clamp-3">
          {feedback?.finalAssessment || 'You haven’t taken this interview yet. Start now to sharpen your skills!'}
        </p>
      </div>

      {/* Divider */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-700 to-transparent my-5 mx-6" />

      {/* Footer */}
      <div className="px-6 pb-5 flex items-center justify-between">
        <DisplayTechIcons techStack={techstack} />
        <Link
          href={feedback ? `/interview/${id}/feedback` : `/interview/${id}`}
        >
          <Button className="bg-purple-600 hover:bg-purple-500 cursor-pointer text-white font-semibold px-4 py-2 rounded-xl transition-colors duration-200">
            {feedback ? 'Check Feedback' : 'Start Interview'}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default InterviewCard;


