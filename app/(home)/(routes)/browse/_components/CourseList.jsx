import { Book } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function CourseList({ courses }) {
  return (
    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {courses.map((courses, index) => (
        <Link key={index} href={"/course-preview/" + courses.id}>
          <div className="border rounded-lg p-2 cursor-pointer hover:border-blue-300">
            <Image
              src={courses.banner.url}
              alt={courses.name}
              width={1000}
              height={500}
              className="rounded-lg"
            />
            <div className="mt-2">
              <h2 className="text-[18px] md:text-[16px] font-medium">
                {courses.name}
              </h2>
              <h2 className="text-gray-400 text-[13px]">MuhIlman</h2>
              <div className="flex items-center gap-2 mt-2">
                <Book className="h-6 w-6 text-blue-600 rounded-full bg-blue-100 p-1" />
                <h2 className="text-[12px] text-gray-400">
                  {courses?.totalChapters} Chapters
                </h2>
              </div>
              <h2 className="mt-2 text-[16px]">
                {courses.free ? "Free" : "Paid"}
              </h2>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default CourseList;
