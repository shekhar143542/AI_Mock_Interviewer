import InterviewCard from '@/components/interviewCard'
import { Button } from '@/components/ui/button'
import { dummyInterviews } from '@/constants'
import { getCurrentUser } from '@/lib/actions/auth.action'
import {  getInterviewByUserId, getLatestInterviews } from '@/lib/actions/general.action'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = async () => {

  const user = await getCurrentUser();
  // const userInterviews = (await getInterviewByUserId(user?.id!)) || [];

   const [userInterviews, latestInterviews] = await Promise.all([
    getInterviewByUserId(user?.id!),
    getLatestInterviews({ userId: user?.id! }),
  ]);


  const hasPastInterviews = userInterviews?.length! > 0;

  const hasUpcomingInterviews = latestInterviews?.length! > 0;



  return (
    <>
      <section className='card-cta'>
        <div className='flex flex-col gap-6 max-w-lg'>
          <h2>
            Get Interview-Ready with AI-Powered Practice & Feedback
          </h2>
          <p>
            Practice on real interview questions and get instant feedback
          </p>

          <Button asChild className='btn-primary max-sm:w-full'>
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>

        <Image src="/robot.png" alt="robo-dude" width={400} height={400}
          className='max-sm:hidden'
        />
      </section>

      <section className='flex flex-col gap-6 mt-8'>
        <h2>Your Interviews</h2>

        <div className='interviews-section'>
          {
          
            hasPastInterviews ? (
              userInterviews?.map((interview) => (
                <InterviewCard
                key={interview.id}
                userId={user?.id}
                id={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
              )
            )
          
         
          ) : 
          (
            <p>You haven't taken any interviews yet</p>
          )
          } 
        </div>

        <section className='flex flex-col gap-6 mt-8'>
          <h2>Take an Interview</h2>
          <div className='interviews-section'>
  {
          
           hasUpcomingInterviews ? (
              latestInterviews?.map((interview) => (
                <InterviewCard
                key={interview.id}
                userId={user?.id}
                id={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
              )
            )
          
         
          ) : 
          (
            <p>There are no new interviews available</p>
          )
          } 
          </div>
        </section>
      </section>
    </>
  )
}

export default page
