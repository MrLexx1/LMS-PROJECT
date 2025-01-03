"use client";
import React, { useState } from "react";
import { EnrollCourse, PublishCourse } from "../../../../../_services";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

function EnrollmentSection({ courseDetail }) {
  const { user } = useUser();
  const router = useRouter();
  const [userCourse, setUserCourse] = useState();
  const enrollCourse = async () => {
    if (user) {
      await EnrollCourse(
        courseDetail.id,
        user.primaryEmailAddress.emailAddress
      ).then(async (resp) => {
        console.log("EnrollCourseResp=>", resp);
        if (resp) {
          await PublishCourse(resp?.createUserEnrollCourse?.id).then(
            (result) => {
              console.log(result);
              if (result) {
                router.push("/view-course/" + courseDetail.id);
              }
            }
          );
        }
      });
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <div>
      {userCourse?.courseId ? (
        <div className="mt-5 border rounded-lg p-2 text-center">
          <h2 className="text-gray-500">
            Continue To Build Project, Access Source Code and Track Your
            Progress for free!
          </h2>
          <button
            className="p-2 w-full bg-blue-500 text-white rounded-lg text[14px] mt-2 hover:bg-blue-700"
            onClick={() => router.push("/view-course" + courseDetail.id)}
          >
            Countinue
          </button>
        </div>
      ) : null}
      {courseDetail.free && !userCourse?.courseId ? (
        <div className="mt-5 border rounded-lg p-2 text-center">
          <h2 className="text-gray-500">
            Learn and Build Project, Access Source Code and Track Your Progress
            for free!
          </h2>
          <button
            className="p-2 w-full bg-blue-500 text-white rounded-lg text[14px] mt-2 hover:bg-blue-700"
            onClick={() => enrollCourse()}
          >
            Enroll Now
          </button>
        </div>
      ) : (
        <div className="mt-5 border rounded-lg p-2 text-center">
          <h2 className="text-gray-500">
            Buy this course,Source code and Track Your Progress
          </h2>
          <button className="p-2 w-full bg-blue-500 text-white rounded-lg text[14px] mt-2 hover:bg-blue-700">
            Buy course for $1.99
          </button>
        </div>
      )}

      <div className="mt-5 border rounded-lg p-2 text-center">
        <h2 className="text-gray-500">
          Buy Monthly membership and get access to all Course, Source code and
          Track Your Progress
        </h2>
        <button className="p-2 w-full bg-blue-500 text-white rounded-lg text[14px] mt-2 hover:bg-blue-700">
          Buy Membership $4.99/Month
        </button>
      </div>
    </div>
  );
}

export default EnrollmentSection;
