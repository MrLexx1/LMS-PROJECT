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
      courseList(where: { id: "` +
    id +
    `" }) {
        chapter {
          ... on Chapter {
            id
            name
            video {
              url
            }
            youtubeUrl
          }
        }
        description
        id
        name
        free
        totalChapters
      }
      userEnrollCourse(
        where: {
          courseId: "` +
    id +
    `"
          userEmail: "muhilman606@gmail.com"
        }
      ) {
        courseId
        userEmail
        completedChapter
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

export const EnrollCourse = async (courseId, userEmail) => {
  const mutationQuery = gql`
    mutation EnrollCourse {
      createUserEnrollCourses(
        data: {
          userEmail: "muhilman606@gmail.com"
          courseId: "cm42ra30n01qq07w3huu22rwa"
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
