"use client";
import React, { useEffect, useState } from "react";
import { GetUserCourseList } from "../../../_services/index";
import { useUser } from "@clerk/nextjs";
import CategoryItem from "./../../_components/CategoryItem";

function Dashboard() {
  const { user } = useUser();
  const [userCourseList, setUserCourseList] = useState([]);

  useEffect(() => {
    user ? getUserCourse() : null;
  }, [user]);

  const getUserCourse = async () => {
    await GetUserCourseList(user.primaryEmailAddress.emailAddress).then(
      (resp) => {
        console.log(resp?.userEnrollCourse);
        if (resp) setUserCourseList(resp?.userEnrollCourse);
      }
    );
  };
  return (
    <div>
      {userCourseList ? (
        <>
          <h2 className="text-[20px] font-medium">My Enrolled Course :</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 gap-5">
            {userCourseList &&
              userCourseList.map((courses, index) => (
                <div key={index}>
                  <CategoryItem courses={courses?.courseList} />
                </div>
              ))}
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center text-[20px] mt-20 text-gray-500">
          <h2>You don't have anu course enrolled.</h2>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
