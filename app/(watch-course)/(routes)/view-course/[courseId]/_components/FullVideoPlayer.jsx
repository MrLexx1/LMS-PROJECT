import { CheckCircle2, EyeClosed } from "lucide-react";
import React, { useContext } from "react";
import { CompletedChapterContext } from "../../../../../_context/CompletedChapterContext";
import { markChapterCompleted } from "./../../../../../_services/index";

function FullVideoPlayer({ userCourse, activeChapter }) {
  console.log(activeChapter);
  const { completedChapter, setCompletedChapter } = useContext(
    CompletedChapterContext
  );

  const isChapterCompleted = (chapterId) => {
    return (
      Array.isArray(completedChapter) &&
      completedChapter.find((item) => item.chapterId == chapterId)
    );
  };

  const markChapterCompleted = async () => {
    if (!completedChapter?.length) {
      setCompletedChapter([]);
    }
    completedChapter
      ? setCompletedChapter([
          ...completedChapter,
          {
            chapterId: activeChapter?.chapterNumber + "",
          },
        ])
      : setCompletedChapter([
          {
            chapterId: activeChapter?.chapterNumber + "",
          },
        ]);
    console.log(completedChapter);

    await markChapterCompleted(
      userCourse.id,
      activeChapter?.chapterNumber
    ).then((resp) => {
      console.log(resp);
    });
  };

  return (
    activeChapter && (
      <div className="p-5">
        <video
          width="1000"
          height="250"
          key={activeChapter?.video?.url}
          controls
          controlsList="nodownload"
        >
          <source src={activeChapter?.video?.url} type="video/mp4" />
        </video>
        <div className="p-5 border rounded-lg mt-5 flex justify-between items-center">
          <h2 className="text-[20px] font-medium">
            {activeChapter?.name || "Chapter name not available"}
          </h2>
          {!isChapterCompleted(activeChapter.chapterNumber) ? (
            <button
              className="bg-blue-500 text-white p-2 px-5 rounded-lg flex gap-2 hover:bg-blue-800"
              onClick={() => markChapterCompleted()}
            >
              <CheckCircle2 /> <h2>Mark as Completed</h2>
            </button>
          ) : (
            <button className="text-blue-600 border border-blue-600 p-2 px-5 rounded-lg flex gap-2 hover:bg-blue-100">
              <EyeClosed /> <h2>Mark in Complete</h2>
            </button>
          )}
        </div>
      </div>
    )
  );
}

export default FullVideoPlayer;
