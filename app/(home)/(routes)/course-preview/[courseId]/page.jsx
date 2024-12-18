"use client";
import React, { useEffect, useState } from "react";
import { getCourseById } from "../../../../_services";
import VideoPlayer from "./_components/VideoPlayer";
import CourseDetails from "./_components/CourseDetails";
import OptionSection from "./_components/OptionSection";
import EnrollmentSection from "./_components/EnrollmentSection";
import { useUser } from "@clerk/nextjs";

function CoursePreview({ params }) {
  const [courseDetail, setCourseDetail] = useState([]);
  const {user} = useUser();
  useEffect(() => {
    params?.courseId ? getCourse(params.courseId) : null;
  }, [user]);

  const getCourse = () => {
    getCourseById(params.courseId,user?.primaryEmailAddress?.emailAddress).then((resp) => {
      console.log(resp);
      setCourseDetail(resp.courseList);
    });
  };
  return (
    courseDetail?.name && (
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="col-span-2">
            {courseDetail?.chapter[0] ? (
              <VideoPlayer videoUrl={courseDetail?.chapter[0]?.video.url} />
            ) : null}
            <CourseDetails courseDetail={courseDetail} />
          </div>
          <div className="mt-5 md:mt-0">
            <OptionSection />
            <EnrollmentSection courseDetail={courseDetail} />
          </div>
        </div>
      </div>
    )
  );
}

export default CoursePreview;