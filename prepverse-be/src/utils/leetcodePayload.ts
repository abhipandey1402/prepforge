export const getLeetcodePayload = (skip: number) => ({
    operationName: "problemsetQuestionListV2",
    query: `
      query problemsetQuestionListV2($limit: Int, $skip: Int) {
        problemsetQuestionListV2(
          limit: $limit,
          skip: $skip
        ) {
          questions {
            id
            title
            titleSlug
            questionFrontendId
            difficulty
            paidOnly
            topicTags {
              name
              slug
            }
            status
            acRate
          }
          hasMore
        }
      }
    `,
    variables: {
        skip,
        limit: 100
    }
});
