import Link from "next/link";
import React from "react";
import CategoryItem from "../../../../(home)/_components/CategoryItem";

function CourseList({ courses }) {
  return (
    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {courses.map((courses, index) => (
        <Link key={index} href={"/course-preview/" + courses.id}>
          <CategoryItem courses={courses} />
        </Link>
      ))}
    </div>
  );
}

export default CourseList;
