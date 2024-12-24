import { CheckCircle2, PauseCircle, PlayCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { CompletedChapterContext } from "../../../../../_context/CompletedChapterContext";

function ChapterNav({ course, userCourse, setActiveChapter }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { completedChapter, setCompletedChapter } = useContext(
    CompletedChapterContext
  );

  useEffect(() => {
    if (
      course?.chapter &&
      Array.isArray(course.chapter) &&
      course.chapter.length > 0
    ) {
      setActiveChapter(course.chapter[0]);
    } else {
      setActiveChapter(null);
    }
  }, [course, setActiveChapter]);

  const isChapterCompleted = (chapterId) => {
    return (
      Array.isArray(completedChapter) &&
      completedChapter.find((item) => item.chapterId == chapterId)
    );
  };

  return (
    <div>
      <div className="border-b p-5">
        <h2 className="font-medium text-[20px]">
          {course?.name || "Course Name Not Available"}
        </h2>
        <h2 className="text-gray-500 text-[14px]">By Muhilman</h2>
      </div>

      <div>
        {Array.isArray(course?.chapter) && course.chapter.length > 0 ? (
          course.chapter.map((chapter, index) => (
            <div
              key={index}
              onClick={() => {
                setActiveIndex(index);
                setActiveChapter(chapter);
              }}
              className={`flex gap-2 text-gray-500 text-[16px] px-5 p-4 cursor-pointer hover:bg-gray-100 ${
                isChapterCompleted(chapter.chapterNumber) &&
                activeIndex != index
                  ? "bg-blue-100 text-blue-600"
                  : null
              } ${activeIndex === index ? "bg-green-100 text-green-700" : ""}`}
            >
              {activeIndex == index ? (
                <PauseCircle height={25} width={25} />
              ) : isChapterCompleted(chapter.chapterNumber) ? (
                <CheckCircle2 height={25} width={25} />
              ) : (
                <PlayCircle height={25} width={25} />
              )}
              <h2
                className={`text-gray-500 text-[16px] hover:bg-gray-100 ${
                  activeIndex === index ? "bg-green-100 text-green-700" : ""
                }`}
              >
                {chapter?.name || `Chapter ${index + 1}`}
              </h2>
            </div>
          ))
        ) : (
          <div className="p-5 text-gray-500 text-[14px]">
            No chapters available for this course.
          </div>
        )}
      </div>
    </div>
  );
}

export default ChapterNav;
