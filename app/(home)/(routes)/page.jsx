"use client";

import React, { useEffect, useState } from "react";
import CategoryFilter from "./browse/_components/CategoryFilter";
import { getCourseList } from "../../_services/index";
import CourseList from "./browse/_components/CourseList";

function Browse() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    getCourses();
  }, []);
  const getCourses = () => {
    getCourseList().then((resp) => {
      console.log(resp);
      setCourses(resp.courseLists);
    });
  };
  return (
    <div>
      <CategoryFilter />
      {courses ? <CourseList courses={courses} /> : null}
    </div>
  );
}

export default Browse;
