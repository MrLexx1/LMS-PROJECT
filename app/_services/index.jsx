import request, { gql } from "graphql-request";
const MASTER_URL =
  "https://ap-south-1.cdn.hygraph.com/content/cm42ra30n01qq07w3huu22rwa/master";

export const getCourseList = async () => {
  const query = gql`
    query courseList {
      courseLists {
        name
        banner {
          url
        }
        free
        id
        totalChapters
        tag
      }
    }
  `;

  const result = await request(MASTER_URL, query);
  return result;
};

export const getCourseById = async (id, userEmail) => {
  const query =
    gql`
    query course {
  courseList(where: {id: "` +
    id +
    `"}) {
    chapter(first: 30) {
      ... on Chapter {
        id
        name
        chapterNumber
        video {
          url
        }
      }
    }
    description
    name
    id
    free
    totalChapters
  }
      userEnrollCourse(
        where: {
          courseId: "` +
    id +
    `"
          userEmail: "` +
    userEmail +
    `"
        }
      ) {
        courseId
        userEmail
        completedChapter {
      ... on CompletedChapter {
        chapterId
      }
    }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

export const EnrollCourse = async (courseId, userEmail) => {
  const mutationQuery =
    gql`
    mutation EnrollCourse {
      createUserEnrollCourses(
        data: {
          userEmail: "` +
    userEmail +
    `"
          courseId: "` +
    courseId +
    `"
        }
      ) {
        id
      }
    }
  `;

  const result = await request(MASTER_URL, mutationQuery);
  return result;
};

export const PublishCourse = async (id) => {
  const mutationQuery =
    gql`
    mutation EnrollCourse {
      createUserEnrollCourses(data: { courseId: "` +
    id +
    `" }) {
        id
      }
    }
  `;

  const result = await request(MASTER_URL, mutationQuery);
  return result;
};

export const markChapterCompleted = async (recordId, chapterNumber) => {
  const mutationQuery =
    gql`
    mutation MarkChapterComplete {
      updateUserEnrollCourses(
        data: {
          completedChapter: {
            create: { CompletedChapter: { data: { chapterId: "` +
    chapterNumber +
    `" } } }
          }
        }
        where: { id: "` +
    recordId +
    `" }
      ) {
        id
      }
      publishManyUserEnrollCourseConnection(to: PUBLISHED) {
        edges {
          node {
            id
          }
        }
      }
    }
  `;
  const result = await request(MASTER_URL, mutationQuery);
  return result;
};

export const GetUserCourseList = async (userEmail) => {
  const query =
    gql`
    query UserCourseList {
      userEnrollCourse(where: { userEmail: "` +
    userEmail +
    `" }) {
        courseList {
          banner {
            url
          }
          description
          id
          name
          free
          sourceCode
          tag
          totalChapters
        }
      }
    }
  `;

  const result = await request(MASTER_URL, query);
  return result;
};
